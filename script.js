 let bookItem = []

function createAside() {
    const formFild = [
        {
            title: 'Book Title',
            placeholder: 'Enter Book Title',
            type: 'text',
            name: 'title',
            req: true
        }, {
            title: 'Book Autor',
            placeholder: 'Enter Book Autor',
            type: 'text',
            name: 'autor',
            req: true
        }, {
            title: 'Select Book Image',
            placeholder: null,
            type: 'file',
            name: 'img',
            req: false
        },
    ]
    const form = document.createElement('form');
    formFild.forEach(f => {
        const field = createFormRow(f.title, f.type, f.name, f.placeholder, f.req);
        form.append(field);
    })

    const label = document.createElement('label');
    label.innerHTML = `
    <label>
                <input required name="randomID" type="text">
                <button onclick="generateRandomID(16, '_random_')" type="button">radnom ID</button>
            </label>
            <div class="form-action">
                <button type="submit">create book</button>
            </div>
    `
    form.append(label);
    return form;
};

// є завдання, і є моє рішення, воно працює але правильно воно виглядає чи ні 
function createFormRow(title, type = 'text', name = null, placeholder = null, req = false) {

    const divFormRow = document.createElement("div");
    divFormRow.classList.add("form-row");
    const label = document.createElement("label");
    const input = document.createElement("input");
    if (placeholder) {
        input.placeholder = placeholder;
    }
    if (name) {
        input.name = name;
    }
    input.required = req;
    if (type === 'file') {
        input.hidden = true;
        label.classList.add('select_img');
        
        // 2_HW  зробити видаляння поточної картинки, та повернення тексту назат
        input.addEventListener('change', function (e) {
            const files = e.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.classList.add('imgViev');
                    label.innerHTML = ``;
                    label.prepend(img);
                }
                reader.readAsDataURL(file);
            }
        })

        // За допомогою dblclick буде remove img. І потім повертаємо все назад. 
        label.addEventListener("dblclick", () => {
            const img = label.querySelector('.imgViev');
            if (img){  
              img.remove(); 
            } 
            label.textContent = 'Select Book Image';
            label.append(input);
        });
    }
    input.type = type;
    label.append(title);
    label.append(input);

    divFormRow.append(label);
    return divFormRow
};

function createMainConteiner(createAside, createRightContainer) {
    const div = document.createElement("div");
    div.classList.add("main-container")

    const aside = createAside();
    aside.classList.add("aside");
    const right = createRightContainer();
    div.appendChild(aside);
    div.appendChild(right);
    document.getElementsByTagName("body")[0].appendChild(div);
    createBookFromForm();

};

createMainConteiner(createAside, createRightContainer);

// почати використовувати всюди
function createElement(elem, classList) {
    // що робити якщо "classList" массив
    // що робити якщо "classList" строка
    // як повинен вирулювати в коді
    const div = document.createElement(elem);
    div.classList.add(classList);
    return div;
}

function createRightContainer() {
    const container = createElement('div', 'right-container');
    const card = createElement('div', 'card');
    const rowDiv = createElement('div', 'row');
    const formAutor = createFormRow('Autor');
    const formTitle = createFormRow('Title');
    const formFav = createFormRow('Favorite', 'checkbox');

    rowDiv.append(formTitle);
    rowDiv.append(formAutor);
    rowDiv.append(formFav);

    const card2 = createElement('div', 'card');
    const itemList = createElement('div', 'item-list');
    bookItem.forEach((item) => {
        itemList.append(createItem(item));
    })
    card2.append(itemList);
    card.appendChild(rowDiv);
    container.appendChild(card);
    container.appendChild(card2);
    return container;
}

function createItem(item) {
    const itemDiv = createElement('div', 'item');
    itemDiv.id = item.randomID; 
    // коли нема посилання на картинку. встановити дефолт Картинку

    // подумати як зробити img
    const classFav = item.fav ? 'item-fav item-fav-active' : 'item-fav';
   
    itemDiv.innerHTML = `
    <div class="item-info">
         <div class="item-img">
             <img class="img-2" src="${ item.imgUr }" alt="">
         </div>
         <div class="item-box">
             <h3 class="item-title">${ item.title }</h3>
             <div class="item-author">${ item.autor }</div>
         </div>
     </div>
     <div class="item-controll">
        <label class="${ classFav }">fav<input hidden="" onclick="updateItemFav('${ itemDiv.id }')" value="${ item.fav }" type="checkbox"></label>
         <button onclick="editItem('${ itemDiv.id }')">edit</button>
         <button onclick="deleteItem('${ itemDiv.id }')">del</button>
     </div>
    `;
    
    return itemDiv;
}

function createBookFromForm() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const book = {
            fav: false,
            description: '',
            text: '',
        }
        for (const [key, value] of formData.entries()) {

            book[key] = value;
        }
        setItemByStorage(book);
        bookItem.push(book);
        updateItemList();
        form.reset();
    });
}

function updateItemList() {
    const list = document.querySelector('.item-list');
    list.innerHTML = '';
    bookItem.forEach((item) => {
        list.append(createItem(item));
    })
}

function generateRandomID(length, prefix) {
    const charts = 'QWERTYUIOPLKJHGFDSAZXVBVBNNMqwertyuioplkjhgfdsazxvbvbnnm1234567890';
    let id = prefix;
    for (let i = 0; i < length; i++) {
        id += charts.charAt(Math.floor(Math.random() * charts.length));
    }
    document.querySelector('input[name="randomID"]').value = id;
}

function setItemByStorage(item) {
    localStorage.setItem('items', JSON.stringify([item]));
}

function updateItemFav(id) {
    bookItem.forEach((item) => item.randomID === id && (item.fav = !item.fav));

    updateItemList();
}

function deleteItem(id) {
    bookItem=   bookItem.filter(item => item.randomID !== id);
    updateItemList();
}




function editItem() {
    const mainContainer = document.querySelector('.main-container');
    
    // Видаляє старий main-container і створює новийй. 
    mainContainer.remove();

    createMainConteiner(createdNewAside, createdNewRightContainer);
}


function createdNewAside(){
   
    const NewAsideContainer = createElement("div", "aside")
    
    const createNewSelectImage = createFormRow('Select image', 'file', "img")

    NewAsideContainer.appendChild(createNewSelectImage)
 
    // Повертаємо елемент aside
    return NewAsideContainer;
}

function createdNewRightContainer(){

    // Наші поля
    const NewFormFild = [
        {
            title: 'Show ID',
            placeholder: '',
            type: 'text',
            name: 'randomID',
            req: true
        }, {
            title: 'Edit title',
            placeholder: 'Enter Book Title',
            type: 'text',
            name: 'autor',
            req: true
        }, {
            title: 'Edit ID',
            placeholder: 'Enter Book ID',
            type: 'text',
            name: 'Enter Book',
            req: false
        },{
            title: 'Description',
            placeholder: 'Enter description',
            type: 'textarea',
            name: 'Book Description',
            req: false
        },{
            title: 'Edit full text',
            placeholder: 'Enter Book Text',
            type: 'textarea',
            name: 'Edit text',
            req: false
        }
    ]
    
    const NewRightContainer = createElement("div", "right-container")
    const form = document.createElement('form')

     // Додаємо поля до форми
    NewFormFild.forEach(f => {
        const field = createFormRow(f.title, f.type, f.name, f.placeholder, f.req);
        form.append(field);
    })
    
    NewRightContainer.append(form);

     // Повертаємо елемент aboutBookss
     return NewRightContainer;
}

// Я не знаю, як створити textarea. 





