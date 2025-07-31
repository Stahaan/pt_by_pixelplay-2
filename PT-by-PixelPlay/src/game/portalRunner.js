// Portal Runner Game Mode Logic

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player;
let platforms = [];
let portals = [];
let gravity = 0.5;
let isGameOver = false;

function init() {
    player = {
        x: canvas.width / 2,
        y: canvas.height - 50,
        width: 30,
        height: 30,
        velocityY: 0,
        jumpStrength: 10,
        isJumping: false,
    };
    platforms = createPlatforms();
    portals = createPortals();
}

function createPlatforms() {
    // Generate platforms at random positions
    let platformArray = [];
    for (let i = 0; i < 5; i++) {
        platformArray.push({
            x: Math.random() * (canvas.width - 100),
            y: Math.random() * (canvas.height - 100),
            width: 100,
            height: 10,
        });
    }
    return platformArray;
}

function createPortals() {
    // Create portals at random positions
    return [{
        x: Math.random() * (canvas.width - 50),
        y: Math.random() * (canvas.height - 50),
        width: 50,
        height: 50,
    }];
}

function update() {
    if (isGameOver) return;

    player.velocityY += gravity;
    player.y += player.velocityY;

    // Check for platform collisions
    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height < platform.y + platform.height &&
            player.y + player.height + player.velocityY >= platform.y) {
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.isJumping = false;
        }
    });

    // Check for portal interactions
    portals.forEach(portal => {
        if (player.x < portal.x + portal.width &&
            player.x + player.width > portal.x &&
            player.y < portal.y + portal.height &&
            player.y + player.height > portal.y) {
            // Trigger portal interaction
            console.log("Portal activated!");
            // Logic for transitioning to another level or game mode
        }
    });

    // Check for game over conditions
    if (player.y > canvas.height) {
        isGameOver = true;
        console.log("Game Over!");
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Draw platforms
    ctx.fillStyle = 'green';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    // Draw portals
    ctx.fillStyle = 'purple';
    portals.forEach(portal => {
        ctx.fillRect(portal.x, portal.y, portal.width, portal.height);
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
init();
gameLoop();