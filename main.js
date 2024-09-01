
// -------------------------- 
// Configs
// -------------------------- 

// Get canvas object
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');

// Control
let gameRunning = false;
let gameOver = false;

// Canvas
let requestID;

// Player
let player;
let playerBullets = [];
let playerBulletInterval;
let spaceBetweenBullets = 10
let levelOne = false;
let levelTwo = false;
let levelThree = false;

// Enemies
let enemies;
let enemyBullets;
let spawnEnemyInterval;
let spawnRate = 1000; // Initial spawn rate in milliseconds
let = spawnRateCtrl = [0, 0, 0, 0]; // Control the spawn mechanism

// Boss
let bosses;
let bossCount = 0;
let bossBullets;
let spawnBossInterval;
let bossShootInterval;
let bossSpawnInterval = 30000; // Spawn every 30 seconds
// Boss health bar
let healthWidth = 250;
let healthHeight = 30;
let healthX = (canvas.width / 2) - (healthWidth / 2);
let heakthY = 10;

// Create entities images
let suisei = new Image();
suisei.src = "suisei.png";

let yagoo = new Image();
yagoo.src = "yagoo.png";

let yagooPlus = new Image();
yagooPlus.src = "yagooPlus.png";

let ame = new Image();
ame.src = "ame.jpg";

let aqua = new Image();
aqua.src = "aqua.png";

// Function to resize page
function resizeCanvas() {
    canvas.height = window.innerHeight - 20; // make height a little bit smaller
}

// Handle page resize
window.addEventListener('resize', () => {
    resizeCanvas()
    if (gameOver) {
        displayGameOver()
    } else {
        welcomeScreen()
    }
})
resizeCanvas() // Resize when start up

// Handle keydown event
window.addEventListener("keydown", (event) => {
    let keyPressed = event.key;
    if (keyPressed == "ArrowLeft" || keyPressed == "a") {
        event.preventDefault() // prevent arrow keys from moving screen
        player.pressedKeys.left = true;
    } else if (keyPressed == "ArrowRight" || keyPressed == "d") {
        event.preventDefault() // prevent arrow keys from moving screen
        player.pressedKeys.right = true;
    } else if (keyPressed == "ArrowUp" || keyPressed == "w") {
        event.preventDefault() // prevent arrow keys from moving screen
        player.pressedKeys.up = true;
    } else if (keyPressed == "ArrowDown" || keyPressed == "s") {
        event.preventDefault() // prevent arrow keys from moving screen
        player.pressedKeys.down = true;
    } else if (keyPressed == "Enter") {
        event.preventDefault() // prevent arrow keys from moving screen
        if (!gameRunning) {
            gameRunning = true;
            gameOver = false;
            startGame();
        }
    } else if (keyPressed == " ") {
        event.preventDefault() // prevent arrow keys from moving screen
        player.pressedKeys.space = true;
    } 
});

// Handle keyup event
window.addEventListener("keyup", (event) => {
    let keyReleased = event.key;
    if (keyReleased == "ArrowLeft" || keyReleased == "a") {
        player.pressedKeys.left = false;
    } else if (keyReleased == "ArrowRight" || keyReleased == "d") {
        player.pressedKeys.right = false;
    } else if (keyReleased == "ArrowUp" || keyReleased == "w") {
        player.pressedKeys.up = false;
    } else if (keyReleased == "ArrowDown" || keyReleased == "s") {
        player.pressedKeys.down = false;
    } else if (keyReleased == " ") {
        player.pressedKeys.space = false;
        player.isShooting = false;
        clearInterval(playerBulletInterval);
    }
});

// Function to paint screen
function displayCanvas() {
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);//fillRect(x, y, width, height)
}





// -------------------------- 
// Player Functions
// -------------------------- 





