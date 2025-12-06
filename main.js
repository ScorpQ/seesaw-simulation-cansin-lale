const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let pivot = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    color: 'blue'
};

let seeSaw = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    color: 'gray'
};

function drawPivotPoint() {
    context.fillStyle = pivot.color;
    context.beginPath(); 
    context.arc(pivot.x, pivot.y, 15, 0, Math.PI * 2);
    context.fill();
    context.stroke();
}

function drawSeesaw() {
    context.save();  
    context.translate(pivot.x, pivot.y);
    context.fillStyle = seeSaw.color;
    context.strokeStyle = '#555';
    context.lineWidth = 2;
    context.rotate(15 * Math.PI / 180);
    context.fillRect(-600 / 2, -20 / 2, 600, 20);
    context.strokeRect(-600 / 2, -20 / 2, 600, 20); 
    context.restore(); 
}

function updateGameArea() {
    clear();

    drawSeesaw();
    drawPivotPoint();
    //console.log("running")
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function main() {
    drawSeesaw();
    drawPivotPoint();
    //this.interval = setInterval(updateGameArea, 20);
}
main();

