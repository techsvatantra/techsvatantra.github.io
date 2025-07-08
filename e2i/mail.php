<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.zoho.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'care@e2ihomecare.com';
    $mail->Password   = 'Naarasimha5%'; // Use app-specific password if Zoho has 2FA enabled
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom('care@e2ihomecare.com', 'Meenal Kulkarni');
    $mail->addAddress('care@e2ihomecare.com', 'Anup Joshi');

     if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // a) Pull in and trim the text fields
    $fn = trim($_POST['name']  ?? '');
    $em = trim($_POST['email']      ?? '');
    $ph = trim($_POST['phone']      ?? '');
    $po = trim($_POST['preferredDate']   ?? '');
     $msg = trim($_POST['message']   ?? '');
     // Email body from POST data
    $body = "<h3>Free Consultation requested:</h3><ul>";    
        $body .= "<li><strong> Name </strong>: " . $_POST['name'] . "</li>";
         $body .= "<li><strong> Email </strong>: " . $_POST['email']. "</li>";
          $body .= "<li><strong> Phone </strong>: " .  $_POST['phone']. "</li>";
           $body .= "<li><strong> Preferred Date </strong>: " .  $_POST['preferredDate'] . "</li>";
            $body .= "<li><strong> Message </strong>: " .  $_POST['message'] . "</li>";
    $body .= "</ul>";
      // Content
    $mail->isHTML(true);
    $mail->Subject = 'Free consultation Request';
    $mail->Body    = $body;

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Message has been sent successfully']);
    }


  
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage(),
        'debug' => $mail->ErrorInfo
    ]);
    //echo json_encode(['status' => 'error', 'message' => "Mailer Error: {$mail->ErrorInfo}"]);
}
?>
