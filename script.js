 function numbers() {
    const inputCountry = document.querySelector('[name="country"]');
     // Достукалися до батьківського label.
     const lablePhone = document.querySelector(".style-label")
     // І в середині нього находимо input
     const inputPhone = lablePhone.querySelector('input');
     // навішуємо на інпут disabled
    inputPhone.disabled = true;
    inputPhone.placeholder = "Виберіть Країну";

    const countryCodes = {
        "ua": "+380",
        "uk": "+44",
        "fr": "+33"
    };

    inputCountry.addEventListener("change", () => {
        const countryCode = countryCodes[inputCountry.value];

        if (countryCode) {
            inputPhone.disabled = false;
            inputPhone.value = countryCode;
            inputPhone.classList.remove("color-red"); 
            // виклик функції
            regexNumbers();
        } else {
            inputPhone.value = "Невідома країна";
            inputPhone.classList.add("color-red");
        }
    });
}

numbers();

function regexNumbers() {
    const inputPhone = document.querySelector('[name="phone"]');
    const btn = document.querySelector("#btn-submit");

    const phoneCountry = {
        "ua": /^\+380\d{2}\d{3}\d{4}$/,    
        "uk": /^\+44\d{4}\d{6}$/,          
        "fr": /^\+33\d\d{2}\d{2}\d{2}\d{2}$/ 
    };

    inputPhone.addEventListener("input", (event) => {
        const inputValue = event.target.value;
        // selectedCountry дорівнює значеню полю country
        const selectedCountry = document.querySelector('[name="country"]').value;
        // regex дорівнює значенню регулярного виразу
        const regex = phoneCountry[selectedCountry];

        inputPhone.classList.remove("green", "red");

        const isValid = regex && regex.test(inputValue);
        if(isValid){
            inputPhone.classList.add("green")
            inputPhone.classList.remove("red");
        }else{
            inputPhone.classList.remove("green");
            inputPhone.classList.add("red")
        }
        btn.disabled = !isValid; 
    });
}


   








      








