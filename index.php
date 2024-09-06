<?php
// Create database connection
include 'connection.php'; 

// Create a new session for first-time users
include 'session.php';

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