// Function to paint screen
function drawPlayer() {
    let center = (canvas.width / 2) - (player.width / 2) // Place player at the center
    let bottom = canvas.height - player.height - 10 // Place player near the bottom
    player.x = center
    player.y = bottom
    ctx.drawImage(suisei, player.x, player.y, player.width, player.height) // drawImage(image, dx, dy, dWidth, dHeight)
}

// Function to shoot bullets
function shoot() {
    for (let i = 0; i < player.numberOfPellets; i++) {
        let playerBullet = {
            x: player.x + (player.width / 2) + (i * spaceBetweenBullets) - (spaceBetweenBullets * (player.numberOfPellets - 1) / 2),
            y: player.y,
            height: 20,
            width: 7,
            color: "blue",
            damage: 1 + (player.score / 1000 * 0.1), // Every 1000 score increase 0.1 damage
        };
        playerBullets.push(playerBullet);
    }
}

//Function to update player position, shooting state, and boundaries contraints
function updatePlayer() {
    // Update player movement
    if (player.pressedKeys.left) player.x -= player.speed;
    if (player.pressedKeys.right) player.x += player.speed;
    if (player.pressedKeys.up) player.y -= player.speed;
    if (player.pressedKeys.down) player.y += player.speed;

    // Player shooting
    if (player.pressedKeys.space && !player.isShooting) {
        player.isShooting = true;
        shoot();
        playerBulletInterval = setInterval(shoot, player.bulletInterval);
    }
    
    // Constrain player to canvas boundaries
    player.x = Math.max(0, Math.min(player.x, canvas.width - player.width));
    player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));

    // draw player
    ctx.drawImage(suisei, player.x, player.y, player.width, player.height); // drawImage(image, dx, dy, dWidth, dHeight)
}

// Function to update player's bullets
function updatePlayerBullet() {
    playerBullets.forEach((bullet, i) => {
        bullet.y -= player.bulletSpeed;
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        // Remove bullets that go off-screen
        if (bullet.y < 0) {
            playerBullets.splice(i, 1);
        }
    });
}

// Function to update player stats
function updatePlayerLevel() {
    let levelChanged = false;
    
    if (player.score >= 2000 && player.score < 4000 && !levelOne) {
        player.numberOfPellets = 2;
        player.bulletInterval = 100;
        levelChanged = true;
        levelOne = true;
    } else if (player.score >= 10000 && player.score < 30000 && !levelTwo) {
        player.numberOfPellets = 3;
        player.bulletSpeed = 20;
        player.bulletInterval = 50;
        levelChanged = true;
        levelTwo = true;
    } else if (player.score >= 30000 && player.score < 60000 && !levelThree) {
        player.numberOfPellets = 4;
        player.bulletInterval = 30;
        player.bulletSpeed = 30;
        levelChanged = true;
        levelThree = true;
    }
    
    // Only reset the interval if the level has changed
    if (levelChanged) {
        clearInterval(playerBulletInterval);
        playerBulletInterval = setInterval(shoot, player.bulletInterval);
    }
}





// -------------------------- 
// Enemy Functions
// -------------------------- 





// Function to draw enemies
function updateEnemy() {
    enemies.forEach(enemy => {
        // Update enemy position
        enemy.y += enemy.speed;

        // Draw enemy based on its type
        const enemyImages = {
            "Yagoo": yagoo,
            "YagooPlus": yagooPlus,
            "Ame": ame
        };

        ctx.drawImage(enemyImages[enemy.name], enemy.x, enemy.y, enemy.width, enemy.height);

        // "Ame" enemy has a chance to shoot bullets
        if (enemy.name === "Ame" && Math.random() < 0.03) { 
            shootEnemiesBullets(enemy);
        }
    });

    // Remove enemies that have gone off-screen
    enemies = enemies.filter(enemy => enemy.y >= 0);
}

// Function to update Enemies' bullets
function updateEnemiesBullet() {
    enemyBullets.forEach((bullet, index) => {
        bullet.y += bullet.bulletSpeed;
        bullet.x += bullet.dx;
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height); // draw bullet

        // Remove the bullet if it goes off-screen
        if (bullet.y > canvas.height) {
            enemyBullets.splice(index, 1);
        }
    });
}

