<?php

include "connection.php";
include "JWT.php";

if (isset($_POST['token'])) {
    $token = $_POST['token'];
    if(verifyJWT($token,$secret))
    {
        $id=getJWTValue($token,"user_id");
        echo"$id";

        $type=getJWTValue($token,"type");
        echo"$type"."<br>";

    }
    else{
        echo"error with token";
        return;
    }
    $banned=1;
    $query = $connection->prepare("UPDATE $type SET banned = ? WHERE id = ?");
    $query->bind_param('ii', $banned, $id);

    if ($query->execute()) {
        if($query->affected_rows > 0)
        {
            echo json_encode(["message" => "User status updated successfully"]);
        }
        else{
            echo"record does not exist ".$connection->error;
        }
    } else {
        echo json_encode(["error" => "Failed to update user status"]);
    }
} else {
    echo json_encode(["error" => "Invalid request. token does not exist."]);
}
