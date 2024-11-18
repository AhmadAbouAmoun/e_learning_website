<?php

include "connection.php";



$query = $connection->prepare("SELECT * FROM courses");
$query->execute();

$result = $query->get_result();

$courses = [];
if ($result->num_rows > 0) {
    while ($course = $result->fetch_assoc()) {
        $courses[] = $course; 
    }
    echo json_encode($courses);
} else {
    echo json_encode([
        "message" => "Not Found"
    ]);
}
?>
