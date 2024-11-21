<?php

include "connection.php";
include "JWT.php";
$input = json_decode(file_get_contents("php://input"), true);
error_log(file_get_contents("php://input"));
echo $input['id'];

    if(!isset($input['id'])){
        echo json_encode(["status"=>"failed","message"=>"id is not set"]);
        return;
    }
    $id=(int)$input['id'];

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

