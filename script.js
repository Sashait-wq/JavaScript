// Задача 1: Відстеження розміру вікна

// створення функції для tag і selectorю
function createTagAndSelectors(tag, selector){
  const element = document.createElement(tag);
  element.className = selector;
  return element;
}

// функції додавання та видалення classList
function addClassList(item, classList){
  return item.classList.add(classList);
 }

 function removeClassList(item, classList){
  return item.classList.remove(classList);
 }

const windowWidth1 = document.querySelector(".container-size")

// Створюємо елемент для ширини.
const widthElement  = createTagAndSelectors("p", "width-size");

// Створюємо елемент для висоти.
const heightElement = createTagAndSelectors("p", "height-size");

// Додаємо елементи до контейнера
windowWidth1.append(widthElement , heightElement)

function widthAndHeight(){
  const width = window.innerWidth;
  const height = window.innerHeight;
   
    if(width > 500){
      widthElement.innerText = `Поточна ширина: ${width}px`;
      removeClassList(widthElement, "small-size")
    }else{
      addClassList(widthElement, "small-size")
      widthElement.innerText = `Розмір вікна занадто малий: ${width}px!`;
    }
    
    if(height > 500){
      removeClassList(heightElement, "small-size")
      heightElement.innerText = `Поточна висота: ${height} px`;
    }else{
      addClassList(heightElement, "small-size")
      heightElement.innerText = `Поточна висота занадто мала: ${height} px`;
    }   
}

// Додаємо обробник події resize
window.addEventListener("resize", widthAndHeight);
widthAndHeight();



// Задача 2: Таймер і робота з location
const timer = document.getElementById("timer")
timer.innerText = "Відлік:"

let count = 11;

const intervalId = setInterval(() => {
  count--;
  timer.innerText = `Відлік: ${count}`
  if (count === 0) {
    clearInterval(intervalId);
    
    // для зручності створенно confirm.
    const response = confirm("Ви точно хочете перейти на сайт?"); 
    if(response){
      timer.innerText = "Перенаправлення..." 
      location.href = "https://google.com"
    }else[
      timer.innerText = "Скасовано!"
    ]
  }
}, 1000);

// Для зручності.
const container = document.querySelector(".container");
container.append(windowWidth1, timer);



// Задача: 3
const createElement = (selector, className) => {
        const elem = document.createElement(selector);
        elem.className = className;
        return elem;
    }
    const tabsContainer = createElement('div', 'tabs-container')
    const tabs = createElement('div', 'tabs-header')
    const tabsContents = createElement('div', 'tabs-contents')
    for (let i = 1; i <= 3; i++) {
        createTabsHead(i)
        createTabsContent(i)
    }
    
    function createTabsContent(i) {
        const tab = createElement('div', 'tab')
        if (i === 1) {
            tab.classList.add('active');
        }
        tab.setAttribute('data-tab', i);
        tab.textContent = `Tab index: ${ i }`;
        tab.addEventListener('click', () => switchTabs(tab))
        tabs.appendChild(tab);
    }
    
    function createTabsHead(i) {
        const tabContent = createElement('div', 'tab-content')
        if (i === 1) {
            tabContent.classList.add('active')
        }
        tabContent.textContent = `Tab index: ${ i }`;
        tabContent.id = `tab-${ i }`;
        tabsContents.appendChild(tabContent);
    }
    
    tabsContainer.appendChild(tabs);
    tabsContainer.appendChild(tabsContents);
    document.body.appendChild(tabsContainer);

    function switchTabs(tabContent) {
      if (tabContent.classList.contains("active")) {
          return;
      }
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'))
      document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'))

      const selectContent = document.getElementById(`tab-${ tabContent.getAttribute('data-tab') }`);
      tabContent.classList.add('active')
      selectContent.classList.add('active')
  }