<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
// Delete students associated with the course

$conn->query("DELETE FROM Student");

// Delete cycle days
$conn->query("DELETE FROM course_days");

echo json_encode(["status" => "success"]);
?>
