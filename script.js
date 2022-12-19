// sketchpad generation

const INIT_SIZE = 32;
const INIT_COLOUR = "black";
const INIT_MODE = "rainbow";

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
        square.addEventListener('mousedown', applyColour);
        square.addEventListener('mouseover', applyColour);
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

// etch-a-sketch functionality

let currentColour = INIT_COLOUR;
let currentMode = INIT_MODE;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function getRandomColour() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function applyColour(e) {
    if (e.type === "mouseover" && !mouseDown) return;

    if (currentMode === "rainbow") {
        currentColour = getRandomColour();
        e.target.style.backgroundColor = currentColour;
    }
    else {
        e.target.style.backgroundColor = currentColour;
    }
}

function init() {
    updateSize(INIT_SIZE);
}

init();