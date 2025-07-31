// This file contains the game loop logic, which updates the game state and renders the graphics on the canvas. 
// It handles the timing for frame updates and manages transitions between game modes.

let lastTime = 0;
let gameRunning = false;
let currentMode = null;

function gameLoop(timestamp) {
    if (!gameRunning) return;

    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    update(deltaTime);
    render();

    requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
    if (currentMode) {
        currentMode.update(deltaTime);
    }
}

function render() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentMode) {
        currentMode.render(ctx);
    }
}

function startGame(mode) {
    currentMode = mode;
    gameRunning = true;
    lastTime = 0;
    requestAnimationFrame(gameLoop);
}

function stopGame() {
    gameRunning = false;
    currentMode = null;
}

export { startGame, stopGame };