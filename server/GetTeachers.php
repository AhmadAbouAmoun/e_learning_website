<?php

include "connection.php";


$type="teacher";

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
