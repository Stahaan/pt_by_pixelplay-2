// This file serves as the entry point for the game. It initializes the game, sets up the canvas, and manages the game modes and UI interactions.

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let currentGameMode = null;

function init() {
    canvas.width = 800;
    canvas.height = 600;
    setupUI();
    switchGameMode('portalRunner'); // Default game mode
}

function setupUI() {
    // Initialize UI elements here
}

function switchGameMode(mode) {
    if (currentGameMode) {
        currentGameMode.stop();
    }
    
    if (mode === 'portalRunner') {
        currentGameMode = new PortalRunner();
    } else if (mode === 'lockOnLegends') {
        currentGameMode = new LockOnLegends();
    }
    
    currentGameMode.start();
}

function gameLoop() {
    if (currentGameMode) {
        currentGameMode.update();
        currentGameMode.render(ctx);
    }
    requestAnimationFrame(gameLoop);
}

window.onload = () => {
    init();
    gameLoop();
};