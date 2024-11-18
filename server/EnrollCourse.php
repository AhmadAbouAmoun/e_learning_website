<?php
include "connection.php";
include "JWT.php";

if(!$_POST["course_id"]){
    echo"cousre id was not provided";
    return;
}
$course_id=$_POST["course_id"];
if (isset($_POST['token'])) {
    $token = $_POST['token'];
    if(verifyJWT($token,$secret))
    {
        $user_id=getJWTValue($token,"user_id");
        echo"$user_id";
        $type=getJWTValue($token,"type");
        echo"<br>"."$type"."<br>";		
        $query=$connection->prepare("INSERT INTO enrolledcourses(student_id,course_id) VALUES (?,?)");
        if(!$query){
            echo"issue with the query ".$connection->error;
            exit;
        }
        $query->bind_param("ii",$course_id,$user_id);
        if($query->execute()){
            echo json_encode(["message"=>"successfully enrolled","status"=>"success"]);
        }
    }
    else{
        echo"error with token";
        return;
    }

}
else{
    echo"token was not provided"."<br>";
    return;

}