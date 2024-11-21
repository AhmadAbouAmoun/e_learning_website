<?php
include "connection.php";
include "JWT.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$input = json_decode(file_get_contents("php://input"), true);
error_log(file_get_contents("php://input"));

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
if($type=="admin"){
}