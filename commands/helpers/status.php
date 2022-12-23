<?php

$new = strtr($my_chat_member_status, [
    "kicked" => "false", // The user blocked the bot
    "member" => "true" // The user unblocked the bot
]);

updateUser($id, "active", $new);

?>