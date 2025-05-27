const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function resetCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

function handleNumber(number) {
    if (waitingForSecondOperand === true) {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

function handleDecimal(dot) {
    // If the display already contains a decimal point, do nothing
    if (!currentInput.includes(dot)) {
        currentInput += dot;
        updateDisplay();
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        currentInput = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay(); // Update display after potential calculation
}

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand // Equals just uses the second operand after calculation
};


buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const { target } = event;

        if (!target.matches('button')) {
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.dataset.value);
            return;
        }

        if (target.classList.contains('number')) {
            handleNumber(target.dataset.value);
            return;
        }

        if (target.classList.contains('clear')) {
            resetCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
             if (operator && firstOperand !== null) {
                const inputValue = parseFloat(currentInput);
                 // Perform the final calculation
                const result = performCalculation[operator](firstOperand, inputValue);
                currentInput = String(result);
                firstOperand = null; // Reset for next calculation
                operator = null;
                waitingForSecondOperand = false;
                updateDisplay();
             }
            return;
        }

        // Handle decimal point separately
        if (target.dataset.value === '.') {
            handleDecimal(target.dataset.value);
            return;
        }
    });
});

// Initial display update
updateDisplay();
