<?php
// receipt-generator.php
require_once 'vendor/autoload.php'; // You'll need to install FPDF: composer require setasign/fpdf

use setasign\Fpdf\Fpdf;

function generateReceipt($donation, $capture) {
    $pdf = new Fpdf();
    $pdf->AddPage();
    
    // Header
    $pdf->SetFont('Arial', 'B', 20);
    $pdf->Cell(0, 10, 'JAF GLOBAL', 0, 1, 'C');
    $pdf->SetFont('Arial', '', 10);
    $pdf->Cell(0, 5, 'Future Focus', 0, 1, 'C');
    $pdf->Ln(10);
    
    // Title
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(0, 10, 'Donation Receipt', 0, 1, 'C');
    $pdf->Ln(5);
    
    // Transaction details
    $pdf->SetFont('Arial', '', 11);
    $pdf->Cell(60, 8, 'Receipt Number:', 0, 0);
    $pdf->SetFont('Arial', 'B', 11);
    $pdf->Cell(0, 8, $capture->purchase_units[0]->payments->captures[0]->id, 0, 1);
    
    $pdf->SetFont('Arial', '', 11);
    $pdf->Cell(60, 8, 'Date:', 0, 0);
    $pdf->SetFont('Arial', 'B', 11);
    $pdf->Cell(0, 8, date('F d, Y'), 0, 1);
    
    $pdf->SetFont('Arial', '', 11);
    $pdf->Cell(60, 8, 'Donor Name:', 0, 0);
    $pdf->SetFont('Arial', 'B', 11);
    $pdf->Cell(0, 8, $donation['name'], 0, 1);
    
    if (!empty($donation['email'])) {
        $pdf->SetFont('Arial', '', 11);
        $pdf->Cell(60, 8, 'Email:', 0, 0);
        $pdf->SetFont('Arial', 'B', 11);
        $pdf->Cell(0, 8, $donation['email'], 0, 1);
    }
    
    $pdf->Ln(5);
    
    // Donation amount
    $pdf->SetFont('Arial', '', 11);
    $pdf->Cell(60, 8, 'Donation Type:', 0, 0);
    $pdf->SetFont('Arial', 'B', 11);
    $type = $donation['frequency'] === 'monthly' ? 'Monthly Recurring' : 'One-Time';
    $pdf->Cell(0, 8, $type, 0, 1);
    
    $pdf->SetFont('Arial', '', 11);
    $pdf->Cell(60, 8, 'Amount:', 0, 0);
    $pdf->SetFont('Arial', 'B', 14);
    $pdf->SetTextColor(45, 80, 22);
    $pdf->Cell(0, 8, '$' . number_format($donation['amount'], 2), 0, 1);
    $pdf->SetTextColor(0, 0, 0);
    
    $pdf->Ln(10);
    
    // Tax deduction notice
    $pdf->SetFont('Arial', 'I', 10);
    $pdf->MultiCell(0, 5, 'JAF Global is a registered 501(c)(3) nonprofit organization. This donation is tax-deductible to the extent allowed by law. Please retain this receipt for your tax records.');
    
    $pdf->Ln(5);
    $pdf->SetFont('Arial', '', 10);
    $pdf->Cell(0, 5, 'Tax ID: XX-XXXXXXX', 0, 1);
    
    $pdf->Ln(10);
    
    // Thank you message
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(0, 8, 'Thank You for Your Generosity!', 0, 1, 'C');
    $pdf->SetFont('Arial', '', 10);
    $pdf->MultiCell(0, 5, 'Your contribution directly supports our mission to empower youth with education, skills, and opportunities. Together, we are building access and creating futures.', 0, 'C');
    
    // Save PDF
    $filename = 'receipts/receipt_' . $capture->purchase_units[0]->payments->captures[0]->id . '.pdf';
    if (!file_exists('receipts')) {
        mkdir('receipts', 0777, true);
    }
    $pdf->Output('F', $filename);
    
    return $filename;
}

function sendReceiptEmail($email, $name, $receiptPath, $amount) {
    $to = $email;
    $subject = 'Thank You for Your Donation to JAF Global';
    
    $message = "
    <html>
    <body style='font-family: Arial, sans-serif; color: #333;'>
        <h2 style='color: #2d5016;'>Thank You, $name!</h2>
        <p>We are deeply grateful for your generous donation of <strong>$$amount</strong> to JAF Global.</p>
        <p>Your support directly empowers talented youth with the education, skills, and opportunities they need to create meaningful change in their communities.</p>
        <p>Your donation receipt is attached to this email for your tax records.</p>
        <p>With gratitude,<br><strong>The JAF Global Team</strong></p>
        <hr>
        <p style='font-size: 12px; color: #666;'>
            JAF Global | Future Focus<br>
            Kigali, Rwanda<br>
            info@jafglobal.org
        </p>
    </body>
    </html>
    ";
    
    // Get file content
    $fileContent = file_get_contents($receiptPath);
    $fileContent = chunk_split(base64_encode($fileContent));
    
    // Email headers
    $separator = md5(time());
    $headers = "From: JAF Global <noreply@jafglobal.org>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$separator\"\r\n";
    
    $body = "--$separator\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message . "\r\n";
    
    $body .= "--$separator\r\n";
    $body .= "Content-Type: application/pdf; name=\"donation-receipt.pdf\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment\r\n\r\n";
    $body .= $fileContent . "\r\n";
    $body .= "--$separator--";
    
    mail($to, $subject, $body, $headers);
}
?>