const boggle = document.querySelector('.boggle');
const wordPlace = document.querySelector('.word');
const scoreBoard = document.querySelector('.scoresTable');
const scoreUser = document.querySelector('.score');
const userScore = 0;
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
        down = true;   
        word += event.target.textContent;
        tempWord = event.target.textContent;                              // отмечаем нажатие кнопки флагом нажатия
    }                                                  
    
    if(event.type == 'mousemove' ) {                    // добавляем букву при нажатии и протаскивании мыши
        if(down) {                                      // если кнопка нажата и есть протаскивание
            event.target.classList.add("choosen");  
                                                            // добавляем класс добавлющий рамку на кнопку с буквой
            if (tempWord !== event.target.textContent) {   // следим меняется ли буква в целевой кнопке 
                 word += event.target.textContent; 
                  wordPlace.value = word;         // если меняется до добавляем букву в слово;           
                tempWord = event.target.textContent;   // добавляем букву во временную переменную
            }                       
        }
    }

    if(event.type == 'mouseup' )  {
        down = 0;                                           // сбрасываем флаг нажатия кнопки мыши 
        console.log(word);                                 //   !!! ЗДЕСЬ НЕОБХОДИМО ПРОВЕРЯТЬ СЛОВО ЛИБО
                                                           //       ВОЗВРАЩАТЬ ИЗ КОЛЛБЭКА
        word =''; 
        wordPlace.value = '';                                           // обнуляем слово
        const choosen = document.querySelectorAll('.choosen'); // выбираем все отмеченные кнопки
        choosen.forEach(el => {
            el.classList.remove("choosen");                 // удаляем класс обводки на всех кнопксх
        })   

    }

}   

const localStorageUse = (inputScore = 0) => {
   // console.log(localStorage.getItem('boggleTeam').length);
     if(localStorage.getItem('boggleTeam') === null) {
         localStorage.setItem('boggleTeam', JSON.stringify({score: [0]}));
     }
   
   // console.log(localStorage.getItem('boggleTeam'));
    let scoresObj = JSON.parse(localStorage.boggleTeam );
    let topScores = scoresObj.score; 
    const idx = topScores.findIndex(v => v > inputScore);
    topScores.splice(idx > -1 ? idx : topScores.length, 0, inputScore);
    if(topScores.length > 10) {
        topScores.sort((a, b) => b - a );
        topScores = topScores.slice(0,10);
    }
    localStorage.setItem('boggleTeam', JSON.stringify({score: topScores}));
    scoresObj = JSON.parse(localStorage.boggleTeam );
    return topScores;
}
localStorageUse();

const addToInputScores = () => {
   // localStorage.setItem('boggleTeam', JSON.stringify({score: [0,1,2,5,6,7,8,10]}));
    let scoresObj = JSON.parse(localStorage.boggleTeam );
    let topScores = scoresObj.score; 
    let ulEl = document.createElement('ul');
     topScores.forEach((element) => {
        let liEl = document.createElement('li');
        liEl.textContent = element;
        ulEl.appendChild(liEl);
     });
     scoreBoard.appendChild(ulEl);

}
addToInputScores();