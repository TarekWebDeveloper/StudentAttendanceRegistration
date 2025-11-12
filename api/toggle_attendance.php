<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
// إضافة ترويسات CORS
header("Access-Control-Allow-Origin: *"); // السماح بالوصول من أي مصدر
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // السماح بالطرق مثل POST و GET
header("Access-Control-Allow-Headers: Content-Type"); // السماح بالـ headers مثل Content-Type
include("db.php"); // الاتصال بقاعدة البيانات

$data = json_decode(file_get_contents("php://input"), true);

if(isset($data["student_id"], $data["day"], $data["present"])) {
    $student_id = intval($data["student_id"]);
    $day = $conn->real_escape_string($data["day"]);
    $present = intval($data["present"]);

    // تحقق إن كان السجل موجود
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