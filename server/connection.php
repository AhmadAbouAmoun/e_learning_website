<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$connection= new mysqli("localhost","root","","e-learning");
if($connection){
    echo"connection established";
}