let buffer = "0";
let runningTotal = 0;
let previousOperator;
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
            buffer = "0";
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = "0";
                break;
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
                break;
            }
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
    screen.innerText = buffer;
}

init();