const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// PHYSICS CONSTANTS
const GRAVITY_ACCELERATION = 9.81; 
const PIXEL_TO_METRE = 100; // 100 pixel equal to 1 meter
const PİVOT_FRICTION = 1;
const TIME = 0.016; // !!AI Assit to calculate Angular Velocity!!

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;




let angleOfSeesaw = 0;
let angularAcceleration = 0;
let angularVelocity = 0; 

let boxes = [
    {
        weight: 15,
        distance: -5,
    },
    {
        weight: 15,
        distance: 5.1,
    }
];

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
    length: 600
};


function calculateTorque(boxes) {
    let T = 0; // Total Torque
    boxes.forEach(box => {
        const F =  GRAVITY_ACCELERATION * box.weight  // g X m
        T += F * (Math.sin(90 - angleOfSeesaw) * box.distance)  // force X distance
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

function updateCalculations() {
    const totalTorque = calculateTorque(boxes); 
    const momentOfInertia = calculateInertia(boxes);

    angularAcceleration =  totalTorque / momentOfInertia;
    angularVelocity += angularAcceleration * TIME;
    angularVelocity *= PİVOT_FRICTION;
    angleOfSeesaw += angularVelocity * TIME;

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
    context.rotate(angleOfSeesaw);
    context.fillRect(-600 / 2, -20 / 2, 600, 20);
    context.strokeRect(-600 / 2, -20 / 2, 600, 20); 
    context.restore(); 
}

function updateGameArea() {
    clear();
    updateCalculations();
    drawSeesaw();
    drawPivotPoint();
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}



function main() {
    updateGameArea();
    requestAnimationFrame(main); 
}

main();

