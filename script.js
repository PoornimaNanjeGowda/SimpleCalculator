let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let firstOperand = null;
let expression = ''; // To store the displayed expression

function appendNumber(number) {
    currentInput += number;
    expression += number;
    display.value = expression;
}

function appendOperator(op) {
    if (currentInput === '' && firstOperand === null) {
        if (op === '-' || op === '(') {
            currentInput += op;
            expression += op;
            display.value = expression;
        }
        return;
    }

    if (operator !== null && currentInput !== '') {
        calculate();
        expression = firstOperand + ' ' + op + ' '; // Start new expression with result
    } else if (firstOperand !== null) {
        expression = firstOperand + ' ' + op + ' ';
    } else {
        firstOperand = parseFloat(currentInput);
        expression = currentInput + ' ' + op + ' ';
    }

    operator = op;
    currentInput = '';
    display.value = expression;
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        expression += '.';
        display.value = expression;
    }
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    expression = '';
    display.value = '';
}

function deleteLast() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        expression = expression.slice(0, -1);
        display.value = expression;
    } else if (expression.endsWith(' ')) {
        expression = expression.slice(0, -3); // Remove last ' op '
        operator = null;
        firstOperand = parseFloat(display.value); // Try to update firstOperand
        display.value = expression;
    } else if (expression.length > 0) {
        expression = expression.slice(0, -1);
        display.value = expression;
        firstOperand = parseFloat(expression); // Try to update firstOperand
        operator = null;
        currentInput = '';
    }
}

function calculate() {
    if (operator === null || firstOperand === null) {
        return;
    }

    if (currentInput === '') {
        return;
    }

    let secondOperand = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            if (secondOperand === 0) {
                display.value = 'Error: Division by zero';
                expression = 'Error: Division by zero';
                return;
            }
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    display.value = parseFloat(result.toFixed(10));
    expression = parseFloat(result.toFixed(10)); // Update expression with result
    firstOperand = result;
    currentInput = '';
    operator = null;
}