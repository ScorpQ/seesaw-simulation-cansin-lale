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
    
    calculateAngle() {
        let netTorque = 0;

        boxes.forEach((box) => {
            netTorque+= (box.mass * box.distance);
        })
        let angleDegrees = netTorque / 10;
        angleDegrees = Math.max(-MAX_ANGLE_DEGREES, Math.min(MAX_ANGLE_DEGREES, angleDegrees));
        
        return (angleDegrees * Math.PI / 180);
    }
}









function main() {
    updateCalculations();
    requestAnimationFrame(main);
}

main();
