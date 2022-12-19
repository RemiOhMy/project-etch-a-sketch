// sketchpad generation

const INIT_SIZE = 16;
const INIT_COLOUR = "black";
const INIT_MODE = "colour";

let sketchpad = document.querySelector(".sketchpad");

function updateSize(size) {
    sketchpad.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    sketchpad.style.gridTemplateRows = `repeat(${size}, 1fr)`

    while (sketchpad.hasChildNodes()) {
        sketchpad.removeChild(sketchpad.lastChild);
    }

    for (let i = 0; i < (size * size); i++) {
        let square = document.createElement("div");
        square.style.backgroundColor = "white";
        square.addEventListener('mouseover', applyColour);
        square.addEventListener('mousedown', applyColour);
        sketchpad.append(square);
    }
}

// button functionality

const blackBtn = document.querySelector(".black-btn");
const rainbowBtn = document.querySelector(".rainbow-btn");
const eraseBtn = document.querySelector(".erase-btn");
const gridBtn = document.querySelector(".grid-btn");
const sizeBtn = document.querySelector(".size-btn");
const clearBtn = document.querySelector(".clear-btn");

blackBtn.onclick = () => changeMode("colour");
rainbowBtn.onclick = () => changeMode("rainbow");
eraseBtn.onclick = () => changeMode("erase");
gridBtn.onclick = () => toggleGrid();
sizeBtn.onclick = () => changeSize();
clearBtn.onclick = () => updateSize(currentSize);

let gridOn = false;

function toggleGrid() {
    let squares = sketchpad.children;
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        square.classList.toggle("grid-on");
    }
    if (gridOn) {
        gridOn = false;
        gridBtn.classList.remove("btn-on");
    }
    else {
        gridOn = true;
        gridBtn.classList.add("btn-on");
    }
}

function changeSize() {
    let size = prompt("Please provide a number for the sketchpad width (between 1-100):");
    if (size > 100 || size < 1) {
        alert("Please enter a number between 1-100.")
        return;
    }
    currentSize = size;
    gridOn = true;
    toggleGrid();
    updateSize(currentSize);
}

function changeMode(mode) {
    let controls = document.querySelector(".controls").children;
    for (let i = 0; i < controls.length; i++) {
        let control = controls[i];
        control.classList.remove("btn-on");
    }
    if (mode === "colour") {
        blackBtn.classList.toggle("btn-on");
        currentColour = "black";
        currentMode = "colour";
    }
    else if (mode === "rainbow") {
        rainbowBtn.classList.toggle("btn-on");
        currentMode = "rainbow";
    }
    else if (mode === "erase") {
        eraseBtn.classList.toggle("btn-on");
        currentColour = "white";
        currentMode = "erase";
    }
}

// etch-a-sketch functionality

let currentColour = INIT_COLOUR;
let currentMode = INIT_MODE;
let currentSize = INIT_SIZE;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function getRandomColour() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function applyColour(e) {
    if (e.type === "mouseover" && !mouseDown) return;

    if (currentMode === "rainbow") {
        e.target.style.backgroundColor = getRandomColour();
    }
    else {
        e.target.style.backgroundColor = currentColour;
    }
}

function init() {
    updateSize(INIT_SIZE);
    changeMode(INIT_MODE);
}

init();