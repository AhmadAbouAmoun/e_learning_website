<?php
include "connection.php";
include "JWT.php";

$input = json_decode(file_get_contents("php://input"), true);

error_log(file_get_contents("php://input"));

if (!isset($input['course_id'])) {
    echo json_encode(["status" => "failed", "message" => "course_id is not set"]);
    return;
}

$course_id = $input["course_id"]; 
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
$type = getJWTValue($token, "type");

error_log("User ID: $user_id, Type: $type");

$query = $connection->prepare("INSERT INTO enrolledcourses(student_id, course_id) VALUES (?, ?)");
if (!$query) {
    echo json_encode(["status" => "failed", "message" => "Query preparation failed", "error" => $connection->error]);
    return;
}

$query->bind_param("ii", $user_id, $course_id);
if ($query->execute()) {
    echo json_encode(["status" => "success", "message" => "Successfully enrolled"]);
} else {
    echo json_encode(["status" => "failed", "message" => "Failed to enroll in course", "error" => $query->error]);
}
