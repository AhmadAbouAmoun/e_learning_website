<?php

include "connection.php";

$input = json_decode(file_get_contents("php://input"), true);

if(!$input["course_id"]){
    echo"something was not provided";
    return;
}
$course_id=$input["course_id"];


$type="public";


$query = $connection->prepare("SELECT * FROM comments WHERE type=? AND course_id=?");
$query->bind_param("si",$type,$course_id);
$query->execute();

$result = $query->get_result();

$comments = [];
if ($result->num_rows > 0) {
    while ($comment = $result->fetch_assoc()) {
        $comments[] = $comment; 
    }
    echo json_encode($comments);
} else {
    echo json_encode([
        "message" => "Not Found"
    ]);
}
?>
