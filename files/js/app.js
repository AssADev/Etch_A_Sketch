// Slider :
const inputRange = document.querySelector("input[type='range']");
const progressBar = document.querySelector(".progress_bar");
let gridSize = document.getElementById("grid_size");

inputRange.addEventListener("mousemove", () => updateInformations(inputRange.value));
inputRange.addEventListener("change", () => generateGrid(inputRange.value));

function updateInformations(value) {
    progressBar.style.width = `${(value / 50) * 100}%`;
    gridSize.innerText = `${value} X ${value}`;
}

// Buttons :
const optionsBtn = document.querySelectorAll(".toggle_options button");

optionsBtn.forEach((optionBtn) =>
    optionBtn.addEventListener("click", function () {
        if (document.querySelector(".toggle_options button.active") !== null) {
            document.querySelector(".toggle_options button.active").classList.remove("active");
        }
        optionBtn.classList.add("active");

        // Tcheck what is the button clicked :
        if (optionBtn.id == "eraser") {
            console.log("Eraser");
        } else if (optionBtn.id == "rainbow") {
            console.log("rainbow");
        } else if (optionBtn.id == "lighten") {
            console.log("lighten");
        } else if (optionBtn.id == "shading") {
            console.log("shading");
        }
    })
);

// Grid Button :
const toggleGrid = document.getElementById("grid_toggle");

toggleGrid.addEventListener("click", () => {
    toggleGrid.classList.toggle("active");

    let gridElementSelection = document.querySelectorAll("div.grid_element");
    gridElementSelection.forEach((gridElement) => gridElement.classList.toggle("toggle_border"));
});

// Clear :
const clearBtn = document.getElementById("clear");

clearBtn.addEventListener("click", () => {
    document.querySelector(".toggle_options button.active").classList.remove("active");
});

// Grid :
const gridContainer = document.querySelector(".grid_container");

function generateGrid(value) {
    // Style the grid :
    gridContainer.innerHTML = "";
    gridContainer.style.gridTemplateRows = `repeat(${value}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${value}, 1fr)`;

    // Create elements :
    for (let i = 0; i < value; i++) {
        for (let j = 0; j < value; j++) {
            let element = document.createElement("div");
            element.classList.add("grid_element");
            if (toggleGrid.classList.contains("active")) {
                element.classList.add("toggle_border");
            }
            gridContainer.appendChild(element);
        }
    }
}

// Call begin functions :
generateGrid(inputRange.value);
updateInformations(inputRange.value);
