<?php

$sql = "SELECT session_id, score FROM game_scores ORDER BY score DESC LIMIT 5";
$result = $conn->query($sql);

?>