// Function to shoot enemies' bullets
function shootEnemiesBullets(enemy) {
    if (enemy.name == "Ame") {
        let bullet = {
            x: enemy.x + (enemy.width / 2),
            y: enemy.y + enemy.height, // Adjust bullet spawn position
            height: 10,
            width: 5,
            color: "red",
            damage: 1,
            bulletSpeed: 7,
            dx: 0,
        };
        enemyBullets.push(bullet);
    } else if (enemy.name == "YagooPlus") {
        for (let i = -1; i <= 1; i++) {
            let bullet = {
                x: enemy.x + (enemy.width / 2),
                y: enemy.y,
                height: 10,
                width: 5,
                color: "red",
                damage: 1,
                bulletSpeed: 7,
                dx: 2 * i,
            };
            enemyBullets.push(bullet);
        }
    }
}

// Function to spawn enemy randomly
function spawnEnemy() {
    let enemyHealth = Math.floor((player.score / 10000) + 1)
    let rand = Math.random()
    if (rand < 0.7) { // 90% chance to spawn Yagoo
        let enemy = {
            name: "Yagoo",
            x: Math.floor(Math.random() * (canvas.width - 50)),
            y: 0,
            health: enemyHealth,
            speed: 5,
            height: 70,
            width: 50,
            score: 100,
        };
        enemies.push(enemy);
    } else if (rand > 0.7  && rand < 0.9) { // 20% chance to spawn YagooPlus
        // initialize YagooPlus
        let enemy = {
            name: "YagooPlus",
            x: Math.floor(Math.random() * (canvas.width - 50)),
            y: 0,
            health: enemyHealth,
            speed: 5,
            height: 70,
            width: 50,
            score: 300,
        };
        enemies.push(enemy);

    } else if (rand > 0.9  && rand < 1) { // 10% chance to spawn Yagoo
        // initialize Ame
        let enemy = {
            name: "Ame",
            x: Math.floor(Math.random() * (canvas.width - 50)),
            y: 50,
            health: enemyHealth,
            speed: 0,
            height: 50,
            width: 50,
            score: 500,
        };
        enemies.push(enemy);
    }
}

// Function to increase spawn rate according to score
function adjustSpawnRate() {
    let spawnRateChanged = false;

    if (player.score >= 10000 && !spawnRateCtrl[3]) {
        spawnRate = 300; // Faster spawn rate as score increases
        spawnRateCtrl[3] = 1
        spawnRateChanged = true;
    } else if (player.score >= 5000 && !spawnRateCtrl[2]) {
        spawnRate = 750;
        spawnRateCtrl[2] = 1
        spawnRateChanged = true;
    } else if (player.score >= 1000 && !spawnRateCtrl[1]) {
        spawnRate = 900;
        spawnRateCtrl[1] = 1
        spawnRateChanged = true;
    } else if (!spawnRateCtrl[0]){
        spawnRate = 1000; // Default spawn rate
        spawnRateCtrl[0] = 1
        spawnRateChanged = true;
        console.log("set")
    }

    // Clear the existing interval and set a new one with the updated spawn rate
    if (spawnRateChanged) {
        clearInterval(spawnEnemyInterval);
        spawnEnemyInterval = setInterval(spawnEnemy, spawnRate);
    }
}





// -------------------------- 
// Boss Functions
// -------------------------- 




function createBoss() {
    if (bosses.length == 0) {
        const boss = {
            name: "Aqua",
            x: Math.floor(Math.random() * (canvas.width - 50)),
            y: 50,
            health: 100 + (1000 * bossCount), // increase boss health based on number of bosses spawned
            maxHealth: 100 + (1000 * bossCount),
            speed: 3,
            height: 100, 
            width: 50,
            score: 10000,
            shootInterval: 2000,
        }
        bossCount++
        bosses.push(boss);
        clearInterval(spawnBossInterval); // stop spawning bass
        bossShootInterval = setInterval(bossShoot, boss.shootInterval);
    }
}

