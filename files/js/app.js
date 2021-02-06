// Variables :
const optionsBtn = document.querySelectorAll(".toggle_options button");
const inputColor = document.getElementById("color");
const colorPicker = document.getElementById("color_pick");
const toggleGrid = document.getElementById("grid_toggle");
const clearBtn = document.getElementById("clear");

const inputRange = document.querySelector("input[type='range']");
const progressBar = document.querySelector(".progress_bar");
let gridSize = document.getElementById("grid_size");

const gridContainer = document.querySelector(".grid_container");
let gridElementSelection = document.querySelectorAll(".grid_element");

let inkValue = "#6495ff";
inputColor.value = inkValue;

// Call begin functions :
generateGrid(inputRange.value);
updateInformations(inputRange.value);

// Slider :
inputRange.addEventListener("mousemove", () => updateInformations(inputRange.value));
inputRange.addEventListener("change", () => generateGrid(inputRange.value));

function updateInformations(value) {
    progressBar.style.width = `${(value / 50) * 100}%`;
    gridSize.innerText = `${value} X ${value}`;
}

// Grid :
function generateGrid(value) {
    // Style the grid :
    gridContainer.innerHTML = "";
    gridContainer.style.gridTemplateRows = `repeat(${value}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${value}, 1fr)`;

    // Create elements :
    for (let i = 0; i < value ** 2; i++) {
        const element = document.createElement("div");
        element.classList.add("grid_element");
        element.style.background = "#FFF";
        if (toggleGrid.classList.contains("active")) {
            element.classList.add("toggle_border");
        }
        gridContainer.appendChild(element);
    }

    // Assignment of all element :
    gridElementSelection = document.querySelectorAll(".grid_element");
}

// Buttons :
let normal_pen = true;
let eraser = false;
let rainbow = false;
let lighten = false;
let shading = false;

optionsBtn.forEach((optionBtn) =>
    optionBtn.addEventListener("click", () => {
        if (document.querySelector(".toggle_options button.active") !== null) {
            document.querySelector(".toggle_options button.active").classList.remove("active");
        }

        optionBtn.classList.add("active");

        // Tcheck what is the button active :
        switch (optionBtn.id) {
            case "normal_pen":
                [normal_pen, eraser, rainbow, lighten, shading] = [true, false, false, false, false];
                break;
            case "eraser":
                [normal_pen, eraser, rainbow, lighten, shading] = [false, true, false, false, false];
                break;
            case "rainbow":
                [normal_pen, eraser, rainbow, lighten, shading] = [false, false, true, false, false];
                break;
            case "lighten":
                [normal_pen, eraser, rainbow, lighten, shading] = [false, false, false, true, false];
                break;
            case "shading":
                [normal_pen, eraser, rainbow, lighten, shading] = [false, false, false, false, true];
                break;
        }
    })
);

// Color Input + Color Picker button :
inputColor.addEventListener("input", () => {
    inkValue = inputColor.value;
});

colorPicker.addEventListener("click", () => {
    colorPicker.classList.toggle("active");

    gridContainer.addEventListener("click", (e) => {
        if (colorPicker.classList.contains("active")) {
            inkValue = RGBToHEX(e.target.style.backgroundColor);
            inputColor.value = inkValue;
            colorPicker.classList.remove("active");
        }
    });
});

// Color Modification RGB to HEX :
function RGBToHEX(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    b = (+rgb[2]).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    return "#" + r + g + b;
}

function HEXToHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    r = parseInt(result[1], 16);
    g = parseInt(result[2], 16);
    b = parseInt(result[3], 16);
    (r /= 255), (g /= 255), (b /= 255);
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    var HSL = new Object();
    HSL["h"] = h;
    HSL["s"] = s;
    HSL["l"] = l;
    return HSL;
}

// Grid Button :
toggleGrid.addEventListener("click", () => {
    toggleGrid.classList.toggle("active");
    gridElementSelection.forEach((gridElement) => gridElement.classList.toggle("toggle_border"));
});

// Clear Button :
clearBtn.addEventListener("click", () => gridElementSelection.forEach((gridElement) => (gridElement.style.background = "#FFF")));

// Drawing event :
let movement = false;

gridContainer.addEventListener("mousedown", (e) => {
    movement = true;

    if (!colorPicker.classList.contains("active")) {
        e.target.style.backgroundColor = drawing(inkValue);

        // For continus mousedown :
        gridContainer.addEventListener("mouseover", (e) => {
            if (movement) {
                e.target.style.backgroundColor = drawing(inkValue);
            }
        });
    }
});

gridContainer.addEventListener("mouseup", () => (movement = false));

// Drawing function :
function drawing(inkValue) {
    if (eraser) {
        inkValue = "#FFF";
    } else if (rainbow) {
        inkValue = randomColor();
    } else if (lighten) {
        inkValue = lightenColor(this.target);
    } else if (shading) {
        inkValue = randomColor();
    }
    return inkValue;
}

// Options buttons :
// Random color (Rainbow) :
function randomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

// Lighten color (Lighten) :
function lightenColor(inkValue) {
    console.log(inkValue);
    let newInk = HEXToHSL(inkValue);
    console.log(newInk);
    return newInk;
}
