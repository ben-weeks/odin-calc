const numberButtons = document.querySelectorAll(".number")
const operatorButtons = document.querySelectorAll(".operator")
const equalsButton = document.querySelector(".equals")
const clearButton = document.querySelector(".clear")
const delButton = document.querySelector(".del")
const display = document.querySelector(".display")
const plusMinusButton = document.querySelector(".plus-minus")

const mainBody = document.querySelector("body")

let currentOperand = ""
let prevOperand = ""
let operator = undefined

function clear() {
    currentOperand = ""
    prevOperand = ""
    operator = undefined
    updateDisplay()
}

function del() {
    currentOperand = currentOperand.slice(0, -1)
    updateDisplay()
}

function appendNumber(num) {
    // check for length and only one decimal place
    if (currentOperand.length > 16 || (num === "." && currentOperand.includes("."))) return
    currentOperand = currentOperand.toString() + num.toString()
    updateDisplay()
}

function appendOperator(op) {
    if (currentOperand === "") return
    if (prevOperand !== "") calculate()

    operator = op
    prevOperand = currentOperand
    currentOperand = ""
}

function calculate() {
    let result
    const currentOperandNum = parseFloat(currentOperand)
    const prevOperandNum = parseFloat(prevOperand)

    console.log(prevOperand + operator + currentOperand)

    if (isNaN(currentOperandNum) || isNaN(prevOperandNum)) return 

    switch (operator) {
        case "+":
            result = prevOperandNum + currentOperandNum
            break
        case "-":
            result = prevOperandNum - currentOperandNum
            break
        case "*":
            result = prevOperandNum * currentOperandNum
            break
        case "/":
            if (currentOperandNum === 0) {
                result = "DIV 0 ERROR"
                break
            }   
            result = prevOperandNum / currentOperandNum
            break
        default:
            return
    }

    currentOperand = result.toString()
    console.log(currentOperand)
    updateDisplay()
    prevOperand = ""
}

function plusMinus() {
    let currentOperandNum = parseFloat(currentOperand)
    currentOperandNum /= -1
    currentOperand = currentOperandNum.toString()
    updateDisplay()
}

function updateDisplay() {
    display.innerText = currentOperand
}

// button event listeners
numberButtons.forEach((num) => { num.addEventListener("click", () => { appendNumber(num.innerText) }) })
operatorButtons.forEach((op) => { op.addEventListener("click", () => { appendOperator(op.innerText) }) })

clearButton.addEventListener("click", clear)
equalsButton.addEventListener("click", calculate)
delButton.addEventListener("click", del)
plusMinusButton.addEventListener("click", plusMinus)

// keyboard support
const numberKeys = "0123456789."
const operatorKeys = "+-*/"
const delKey = "Backspace"
const equalsKey = "Enter"
const clearKey = "Cc"

mainBody.addEventListener("keydown", (event) => {
    const key = event.key
    if (numberKeys.includes(key)) appendNumber(key) 
    if (operatorKeys.includes(key)) appendOperator(key) 
    if (key === delKey) del() 
    if (key === equalsKey) calculate()
    if (clearKey.includes(key)) clear() 
})