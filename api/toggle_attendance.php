<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type"); 
include("db.php");    

$data = json_decode(file_get_contents("php://input"), true);

if(isset($data["student_id"], $data["day"], $data["present"])) {
    $student_id = intval($data["student_id"]);
    $day = $conn->real_escape_string($data["day"]);
    $present = intval($data["present"]);

    
// Check if the record exists
    $check = $conn->query("SELECT id FROM attendance WHERE student_id = $student_id AND day = '$day'");
    if($check->num_rows > 0){
        $update = $conn->query("UPDATE attendance SET present = $present WHERE student_id = $student_id AND day = '$day'");
        echo $update ? json_encode(["status" => "updated"]) : json_encode(["error" => "فشل التحديث"]);
    } else {
        $insert = $conn->query("INSERT INTO attendance (student_id, day, present) VALUES ($student_id, '$day', $present)");
        echo $insert ? json_encode(["status" => "inserted"]) : json_encode(["error" => "فشل الإدخال"]);
    }
} else {
    echo json_encode(["error" => "بيانات ناقصة"]);
}
?>
