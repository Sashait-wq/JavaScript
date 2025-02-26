const initialState = {
    elementRouletteDefault: 3,
    roulettePosition: 0,
    spinning: false,
}


const elements = {
    parentImg: null,
    buttonClick: null,
    addBtn: null,
    removeBtn: null,
}

// прив'язка до наших елементів.
function ourElements(){
 elements.parentImg = document.querySelector(".parent-img"); 
 elements.buttonClick = document.querySelector("#click-btn")
 elements.addBtn = document.querySelector("#add-btn")
 elements.removeBtn = document.querySelector("#remove-btn")

 defaultElements();
} 
ourElements();


// Функція створення елементів за замовчуванням
function defaultElements() {
    const neededElements = initialState.elementRouletteDefault - elements.parentImg.children.length;
    for (let i = 0; i < neededElements; i++) {
        createElement();
    }
}


// Рандомний колір
function randomColors(){
    const str = "0123456789ABCDEF";
 
    let randomColor = "#"
 
    for (let i = 0; i < 6; i++) {
     randomColor += str[Math.floor(Math.random() * str.length)]
    }
    return randomColor;
}


// Функція створення нового елемента і рандомного кольору.
function createElement() {
    const div = document.createElement("div");
    div.classList.add("element");
    const color = randomColors();
    div.innerText = Math.floor(Math.random() * 100)
    div.style.background = color;
    elements.parentImg.appendChild(div);
}


// Додаємо новий елемент.
elements.addBtn.addEventListener("click", () => {
    if (elements.parentImg.children.length < 9) {
        createElement();
        createElement();
        elements.removeBtn.disabled = false;
    }
    elements.addBtn.disabled = elements.parentImg.children.length === 9;
});


// Видаляння елемента.
elements.removeBtn.addEventListener("click", () => {
    if (elements.parentImg.children.length > initialState.elementRouletteDefault) {
        elements.parentImg.lastElementChild.remove();
        elements.parentImg.lastElementChild.remove();
    }

    if (elements.parentImg.children.length === initialState.elementRouletteDefault) {
        elements.removeBtn.disabled = true;
    }
})


elements.buttonClick.addEventListener("click", () => {
    if (initialState.spinning) return;
    initialState.spinning = true;
    elements.removeBtn.disabled = true;
    elements.addBtn.disabled = true;
    elements.buttonClick.disabled = true;
    let itemWidth = elements.parentImg.children[0].offsetWidth + 10; // Включаючи gap
    let shiftAmount = itemWidth;
    
    function slide() {
        elements.parentImg.style.transition = "transform 0.4s linear";
        elements.parentImg.style.transform = `translateX(${shiftAmount}px)`;
        
        setTimeout(() => {
            let lastElement = elements.parentImg.children[elements.parentImg.children.length - 1];
            lastElement.style.transition = "none";
            lastElement.style.transform = `translateX(-${elements.parentImg.offsetWidth}px)`;
            elements.parentImg.prepend(lastElement);

            // requestAnimationFrame створення плавних анімацій
            requestAnimationFrame(() => {
                lastElement.style.transition = "transform 0.4s linear";
                lastElement.style.transform = "translateX(0)";
            });
            
            elements.parentImg.style.transition = "none";
            elements.parentImg.style.transform = "translateX(0)";
        }, 390);
    }
    
    let interval = setInterval(slide, 400);
    
    setTimeout(() => {
        clearInterval(interval);
        initialState.spinning = false;
        elements.removeBtn.disabled = false;
        elements.addBtn.disabled = false;
        elements.buttonClick.disabled = false;
        
        setTimeout(selectWinner, 500); // затримка 
    }, 3500);
});


// Функція визначення виграшного елемента
function selectWinner() {

    // getBoundingClientRect() об'єкт із розмірами елемента
    let parentRect = elements.parentImg.getBoundingClientRect();
    let centerX = parentRect.left + parentRect.width / 2;
    
    let closestElement = null;
    let closestDistance = Infinity;
    
    Array.from(elements.parentImg.children).forEach((child) => {
        let childRect = child.getBoundingClientRect();
        let childCenterX = childRect.left + childRect.width / 2;
        let distance = Math.abs(centerX - childCenterX);
        
        if (distance < closestDistance) {
            closestDistance = distance;
            closestElement = child;
        }
    });
    
    if (closestElement) {
        closestElement.classList.add("winer");
        // closestElement.cloneNode(true) створює копію елемента.
        modalWindow(closestElement.cloneNode(true));
    }
}

// Функція для додавання елемента в modal
function modalWindow(elem){
     const modal = document.querySelector(".modal")
     const modalWin = modal.querySelector(".modal-win")
     modalWin.insertBefore(elem, modalWin.firstChild);
     modal.style.display = "flex";
}

// Кнопка для закривання modal
const removeModalWindow = document.querySelector(".remove-btn_two");
removeModalWindow.addEventListener("click", () => {
    const modal = document.querySelector(".modal")
    modal.style.display = "none";
    document.querySelector(".modal-win").querySelector(".element").remove();
});



















