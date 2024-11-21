<?php
include "connection.php";
include "JWT.php";

$input = json_decode(file_get_contents("php://input"), true);
if ( !isset($input["title"]) || !isset($input["description"]) || !isset($input["course_id"])) {
    echo json_encode(["status" => "failed", "message" => "Missing required fields"]);
    return;
}

$title = $input["title"];
$description = $input["description"];
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
if($type=="student"){
    echo json_encode(["status" => "failed", "message" => "UnAutharized action  " . $connection->error]);
    return;
}

$query = $connection->prepare("INSERT INTO assignments ( title, description, course_id) VALUES ( ?, ?, ?)");
if (!$query) {
    echo json_encode(["status" => "failed", "message" => "Query preparation failed: " . $connection->error]);
    return;
}

$query->bind_param("ssi", $title, $description, $course_id);

if ($query->execute()) {
    echo json_encode(["status" => "success", "message" => "Assignment created successfully"]);
} else {
    echo json_encode(["status" => "failed", "message" => "Error executing query: " . $query->error]);
}
?>
