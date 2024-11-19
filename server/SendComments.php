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
        $type=getJWTValue($token,"type");
        echo"<br>"."$type"."<br>";		
    }
}