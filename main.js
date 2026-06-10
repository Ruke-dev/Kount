let buffer = "0";
let runningTotal = 0;
let previousOperator;
let display = "0";
const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(number){
    if(buffer === "0"){
        buffer = number;
    }else{
        buffer += number;
    }
    display = display === "0" ? number : display + number;
}

function handleMath(value){
    if(buffer === "0"){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }

    previousOperator = value;
    display += value;
    buffer = "0";
}

function flushOperation(intBuffer){
    if(previousOperator === "+"){
        runningTotal += intBuffer;
    }else if(previousOperator === "-"){
        runningTotal -= intBuffer;
    }else if(previousOperator === "x"){
        runningTotal *= intBuffer;
    }else if(previousOperator === "÷"){
        runningTotal /= intBuffer;
    }
}

function handleSymbol(value){
    switch (value) {
        case 'C':
            display = "0";
            runningTotal = 0;
            buffer = "0";
            previousOperator = null;
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            display = "" + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(display.length === 1){
                display = "0";
            }else{
                display = display.substring(0, display.length - 1);
            }
            break;
        case '+':   
        case '-':
        case 'x':
        case '÷':
            handleMath(value);
            break;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener("click", function(e){
        buttonClick(e.target.innerText);
    })
}

function rerender(){
    screen.innerText = display;
}

init();