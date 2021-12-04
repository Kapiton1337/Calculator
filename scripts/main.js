const nums = document.querySelectorAll(".digit_key.num");
const operations = document.querySelectorAll(".digit_key.operation");
const equal = document.querySelector(".digit_key.equal");
const clearAll = document.querySelector('.clearAll');
const scoreboard = document.querySelector(".scoreboard");
const dott = document.querySelector(".digit_key.dot");

const allowNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const allowOperations = ['+', '-', '*', '/'];
const ugroza = "Иди нахуй!";
let firstOperand = '';
let secondOperand = '';
let operation = '';
let result;

function checkMinus(sym) {
    if (scoreboard.textContent == '0' && sym == '-') {
        scoreboard.textContent = '';
    }
}

function outNums(num) {
    if (allowNums.includes(num)) {
        if (scoreboard.textContent == 0) { scoreboard.textContent = '' };
        scoreboard.textContent += num;
    }
    else {
        scoreboard.textContent = ugroza;
    }
}

function outOperations(oper) {
    if (allowOperations.includes(oper)) {
        checkMinus(oper);
        if (operation != '' && scoreboard.textContent.match(/[\+\-\*\/]$/g) != null) {
            operation = ''
            scoreboard.textContent = scoreboard.textContent.replace(/[\+\-\*\/]$/gi, '');
        }
        else if (operation != '' && scoreboard.textContent.match(/[\+\-\*\/]$/g) == null) {
            showResult()
            operation = oper;
            firstOperand = scoreboard.textContent;
            scoreboard.textContent += oper;
            return 0;
        }
        firstOperand = scoreboard.textContent;
        operation = oper;
        scoreboard.textContent += operation;
    }
    else {
        scoreboard.textContent = ugroza;
    }
}

function dot() {
    function doDot() {
        if (scoreboard.textContent.match(/\.$/g) != null) {
            scoreboard.textContent = scoreboard.textContent.replace(/.$/g, '');
        }
        scoreboard.textContent += '.';
    }
    if (scoreboard.textContent.match(/\./) == null && secondOperand == '') {
        doDot();
        console.log('1');
    }
    else if (firstOperand != '' && scoreboard.textContent.replace(new RegExp('^' + firstOperand), '').match(/\./) == null) {
        doDot();
        console.log('2');
    }

}

function showResult() {
    secondOperand = scoreboard.textContent.replace(firstOperand + operation, '');
    console.log(scoreboard.textContent.match(new RegExp('^' + firstOperand)));
    console.log(Number(firstOperand.trim()), operation.trim(), Number(secondOperand.trim()));
    switch (operation) {
        case '+':
            result = Number(firstOperand.trim()) + Number(secondOperand.trim());
            scoreboard.textContent = result;
            break;
        case '-':
            result = Number(firstOperand.trim()) - Number(secondOperand.trim());
            scoreboard.textContent = result;
            break;
        case '/':
            result = Number(firstOperand.trim()) / Number(secondOperand.trim());
            scoreboard.textContent = result;
            break;
        case '*':
            result = Number(firstOperand.trim()) * Number(secondOperand.trim());
            scoreboard.textContent = result;
            break;
        default:
            break;
    }
    operation = '';
}

function clean() {
    scoreboard.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    operation = '';
}

nums.forEach((num) => {
    num.addEventListener('click', () => { outNums(num.textContent.trim()) });
});

operations.forEach((symbol) => {
    symbol.addEventListener('click', () => { outOperations(symbol.textContent.trim()) })
});

dott.addEventListener('click', dot);

equal.addEventListener('click', showResult);

clearAll.addEventListener('click', clean);

window.addEventListener('keypress', ({ key }) => {
    if (allowNums.includes(key)) {
        outNums(key);
    }
    else if (allowOperations.includes(key)) {
        outOperations(key);
    }
    else if (key == 'Enter') {
        showResult();
    }
    else if (key == '.') {
        dot()
    }
    else if (key == 'c' || 'с') {
        clean();
    }
    //console.log(key);
});