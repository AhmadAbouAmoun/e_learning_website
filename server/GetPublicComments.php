<?php

include "connection.php";

$input = json_decode(file_get_contents("php://input"), true);

if(!$input["course_id"]){
    echo"something was not provided";
    return;
}
$course_id=$input["course_id"];

$type="public";


$query = $connection->prepare("SELECT * FROM comments WHERE type=?");
$query->bind_param("s",$type);
$query->execute();

$result = $query->get_result();

$users = [];
if ($result->num_rows > 0) {
    while ($user = $result->fetch_assoc()) {
        $users[] = $user; 
    }
    echo json_encode($users);
} else {
    echo json_encode([
        "message" => "Not Found"
    ]);
}
?>
