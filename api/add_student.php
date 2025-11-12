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
$name   = $data['name'] ?? '';
$father = $data['father'] ?? '';
$agent  = $data['agent'] ?? '';

if (!$name || !$father || !$agent) {
    http_response_code(400);
    echo json_encode(["error" => "Name, Father, and Agent are required"]);
    exit;
}

$sql = "INSERT INTO Student (name, father, agent) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $father, $agent);

if ($stmt->execute()) {
    $id = $stmt->insert_id;
    echo json_encode(["id"=>$id, "name"=>$name, "father"=>$father, "agent"=>$agent]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Insert failed"]);
}

$stmt->close();
$conn->close();
?>