<?php
include "connection.php";
include "JWT.php";

$input = json_decode(file_get_contents("php://input"), true);
error_log(file_get_contents("php://input"));

if(!isset($input["type"]) || !isset($input["email"]) || !isset($input["password"])){
    echo $input["type"];
    echo  $input["email"] ;
    echo $input["password"];
    return;
    exit;
}
$type = $input["type"];
$email = $input["email"];
$password = $input["password"];
$check=$connection->prepare("SELECT * FROM $type WHERE email=?");
$check->bind_param("s",  $email);
$check->execute();
$result=$check->get_result();
if($result->num_rows>0){
    $user = $result->fetch_assoc();

   if($type!="admin"){
    if ($user['banned']) {
        http_response_code(403);
        echo json_encode(["status" => "failed","error" => "Your account has been banned"]);
        return;
    }

   }
    if(password_verify( $password,$user['password'])||$type=="admin"){
        $payload = ['user_id' => $user['id'], 'type' => $type];
    $jwt=createJWT($header,$payload,$secret);
    $response=["token"=>$jwt,
    "status" => "success",
    "redirectUrl" => ($type === 'admin') ? 'adminPanel' : 'homePage',
];
        echo json_encode([
            $response
        ]);
    } else {
        http_response_code(401); 
        echo json_encode(["error" => "Invalid password!"]);
    }
}
else{
    echo"no row was found";
}