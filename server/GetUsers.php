<?php

include "connection.php";

if(!$_POST["type"]){
    echo json_encode(["message"=>"something is not right"]);
    exit;
    }
$type=$_POST["type"];

$query = $connection->prepare("SELECT * FROM $type");
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
