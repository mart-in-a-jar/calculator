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
            if (num2 === 0) return NaN;
            else return divide(num1, num2);
    }
}

let displayValue = "0";
let historyValue = null;
let operator, result, operand;

function updateDisplayValue(input) {
    if (isExecuted() && input) clearAll();
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
    if (isExecuted()) clearAll();
    else if (displayValue.length === 1) displayValue = "0";
    else displayValue = displayValue.slice(0, -1);
    inputDisplay.textContent = displayValue;
}

function clearAll() {
    displayValue = "0";
    historyValue = null;
    inputDisplay.textContent = displayValue;
    historyDisplay.textContent = "";
}

function updateHistoryDisplay(opr) {
    if (historyValue != null && displayValue && !isExecuted()) {
        execute();
    }
    operator = opr;
    if (displayValue) {
        historyValue = +displayValue;
        updateDisplayValue();
    }
    historyDisplay.textContent = `${historyValue} ${getOperator()}`;
}

function execute() {    
    if (historyValue == null) {
        historyDisplay.textContent = `${displayValue} =`;
        result = displayValue;
    }
    // so you can press enter directly on a result to repeat it
    else if (isExecuted()) {
        historyDisplay.textContent = `${result} ${getOperator()} ${operand} =`;
        result = String(Math.round(operate(operator, +displayValue, operand) * 1000) / 1000);
    } else {
        if (!displayValue) displayValue = String(historyValue);
        historyDisplay.textContent += ` ${displayValue} =`;
        operand = +displayValue;
        result = String(Math.round(operate(operator, historyValue, +displayValue) * 1000) / 1000);
    }
    displayValue = result;
    inputDisplay.textContent = displayValue;
}

function getOperator() {
    switch (operator) {
        case "*":
            return "??";
        case "/":
            return "??";
        default:
            return operator;
    }
}

function isExecuted() {
    return historyDisplay.textContent.includes("=");
}

const buttons = document.querySelectorAll(".key");
const inputDisplay = document.querySelector(".input");
const historyDisplay = document.querySelector(".history");
const toolTip = document.querySelector(".toolTip");

// list of all data-key values from the buttons
const allowedInputs = [...buttons].map(button => button.dataset.key);

buttons.forEach(button => {
    button.addEventListener("click", e => {
            evaluateInput(e.target.getAttribute("data-key"));
            e.target.blur();
    });
});

window.addEventListener("keydown", e => {
    if (allowedInputs.includes(e.key)) evaluateInput(e.key);
});

// click to copy
inputDisplay.addEventListener("click", e => {
    navigator.clipboard.writeText(e.target.textContent);
    toolTip.style["display"] = "inline";
    setTimeout(() => {
        toolTip.style["display"] = "none";
    }, 1000);
});

function evaluateInput(input) {
    if (input === "Backspace") backspace();
    else if (input === "Escape") clearAll();
    else if (operators.includes(input)) {
        updateHistoryDisplay(input);
    }
    else if (input === "Enter") execute();
    else {
        updateDisplayValue(input);
    }
}