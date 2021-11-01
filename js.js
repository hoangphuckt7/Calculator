class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  //
  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }
  //
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  //
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  //
  chooseOperand(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }
  // thực hiện tính
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.previousOperand = '';
    this.operation = undefined;
  }
  //
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const intergerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimaDigits = stringNumber.split('.')[1];
    let intergerDiplay;
    if (isNaN(intergerDigits)) {
      intergerDiplay = '';
    } else {
      intergerDiplay = intergerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimaDigits != null) {
      return `${intergerDiplay}.${decimaDigits}`;
    } else {
      return intergerDiplay;
    }
  }
  //
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.chooseOperand(btn.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', (btn) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', (btn) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', (btn) => {
  calculator.delete();
  calculator.updateDisplay();
});
