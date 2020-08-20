const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtns = document.getElementById("clear-btn");

// object that performs actions
const calculator = {
    '/' :(firstValue, secondValue) => firstValue / secondValue,
    '-' :(firstValue, secondValue) => firstValue - secondValue,
    '+' :(firstValue, secondValue) => firstValue + secondValue,
    '*' :(firstValue, secondValue) => firstValue * secondValue,
    '=' :(firstValue, secondValue) => secondValue
}

let firstValue = 0;
let operator = '';
let awaitingValue=false;

function sendNumberValue(number){
    if(awaitingValue){
        calculatorDisplay.textContent = 0;
        awaitingValue = false;
    }
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number;
}

function addDecimal(){
    if(!calculatorDisplay.textContent.includes(".")){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// clearing display and reset all values in the calculator

function resetAll(){
    calculatorDisplay.textContent = "0"
    firstValue = 0;
    operator = '';
    awaitingValue=false;
}

// using operator function to store values and operator

function useOperator(operatorValue){
    // prevent multiple operator entry without entrying the second value
    if(awaitingValue){
        operator=operatorValue;
        return;
    }
    let currentValue = Number(calculatorDisplay.textContent);
    // when operator is press store the current value in the display to first value
    // then reset the display
    if(!firstValue){
        firstValue = currentValue;
    }else{
        let calculation = calculator[operator](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // storing operator value
    operator = operatorValue;
    // awaitingvalue is used to clear calculator display
    awaitingValue = true;
}


// Add Event listeners for decimals, number, operators button

inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener("click",() => sendNumberValue(inputBtn.value));
    }else if(inputBtn.classList.contains("operator")){
        inputBtn.addEventListener("click",() => useOperator(inputBtn.value));
    }else if(inputBtn.classList.contains("decimal")){
        inputBtn.addEventListener("click",() => addDecimal());
    }
});

// clearing display Event listener 

clearBtns.addEventListener("click",resetAll);

