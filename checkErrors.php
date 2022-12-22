<?php

/*
Run this file to check if there are any errors in your bot (php checkErrors.php)
*/

require_once "utils.php";

// Telegram checks
require_once "telegram/methods.php";

if(!getMe(token)['ok']){ // Checks the token
    echo "The token is NOT set correctly, please be sure to copy the right token.\n";
} else{
    echo "The token is set.\n";

    if(getChat($owner)['ok']){ // Checks if the owner has started the bot
        echo "The owner is recognized.\n";
    } else{
        echo "The owner is NOT recognized.\n";
    } 

    // Checking the webhook
    $webhook = getWebhookInfo();
    if($webhook['result']['url'] != ""){
        echo "The webhook is set ";
        
        if($webhook['result']['pending_update_count'] > 0){
            echo "but there is an error: " . $webhook['result']['last_error_message'] . "\n";
        } else{
            echo "and there are no errors.\n";
        }

    } else{
        echo "You need to set the webhook, see https://core.telegram.org/bots/api#setwebhook.\n";
    }

    // Sets the commands for the group chats
    setMyCommands($myCommands[$main_language], ["type" => "all_group_chats"]);
    
}


// Database checks

mysqli_query( // Creates the database if it doesn't exists
    mysqli_connect(
        $db_host, $db_username, $db_password
    ), 
    "CREATE DATABASE IF NOT EXISTS $db_name"
);

require_once "database/config.php";

echo "Creating all the required tables...\n";

$db_tables = [ // Edit this only if you know what you're doing
    "users",
    "bots",
    "texts",
];

mysqli_query($db, "CREATE TABLE IF NOT EXISTS users (
    id text NOT NULL UNIQUE,
    action text NULL,
    active text NOT NULL DEFAULT 'true',
    mode text NOT NULL DEFAULT 'classic',
    lang text NOT NULL DEFAULT '$main_language'
    )"
);

mysqli_query($db, "CREATE TABLE IF NOT EXISTS texts (
    id text NOT NULL UNIQUE,
    $main_language text NOT NULL,
    type text NULL,
    callback text NULL
    )"
);

mysqli_query($db, "CREATE TABLE IF NOT EXISTS truths (
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    mode text NOT NULL DEFAULT 'classic',
    $main_language text NOT NULL
    )"
);

mysqli_query($db, "CREATE TABLE IF NOT EXISTS dares (
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    mode text NOT NULL DEFAULT 'classic',
    $main_language text NOT NULL
    )"
);

echo "Tables set.\n";

echo "All done, you're good to go!\n";

?>