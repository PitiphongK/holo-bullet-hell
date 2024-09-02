<?php 
// Start or resume the session
session_start();

// Create database connection
include 'connection.php'; 

// Exit program if session id has not been created
if (!isset($_SESSION["session_id"])) {
    exit("Session does not exist");
}

// Get data from request
$json = file_get_contents("php://input"); // Get data from php input stream
if ($json === false) {
    exit("Could not get data from php input stream");
}
$data = json_decode($json, true); // Decode json to associative array
if ($data === false) {
    exit("Cound not decode json data: $json");
}

// Prepare data to insert to database
$session_id = $_SESSION["session_id"];
$score = $data["score"];

// Prepare query, bind parameters, and execute
$stmt = $conn->prepare("INSERT INTO game_scores (session_id, score)
                        VALUE (?, ?)");
$stmt->bind_param("ii", $session_id, $score);
$res = $stmt->execute();
if ($res === false) {
    exit("Cound not execute query");
}
echo "Player score has been saved";

// Close statment and database connection
$stmt->close();
$conn->close(); 
?>

