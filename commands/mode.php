<?php

if(isset($text)){
    
    sendMessage($chat_id, 
        getTexts("MODE_TXT", $lang),
        composeKeyboard("mode", $lang)
    );

}

if(isset($data) && str_contains($data, ":")){

    $mode = strtr($data, ["mode:" => ""]);

    updateUser($id, "mode", $mode);

    editMessage($chat_id, $message_id,
        getTexts("MODE:SET_TXT", $lang),
        composeKeyboard("mode:set", $lang)
    );
    answerCall($callbackId,
        getTexts("MODE:SET_CALLBACK", $lang)
    );

    // Sends the start message
    $data = null;
    $text = "";
    $sendStartInGroups = false;
    require_once "start.php";

}

?>