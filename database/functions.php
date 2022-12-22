<?php

/*
This file contains all the main functions. 
*/


// Returns an array with all the user information
function getUser(int $id){
    $db = $GLOBALS['db'];

    $user = mysqli_query($db, "SELECT * FROM users WHERE id=$id");

    if(mysqli_num_rows($user) > 0){
        return mysqli_fetch_all($user, MYSQLI_ASSOC)[0];
    } else{
        return null;
    }

}

// Returns an array of all user informations
function getAllUsers(array $type = null){
    $db = $GLOBALS['db'];
    
    if(isset($type)){ // To return only the ids
        
        $key = $type[0];
        $value = $type[1];
        $get = mysqli_query($db, "SELECT * FROM users WHERE $key='$value'");

    } else{
        $get = mysqli_query($db, "SELECT * FROM users");
    }

    $get = mysqli_fetch_all($get, MYSQLI_ASSOC);

    return $get;
    
}

// Adds an user in the database
function insertUser($id){
    $db = $GLOBALS['db'];
    return mysqli_query($db, "INSERT INTO users (id, active) VALUES ('$id', 'true') ON DUPLICATE KEY UPDATE id=$id");
}

// Replaces all the placeholders in a text
function replaceTexts(string $text){
    $id = $GLOBALS['id'];
    $user = getChat($id)['result'];

    return strtr($text, [
        "{mention}" => "<a href='tg://user?id=" . $user['id']. "'>" . $user['first_name'] . "</a>",
    ]);
    
}

// Returns the string of a specified text
function getTexts(string $textid, string $lang, bool $replace = true){
   $db = $GLOBALS['db'];
   $textid = strtoupper($textid);

   $getText = mysqli_query($db, "SELECT $lang FROM texts WHERE id='$textid'");

    if($getText){

        if(mysqli_num_rows($getText) > 0){

            $getText = mysqli_fetch_all($getText, MYSQLI_ASSOC);
            
            if($replace){
                return replaceTexts($getText[0][$lang]);
            }

            return $getText[0][$lang];

        } 
        
        return "NOT_SET: <code>$textid</code>";
    }
}

// Composes an inline keyboard
function composeKeyboard(string $command, string $lang, bool $returnIfNothingFound = null){

    $db = $GLOBALS['db'];
    $command = strtoupper($command);

    $getButtons = mysqli_query($db, "SELECT * FROM texts WHERE id LIKE '$command\_BTN_%'");

    if($getButtons){
        $buttons = mysqli_fetch_all($getButtons, MYSQLI_ASSOC);
    }

    $countButtons = mysqli_num_rows($getButtons);

    if($countButtons > 0){

        $keyboard = '{"inline_keyboard":[';
        $count = 1;
        $countTotal = 0;
        
        foreach ($buttons as $key => $value){
        
            $countTotal ++;
            $type = $value['type'];
            $callback = $value['callback'];
            $text = $value[$lang];
    
    
            if($countTotal == $countButtons){
                
                if($count == 1){
                    $keyboard .= "[{\"text\":\"$text\", \"$type\":\"$callback\"}]]}";
                } else{
                    $keyboard .= "{\"text\":\"$text\", \"$type\":\"$callback\"}]]}";
                }
    
            } else{
                
                if($count == 1){
                    $keyboard .= "[{\"text\":\"$text\", \"$type\":\"$callback\"},";
                    $count ++;
                } else{
                    $keyboard .= "{\"text\":\"$text\", \"$type\":\"$callback\"}],";
                    $count = 1;
                }
    
            }
        }
    
        return $keyboard;

    } else{

        return $returnIfNothingFound;

    }

}

// Checks if the given string is a command, you can pass the command handlers as an array
function checkCommand(string $text, array $commands){
    
    foreach($commands as $value){

        if(str_starts_with($text, $value)){
            return true;
        }
    }

    return false;
}

// Updates a user's data
function updateUser(int $id, string $key, string $value){
    $db = $GLOBALS['db'];
    return mysqli_query($db, "UPDATE users SET $key='$value' WHERE id='$id'");
}

// Updates a string in the database
function updateString(string $string, string $update){
    $db = $GLOBALS['db'];
    return mysqli_query($db, "UPDATE texts SET text='$update' WHERE id='$string'");    
}

function truth_or_dare(string $type, string $mode, string $lang){
    $db = $GLOBALS['db'];
    $lang = $GLOBALS['lang'];
    $get = mysqli_query($db, "SELECT * FROM $type WHERE mode='$mode'");
    $tot = mysqli_num_rows($get);

    if($tot > 0){
        return mysqli_fetch_all($get, MYSQLI_ASSOC)[rand(0, $tot - 1)][$lang];
    } else{
        return getTexts("NO_TRUTH_DARE", $lang);
    }
}

?>