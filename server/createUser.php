<?php
include "connection.php";
include "JWT.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json'); 

$input = json_decode(file_get_contents("php://input"), true);
error_log(file_get_contents("php://input"));

if (!isset($input["name"]) || !isset($input["email"]) || !isset($input["password"]) || !isset($input["type"])) {
    echo json_encode(["status" => "failed", "message" => "Missing required fields"]);
    exit;
}

$name = $input["name"];
$email = $input["email"];
$password = $input["password"];
$type = $input["type"];
$banned = 0; 


$hash_password = password_hash($password, PASSWORD_DEFAULT);

$check = $connection->prepare("SELECT email FROM $type WHERE email=?");
if (!$check) {
    echo json_encode(["status" => "failed", "message" => "Preperation error."]);
    exit;
}

$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "failed", "message" => "Account already exists"]);
    exit;
} else {
    $query = $connection->prepare("INSERT INTO $type(name, email, password, banned) VALUES (?, ?, ?, ?)");
    if (!$query) {
        error_log("Query preparation error: " . $connection->error);
        echo json_encode(["status" => "failed", "message" => " Please try again later."]);
        exit;
    }

    $query->bind_param("sssi", $name, $email, $hash_password, $banned);
    if ($query->execute()) {
        $user_id = $connection->insert_id;
        $payload = [
            'user_id' => $user_id,
            'type' => $type,
        ];
        $jwt = createJWT($header, $payload, $secret);
        $response = [
            "status" => "success",
            "message" => "User created successfully",
            "token" => $jwt, 
        ];
        echo json_encode($response);
    } else {
        error_log("Database insertion error: " . $connection->error);
        echo json_encode(["status" => "failed", "message" => "An error occurred. Please try again later."]);
    }
}

$query->close();
$check->close();
$connection->close();
exit;
?>
