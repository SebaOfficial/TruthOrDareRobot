<?php

$dare = strtr(getTexts("DARE_PRV_TXT", $lang), [
    "{dare}" => truth_or_dare("dares", $mode, $lang)
]);

if(isset($text)){
    
    sendMessage($chat_id, 
        $dare,
        composeKeyboard("dare", $lang)
    );
    
}

if(isset($data)){

    editMessage($chat_id, $message_id,
        $dare,
        composeKeyboard("dare", $lang)
    );
    answerCall($callbackId,
        getTexts("DARE_CALLBACK", $lang)
    );
}

?>