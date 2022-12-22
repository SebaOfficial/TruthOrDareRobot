<?php

if(isset($text)){
    
    sendMessage($chat_id, 
        getTexts("LANG_TXT", "en"),
        composeKeyboard("lang", "en")
    );

}

if(isset($data) && str_contains($data, ":")){
    
    $lang = strtr($data, ["lang:" => ""]);

    updateUser($id, "lang", $lang);
    setMyCommands($myCommands[$lang], ["type" => "chat", "chat_id" => $id]);

    editMessage($chat_id, $message_id,
        getTexts("LANG:SET_TXT", $lang),
        composeKeyboard("lang:set", $lang)
    );
    
    answerCall($callbackId,
        getTexts("LANG:SET_CALLBACK", $lang)
    );

    // Sends the start message
    $data = null;
    $text = "";
    $sendStartInGroups = false;
    require_once "start.php";

}

?>