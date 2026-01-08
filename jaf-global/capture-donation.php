<?php
// capture-donation.php
require_once 'donate-handler.php';
require_once 'receipt-generator.php';

if (isset($_GET['token'])) {
    $orderId = $_GET['token'];
    
    $accessToken = getPayPalAccessToken($apiUrl);
    
    // Capture the order
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl . '/v2/checkout/orders/' . $orderId . '/capture');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $accessToken
    ]);

    $result = curl_exec($ch);
    curl_close($ch);
    
    $capture = json_decode($result);
    
    if ($capture->status === 'COMPLETED') {
        // Load pending donation data
        $pendingFile = file_get_contents('pending_donations.json');
        $lines = explode("\n", $pendingFile);
        
        foreach ($lines as $line) {
            if (empty($line)) continue;
            $donation = json_decode($line, true);
            
            if ($donation['orderId'] === $orderId) {
                // Generate receipt
                $receiptPath = generateReceipt($donation, $capture);
                
                // Send email if requested
                if ($donation['receiptOption'] === 'email') {
                    sendReceiptEmail($donation['email'], $donation['name'], $receiptPath, $donation['amount']);
                }
                
                // Save completed donation
                $completedData = array_merge($donation, [
                    'status' => 'completed',
                    'captureId' => $capture->purchase_units[0]->payments->captures[0]->id,
                    'completedAt' => date('Y-m-d H:i:s')
                ]);
                
                file_put_contents(
                    'completed_donations.json',
                    json_encode($completedData) . "\n",
                    FILE_APPEND
                );
                
                // Redirect based on receipt option
                if ($donation['receiptOption'] === 'download') {
                    header('Location: donation-success.html?download=' . urlencode($receiptPath));
                } else {
                    header('Location: donation-success.html?email=sent');
                }
                exit;
            }
        }
    }
}

header('Location: donate.html?error=payment_failed');
?>