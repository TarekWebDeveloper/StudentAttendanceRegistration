
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require 'db.php';

// جلب جميع الطلاب
$sql = "SELECT id, name, father, agent FROM student";
$result = $conn->query($sql);

$students = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $student_id = $row['id'];

        // جلب أيام الحضور الخاصة بهذا الطالب
        $attendance_query = "SELECT day FROM attendance WHERE student_id = $student_id AND present = 1";
        $attendance_result = $conn->query($attendance_query);

        $attendance_days = [];
        if ($attendance_result) {
            while ($att = $attendance_result->fetch_assoc()) {
                $attendance_days[] = $att['day'];
            }
        }

        // إضافة الأيام إلى بيانات الطالب
        $row['attendance'] = $attendance_days;
        $students[] = $row;
    }
}

echo json_encode($students);
?>