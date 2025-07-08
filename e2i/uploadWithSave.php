<?php
// upload.php — capture text fields + file + SQLite storage

// If you still need CORS for React dev on :5173, keep this; otherwise you can remove it
// header('Access-Control-Allow-Origin: http://localhost:5173');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit; // preflight
}

// Show errors while testing
ini_set('display_errors', 1);
error_reporting(E_ALL);

// 1) Define our paths (all relative to this file)
// $dbFile    = __DIR__ . '/data/applications.sqlite';
$uploadDir = __DIR__ . '/uploads/';

// 2) Ensure folders exist
// if (!is_dir(dirname($dbFile))) {
//     mkdir(dirname($dbFile), 0755, true);
// }
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$conn = new mysqli("localhost", "u320398390_homeCare", "Joshanup@1703", "u320398390_e2iHomeCare");

// 3) Connect to (or create) the SQLite database
// $pdo = new PDO('sqlite:' . $dbFile);
// $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// 4) Create the table if it doesn't exist
// $pdo->exec("
//   CREATE TABLE IF NOT EXISTS applications (
//     id           INTEGER PRIMARY KEY AUTOINCREMENT,
//     full_name    TEXT    NOT NULL,
//     email        TEXT    NOT NULL,
//     phone        TEXT,
//     position     TEXT,
//     resume_path  TEXT,
//     submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   )
// ");

// 5) Only handle POST submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // a) Pull in and trim the text fields
    $fn = trim($_POST['fullName']  ?? '');
    $em = trim($_POST['email']      ?? '');
    $ph = trim($_POST['phone']      ?? '');
    $po = trim($_POST['position']   ?? '');
    $msg = trim($_POST['message']   ?? '');

    // b) Validate required fields
    if ($fn === '' || $em === '') {
        die('❌ Full name and email are required.');
    }

    // c) Handle the resume file
    if (! isset($_FILES['resume']) || $_FILES['resume']['error'] !== UPLOAD_ERR_OK) {
        die('❌ Resume upload failed (error code: ' . ($_FILES['resume']['error'] ?? 'none') . ').');
    }

    // d) Move the uploaded file into /uploads/
    $origName = basename($_FILES['resume']['name']);
    $destPath = $uploadDir . $origName;
    if (! move_uploaded_file($_FILES['resume']['tmp_name'], $destPath)) {
        die('❌ Could not move resume to uploads/. Check folder permissions.');
    }
    // store a relative path for the DB
    $resumePath = 'uploads/' . $origName;

    // e) Insert everything into SQLite
    $stmt = "
      INSERT INTO careers
        (name, email, phone, position, resume_path, cover_letter)
      VALUES
        ('$fn', '$em', '$ph', '$po', '$destPath', '$msg')
    ";
    if ($conn->query($stmt) === TRUE) {
    echo "Record inserted successfully";
    } else {
    echo "Error: " . $conn->error;
    }
    // $stmt->execute([
    //   ':fn' => $fn,
    //   ':em' => $em,
    //   ':ph' => $ph,
    //   ':po' => $po,
    //   ':rp' => $resumePath,
    // ]);

    // f) Confirmation
    echo "<h2>✅ Thanks, " . htmlspecialchars($fn) . "!</h2>";
    echo "<p>Your application has been saved.</p>";
    exit;
}

// 6) Redirect any direct GET visits back to the form
header('Location: index.html');
exit;
