// Slider :
const inputRange = document.querySelector("input[type='range']");
const progressBar = document.querySelector(".progress_bar");
let gridSize = document.getElementById("grid_size");

inputRange.addEventListener("mousemove", function () {
    let inputRangeValue = inputRange.value;
    progressBar.style.width = `${(inputRangeValue / 50) * 100}%`;
    gridSize.innerText = `${inputRangeValue} X ${inputRangeValue}`;
});

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

// Clear :
const clearBtn = document.getElementById("clear");

clearBtn.addEventListener("click", () => {
    document.querySelector(".toggle_options button.active").classList.remove("active");
});
