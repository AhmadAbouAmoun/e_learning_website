<?php

include "connection.php";
include "JWT.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, REQUEST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$input = json_decode(file_get_contents("php://input"), true);
error_log(file_get_contents("php://input"));

if(!isset($input["type"]) || !isset($input["id"])){
    echo $input["type"];
    echo  $input["id"] ;
    return;
    exit;
}
    $id=$input["id"];
    $type=$input["type"];
    $banned=true;
    $query = $connection->prepare("UPDATE $type SET banned = ? WHERE id = ?");
    $query->bind_param('ii', $banned, $id);

    if ($query->execute()) {
        if($query->affected_rows > 0)
        {
            echo json_encode(["message" => " status updated successfully"]);
        }
        else{
            echo"record does not exist ".$connection->error;
        }
    } else {
        echo json_encode(["error" => "Failed to update  status"]);
    }

