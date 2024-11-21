<?php
include "connection.php";
include "JWT.php";
$input = json_decode(file_get_contents("php://input"), true);

if(!$input["course_id"]||!$input["type"]||!$input["comment"]){
    echo"something was not provided";
    return;
}
$course_id=$input["course_id"];
$type=$input["type"];
$comment=$input["comment"];


if (isset($input['token'])) {
    $token = $input['token'];
    if(verifyJWT($token,$secret))
    {
        $user_id=getJWTValue($token,"user_id");
        echo"$user_id";

        $query=$connection->prepare("INSERT INTO comments(student_id,course_id,comment,type) VALUES (?,?,?,?)");
        if(!$query){
            echo"issue with the query ".$connection->error;
            exit;
        }
        $query->bind_param("iiss",$user_id,$course_id,$comment,$type);
        if($query->execute()){
            $response=[
                "comment"=>$comment,
                "type"=>$type,
                "course_id"=>$course_id,
                "user_id"=>$user_id,
                "status" => "success",
            ];            
            echo json_encode([$response]);
        }	
    }
    else{
        echo"a problem with th token";
    }
}
else{
    echo"token was not provided";
}