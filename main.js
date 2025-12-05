const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

document.getElementById("hi-there").innerHTML = "as i said :)";


function drawPivotPoint() {
    context.fillStyle = '#000';
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 10, 0, Math.PI * 2);
    context.fill();
}

drawPivotPoint()
