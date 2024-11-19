<?php
include "connection.php";
include "JWT.php";

if(!$_POST["course_id"]||!$_POST["type"]||!$_POST["comment"]){
    echo"something was not provided";
    return;
}
$course_id=$_POST["course_id"];
$type=$_POST["type"];
$comment=$_POST["comment"];


if (isset($_POST['token'])) {
    $token = $_POST['token'];
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
            echo json_encode(["message"=>"successfully inserted message","status"=>"success",$response]);
        }	
    }
    else{
        echo"a problem with th token";
    }
}
else{
    echo"token was not provided";
}