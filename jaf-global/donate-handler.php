<?php
// donate-handler.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// PayPal API Configuration
define('PAYPAL_MODE', 'sandbox'); // Change to 'live' for production
define('PAYPAL_CLIENT_ID', 'YOUR_PAYPAL_CLIENT_ID_HERE'); //ibi tuzabibona from paypal developer account when we create an account
define('PAYPAL_SECRET', 'YOUR_PAYPAL_SECRET_HERE');

// PayPal API URLs
$apiUrl = PAYPAL_MODE === 'sandbox' 
    ? 'https://api-m.sandbox.paypal.com' //this for the time when we will be testing
    : 'https://api-m.paypal.com'; //this for the time when we will be live and hosted

// Get access token
function getPayPalAccessToken($apiUrl) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl . '/v1/oauth2/token');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
    curl_setopt($ch, CURLOPT_USERPWD, PAYPAL_CLIENT_ID . ':' . PAYPAL_SECRET);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Accept: application/json',
        'Accept-Language: en_US'
    ]);

    $result = curl_exec($ch);
    curl_close($ch);
    
    $json = json_decode($result);
    return $json->access_token ?? null;
}

// Create PayPal order
function createPayPalOrder($apiUrl, $accessToken, $amount, $frequency) {
    $orderData = [
        'intent' => 'CAPTURE',
        'purchase_units' => [[
            'amount' => [
                'currency_code' => 'USD',
                'value' => number_format($amount, 2, '.', '')
            ],
            'description' => $frequency === 'monthly' 
                ? 'Monthly Donation to JAF Global' 
                : 'One-time Donation to JAF Global'
        ]],
        'application_context' => [
            'return_url' => 'http://yourdomain.com/jaf-global/donation-success.html',
            'cancel_url' => 'http://yourdomain.com/jaf-global/donate.html',
            'brand_name' => 'JAF Global',
            'user_action' => 'PAY_NOW'
        ]
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl . '/v2/checkout/orders');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($orderData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $accessToken
    ]);

    $result = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($result);
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $amount = floatval($input['amount'] ?? 0);
    $frequency = $input['frequency'] ?? 'once';
    $receiptOption = $input['receiptOption'] ?? 'email';
    $email = $input['email'] ?? '';
    $name = $input['name'] ?? 'Anonymous';
    
    if ($amount <= 0) {
        echo json_encode(['success' => false, 'error' => 'Invalid amount']);
        exit;
    }
    
    // Get PayPal access token
    $accessToken = getPayPalAccessToken($apiUrl);
    
    if (!$accessToken) {
        echo json_encode(['success' => false, 'error' => 'PayPal authentication failed']);
        exit;
    }
    
    // Create PayPal order
    $order = createPayPalOrder($apiUrl, $accessToken, $amount, $frequency);
    
    if (isset($order->id)) {
        // Store donation info in database/file for later processing
        $donationData = [
            'orderId' => $order->id,
            'amount' => $amount,
            'frequency' => $frequency,
            'receiptOption' => $receiptOption,
            'email' => $email,
            'name' => $name,
            'timestamp' => date('Y-m-d H:i:s')
        ];
        
        // Save to pending donations file
        file_put_contents(
            'pending_donations.json',
            json_encode($donationData) . "\n",
            FILE_APPEND
        );
        
        // Return approval URL for PayPal checkout
        $approvalUrl = '';
        foreach ($order->links as $link) {
            if ($link->rel === 'approve') {
                $approvalUrl = $link->href;
                break;
            }
        }
        
        echo json_encode([
            'success' => true,
            'orderId' => $order->id,
            'approvalUrl' => $approvalUrl
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Failed to create PayPal order',
            'details' => $order
        ]);
    }
}
?>