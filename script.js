// Завдання 1: 
function fetchData1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const UsersAge = 20;
      if (UsersAge >= 18 ) {
        resolve("Вам більше 18 років")
      }else{
        reject("Користувачеві менше 18 років");
      }
    }, 3000)  // він в нас знаходиться в стані очікування / pending, із за того, що в нас є функція setTimeout. 
  });
}

fetchData1().then(data => console.log(data)).catch(error => console.log(error));



// Завдання 2:
function fetchData() {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.7; 
    setTimeout(() => (success ? resolve("Дані отримано") : reject("Помилка")), 500);
  });
}

function retryFetch(fetchData, retries) {
  return new Promise((resolve, reject) => {
    function attemptData() {
      fetchData()
        .then(resolve) 
        .catch((error) => {
          if (retries <= 5) {
            retries++; 
            console.log(`Спроба не вдалася: ${retries}`);
            attemptData(); 
          } else {
            reject(error);
          }
        });
    }

    attemptData(); 
  });
}

// Використання retryFetch
retryFetch(fetchData, 0)
  .then((data) => console.log("Успіх:", data)) 
  .catch((err) => console.error("Не вдалося отримати дані:", err)); 



// Завдання: 3
const cart = [
  { name: "Телефон", price: 700, quantity: 1 },
  { name: "Ноутбук", price: 1500, quantity: 2 },
  { name: "Мишка", price: 50, quantity: 3 },
];

function calculateTotal(cart) {

const calculateTotalReduce = cart.reduce((calculate, currentValue) => {
return calculate += (currentValue.price * currentValue.quantity);
}, 0)

return calculateTotalReduce;
}
console.log(calculateTotal(cart)); // Очікується: 3850


// Завдання: 4
function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };  // було об'єднання obj2.
}

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

const merged = mergeObjects(obj1, obj2);

console.log(merged); // Очікується: { a: 1, b: 3, c: 4 }
console.log(obj1);   // Очікується: { a: 1, b: 2 } (не має змінюватися)






















