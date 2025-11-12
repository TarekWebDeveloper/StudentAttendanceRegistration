
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require 'db.php';

$result = $conn->query("SELECT day FROM course_days ORDER BY day ASC");
$days = [];
while($row = $result->fetch_assoc()){
    $days[] = $row['day'];
}

echo json_encode(["days" => $days]);
?>