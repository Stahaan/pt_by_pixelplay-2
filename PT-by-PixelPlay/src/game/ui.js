// This file handles the user interface elements, including the title screen, score display, buttons for starting the game modes, and music toggle functionality.

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const UI = {
    title: "PT by PixelPlay",
    score: 0,
    isMusicOn: true,

    drawTitle: function() {
        ctx.fillStyle = 'white';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.title, canvas.width / 2, canvas.height / 4);
    },

    drawScore: function() {
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${this.score}`, 10, 30);
    },

    drawStartButton: function() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(canvas.width / 2 - 75, canvas.height / 2, 150, 50);
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Start Game', canvas.width / 2, canvas.height / 2 + 35);
    },

    drawMusicToggle: function() {
        ctx.fillStyle = this.isMusicOn ? 'green' : 'red';
        ctx.fillRect(canvas.width - 100, 10, 90, 30);
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.isMusicOn ? 'Music On' : 'Music Off', canvas.width - 55, 30);
    },

    updateScore: function(newScore) {
        this.score = newScore;
    },

    toggleMusic: function() {
        this.isMusicOn = !this.isMusicOn;
    },

    render: function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawTitle();
        this.drawScore();
        this.drawStartButton();
        this.drawMusicToggle();
    }
};

export default UI;