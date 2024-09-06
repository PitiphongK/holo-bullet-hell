<?php
// Start session
session_start();

// Check if session id already exist
$session_identifier = session_id(); // Get session id
$sql = "SELECT session_id FROM game_sessions where session_identifier = '$session_identifier'";
$result = $conn->query($sql);
$result = $result->fetch_assoc();
// If session id does not exist then create new one
if (empty($result["session_id"])) {

    // Prepare query, bind parameter, and execute
    $stmt = $conn->prepare("INSERT INTO game_sessions (session_identifier)
                            VALUES (?)"); // Prepare query
    $stmt->bind_param("s", $session_identifier); // bind parameter
    $res = $stmt->execute(); // Execute query
    if ($res === false) {
        echo "Could not execute query";
    }

    // Set to the last auto-increment id
    $_SESSION["session_id"] = $conn->insert_id;
    $stmt->close(); // Close statment

// If not stored in SESSION variable then do so
} else if (!isset($_SESSION["session_id"])){
    $_SESSION["session_id"] = $result["session_id"];
}
?>