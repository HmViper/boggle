const boggle = document.querySelector('.boggle');
let down = false;  // флаг нажатия кнопки мыши
let word = '';      // готовое слово при отпускании кнопки мыши
let tempWord ='';  // переменная временного хранения буквы при перемещении
   
['mousedown', 'mousemove', 'mouseup'].forEach(event => 
    boggle.addEventListener(event, selectWord)); // задаем слушатели на все поле boggle

function selectWord(event) {
    
    if (event.currentTarget === event.target) {  // делегируем события с поля на кнопки с буквами
    return;
    }

    if(event.type == 'mousedown') {                   // проверка нажата ли кнопка мыши
        down = true;                                  // отмечаем нажатие кнопки флагом нажатия
    }                                                  
    
    if(event.type == 'mousemove' ) {                    // добавляем букву при нажатии и протаскивании мыши
        if(down) {                                      // если кнопка нажата и есть протаскивание
            event.target.classList.add("choosen");  
                                                            // добавляем класс добавлющий рамку на кнопку с буквой
            if (tempWord !== event.target.textContent) {   // следим меняется ли буква в целевой кнопке 
                 word += event.target.textContent;          // если меняется до добавляем букву в слово;           
                tempWord = event.target.textContent;   // добавляем букву во временную переменную
            }                       
        }
    }

    if(event.type == 'mouseup' )  {
        down = 0;                                           // сбрасываем флаг нажатия кнопки мыши 
        console.log(word);                                 //   !!! ЗДЕСЬ НЕОБХОДИМО ПРОВЕРЯТЬ СЛОВО ЛИБО
                                                           //       ВОЗВРАЩАТЬ ИЗ КОЛЛБЭКА
        word ='';                                           // обнуляем слово
        const choosen = document.querySelectorAll('.choosen'); // выбираем все отмеченные кнопки
        choosen.forEach(el => {
            el.classList.remove("choosen");                 // удаляем класс обводки на всех кнопксх
        })   

    }

}   


