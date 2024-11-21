<?php
include "connection.php";
include "JWT.php";

$input = json_decode(file_get_contents("php://input"), true);
error_log(file_get_contents("php://input"));

if (!isset($input['course_id'])||!isset($input['course_name'])||!isset($input['teacher_id'])) {
    echo json_encode(["status" => "failed", "message" => "course_id is not set"]);
    return;
}

$course_id = $input["course_id"];
$course_name=$input["course_name"];
$teacher_id=$input['teacher_id'];
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

$check_query = $connection->prepare("SELECT * FROM enrolledcourses WHERE student_id = ? AND course_id = ?");
if (!$check_query) {
    echo json_encode(["status" => "failed", "message" => "Failed to prepare check query", "error" => $connection->error]);
    return;
}
$check_query->bind_param("ii", $user_id, $course_id);
$check_query->execute();
$result = $check_query->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "failed", "message" => "You are already enrolled in this course"]);
    return;
}

$query = $connection->prepare("INSERT INTO enrolledcourses(student_id, course_id,course_name,teacher_id) VALUES (?, ?,?,?)");
if (!$query) {
    echo json_encode(["status" => "failed", "message" => "Query preparation failed", "error" => $connection->error]);
    return;
}

$query->bind_param("iisi", $user_id, $course_id,$course_name,$course_id);
if ($query->execute()) {
    echo json_encode(["status" => "success", "message" => "Successfully enrolled"]);
} else {
    echo json_encode(["status" => "failed", "message" => "Failed to enroll", "error" => $query->error]);
}
?>
