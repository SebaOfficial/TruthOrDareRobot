<?php

/*
Handles the database connections and requires all the main functions
*/

// Requires the credentials
require_once strtr(__DIR__, ["database" => "utils.php"]);


// Connects to the database
$db = mysqli_connect($db_host, $db_username, $db_password, $db_name);


if($db){
    // Requires the main functions
    require_once "functions.php";
} else{
    echo 'There was an error: ' . mysqli_connect_error();
}

?>