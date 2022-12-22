<?php

// General function to comunicate with the Telegram api
function bot($method, $datas = [], $token = token){
    $url = "https://api.telegram.org/bot" . $token . "/" . $method;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($datas));
    $res = curl_exec($ch);
    if (curl_error($ch)){
        var_dump(curl_error($ch));
    }else{
        return json_decode($res, true);
    }
}

// Sends a text message
function sendMessage($chatid, $text, $keyboard = null, $topicid = null, $reply = null, $parseMode = "HTML", $preview = true, $notification = false, $protect = false, $allowReply = true){
	return bot("sendMessage",[
		"chat_id" => $chatid,
        "message_thread_id" => $topicid,
		"text" => $text,
		"parse_mode" => $parseMode,
		"disable_web_page_preview" => $preview,
		"disable_notification" => $notification,
		"protect_content" => $protect,
		"reply_to_message_id" => $reply,
		"allow_sending_without_reply" => $allowReply,
        "reply_markup" => $keyboard
    ]);
}

// Edits a text message
function editMessage($chatid, $messageid, $text, $keyboard = null, $parseMode = "HTML", $preview = true){
    return bot("editMessageText", [
        "chat_id" => $chatid,
        "message_id" => $messageid,
        "text" => $text,
        "reply_markup" => $keyboard,
        "parse_mode" => $parseMode,
        "disable_web_page_preview" => $preview
    ]);
}

// Copies a message in another chat
function copyMessage($from, $to, $messageid, $keyboard = null, $new_caption = null, $reply = null, $notification = false, $parseMode = "HTML", $allowReply = true){
    return bot("copyMessage", [
        "chat_id" => $to,
        "from_chat_id" => $from,
        "message_id" => $messageid,
        "caption" => $new_caption,
        "parse_mode" => $parseMode,
        "disable_notification" => $notification,
        "reply_to_message_id" => $reply,
        "allow_sending_without_reply" => $allowReply,
        "reply_markup" => $keyboard
    ]);
}

// Answers a callback from a button
function answerCall($callbackId, $text, $popup = false, $url = null){
    return bot("answerCallbackQuery", [
        "callback_query_id" => $callbackId,
        "text" => $text,
        "show_alert" => $popup,
        "url" => $url
    ]);
}

// Gets information about a chat
function getChat($chatid){
    return bot("getChat", [
        "chat_id" => $chatid,
    ]);
}

// Gets information about the bot
function getMe($token = token){
    return bot("getMe", [], $token);
}

function getWebhookInfo(){
    return bot("getWebhookInfo");
}

// Returns a ChatMember object
function getMember($userid, $chatid){
    return bot("getChatMember", [
        "user_id" => $userid,
        "chat_id" => $chatid
    ]);
}

// Deletes a user's message
function deleteMessage($chatid, $messageid){
    return bot("deleteMessage", [
        "chat_id" => $chatid,
        "message_id" => $messageid
    ]);
}

// Sets a user's commands
function setMyCommands(array $commands, array $scope = null){

    $set = [];
    
    foreach ($commands as $key => $value) {
        $set[] = [
            "command" => $key,
            "description" => $value
        ];
    }
    
    return bot("setMyCommands", [
        "commands" => json_encode($set),
        "scope" => json_encode($scope)
    ]);
}

?>
