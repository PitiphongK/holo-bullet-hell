<?php
// Create database connection
include 'connection.php'; 

// Create a new session for first-time users
include 'session.php';

// Fetch leaderboard
include 'leaderboard.php';

// Close database connection
$conn->close(); 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Holo bullet hell</title>
    <link rel="icon" type="image/x-icon" href="images/suisei.png"> 
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <section>
        <h2>Your ID: <?php echo $_SESSION["session_id"] ?></h2>
        <table>
            <tr>
                <th>ID</th>
                <th>Score</th>
            </tr>
            <?php
                while($row = $result->fetch_assoc()) {
                    echo "
                        <tr>
                            <td>". $row["session_id"]   ."</td>
                            <td>". $row["score"]        ."</td>
                        </tr>
                        ";
                }
            ?>
        </table>
    </section>
    <canvas id="gameCanvas" width="600" height="600"></canvas>
    <section>
        <h3>WASD or Arrow keys to move</h3>
    </section>
</body>
<script src="main.js"></script>
</html>