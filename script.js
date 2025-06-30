const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear");
const display = document.querySelector(".display");

numberButtons.forEach((num) => {
    num.addEventListener("click", () => {
        display.textContent += num.textContent;
    })
})

clearButton.addEventListener("click", () => { display.textContent = "" })