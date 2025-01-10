// Завдання 1: Генерація випадкового кольору

function generateRandomColors() {
  const colors = [];

  for (let i = 0; i < 5; i++) {
    
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    
    const color = `#${red}${green}${blue}`;
    colors.push(color);
  }

  return colors;
}

const randomColors = generateRandomColors();
console.log(randomColors);


// Завдання 2: Випадковий вибір значення
const fruits1 = ['apple', 'banana', 'cherry', 'date', 'grape'];

function randomChoice(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
console.log(randomChoice(fruits1)); 

const fruits2 = ['apple', 'banana', 'cherry', 'date', 'grape'];
const randomIndex2 = fruits2.sort(() => Math.random() - 0.5);
console.log(randomIndex2[0]);


// Завдання 3: Випадковий масив чисел
function generationRandomArray(n, min, max){
  const arr = [];

  for (let i = 0; i < n; i++) {
    const items = Math.floor(Math.random() * (max - min + 1) + min);
    arr.push(items);
  }

  return arr;

}

console.log(generationRandomArray(5, 1, 100));

// Завдання 4: Округлення випадкових чисел
const MathRandom = Math.random() * 100;

console.log(`Округлення до найближчого: ${Math.round(MathRandom)}`);
console.log(`Округлення вниз: ${Math.floor(MathRandom)}`);
console.log(`Округлення вгору: ${Math.ceil(MathRandom)}`);
console.log(MathRandom);

// Завдання 5: Сортування масиву за випадковим порядком
const numbers = [1, 2, 3, 4, 5];

numbers.sort(() => Math.random() - 0.5);

console.log(numbers);
