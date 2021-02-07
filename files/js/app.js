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
switchOptionBtn("normal_pen");

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
optionsBtn.forEach((optionBtn) =>
    optionBtn.addEventListener("click", () => {
        if (document.querySelector(".toggle_options button.active") !== null) {
            document.querySelector(".toggle_options button.active").classList.remove("active");
        }

        optionBtn.classList.add("active");

        // Tcheck what is the button active :
        switchOptionBtn(optionBtn.id);
    })
);

function switchOptionBtn(optionBtn) {
    switch (optionBtn) {
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
}

// Color Input + Color Picker button :
inputColor.addEventListener("input", () => (inkValue = inputColor.value));

colorPicker.addEventListener("click", () => {
    colorPicker.classList.toggle("active");

    gridContainer.addEventListener("click", (e) => {
        if (colorPicker.classList.contains("active")) {
            inkValue = `#${RGBToHEX(e.target.style.backgroundColor)}`;
            inputColor.value = inkValue;
            colorPicker.classList.remove("active");
        }
    });
});

// Transform RGB to HEX and RGB to HSL :
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
    return r + g + b;
}

function RGBToHSL(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);
    let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h,
        s,
        l = (max + min) / 2;

    if (max == min) {
        h = s = 0;
    } else {
        let d = max - min;
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

    return [h * 360, s * 100, l * 100];
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
        e.target.style.backgroundColor = drawing(e.target, inkValue);

        // For continus mousedown :
        gridContainer.addEventListener("mouseover", (e) => {
            if (movement) {
                e.target.style.backgroundColor = drawing(e.target, inkValue);
            }
        });
    }
});

gridContainer.addEventListener("mouseup", () => (movement = false));

// Drawing function :
function drawing(e, inkValue) {
    if (eraser) {
        inkValue = "#FFF";
    } else if (rainbow) {
        inkValue = randomColor();
    } else if (lighten) {
        inkValue = LightAndShading(e.style.background, true);
    } else if (shading) {
        inkValue = LightAndShading(e.style.background, false);
    }
    return inkValue;
}

// Options buttons :
// Random color (Rainbow) :
function randomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

// Lighten & Shading color  :
function LightenDarkenColor(col, amt) {
    col = parseInt(col, 16);
    return (((col & 0x0000ff) + amt) | ((((col >> 6) & 0x00ff) + amt) << 6) | (((col >> 16) + amt) << 16)).toString(16);
}

function LightAndShading(inkValue, lightOrDark) {
    let rgbaArray = (inkValue.charAt(3) == "a" ? inkValue.slice(5, -1) : inkValue.slice(4, -1)).split(", ");
    let [red, green, blue] = [rgbaArray[0], rgbaArray[1], rgbaArray[2]];
    let hexColor = RGBToHSL(red, green, blue);

    return lightOrDark ? `hsl(${hexColor[0]}, ${hexColor[1]}%, ${hexColor[2] + 2}%)` : `hsl(${hexColor[0]}, ${hexColor[1]}%, ${hexColor[2] - 2}%)`;
}
