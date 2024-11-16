<?php
$connection= new mysqli("localhost","root","","e-learning");
if($connection){
    echo"connection established";
}