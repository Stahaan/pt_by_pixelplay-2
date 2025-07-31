// This file implements the "Lock-On Legends" game mode. It manages target spawning, player interactions for locking on to targets, scoring, and game over conditions.

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let targets = [];
let score = 0;
let gameOver = false;

function startLockOnLegends() {
    targets = [];
    score = 0;
    gameOver = false;
    spawnTargets();
    gameLoop();
}

function spawnTargets() {
    for (let i = 0; i < 5; i++) {
        const target = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 20,
            locked: false
        };
        targets.push(target);
    }
}

function gameLoop() {
    if (gameOver) return;

    update();
    render();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Update game logic, check for collisions, etc.
    targets.forEach(target => {
        if (target.locked) {
            score += 10; // Increment score for locked targets
        }
    });
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    targets.forEach(target => {
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fillStyle = target.locked ? 'red' : 'blue';
        ctx.fill();
        ctx.closePath();
    });
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function lockOnTarget(mouseX, mouseY) {
    targets.forEach(target => {
        const distance = Math.sqrt((mouseX - target.x) ** 2 + (mouseY - target.y) ** 2);
        if (distance < target.radius) {
            target.locked = true;
        }
    });
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    lockOnTarget(mouseX, mouseY);
});

// Export functions for use in other modules
export { startLockOnLegends };