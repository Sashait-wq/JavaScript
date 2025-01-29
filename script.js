  const bookItem = [
    {
        title: 'Book Title',
        autor: 'Book autor',
        imgUrl: '',
        id: '1234-4321',
        fav: false,
        description: 'description',
        text: 'text book text',
    }, {
        title: 'Book Title1',
        autor: 'Book autor2',
        imgUrl: '',
        id: '1234-4321323',
        fav: true,
        description: 'description1',
        text: 'text book text1',
    },
]

function createAside() {
    const formFild = [
        {
            title: 'Book Title',
            placeholder: 'Enter Book Title',
            type: 'text',
            name: 'title',
            accept: null
        }, {
            title: 'Book Autor',
            placeholder: 'Enter Book Autor',
            type: 'text',
            name: 'autor',
            accept: null
        }, {
            title: 'Select Book Img',
            placeholder: null,
            type: 'file',
            name: 'img',
            accept: "image/*"   // 1 завдання: додавання accept: "image/*" для перевірки, що це картинка.
        },
    ]
    const form = document.createElement('form');
    formFild.forEach(f => {
        const field = createFormRow(f.title, f.type, f.name, f.placeholder, f.accept);
        form.append(field);
    })

    const label = createElement('label');
    label.innerHTML = `
             <label class="form-footer">
                <input name="id" type="text">
                <button type="button">set ID</button>
                or
                <button type="button">radnom</button>
            </label>
            <div class="form-action">
                <button type="submit">create book</button>
            </div>
    `
    form.append(label);
    return form;
};



function createFormRow(title, type = 'text', name = null, placeholder = null, accept = null) {
    // Продумати, як можна додати до типу файл , фільтер що це картинки

    const divFormRow = createElement("div", "form-row");

    const label = createElement("label");
    const input = createElement("input");
    if (placeholder) {
        input.placeholder = placeholder;
    }
    if(name){
        input.name = name;
    }

    // перевірка на, що це картинка;
    if(accept){
      input.accept = accept;
    }
    
    input.type = type;
    label.append(title, input); // скоротив до одного append.

    divFormRow.append(label);
    return divFormRow
};

function createMainConteiner() {
    const div = createElement("div", "main-container");

    const aside = createAside();
    aside.classList.add("aside");
    const right = createRightContainer();

    div.append(aside, right) // скоротив до одного append.

    document.getElementsByTagName("body")[0].appendChild(div);
};

createMainConteiner();

// почати використовувати всюди
function createElement(elem, classList) {
    const div = document.createElement(elem);

    // Перевіряємо, чи classList є масивом
    if (Array.isArray(classList)) {
        div.classList.add(...classList); 
    } else if (typeof classList === "string") {
        div.classList.add(classList);  
    }

    return div;
}

function createRightContainer() {
    const container = createElement('div', 'right-container');
    const card = createElement('div', 'card');
    const rowDiv = createElement('div', 'row');
    const formAutor = createFormRow('Autor');
    const formTitle = createFormRow('Title');
    const formFav = createFormRow('Favorite', 'checkbox');

    rowDiv.append(formTitle, formAutor, formFav);  // скоротив до одного append.
   
    const card2 = createElement('div', 'card');
    const itemList = createElement('div', 'item-list');
    bookItem.forEach((item) => {
        itemList.append(createItem(item));
    })
    card2.append(itemList);
    card.appendChild(rowDiv);

    container.append(card, card2) // скоротив до одного append.
    return container;
}


function createItem(item) {
    const itemDiv = createElement('div', 'item');
    itemDiv.id = item.id;

    // коли нема посилання на картинку. встановити дефолт Картинку
    // подумати як зробити img

    const defaultImage = "https://cdn.vectorstock.com/i/500p/32/45/no-image-symbol-missing-available-icon-gallery-vector-45703245.jpg";

    const imgUrl = item.imgUrl !== "" ? item.imgUrl : defaultImage;
    
    itemDiv.innerHTML = `
    <div class="item-info">
         <div class="item-img">
             <img src="${ imgUrl }" alt="">
         </div>
         <div class="item-box">
             <h3 class="item-title">${ item.title }</h3>
             <div class="item-author">${ item.autor }</div>
         </div>
     </div>
     <div class="item-controll">
     <label class="label-fav" >fav<input class="item-fav-check" value="${ item.fav }" type="checkbox"></label>
         <button>edit</button>
         <button>del</button>
     </div>
    `;

    return itemDiv;
}
function createBookFromForm(){
    const form = document.querySelector('form');

    console.log(form);
    

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const book = {}
    for (const [key, value] of formData.entries()) {
        book[key] = value;
    }
    console.log(book);
});
}
createBookFromForm()




  