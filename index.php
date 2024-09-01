<?php
include 'db.php';

session_start();
$session_identifier = session_id();

$checkSessionQuery = "SELECT session_id FROM game_sessions WHERE session_identifier = '$session_identifier'";
$result = $conn->query($checkSessionQuery);

if ($result->num_rows === 0) {
    $sql = "INSERT INTO game_sessions (session_identifier)
            VALUES ('$session_identifier')";
    if ($conn->query($sql) === TRUE) {
        // New record created successfully
    } else {
        // Handle error
    }
} else {
    // Session already exists
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <canvas id="gameCanvas" width="600" height="600"></canvas>
</body>
<script src="main.js"></script>
</html>