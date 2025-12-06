const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// PHYSICS CONSTANTS
const GRAVITY_ACCELERATION = 9.81; 
const PIXEL_TO_METRE = 100; // 100 pixel equal to 1 meter

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let rotation = 0;


let boxes = [];

let pivot = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    color: 'blue'
};

let seeSaw = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    color: 'gray',
    weight: 10, 
    length: 600,
};


function calculateTorque(boxes) {
    let T = 0; // Total Torque
    boxes.forEach(box => {
        const F =  GRAVITY_ACCELERATION * box.weight  // g X m
        T += F * (Math.sin(90 - angle) * box.distance)  // force X distance
    })

    return T; // returning total torque to calculate angular acceleration
}

function calculateInertia(boxes) {
    let I = 0;

    boxes.forEach(box => {
         I += box.weight * Math.pow(box.distance, 2)
    })
    I += seeSaw.weight * Math.pow(seeSaw.length / PIXEL_TO_METRE, 2) / 12 // rod about the middle formula 

    return I  // returning total momentium of inertia to calculate angular acceleration
}






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
    context.rotate(rotation * Math.PI / 180);
    context.fillRect(-600 / 2, -20 / 2, 600, 20);
    context.strokeRect(-600 / 2, -20 / 2, 600, 20); 
    context.restore(); 
}

function updateGameArea() {
    clear();
    rotating();
    drawSeesaw();
    drawPivotPoint();
    //console.log("running")
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function rotating(){
    rotation-=rotateSpeed;
}

function increaseSpeed(){
    rotateSpeed+=1;
}



function main() {
    drawSeesaw();
    drawPivotPoint();
    this.interval = setInterval(updateGameArea, 10);
}
main();

