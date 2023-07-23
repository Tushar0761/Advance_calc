const numberButton = document.querySelectorAll(".nBtn");
const operatorButton = document.querySelectorAll(".oBtn");
const functionButton = document.querySelectorAll(".fBtn");
const equalButton = document.querySelector('.eBtn')

const histroyDiv = document.querySelector('.historyDiv')

const display = {
  current: document.querySelector('.current'),
  result: document.querySelector('.result'),
}

let number1 = null;
let number2 = null;
let operator = '';
let ans = null;

let isCurrent = false;
let isInput = false;
let isOperator = false;

let isDot = false;

let isNumber1 = false;

let isCalculated = false;


numberButton.forEach((e) => {
  e.addEventListener('click', () => {
    if (!isCurrent) {
      display.current.textContent = ''
      // return;
    }

    isCurrent = true;
    isInput = true;
    number2 = null

    if (e.textContent === '·') {
      if (!isDot) {
        display.current.textContent += '.'
      }
      isDot = true;
      return;
    }

    if (isCalculated) {
      display.current.textContent = ''
      console.log('iscalc');
      isCalculated = false
    }
    if (display.current.textContent.length > 14) {
      console.log('max');
      return;
    }

    display.current.textContent += e.textContent
  })

})

operatorButton.forEach((e) => {
  e.addEventListener('click', () => {

    if (!isOperator) {

      isDot = false;
      if (!isInput) {
        console.log('there is no input');
        isInput = true;
        return;
      }

      operator = e.textContent;

      isNumber1 = true;
      number1 = Number(display.current.textContent);


      display.current.textContent = 0;
      display.result.textContent = number1;
      isCurrent = false;
      console.log(operator);
      isOperator = true;

    }
    operator = e.textContent;

  })
})


equalButton.addEventListener('click', () => {
  isDot = false;
  isOperator = false;

  if (number1 === null && number2 === null) {
    console.log('No input');
    return;
  }
  if (number2 === null) {
    number2 = Number(display.current.textContent);
  }


  display.result.textContent = `= ${number1} ${operator} ${number2}`;

  switch (operator) {
    case '+':
      console.log('add');
      display.current.textContent = number1 + number2;
      break;
    case '-':
      display.current.textContent = number1 - number2;
      console.log('sub');
      break;
    case '÷':
      console.log('div');
      if (number2 === 0) {
        console.log('cannot divide by zero');
        display.current.textContent = 0;
        break;
      }
      display.current.textContent = number1 / number2;

      break;
    case 'X':
      console.log('mul');
      display.current.textContent = number1 * number2;
      break;
    case '%':
      display.current.textContent = number1 % number2;
      console.log('per');
      break;

    default:
      break;
  }
  ans = Number(display.current.textContent)
  addHistory();
  number1 = Number(display.current.textContent);

  isCalculated = true;
  ans = Number(number1);
})


functionButton.forEach((e) => {

  e.addEventListener('click', () => {

    switch (e.value) {

      case 'ac':
        console.log('ac');
        number1 = null;
        number2 = null;
        ans = null;
        isCalculated = false;
        isInput = false;
        isDot = false;
        isNumber1 = false;
        isCurrent = false;
        display.current.textContent = display.result.textContent = 0
        histroyDiv.innerHTML = '';
        console.clear()
        break;


      case 'de':
        console.log('de');
        if (display.current.textContent.length === 1) {
          display.current.textContent = '0'
          isCurrent = true;

          break;
        }
        display.current.textContent = display.current.textContent.slice(0, -1)
        break;


      case 'pm':
        display.current.textContent = Number(display.current.textContent) * (-1);
        break;


      case 'ans':
        console.log('ans');
        if (ans === null) {
          console.log('there is no ans rn');
          break;
        }
        display.current.textContent = ans;
        number2 = null;
        break;


    }

  })



})

let numberArr = ['0', "1", '2', '3', '4', '5', '6', '7', '8', '9', '.']
let operatorArr = ['+', '-', '*', '/', '%']

document.addEventListener('keydown', (e) => {

  let op;

  if (numberArr.includes(e.key)) {

    if (!isCurrent) {
      display.current.textContent = ''
      // return;
    }

    isCurrent = true;
    isInput = true;
    number2 = null
    if (e.key == '.') {
      if (!isDot) {
        display.current.textContent += '.'
      }
      isDot = true;
      return;
    }

    if (isCalculated) {
      display.current.textContent = ''
      console.log('iscalc');
      isCalculated = false
    }
    if (display.current.textContent.length > 14) {
      console.log('max');
      return;
    }

    display.current.textContent += e.key


  }

  if (operatorArr.includes(String(e.key))) {

    if (!isOperator) {
      isDot = false;

      if (!isInput) {
        console.log('there is no input');
        isInput = true;
        return;
      }

      if (e.key === '*') {
        op = 'X'
        console.log(' op is x');
      } else if (e.key === '/') {
        op = '÷'
      } else {

        op = e.key;
      }
      operator = op;

      isNumber1 = true;
      number1 = Number(display.current.textContent);


      display.current.textContent = 0;
      display.result.textContent = number1;
      isCurrent = false;
      isOperator = true;

    } else {
      if (e.key === '*') {
        op = 'X'
        console.log(' op is x');
      } else if (e.key === '/') {
        op = '÷'
      } else {

        op = e.key;
      }
      operator = op;

    }




    op = null;
  }
  if (e.key === 'Enter') {
    isDot = false;
    isOperator = false;
    if (number1 === null && number2 === null) {
      console.log('No input');
      return;
    }
    if (number2 === null) {
      number2 = Number(display.current.textContent);
    }


    display.result.textContent = `= ${number1} ${operator} ${number2}`;

    switch (operator) {
      case '+':
        console.log('add');
        display.current.textContent = number1 + number2;
        ans = display.current.textContent;
        break;
      case '-':
        display.current.textContent = number1 - number2;
        ans = display.current.textContent;
        console.log('sub');
        break;
      case '÷':
        console.log('div');
        if (number2 === 0) {
          console.log('cannot divide by zero');
          display.current.textContent = 0;
          break;
        }
        display.current.textContent = number1 / number2;
        ans = display.current.textContent;

        break;
      case 'X':
        console.log('mul');
        display.current.textContent = number1 * number2;
        ans = display.current.textContent;
        break;
      case '%':
        display.current.textContent = number1 % number2;
        ans = display.current.textContent;
        console.log('per');
        break;

      default:
        break;
    }

    isCalculated = true;
    addHistory();
    number1 = Number(display.current.textContent);
  }
})



// add histroy
let history;



function addHistory() {
  const div = `<div class="history">
        <div class="ans">${ans}</div>
        <div class="exp">${number1} ${operator} ${number2}</div>
      </div>`
  histroyDiv.innerHTML = div + histroyDiv.innerHTML;

  history = document.querySelectorAll('.history')
  history.forEach((e) => {
    e.addEventListener('click', () => {

      display.current.textContent = e.querySelector('.ans').textContent
      if (isOperator) {
        number2 = Number(e.querySelector('.ans').textContent)
      }
    })
  }
  )



}



