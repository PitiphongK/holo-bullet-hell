<?php
// Start session
session_start();

// Create a new session for first-time users
if (!isset($_SESSION["session_id"])) {

    // Prepare query, bind parameter, and execute
    $stmt = $conn->prepare("INSERT INTO game_sessions (session_identifier)
                            VALUES (?)"); // Prepare query
    if ($stmt === false) {
        echo "Could not prepare query";
    }
    $res = $stmt->bind_param("s", $session_identifier); // bind parameter
    if ($res === false) {
        echo "Could not bind parameter";
    }
    $session_identifier = session_id(); // Get session id
    $res = $stmt->execute(); // Execute query
    if ($res === false) {
        echo "Could not execute query";
    }

    // Set to the last auto-increment id
    $_SESSION["session_id"] = $conn->insert_id; 
    $stmt->close(); // Close statment
}
?>