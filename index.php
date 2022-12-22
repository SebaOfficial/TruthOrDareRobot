<?php

/*
This file handles all the incoming requests
*/

require_once "telegram/updates.php";
require_once "telegram/methods.php";

require_once "utils.php";

require_once "database/config.php";


if($update){ // If there's a Telegram update

    insertUser($id); // Inserts user in the database

    // User infos
    $user = getUser($id);
    $action = $user['action'];
    $active = $user['active'];
    $lang = $user['lang'];
    $mode = $user['mode'];

    setMyCommands($myCommands[$lang], ["type" => "chat", "chat_id" => $id]);
    

    if(isset($message)){ // If the update is a message
        
        if(isset($text)){ // If the message is a text
            
            if(checkCommand($text, $commandHandlers)){ // If the text message is a command
                $text = substr($text, 1); // Removes the handler

                if(str_starts_with($text, "start ")){ // The commands can be started as '/start command'
                    $text = strtr($text, ["start " => ""]);
                }

                $command = $text;
                if(str_contains($text, " ")){
                    $command = substr($text, 0, strpos($text, " ")); // Removes the parameters of the command
                }

                if(str_contains($command, "@")){ // If the command is sent in a group with the @ specification
                    $command = substr($command, 0, strpos($command, "@"));
                }

                // Checks for the aliases
                if(in_array($command, $truthAliases)){
                    $command = "truth";
                }
                elseif(in_array($command, $dareAliases)){
                    $command = "dare";
                }
                
                // Requires the command if it exitsts
                if(file_exists("commands/$command.php")){
                    updateUser($id, "action", $text); // Sets the action
                    require_once "commands/$command.php"; // Requires the file
                }

            } else{ // The text message isn't a command

                $command = $action;
                if(str_contains($action, ":")){
                    $command = substr($action, 0, strpos($action, ":")); // Removes the parameters of the command
                }

                if(file_exists("commands/$command.php")){
                    require_once "commands/$command.php";
                }

                else{
                    updateUser($id, "action", "nop");
                }

            }

        }

    }

    if(isset($data)){ // If a button is pressed

        $command = $data;
        if(str_contains($data, ":")){
            $command = substr($data, 0, strpos($data, ":")); // Removes the parameters of the command
        }

        if(file_exists("commands/$command.php")){
            updateUser($id, "action", $data); // Sets the action
            require_once "commands/$command.php"; // Requires the file
        }

    }


    if(isset($my_chat_member_status) && $chat_type == 'private'){
        require_once "commands/helpers/status.php";
    }

} else{
    exit;
}


?>
