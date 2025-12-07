// PHYSICS CONSTANTS
const MAX_ANGLE_DEGREES = 30;

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




class Utils {
    getRandomColor() {
        return COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    }
    
    getRandomWeight(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getSeesawDimensions = () => {
        const computedStyle = window.getComputedStyle(seesawBar);
        return {
            length: parseFloat(computedStyle.width),
            height: parseFloat(computedStyle.height)
        };
    };
}

class AboutPhysics {
    angleOfSeesaw = 0;
    smoothingFactor = 0.015;
    
    calculateAngle() {
        let netTorque = 0;

        boxes.forEach((box) => {
            netTorque += (box.weight * box.distance);
        })
        const angleDegrees = Math.max(-MAX_ANGLE_DEGREES, Math.min(MAX_ANGLE_DEGREES, netTorque / 10));
        
        return (angleDegrees * Math.PI / 180);
    }

    updateCalculations() {
        this.angleOfSeesaw += (this.calculateAngle() - this.angleOfSeesaw) * this.smoothingFactor;
        const angleDegrees = this.angleOfSeesaw * 180 / Math.PI;

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
    
    updateBoxPositions() {
        const rect = seeSawArea.getBoundingClientRect();
        const pivotX = rect.width / 2;
        const pivotY = rect.height / 2;
        
        boxes.forEach(box => {
            const cosAngle = Math.cos(this.angleOfSeesaw);
            const sinAngle = Math.sin(this.angleOfSeesaw);
            
            const localY = -seeSaw.height / 2 - (box.weight + 8) * 5 / 2;
            
            const rotatedX = box.distance * cosAngle - localY * sinAngle;
            const rotatedY = box.distance * sinAngle + localY * cosAngle;
            
            const finalX = pivotX + rotatedX;
            const finalY = pivotY + rotatedY;
            
            box.element.style.left = `${finalX}px`;
            box.element.style.top = `${finalY}px`;
            box.element.style.transform = `translate(-50%, -50%) rotate(${this.angleOfSeesaw * 180 / Math.PI}deg)`;
        });
    }
}

class AboutSeesaw {
    fallingBoxes = [];

    isClickOnSeesawArea(clickX, clickY) {
        const wrapperRect = seeSawArea.getBoundingClientRect();
        const pivotX = wrapperRect.width / 2;
        const pivotY = wrapperRect.height / 2;
        
        const dx = clickX - pivotX;
        const dy = clickY - pivotY;
        
        const cosAngle = Math.cos(-angleOfSeesaw);
        const sinAngle = Math.sin(-angleOfSeesaw);
        const rotatedX = dx * cosAngle - dy * sinAngle;
        
        const halfLength = seeSaw.length / 2;
        
        return Math.abs(rotatedX) <= halfLength;
    }

    createBox(startX, weight, targetDistance) {
        const box = document.createElement('div');
        const size = (weight + 8) * 5;

        box.style.top = '20px';
        box.className = 'falling-box';
        box.style.width = `${size}px`;
        box.style.height = `${size}px`;
        box.style.left = `${startX}px`;
        box.innerHTML = `<span>${weight}kg</span>`;
        box.style.backgroundColor = UTILS.getRandomColor();
        
        seeSawArea.appendChild(box);
        
        return {
            element: box,
            currentY: 20,
            fallSpeed: 5,
            startX: startX,
            weight: weight,
            landed: false,
            targetDistance: targetDistance,
        };
    }

    updateFallingBoxes() {
        const rect = seeSawArea.getBoundingClientRect();
        const pivotY = rect.height / 2;
        
        for (let i = this.fallingBoxes.length - 1; i >= 0; i--) {
            const box = this.fallingBoxes[i];
            
            if (box.landed) continue;
            
            box.currentY += box.fallSpeed;
            
            const seesawTopY = pivotY + Math.sin(angleOfSeesaw) * box.targetDistance;
            const boxSize = (box.weight + 8) * 5;
            const boxRadius = boxSize / 2;
            
            // !!! //
            if (box.currentY + boxRadius >= seesawTopY - seeSaw.height / 2) {
                box.currentY = seesawTopY - seeSaw.height / 2 - boxRadius;
                box.landed = true;
                
                boxes.push({
                    weight: box.weight,
                    distance: box.targetDistance,
                    color: box.element.style.backgroundColor,
                    element: box.element
                });
                
                box.element.classList.add('landed');
                this.fallingBoxes.splice(i, 1);
            } else {
                box.element.style.top = `${box.currentY}px`;
            }
        }
}
}

const UTILS = new Utils();
const SEESAW = new AboutSeesaw();
const PHYSICS = new AboutPhysics();


seeSawArea.addEventListener('click', (event) => {
    const rect = seeSawArea.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    if (SEESAW.isClickOnSeesawArea(clickX, clickY)) {
        const pivotX = rect.width / 2;
        const pivotY = rect.height / 2;
    
        const dx = clickX - pivotX;
        const dy = clickY - pivotY;
        const cosAngle = Math.cos(-angleOfSeesaw);
        const sinAngle = Math.sin(-angleOfSeesaw);
        const rotatedX = dx * cosAngle - dy * sinAngle;

        const fallingBox = SEESAW.createBox(clickX, nextWeight, rotatedX);
        SEESAW.fallingBoxes.push(fallingBox);
        
        nextWeight = UTILS.getRandomWeight(1, 10);
        document.getElementById('nextWeight').textContent = `${nextWeight} kg`;
    }
});

function main() {
    SEESAW.updateFallingBoxes();   
    PHYSICS.updateCalculations();   
    PHYSICS.updateBoxPositions();
    requestAnimationFrame(main);
}

let seeSaw = UTILS.getSeesawDimensions();
let nextWeight = UTILS.getRandomWeight(1, 10);
document.getElementById('nextWeight').textContent = `${nextWeight} kg`;
main();