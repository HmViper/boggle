const boggle = document.querySelector(".boggle");
let down = false; // флаг нажатия кнопки мыши
let word = ""; // готовое слово при отпускании кнопки мыши
let tempWord = ""; // переменная временного хранения буквы при перемещении
const score = document.querySelector(".score");

["mousedown", "mousemove", "mouseup"].forEach((event) =>
  boggle.addEventListener(event, selectWord)
); // задаем слушатели на все поле boggle
const mixedButton = document.querySelector('.mix');
const allLetters = document.querySelectorAll('.btn');
const timerSpan = document.querySelector('.timer');


let down = false;  // флаг нажатия кнопки мыши
let word = '';      // готовое слово при отпускании кнопки мыши
let tempWord ='';  // переменная временного хранения буквы при перемещении
   
['mousedown', 'mousemove', 'mouseup'].forEach(event => 
    boggle.addEventListener(event, selectWord)); // задаем слушатели на все поле boggle


function selectWord(event) {
  if (event.currentTarget === event.target) {
    // делегируем события с поля на кнопки с буквами
    return;
  }

  if (event.type == "mousedown") {
    // проверка нажата ли кнопка мыши
    down = true; // отмечаем нажатие кнопки флагом нажатия
  }

  if (event.type == "mousemove") {
    // добавляем букву при нажатии и протаскивании мыши
    if (down) {
      // если кнопка нажата и есть протаскивание
      event.target.classList.add("choosen");
      // добавляем класс добавлющий рамку на кнопку с буквой
      if (tempWord !== event.target.textContent) {
        // следим меняется ли буква в целевой кнопке
        word += event.target.textContent; // если меняется до добавляем букву в слово;
        tempWord = event.target.textContent; // добавляем букву во временную переменную
      }
    }
  }

  if (event.type == "mouseup") {
    down = 0; // сбрасываем флаг нажатия кнопки мыши
    console.log(word); //   !!! ЗДЕСЬ НЕОБХОДИМО ПРОВЕРЯТЬ СЛОВО ЛИБО
    //       ВОЗВРАЩАТЬ ИЗ КОЛЛБЭКА
    word = ""; // обнуляем слово
    const choosen = document.querySelectorAll(".choosen"); // выбираем все отмеченные кнопки
    choosen.forEach((el) => {
      el.classList.remove("choosen"); // удаляем класс обводки на всех кнопксх
    });
  }
}

let result = [];
const checkWord = async (word) => {
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (Array.isArray(data)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};


let arr = [];
const countScore = (word) => {
  arr.findIndex((el) => el === word);
  if (word.length <= 4 && word.length >= 3) {
    arr.push(word);
    result.push(1);
  } else if (word.length === 5) {
    arr.push(word);
    result.push(2);
  } else if (word.length === 6) {
    arr.push(word);
    result.push(3);
  } else if (word.length === 7) {
    arr.push(word);
    result.push(5);
  } else if (word.length >= 8) {
    arr.push(word);
    result.push(11);
  } else {
    result.push(0);
  }

}   

mixedButton.addEventListener('click', getStartGame)

const used = [];
let counter = 0;
let timeOut = false;

allLetters.forEach((item) => {
    item.addEventListener('mousedown', (event) => {
      if(timeOut) {
        pushLetter(event);
      }
    })
  })

function getStartGame (event) {
    if (timeOut === true){
        return null
    }
    event.preventDefault();
    timeOut = true;

    getInput ()

    let seconds = 180; 
    const timer = setInterval (() => {
      if (seconds <= 0){
        timeOut = false;
        clearInterval(timer);
        endGame({name: 'Name', total: counter});
      }
      timerSpan.innerText = seconds;
      seconds--
    }, 1000)
};

const lettersDict = [
  ["A", "A", "E", "E", "G", "N"],
  ["A", "B", "B", "J", "O", "O"],
  ["A", "C", "H", "O", "P", "S"],
  ["A", "F", "F", "K", "P", "S"],
  ["A", "O", "O", "T", "T", "W"],
  ["C", "I", "M", "O", "T", "U"],
  ["D", "E", "I", "L", "R", "X"],
  ["D", "E", "L", "R", "V", "Y"],
  ["D", "I", "S", "T", "T", "Y"],
  ["E", "E", "G", "H", "N", "W"],
  ["E", "E", "I", "N", "S", "U"],
  ["E", "H", "R", "T", "V", "W"],
  ["E", "I", "O", "S", "S", "T"],
  ["E", "L", "R", "T", "T", "Y"],
  ["H", "I", "M", "N", "U", "Qu"],
  ["H", "L", "N", "N", "R", "Z"],
];

function getRandomInteger(min = 0, max = 5) {
    const n = Math.random() * (max - min + 1) + min;
    return Math.floor(n);
  }

function getMixLetter(arr) {
    const result = [];
    arr.forEach((elem) => result.push(elem[getRandomInteger()]));
    return result;
  }

function getInput() {
    const dict = getMixLetter(lettersDict);
    for (let i = 0; i < allLetters.length; i += 1) {
      allLetters[i].innerText = dict[i];
    }
}

  score.innerText = result.reduce((sum, n) => sum + n);
  return result.reduce((sum, n) => sum + n);
};
