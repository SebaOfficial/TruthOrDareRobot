<?php

$new = strtr($my_chat_member_status, [
    "kicked" => "blocked", // The user blocked the bot
    "member" => "active" // The user unblocked the bot
]);

updateStatus($id, $new);

?>