<?php
include "connection.php";
include "JWT.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if(!$_POST["name"]||!$_POST["teacher_id"]||!$_POST["id"]){
echo"something is not right";
exit;
}
$name=$_POST["name"];
$teacher_id=$_POST["teacher_id"];
$id=$_POST["id"];

$check=$connection->prepare("SELECT * FROM courses WHERE id=?");
$check->bind_param("i",  $id);
$check->execute();
$result=$check->get_result();
if(!$result->num_rows){
    echo"course with such id does not exist ";
    exit;
}
else{
    $query=$connection->prepare("Update courses SET name=? , teacher_id=? WHERE id=? ");
if(!$query){
    echo"issue with the query ".$connection->error;
    exit;
}
$query->bind_param("sii", $name,$teacher_id,$id);

if($query->execute()){

    $response=["course_id"=>$id,
    "name"=>$name,
    "teacher_id"=>$teacher_id,
    "status" => "success",
];
    echo json_encode($response);
}
else{
    $response=[
    "status" => "failed",
    "message"=> "teacher id does not exist ".$connection->error
];
echo json_encode($response);

}
$query->close();
$connection->close(); 
exit;
}