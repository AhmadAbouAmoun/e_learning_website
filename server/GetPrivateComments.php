<?php
include "connection.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["course_id"])) {
    echo "Course ID not provided";
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


$query = $connection->prepare("SELECT teacher_id FROM courses WHERE course_id=?");
$query->bind_param("i", $course_id);
$query->execute();
$result = $query->get_result();

if ($result->num_rows == 0) {
    echo "Course not found.";
    return;
}

$course = $result->fetch_assoc();
$instructor_id = $course['teacher_id'];  

$query = $connection->prepare("SELECT * FROM comments WHERE course_id=? AND  (type='private' AND (user_id=? OR teacher_id=?))");
$query->bind_param("iii", $course_id, $user_id, $instructor_id);
$query->execute();
$result = $query->get_result();

$comments = [];
if ($result->num_rows > 0) {
    while ($comment = $result->fetch_assoc()) {
        $comments[] = $comment;
    }
    echo json_encode($comments);
} else {
    echo json_encode([]); 
}
?>
