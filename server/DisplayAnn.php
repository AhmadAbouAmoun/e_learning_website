<?php

include "connection.php";

if ( !isset($_POST["course_id"])  ) {
    
    echo json_encode(["status" => "failed", "message" => "Missing required fields"]);
    exit;
}

$course_id = $_POST["course_id"];

$query = $connection->prepare("SELECT * FROM announcments WHERE course_id=?");
$query->bind_param("i",$course_id);
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
