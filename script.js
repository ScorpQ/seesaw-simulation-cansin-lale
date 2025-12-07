// CONSTANTS
const MAX_ANGLE_DEGREES = 30;
const SMOOTHING_FACTOR = 0.015;

// HTML Components
const seesawBar = document.getElementById('seesawBar');
const seeSawArea = document.querySelector('.seesaw-sim-wrapper');

// Color palette for objects that created when clıck to seesaw
const COLOR_PALETTE = [
    "#7b68a6", 
    "#9d87b8", 
    "#6b7aa1", 
    "#8b9dc3", 
    "#5a7d9a",
    "#7a8fa3", 
    "#6d8299", 
    "#8494a8", 
    "#6a7b8c", 
    "#7c8d9f"
];

// Global State
let boxes = [];
let angleOfSeesaw = 0;
let fallingBoxes = [];
class Utils {
    static getRandomColor() {
        return COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    }
    
    static getRandomWeight(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getSeesawDimensions = () => {
        const computedStyle = window.getComputedStyle(seesawBar);
        return {
            length: parseFloat(computedStyle.width),
            height: parseFloat(computedStyle.height)
        };
    };
}



 function calculateAngle() {
    let netTorque = 0;
    boxes.forEach((box) => {
        netTorque += (box.weight * box.distance);
    })
    const angleDegrees = Math.max(-MAX_ANGLE_DEGREES, Math.min(MAX_ANGLE_DEGREES, netTorque / 10));
    return (angleDegrees * Math.PI / 180);
 }

 function updateCalculations() {
    angleOfSeesaw += (calculateAngle() - angleOfSeesaw) * SMOOTHING_FACTOR;
    const angleDegrees = angleOfSeesaw * 180 / Math.PI;

    let leftWeight = 0;
    let rightWeight = 0;

    boxes.forEach((box) => {
        if (box.distance < 0) {
            leftWeight += box.weight;
        } else if (box.distance > 0) {
            rightWeight += box.weight;
        }
    });
    
    seesawBar.style.transform = `translate(-50%, -50%) rotate(${angleDegrees}deg)`;
    document.getElementById('tiltAngle').textContent = `${angleDegrees.toFixed(1)}°`;
    document.getElementById('leftWeight').textContent = `${leftWeight.toFixed(1)} kg`;
    document.getElementById('rightWeight').textContent = `${rightWeight.toFixed(1)} kg`;
 }

 // !!!!! //
 function updateBoxPositions() {
    const rect = seeSawArea.getBoundingClientRect();
    const pivotX = rect.width / 2;
    const pivotY = rect.height / 2;
    const cos = Math.cos(angleOfSeesaw);
    const sin = Math.sin(angleOfSeesaw);
    
    boxes.forEach(box => {
        const boxHeightOffset = -seeSaw.height / 2 - (box.weight + 8) * 5 / 2;
        
        const x = box.distance * cos - boxHeightOffset * sin;
        const y = box.distance * sin + boxHeightOffset * cos;
        
        box.element.style.left = `${pivotX + x}px`;
        box.element.style.top = `${pivotY + y}px`;
        box.element.style.transform = `translate(-50%, -50%) rotate(${angleOfSeesaw * 180 / Math.PI}deg)`;
    });
 }

 function getClickInfo(clickX) {
    const rect = seeSawArea.getBoundingClientRect();
    const pivotX = rect.width / 2;
    const distance = clickX - pivotX;
    const halfLength = seeSaw.length / 2;
    const isOnSeesaw = Math.abs(distance) <= halfLength;
    
    return {
        isOnSeesaw,
        distance
    };
 }

 function createBox(location, weight, targetDistance) {
    const box = document.createElement('div');
    const size = (weight + 8) * 5;

    box.style.top = '20px';
    box.className = 'falling-box';
    box.style.width = `${size}px`;
    box.style.height = `${size}px`;
    box.style.left = `${location}px`;
    box.style.transform = 'translate(-50%, -50%)';
    box.innerHTML = `<span>${weight}kg</span>`;
    box.style.backgroundColor = Utils.getRandomColor();
    
    seeSawArea.appendChild(box);
    
    return {
        element: box,
        currentY: 20,
        landed: false,
        fallSpeed: 3.5, 
        weight: weight,
        location: location,
        targetDistance: targetDistance,
    };
 }
 
 // !!!!!!! //
 function updateFallingBoxes() {
    let seeSaw = Utils.getSeesawDimensions();
    const rect = seeSawArea.getBoundingClientRect();
    const pivotX = rect.width / 2;
    const pivotY = rect.height / 2;
    
    for (let i = fallingBoxes.length - 1; i >= 0; i--) {
        const box = fallingBoxes[i];
        
        if (box.landed) continue;
        
        box.currentY += box.fallSpeed;
        
        const dx = box.location - pivotX;
        const dy = box.currentY - pivotY;

        const cosAngle = Math.cos(-angleOfSeesaw);
        const sinAngle = Math.sin(-angleOfSeesaw);
        const distance = dx * cosAngle - dy * sinAngle;
        
        const seesawTopY = pivotY + Math.sin(angleOfSeesaw) * distance;
        const boxSize = (box.weight + 8) * 5;
        const boxRadius = boxSize / 2;
        
        if (box.currentY + boxRadius >= seesawTopY - seeSaw.height / 2) {
            box.currentY = seesawTopY - seeSaw.height / 2 - boxRadius;
            box.landed = true;
            
            boxes.push({
                weight: box.weight,
                distance: distance, 
                color: box.element.style.backgroundColor,
                element: box.element
            });
            
            box.element.classList.add('landed');
            fallingBoxes.splice(i, 1);
        } else {
            box.element.style.top = `${box.currentY}px`;
        }
    }
 }



seeSawArea.addEventListener('click', (event) => {
    const rect = seeSawArea.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    
    const clickInfo = getClickInfo(clickX);
    
    if (clickInfo.isOnSeesaw) {
        const fallingBox = createBox(clickX, nextWeight, clickInfo.distance);
        fallingBoxes.push(fallingBox);
        
        nextWeight = Utils.getRandomWeight(1, 10);
        document.getElementById('nextWeight').textContent = `${nextWeight} kg`;
    }
});



function main() {
    updateFallingBoxes();   
    updateCalculations();   
    updateBoxPositions();
    requestAnimationFrame(main);
}

let seeSaw = Utils.getSeesawDimensions();
let nextWeight = Utils.getRandomWeight(1, 10);
document.getElementById('nextWeight').textContent = `${nextWeight} kg`;
main();