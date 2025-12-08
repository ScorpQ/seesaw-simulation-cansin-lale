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