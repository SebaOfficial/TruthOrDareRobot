<?php

if($chat_type == 'private'){
    
    if(isset($text)){
        
        sendMessage($chat_id, 
            getTexts("START_TXT", $lang),
            composeKeyboard("start", $lang)
        );

    }
    
    if(isset($data)){

        editMessage($chat_id, $message_id,
            getTexts("START_TXT", $lang),
            composeKeyboard("start", $lang)
        );
        answerCall($callbackId,
            getTexts("START_CALLBACK", $lang)
        );

    }

} else if($sendStartInGroups){

    if(isset($text)){
        
        sendMessage($chat_id, 
            getTexts("START_GRP_TXT", $lang),
            composeKeyboard("start_grp", $lang)
        );

    }
    
    if(isset($data)){

        editMessage($chat_id, $message_id,
            getTexts("START_GRP_TXT", $lang),
            composeKeyboard("start_grp", $lang)
        );
        answerCall($callbackId,
            getTexts("START_GRP_CALLBACK", $lang)
        );

    }

}

?>