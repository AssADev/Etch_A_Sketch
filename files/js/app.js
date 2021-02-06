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
optionsBtn.forEach((optionBtn) =>
    optionBtn.addEventListener("click", function () {
        if (document.querySelector(".toggle_options button.active") !== null) {
            document.querySelector(".toggle_options button.active").classList.remove("active");
        }
        optionBtn.classList.add("active");

        // Tcheck what is the button active :
        switch (optionBtn.id) {
            case "eraser":
                console.log("Eraser");
                break;
            case "rainbow":
                console.log("rainbow");
                break;
            case "lighten":
                console.log("lighten");
                break;
            case "shading":
                console.log("shading");
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
            inkValue = colorModification(e.target.style.backgroundColor);
            inputColor.value = inkValue;
            colorPicker.classList.remove("active");
        }
    });
});

// Color Modification RGB to HEX :
function colorModification(rgb) {
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

// Grid Button :
toggleGrid.addEventListener("click", () => {
    toggleGrid.classList.toggle("active");
    gridElementSelection.forEach((gridElement) => gridElement.classList.toggle("toggle_border"));
});

// Clear Button :
clearBtn.addEventListener("click", () => {
    gridElementSelection.forEach((gridElement) => (gridElement.style.background = ""));
});

// Drawing event :
let movement = false;

gridContainer.addEventListener("mousedown", (e) => {
    movement = true;

    if (!colorPicker.classList.contains("active")) {
        e.target.style.backgroundColor = inkValue;

        // For continus mousedown :
        gridContainer.addEventListener("mousemove", (e) => {
            if (movement) {
                e.target.style.backgroundColor = inkValue;
            }
        });
    }
});

gridContainer.addEventListener("mouseup", () => (movement = false));
