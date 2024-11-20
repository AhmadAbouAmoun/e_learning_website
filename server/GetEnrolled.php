<?php

include "connection.php";

if (!isset($input['token'])) {
    echo json_encode(["status" => "failed", "message" => "Token was not provided"]);
    return;
}

$token = $input['token'];

if (!verifyJWT($token, $secret)) {
    echo json_encode(["status" => "failed", "message" => "Invalid or expired token"]);
    return;
}

$user_id = getJWTValue($token, "user_id");


$query = $connection->prepare("SELECT * FROM courses WHERE student_id=? ");
$query->bind_param("i",$user_id);
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
