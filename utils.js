function getRandomColor(colorPalette) {
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
}

function getRandomWeight(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSeesawDimensions(seesawBar) {
    const computedStyle = window.getComputedStyle(seesawBar);
    return {
        length: parseFloat(computedStyle.width),
        height: parseFloat(computedStyle.height)
    };
}

function scaleTheSize(weight) {
    return (weight + 8) * 5;
}

function clearTheSeesaw() {
    boxes = [];
    fallingBoxes = [];
    angleOfSeesaw = 0;

    const elements = document.querySelectorAll('.falling-box.landed');
    elements.forEach(el => el.remove());
    
    document.getElementById('tiltAngle').textContent = '0.0°';
    document.getElementById('leftWeight').textContent = '0.0 kg';
    document.getElementById('rightWeight').textContent = '0.0 kg';
    seesawBar.style.transform = 'translate(-50%, -50%) rotate(0deg)';
}