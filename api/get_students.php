
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require 'db.php';

// Bring all the students
$sql = "SELECT id, name, father, agent FROM student";
$result = $conn->query($sql);

$students = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $student_id = $row['id'];
        
// Retrieve this student's attendance days
        $attendance_query = "SELECT day FROM attendance WHERE student_id = $student_id AND present = 1";
        $attendance_result = $conn->query($attendance_query);

        $attendance_days = [];
        if ($attendance_result) {
            while ($att = $attendance_result->fetch_assoc()) {
                $attendance_days[] = $att['day'];
            }
        }
// Add days to student data
        $row['attendance'] = $attendance_days;
        $students[] = $row;
    }
}

echo json_encode($students);
?>
