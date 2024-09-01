<?php
include 'db.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$score = $data['score'];
$session_identifier = $_COOKIE['PHPSESSID'];

$checkSessionQuery = "SELECT session_id FROM game_sessions WHERE session_identifier = '$session_identifier'";
$result = $conn->query($checkSessionQuery);

$row = $result->fetch_assoc();
$session_id = $row['session_id'];

// Assuming $score is defined and holds the player's score
$sql = "INSERT INTO game_scores (session_id, score)
        VALUES ('$session_id', '$score')";

if ($conn->query($sql) === TRUE) {
    // New record created successfully
} else {
    // Handle error
    echo "Error: " . $sql . "<br>" . $conn->error;
}

echo "Received score: $score session_identifier: $session_identifier";

$conn->close();

?>