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

class Utils {
    getRandomColor() {
        return COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
    }
    
    getRandomWeight(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class AboutPhysics {

    newAngleOfSeesaw = 0;
    
    calculateAngle() {
        let netTorque = 0;

        boxes.forEach((box) => {
            netTorque+= (box.mass * box.distance);
        })
        let angleDegrees = netTorque / 10;
        angleDegrees = Math.max(-MAX_ANGLE_DEGREES, Math.min(MAX_ANGLE_DEGREES, angleDegrees));
        
        return (angleDegrees * Math.PI / 180);
    }

    updateCalculations() {
       this.newAngleOfSeesaw = this.calculateAngle();
        
        // !!!!!! //
        const smoothingFactor = 0.015;
        angleOfSeesaw += (this.newAngleOfSeesaw - angleOfSeesaw) * smoothingFactor;
        const angleDegrees = angleOfSeesaw * 180 / Math.PI;

        
        // Calculating updated torque values
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
}









function main() {
    requestAnimationFrame(main);
}

main();