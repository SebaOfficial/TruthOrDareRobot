<?php

/*
This file contains all the updates sent by telegram
*/

$update = file_get_contents('php://input');
$update = json_decode($update, TRUE);

// debuggin, in case of something goes wrong so no warnings show up
$username = "";
$id = "1";

if($update){

    $update_id = $update['update_id'];

    if(isset($update['message'])){
        $message = $update['message'];
    }

    if(isset($message)){
        $message_id = $message['message_id'];
        
        if(isset($message['from'])){
            $from = $message['from'];
        }

        if(isset($message['chat'])){
            $chat = $message['chat'];
        }

        if(isset($message['text'])){
            $text = $message['text'];
        }

        if(isset($message['reply_to_message'])){
            $reply = $update['reply_to_message'];
        }

        if(isset($message['caption'])){
            $text = $message['caption'];
        }

    }

    if(isset($update["callback_query"])){
        $callback = $update["callback_query"];

        $callbackId = $callback["id"];
        $data = $callback["data"];
        $message_id = $callback['message']['message_id'];
        $chat = $callback['message']['chat'];
        $from = $callback['from'];
        $data_text = $callback["message"]["text"];

        if(isset($callback['message']['reply_to_message'])){
            $reply = $callback['message']['reply_to_message'];
        }
        
    }

    if(isset($update['my_chat_member'])){
        $my_chat_member = $update['my_chat_member'];
        $my_chat_member_status = $my_chat_member['new_chat_member']['status'];
        $chat = $my_chat_member['chat'];
        $from = $my_chat_member['from'];
    }

    if(isset($chat)){
        $chat_id = $chat['id'];
        $chat_type = $chat['type'];
    }

    if(isset($from)){
        $id = $from['id'];
        $name = $from['first_name'];
        if(isset($from['username'])){
            $username = $from['username'];
        }
        $mention = "<a href='tg://user?id=$id'>$name</a>";
    }

    if(isset($reply)){
        $reply_keyboard = $reply['reply_markup'];
    }
    
}


?>
