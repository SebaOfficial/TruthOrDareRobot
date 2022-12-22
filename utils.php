<?php

/*
Fill this file with all required informations
*/

const token = "YOUR_TOKEN_HERE"; // The token that botfather gave you

$owner = 123; // Your telegram id

$db_host = "localhost"; // The host of your database
$db_username = "root"; // The username of your database
$db_password = ""; // The password for the username
$db_name = ""; // The database that will contain all the tables

$main_language = "en"; // Set this with your language, you can delete this once you executed the checkErrors.php file

$sendStartInGroups = true; // Set this to true to send the /start message in groups too

$commandHandlers = [ // What defines a command
    "/",
    ".",
];

$truthAliases = [ // Set here all the aliases you want for the truths
    "truth",
];

$dareAliases = [ // Set here all the aliases you want for the dares
    "dare",
];

$myCommands = [ // The command menu, be aware that those aren't the actual commands
    "en" => [
        "truth" => "Send a truth",
        "dare" => "Send a dare",
        "mode" => "Set the mode",
        "lang" => "Set your language",
        "credits" => "Credits",
    ],
];

?>