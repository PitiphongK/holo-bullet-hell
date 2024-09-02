<?php
// Create database connection
include 'connection.php'; 

// Start session
session_start();

// Create a new session for first-time users
if (!isset($_SESSION["session_id"])) {

    // Prepare query, bind parameter, and execute
    $stmt = $conn->prepare("INSERT INTO game_sessions (session_identifier)
                            VALUES (?)"); // Prepare query
    $stmt->bind_param("s", $session_identifier); // bind parameter
    $session_identifier = session_id(); // Get session id
    $res = $stmt->execute(); // Execute query
    if ($res === false) {
        echo "Could not execute query";
    }

    // Set to the last auto-increment id
    $_SESSION["session_id"] = $conn->insert_id; 
    $stmt->close(); // Close statment
}

// Close database connection
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