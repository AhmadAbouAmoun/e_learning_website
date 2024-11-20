<?php

include "connection.php";
include "JWT.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, REQUEST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

if(!$_POST["id"]||!$_POST["type"]){
    echo"something is not right";
    exit;
    }
    $id=$_POST["id"];
    $type=$_POST["type"];
    $banned=1;
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

