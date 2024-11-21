<?php
include "connection.php";

// Read the incoming JSON input
$input = json_decode(file_get_contents("php://input"), true);

// Check if the necessary fields are provided
if (!isset($input["course_id"])) {
    echo json_encode(["status" => "failed", "message" => "Course ID not provided"]);
    return;
}

$course_id = $input["course_id"];

// Check if the token is provided
if (!isset($input['token'])) {
    echo json_encode(["status" => "failed", "message" => "Token was not provided"]);
    return;
}

$token = $input['token'];

// Verify the token
if (!verifyJWT($token, $secret)) {
    echo json_encode(["status" => "failed", "message" => "Invalid or expired token"]);
    return;
}

$user_id = getJWTValue($token, "user_id");

// Get the instructor ID for the course
$query = $connection->prepare("SELECT teacher_id FROM courses WHERE course_id=?");
$query->bind_param("i", $course_id);
$query->execute();
$result = $query->get_result();

// Check if the course exists
if ($result->num_rows == 0) {
    echo json_encode(["status" => "failed", "message" => "Course not found"]);
    return;
}

$course = $result->fetch_assoc();
$instructor_id = $course['teacher_id'];  // Assuming this is the instructor's ID

// Retrieve private comments where the user is either the commenter or the instructor
$query = $connection->prepare("SELECT * FROM comments WHERE course_id=? AND type='private' AND (user_id=? OR teacher_id=?)");
$query->bind_param("iii", $course_id, $user_id, $instructor_id);
$query->execute();
$result = $query->get_result();

// Fetch and return the comments
$comments = [];
if ($result->num_rows > 0) {
    while ($comment = $result->fetch_assoc()) {
        $comments[] = $comment;
    }
    echo json_encode($comments);
} else {
    echo json_encode([]);  // No private comments found
}
?>