function updateBoss() {
    bosses.forEach(boss => {
        boss.x += boss.speed
        ctx.drawImage(aqua, boss.x, boss.y, boss.width, boss.height);
    });
}

function bossShoot() {
    bosses.forEach(boss => {
        let numberBullets = 10;
        let angleStep = Math.PI / (numberBullets + 1)// Set incremental angle between each bullet
        for (let i = 1; i <= numberBullets; i++) {
            let angle = Math.PI + (angleStep * i) // First bullet starts at PI then increment angle for each subsequent bullet
            const bullet = {
                x: boss.x + (boss.width / 2),
                y: boss.y,
                height: 10,
                width: 5,
                color: "pink",
                damage: 1,
                bulletSpeed: 7,
                dx: Math.cos(angle) * 3,
                dy: 5,
            }
            bossBullets.push(bullet);
        }
    });
}

function bossShootThreeSixty() {
    bosses.forEach(boss => {
        let numberBullets = 50;
        let angleStep = Math.PI * 2 / numberBullets // Set incremental angle between each bullet
        for (let i = 1; i <= numberBullets; i++) {
            let angle = Math.PI + (angleStep * i) // First bullet starts at PI then increment angle for each subsequent bullet
            const bullet = {
                x: boss.x + (boss.width / 2),
                y: boss.y,
                height: 10,
                width: 5,
                color: "pink",
                damage: 1,
                bulletSpeed: 7,
                dx: Math.cos(angle) * 3,
                dy: Math.sin(angle) * 3,
            }
            bossBullets.push(bullet);
        }
    });
}

function updateBossBullet() {
    bossBullets.forEach((bullet, index) => {
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height); // draw bullet

        // Remove the bullet if it goes off-screen
        if (bullet.y > canvas.height) {
            bossBullets.splice(index, 1);
        }
    });
}

function drawBossHealth() {
    bosses.forEach(boss => {
        ctx.fillStyle = "red";
        ctx.fillRect(healthX, heakthY, healthWidth, healthHeight)
        ctx.fillStyle = "green";
        ctx.fillRect(healthX, heakthY, healthWidth * (boss.health / boss.maxHealth), healthHeight)
    });
}





// -------------------------- 
// Game logic Functions
// -------------------------- 





// Helper function to check for collision between two entities
function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

// Function to detect collision
function collisionDetection() {
    // Player bullets hitting enemies
    enemies.forEach((enemy, eIndex) => {
        // Enemy bodies hitting player
        if (isColliding(player, enemy)) {
            player.health -= 1;
            enemies.splice(eIndex, 1);  // Remove the enemy
            return;  // Exit current iteration
        }

        playerBullets.forEach((bullet, bIndex) => {
            // Check for collision between player bullet and enemy
            if (isColliding(bullet, enemy)) {

                enemy.health -= bullet.damage;

                // If enemy is dead
                if (enemy.health <= 0) {
                    player.score += enemy.score;  // Give score to player
                    enemies.splice(eIndex, 1);  // Remove the enemy
                    if (enemy.name === "YagooPlus") {
                        shootEnemiesBullets(enemy);
                    }
                }

                playerBullets.splice(bIndex, 1);  // Remove the bullet
                return;  // Exit current iteration
            }
        });
    });

    // Enemy bullets hitting player
    enemyBullets.forEach((bullet, ebIndex) => {
        // Check for collision between enemy bullet and player
        if (isColliding(bullet, player)) {
            player.health -= bullet.damage;
            enemyBullets.splice(ebIndex, 1);  // Remove the bullet
        }
    });

    // boss collision
    bosses.forEach(boss => {
        if (boss.x < 0 || boss.x + boss.width > canvas.width ) {
            boss.speed = -boss.speed 
        }
        if (isColliding(boss, player)) {
            player.health =- 5;
        }
        playerBullets.forEach((bullet, bIndex) => {
            if (isColliding(bullet, boss)) {
                boss.health -= bullet.damage;

                // If boss is dead
                if (boss.health <= 0) {
                    player.score += boss.score;  // Give score to player
                    bossShootThreeSixty();
                    clearInterval(bossShootInterval) // Clear boss shoot
                    bosses.splice(0, 1);  // Remove the boss
                    spawnBossInterval = setInterval(createBoss, bossSpawnInterval)
                }

                playerBullets.splice(bIndex, 1);  // Remove the bullet
                return;  // Exit current iteration
            }
        });
    });

    bossBullets.forEach((bullet, index) => {
        if (isColliding(bullet, player)) {
            player.health -= bullet.damage;
            bossBullets.splice(index, 1);  // Remove the bullet
        }
    })

    // If player is dead then game over
    if (player.health <= 0) {
        gameRunning = false;
        gameOver = true;
        displayGameOver();
    }
}

