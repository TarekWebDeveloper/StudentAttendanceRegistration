
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php';

// التعامل مع طلب OPTIONS فقط
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// قراءة البيانات القادمة من React
$data = json_decode(file_get_contents("php://input"), true);
$days = $data['days'] ?? [];

if (empty($days) || !is_array($days)) {
    http_response_code(400);
    echo json_encode(["error" => "No days provided"]);
    exit;
}

// إزالة التكرارات من المصفوفة
$days = array_unique($days);

// حذف الأيام القديمة إذا أردت دورة جديدة كاملة (اختياري)
// $conn->query("DELETE FROM course_days");

// إضافة الأيام الجديدة إلى الجدول
$stmt = $conn->prepare("INSERT IGNORE INTO course_days (day) VALUES (?)");
foreach ($days as $day) {
    $stmt->bind_param("s", $day);
    $stmt->execute();
}
$stmt->close();

echo json_encode(["status" => "success", "days" => $days]);
?>