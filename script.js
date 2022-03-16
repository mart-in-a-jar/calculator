const operators = ["+", "-", "*", "/"];

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

let displayValue = "0";
let historyValue = "";
let operator;

function updateDisplayValue(input) {
    if (displayValue.includes(".") && input === ".") return;
    if (displayValue === "0" && input != ".") displayValue = "";
    if (input === "negative") {
        if (displayValue.includes("-")) displayValue = displayValue.slice(1);
        else displayValue = "-" + displayValue;
    }
    else if (input) displayValue += input;
    else displayValue = "";
    inputDisplay.textContent = displayValue;
}

function backspace() {
    if (displayValue.length === 1) displayValue = "0";
    else displayValue = displayValue.slice(0, -1);
    inputDisplay.textContent = displayValue;
}

function clearAll() {
    displayValue = "0";
    historyValue = "";
    inputDisplay.textContent = displayValue;
    historyDisplay.textContent = "";
}

function updateHistoryDisplay() {
    if (displayValue) {
        historyValue = +displayValue;
        updateDisplayValue();
    }
    historyDisplay.textContent = historyValue + " " + operator;
}

function execute() {
    historyDisplay.textContent += " " + displayValue + " =";
    displayValue = String(Math.round(operate(operator, historyValue, +displayValue) * 1000) / 1000);
    inputDisplay.textContent = displayValue;
}

const buttons = document.querySelectorAll(".key");
const inputDisplay = document.querySelector(".input");
const historyDisplay = document.querySelector(".history");

const allowedInputs = [...buttons].map(button => button.dataset.key);

buttons.forEach(button => {
    button.addEventListener("click", e => {
            evaluateInput(e.target.getAttribute("data-key"));
    });
});

window.addEventListener("keydown", e => {
    if (allowedInputs.includes(e.key)) evaluateInput(e.key);
});

function evaluateInput(input) {
    // if (!isNaN(input) || input === ".") {
    //     updateDisplayValue(input);
    // }
    if (input === "Backspace") backspace();
    else if (input === "Escape") clearAll();
    else if (operators.includes(input)) {
        operator = input;
        updateHistoryDisplay();
    }
    else if (input === "Enter") execute();
    else {
        updateDisplayValue(input);
    }
}