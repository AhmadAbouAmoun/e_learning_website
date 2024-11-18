<?php
include "connection.php";
include "JWT.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if(!$_POST["name"]||!$_POST["teacher_id"]){
echo"something is not right";
exit;
}
$name=$_POST["name"];
$teacher_id=$_POST["teacher_id"];


$check=$connection->prepare("SELECT * FROM courses WHERE name=?");
$check->bind_param("s",  $name);
$check->execute();
$result=$check->get_result();
if($result->num_rows>0){
    echo"course with such name alreadt exists ";
    exit;
}
else{
    $query=$connection->prepare("INSERT INTO courses(name,teacher_id) VALUES (?,?)");
if(!$query){
    echo"issue with the query ".$connection->error;
    exit;
}
$query->bind_param("si", $name,$teacher_id);

if($query->execute()){
    $course_id = $connection->insert_id;

    $response=["course_id"=>$course_id,
    "status" => "success",
];
    echo json_encode($response);
}
else{
    $response=[
    "status" => "failed",
    "message"=> "error ".$connection->error
];
echo json_encode($response);

}
$query->close();
$connection->close(); 
exit;
}