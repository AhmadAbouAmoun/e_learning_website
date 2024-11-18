<?php

include "connection.php";
include "JWT.php";

    if(!isset($_GET['id'])){
        echo"id is not set";
        return;
    }
    $id=$_GET['id'];

    $query = $connection->prepare("DELETE  FROM courses WHERE id = ?");
    $query->bind_param('i', $id);

    if ($query->execute()) {
        if($query->affected_rows > 0)
        {
            echo json_encode(["message" => "Course $id was deleted successfully"]);
        }
        else{
            echo"record does not exist ".$connection->error;
        }
    } else {
        echo json_encode(["error" => "Failed to update user status"]);
    }

