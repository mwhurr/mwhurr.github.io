let runningTotal = 0;
//whats on the screen at any given time - source of truth - whats on the screen or whats in JS - JS your interface is a reflection of code
let buffer = "0";  //whats on the screen is going to be a string

//statefull interface - what was clicked
let previousOperator = null;

//grab the screen
const screen = document.querySelector('.screen');

function buttonClick(value){
     //console.log(value);
     //if it can be turned into a 
     if(isNaN(value)) {
         //is not a number
         handleSymbol(value);
     }else{
         //is a number
         handleNumber(value);
     }
//on every button click the screen will be re-rendered
screen.innerText = buffer;
}

function handleSymbol(symbol){
    // if(symbol === "C") {
    //     buffer = "0";
    //     runningTotal = 0;
    // }
switch(symbol){
    case 'C':
       buffer = "0";
      runningTotal = 0;
      break;  //at the end of every case you need a break
      case '←':
        if (buffer.length === 1){
            buffer ='0';
            }else{
                //start at the beginning and stop just one short of the end
                buffer = buffer.substring(0,buffer.length -1)
            }
        break;

    case '=':
        if(previousOperator === null){      //if this is the first time 
            //you need two numbers to do math
            return;
        }
        flushOperation(+buffer);
                // shorthand for flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = runningTotal;
        screen.innerText='0';
        //runningTotal = 0;  //restart after =
        break;
    case '×':
    case '÷':
    case '+':
    case '−':
        handleMath(symbol);
        break;
    }
}

function handleMath(symbol){
    //console.log('handleMath', symbol);
    if(buffer === '0'){
        //do nothing
        return;   //end function
    }
    //turn buffer into number
    //const intBuffer = parseInt(buffer)
        const intBuffer = +buffer
        if(runningTotal === 0) {
            runningTotal = intBuffer;
        }else{
            flushOperation(intBuffer); 
        }
        previousOperator = symbol;
        //could show runningTotal here
        buffer = '0';
}

function flushOperation(intBuffer){
    if (previousOperator === '+'){
        runningTotal += intBuffer;
    }else if (previousOperator === '−'){
        runningTotal -= intBuffer;
    }else if (previousOperator === '×'){
        runningTotal *= intBuffer;
    }else {(previousOperator ==='÷')
        runningTotal /= intBuffer;
    }
    console.log('running total', runningTotal);
}

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }else{
        buffer+=numberString;
    }

//console.log(buffer);
}


function init(){
    
    document.querySelector('.calc-buttons') //section 
        addEventListener('click', function(event){
            //console.log(event);
            buttonClick(event.target.innerText);
           
        })
}


init();