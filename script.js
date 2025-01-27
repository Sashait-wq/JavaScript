    const imgInput = document.getElementById('ImgInput');
    const previewContaner = document.getElementById('previewContaner');
    const countText = document.getElementById('countText'); // Лічильник зображень
    countText.innerHTML = "Upload:";
    
    let startCount = 0; 
    const maxCount = 9;
    
    imgInput.addEventListener('change', function (e) {
        const files = e.target.files;

        for (let i = 0; i < files.length; i++) {

          // перевірка, якщо startCount буде більше або дорівнювати maxCount, і коли досягнуто лімітми ми з неї виходимо break.
            if (startCount >= maxCount) {
                countText.innerText += " / Ліміт досягнуто";
                imgInput.disabled = true; 
                break; 
            }
    
            const file = files[i];
            const reader = new FileReader();
    
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('imgViev');
                previewContaner.prepend(img);

                // Оновлюємо лічильник
                startCount++;
                countText.innerText = `Upload: ${startCount} of ${maxCount}`;
            };
    
            reader.readAsDataURL(file);
        }
    });

// коли юзер хоче завантажити більше 10 картинок завантажити перші 10, а після цього показати помилку   --


   
  
  
  