<?php
include "connection.php";
if(!$_POST["email"]||!$_POST["password"]||!$_POST["type"]){
    echo"something is not right";
    exit;
}
$email=$_POST["email"];
$password=$_POST["password"];
$type=$_POST["type"];
$check=$connection->prepare("SELECT email,password FROM $type WHERE email=?,password=?");
$check->bind_param("s",  $email);
$check->execute();
$result=$check->get_result();