// Function to display welcome screen
function welcomeScreen() {
    displayCanvas();
    ctx.font = "70px sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`Suisei pewpew`, canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = "25px sans-serif";
    ctx.fillText(`Press ENTER to start`, canvas.width / 2, canvas.height / 2 + 50);
}

// Function to display status
function updateStatus() {
    ctx.font = "30px serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(`Health: ${player.health}`, 20, 40);
    ctx.fillText(`Score: ${player.score}`, 20, 75);
}

// Reset all intervals
function clearAllIntervals() {
    clearInterval(playerBulletInterval);
    clearInterval(spawnEnemyInterval);
    clearInterval(spawnBossInterval);
    clearInterval(bossShootInterval);
}

// Function to reset variables
function resetVariables() {
    // Player
    player = {
        x: 0,
        y: 0,
        health: 9999999999,
        speed: 5,
        height: 50,
        width: 50,
        score: 0,
        numberOfPellets: 1, // number of bullets shoot at once
        bulletInterval: 300, // interval between each bullter in milliseconds.
        bulletSpeed: 15,
        pressedKeys: {
            left: false,
            right: false,
            up: false,
            down: false,
            space: false,
        },
        isShooting: false,
    }
    // Player
    playerBullets = [];
    levelOne = false;
    levelTwo = false;
    levelThree = false;
    // Enemies
    enemies = [];
    enemyBullets = [];
    spawnRateCtrl = [0, 0, 0, 0];
    // Boss
    bosses = []
    bossCount = 0;
    bossBullets = []
}

// Function to start the game
function startGame() {
    resetVariables()
    clearAllIntervals() // Reset all intervals
    drawPlayer();
    spawnEnemyInterval = setInterval(spawnEnemy, spawnRate);
    spawnBossInterval = setInterval(createBoss, bossSpawnInterval); // spawn boss every 30 seconds
    gameLoop();
}

// Function to display game over
function displayGameOver() {
    displayCanvas();
    ctx.font = "70px sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`Game Over`, canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = "25px sans-serif";
    ctx.fillText(`score: ${player.score}`, canvas.width / 2, canvas.height / 2 + 10);
    ctx.fillText(`Press ENTER to retry`, canvas.width / 2, canvas.height / 2 + 50);
    cancelAnimationFrame(requestID)
}

// Main loop of the game
function gameLoop() {
    if (gameRunning) {
        displayCanvas();
        updateStatus();
        updatePlayer();
        updatePlayerBullet();
        updatePlayerLevel();
        updateEnemy();
        updateEnemiesBullet()
        updateBoss();
        updateBossBullet();
        drawBossHealth();
        collisionDetection();
        adjustSpawnRate();
        requestID = requestAnimationFrame(gameLoop); // Call the game loop again
    }
}

// Display welcome screen
welcomeScreen();