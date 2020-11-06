let canvas = document.getElementById('draw');
var context = canvas.getContext('2d');
var clear = document.getElementById("clear");
var change = document.getElementById("changeDrawStyle");

let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let paint;
let mouseX;
let mouseY;

// max left
let offsetLeft = canvas.parentElement.parentElement.offsetLeft;
// max right
let offsetTop = canvas.parentElement.parentElement.offsetTop;


canvas.addEventListener('mousedown', function (e) {

    mouseX = e.pageX - this.offsetLeft - offsetLeft;
    mouseY = e.pageY - this.offsetTop - offsetTop;
    paint = true;
    addClick(mouseX, mouseY);
    redraw();
});
canvas.addEventListener('mousemove', function (e) {
    if (paint) {
//       addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);

// версія для нашої розмітки
        addClick(e.pageX - this.offsetLeft - offsetLeft, e.pageY - this.offsetTop - offsetTop, true);

        redraw();
    }
});
canvas.addEventListener('mouseup', function (e) {
    paint = false;
});
canvas.addEventListener('mouseleave', function (e) {
    paint = false;
});


function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}


clear.onclick = function () {
    context.clearRect(0, 0, 490, 220);
    while (clickDrag.length !== 0) {
        clickDrag.pop()
        clickX.pop()
        clickY.pop()
    }
}

change.onclick = function () {
    var color = document.getElementById('drawColor').value;
    var size = document.getElementById(`drawSize`).value;
    context.strokeStyle = color;
    context.lineWidth = size;
    console.log(color)
    console.log(size)
}

function redraw() {
    context.lineJoin = "round";
    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}
