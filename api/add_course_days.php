
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$days = $data['days'] ?? [];

if (empty($days) || !is_array($days)) {
    http_response_code(400);
    echo json_encode(["error" => "No days provided"]);
    exit;
}


// Remove duplicates from the array

$days = array_unique($days);


// Adding new days to the table
$stmt = $conn->prepare("INSERT IGNORE INTO course_days (day) VALUES (?)");
foreach ($days as $day) {
    $stmt->bind_param("s", $day);
    $stmt->execute();
}
$stmt->close();

echo json_encode(["status" => "success", "days" => $days]);
?>
