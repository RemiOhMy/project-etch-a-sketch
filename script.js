// initial sketchpad generation (16x16)

let sketchpad = document.querySelector(".sketchpad");
sketchpad.style.gridTemplateColumns = `repeat(16, 1fr)`;
sketchpad.style.gridTemplateRows = `repeat(16, 1fr)`;

for (let i = 0; i < 256; i++) {
    let square = document.createElement("div");
    square.style.backgroundColor = "white";
    sketchpad.append(square);
}