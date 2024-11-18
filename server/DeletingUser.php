<?php

include "connection.php";
include "JWT.php";

    if(!isset($_GET['id'])||!isset($_GET['type'])){
        echo"id or type are not set";
        return;
    }
    $id=$_GET['id'];
    $type=$_GET['type'];

    $query = $connection->prepare("DELETE  FROM $type WHERE id = ?");
    $query->bind_param('i', $id);

    if ($query->execute()) {
        if($query->affected_rows > 0)
        {
            echo json_encode(["message" => "User $id of type $type was deleted successfully"]);
        }
        else{
            echo"record does not exist ".$connection->error;
        }
    } else {
        echo json_encode(["error" => "Failed to update user status"]);
    }

