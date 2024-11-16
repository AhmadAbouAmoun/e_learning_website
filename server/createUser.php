<?php
include "connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if(!$_POST["name"]||!$_POST["email"]||!$_POST["password"]||!$_POST["type"]){
echo"something is not right";
exit;
}
$name=$_POST["name"];
$email=$_POST["email"];
$password=$_POST["password"];
$type=$_POST["type"];

$hash_password=password_hash($password,PASSWORD_DEFAULT);

$check=$connection->prepare("SELECT email FROM $type WHERE email=?");
$check->bind_param("s",  $email);
$check->execute();
$result=$check->get_result();
if($result->num_rows>0){
    echo"account already exists ";
    exit;
}
else{
    $query=$connection->prepare("INSERT INTO $type(name,email,password) VALUES (?,?,?)");
if(!$query){
    echo"issue with the query ".$connection->error;
    exit;
}
$query->bind_param("sss", $name, $email, $hash_password);

if($query->execute()){
    $user_id = $connection->insert_id;
    $response=["id"=>$user_id,
    "status" => "success",
];
    echo json_encode($response);
}
else{
    echo"Failed " . $query;
}
$query->close();
$connection->close(); 
exit;
}