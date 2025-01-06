// ----------- Функції: калькулятор -----------

// Калькулятор 1 
function calculate(a, b, operator) {

  let sum;

  switch (operator) {
    case "+":
      sum = a + b;
      break;
    case "-":
      sum = a - b;
      break;
    case "*":
      sum = a * b;
      break;
    case "/":
      if (b === 0) {
        return "error";
      }
      sum = a / b;
      break;
    default:
      return "error: Некоректний оператор";
  }

  
  if (!isFinite(sum)) {
    return "error: Некоректний результат";
  }

  return sum;
}

console.log(calculate(10, 5, "+"))
console.log(calculate(10, 5, "*"))
console.log(calculate(200, 2, "/"))
console.log(calculate(10, 5, "-"))
console.log(calculate(10, 0, "&"))
console.log(calculate(10, 0, "&"))


// Калькулятор 2 
function promptCalculator(a, b, operator){
   
  let sum;

   a = prompt("One number", " ")

   if(isNaN(a) || a === " "){
     alert("Not a number");
     return;
   }

   b = prompt("Two number", " ")

   if(isNaN(b) || b === " "){
     alert("Not a number");
     return;
   }

   operator = prompt("(+, -, *, /)", " ")
   if(operator === "+" || operator === "-" || operator === "/" || operator === "*"){ 
      
   }else{
     return alert(`Character is not defined: ${operator}`);
   }

   switch (operator) {
      case "+":
        sum = +a + +b;
        break;
      case "-":
        sum = a - b;
        break;
      case "*":
        sum = a * b;
        break;
      case "/":
        if (b === 0) {
          return "error";
        }
        sum = a / b;
        break;
      default:
        return "error: Некоректний оператор";
    }

    if (!isFinite(sum) || sum === 0) {
      return alert("error: Некоректний результат");
    } 
  
    return alert(`Результат: ${a} ${operator} ${b} = ${sum}`);

}

promptCalculator()


// ----------- Цикли -----------

// Виведення чисел у діапазоні
let j = 100;

for(let i = 1; i <= j; i++ ){
    if(i % 5 == 0){
        console.log(i);
    }
} 
  
// Просте число
  function isPrime(n) {
    for(let i = 2; i < n; i++){
        if(n % i === 0){
         return false;
        }
    }
    return true;
  }
  console.log(isPrime(7));
  console.log(isPrime(11));
  console.log(isPrime(13));
  console.log(isPrime(8));
  console.log(isPrime(12));
  console.log(isPrime(10));


// Задача з ялинкою
  let n = 3; 

for (let i = 1; i <= n; i++) {
    let row = ""; 
    for (let j = 1; j <= n + i - 1; j++) {
        if (j <= n - i) {
            row += " "; 
        } else {
            row += "*"; 
        }

    }
    console.log(row); 
}



// Шахова дошка
let size = 8;
let simbolWhite = "*"
let simbolBlack = "#";

for(let i = 0; i < size; i++){
 let line = " ";
 
  for(let j = 0; j < size; j++){
   
    line += (i + j) % 2 === 0 ? simbolWhite : simbolBlack;
  
}
console.log(line);

}
