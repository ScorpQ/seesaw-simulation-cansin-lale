const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let pivot = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    color: 'blue'
};

function drawPivotPoint() {
    context.fillStyle = pivot.color;
    context.beginPath();
    context.arc(pivot.x, pivot.y, 10, 0, Math.PI * 2);
    context.fill();
    context.stroke();
}

function updateGameArea() {
    clear();
    pivot.x += 1;
    drawPivotPoint();
    //console.log("running")
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function main() {
    drawPivotPoint();
    this.interval = setInterval(updateGameArea, 20);
}

