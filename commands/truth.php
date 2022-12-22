<?php

$truth = strtr(getTexts("TRUTH_TXT", $lang), [
    "{truth}" => truth_or_dare("truths", $mode, $lang)
]);

if(isset($text)){
    
    sendMessage($chat_id, 
        $truth,
        composeKeyboard("truth", $lang)
    );
  
}

if(isset($data)){
       
    editMessage($chat_id, $message_id,
        $truth,
        composeKeyboard("truth", $lang)
    );
    answerCall($callbackId,
        getTexts("TRUTH_CALLBACK", $lang)
    );
    
}

?>