<?php
include "connection.php";
include "JWT.php";

$input = json_decode(file_get_contents("php://input"), true);
error_log(file_get_contents("php://input"));

if ( !isset($input["course_id"]) || !isset($input["announcment"]) ) {
    echo$input["course_id"];
    echo $input["announcment"];
    echo json_encode(["status" => "failed", "message" => "Missing required fields"]);
    exit;
}

$announcment = $input["announcment"];
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
$type = getJWTValue($token, "type");
if($type!="teacher"){
    echo json_encode(["status" => "failed", "message" => "Wrong user type"]);
    return;
}
$teacher_id = getJWTValue($token, "user_id");

$validationQuery = $connection->prepare("SELECT id FROM courses WHERE id = ? AND teacher_id = ?");
if (!$validationQuery) {
    echo json_encode(["status" => "failed", "message" => "Validation query failed", "error" => $connection->error]);
    return;
}

$validationQuery->bind_param("ii", $course_id, $teacher_id);
$validationQuery->execute();
$validationQuery->store_result();

if ($validationQuery->num_rows === 0) {
    echo json_encode(["status" => "failed", "message" => "You are not the teacher of this course"]);
    return;
}

$query = $connection->prepare("INSERT INTO announcments(teacher_id,course_id,announcment) VALUES (?,?,?)");
if (!$query) {
    echo json_encode(["status" => "failed", "message" => "Query preparation failed", "error" => $connection->error]);
    return;
}

$query->bind_param("iis", $teacher_id, $course_id,$announcment);
if ($query->execute()) {
    echo json_encode(["status" => "success", "message" => "Successfully enrolled"]);
} else {
    echo json_encode(["status" => "failed", "message" => "Failed to enroll", "error" => $query->error]);
}