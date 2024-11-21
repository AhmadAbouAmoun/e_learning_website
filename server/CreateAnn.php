<?php
include "connection.php";
include "JWT.php";

$input = json_decode(file_get_contents("php://input"), true);
error_log(file_get_contents("php://input"));

if ( !isset($_POST["course_id"]) || !isset($_POST["announcment"]) ) {
    echo$input["course_id"];
    echo $input["announcment"];
    echo json_encode(["status" => "failed", "message" => "Missing required fields"]);
    exit;
}

$announcment = $_POST["announcment"];
$course_id = $_POST["course_id"];
if (!isset($_POST['token'])) {
    echo json_encode(["status" => "failed", "message" => "Token was not provided"]);
    return;
}

$token = $_POST['token'];

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