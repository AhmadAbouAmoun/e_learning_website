<?php
include "connection.php";
include "JWT.php";

if(!$_POST["email"]||!$_POST["password"]||!$_POST["type"]){
    echo"something is not right";
    exit;
}
$email=$_POST["email"];
$password = trim($_POST["password"]);
$type=$_POST["type"];
$check=$connection->prepare("SELECT * FROM $type WHERE email=?");
$check->bind_param("s",  $email);
$check->execute();
$result=$check->get_result();
if($result->num_rows>0){
    $user = $result->fetch_assoc();

    if ($user['banned']) {
        http_response_code(403);
        echo json_encode(["error" => "Your account has been banned"]);
        return;
    }
    echo json_encode([
        $user
    ]);
    if(password_verify( $password,$user['password'])){
        $payload = ['user_id' => $user['id'], 'type' => $type];
    $jwt=createJWT($header,$payload,$secret);
    $response=["token"=>$jwt,
    "status" => "success",
    "redirectUrl" => ($type === 'admin') ? 'http://localhost/Admin_Panel' : 'http://localhost/HomePage',
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