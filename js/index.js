const boggle = document.querySelector(".boggle");
const wordPlace = document.querySelector(".word");
const scoreBoard = document.querySelector(".scoresTable");
// const scoreUser = document.querySelector('.score');
const userScore = 0;
let down = false; // флаг нажатия кнопки мыши
let word = ""; // готовое слово при отпускании кнопки мыши
let tempWord = ""; // переменная временного хранения буквы при перемещении
const score = document.querySelector(".score");
const allLetters = document.querySelectorAll(".btn");
const mixedButton = document.querySelector(".mix");
const timerSpan = document.querySelector(".timer");

// задаем слушатели на все поле boggle

const selectWord = async (event) => {
  if (event.currentTarget === event.target) {
    // делегируем события с поля на кнопки с буквами
    return;
  }

  if (event.type == "mousedown") {
    // проверка нажата ли кнопка мыши
    down = true;
    word += event.target.textContent;
    tempWord = event.target.textContent; // отмечаем нажатие кнопки флагом нажатия
  }

  if (event.type == "mousemove") {
    // добавляем букву при нажатии и протаскивании мыши
    if (down) {
      // если кнопка нажата и есть протаскивание
      event.target.classList.add("choosen");
      // добавляем класс добавлющий рамку на кнопку с буквой
      if (tempWord !== event.target.textContent) {
        // следим меняется ли буква в целевой кнопке
        word += event.target.textContent;
        wordPlace.value = word; // если меняется до добавляем букву в слово;
        tempWord = event.target.textContent; // добавляем букву во временную переменную
      }
    }
  }

  if (event.type == "mouseup") {
    down = 0; // сбрасываем флаг нажатия кнопки мыши
    var wordExist = await checkWord(word);
    if (wordExist) {
      countScore(word);
    }
    word = ""; // обнуляем слово
    wordPlace.value = word;
    const choosen = document.querySelectorAll(".choosen"); // выбираем все отмеченные кнопки
    choosen.forEach((el) => {
      el.classList.remove("choosen"); // удаляем класс обводки на всех кнопксх
    });
  }
};

["mousedown", "mousemove", "mouseup"].forEach((event) =>
  boggle.addEventListener(event, selectWord)
);

const localStorageUse = (inputScore = 0) => {
  // console.log(localStorage.getItem('boggleTeam').length);
  if (localStorage.getItem("boggleTeam") === null) {
    localStorage.setItem("boggleTeam", JSON.stringify({ score: [0] }));
  }

  // console.log(localStorage.getItem('boggleTeam'));
  let scoresObj = JSON.parse(localStorage.boggleTeam);
  let topScores = scoresObj.score;
  const idx = topScores.findIndex((v) => v > inputScore);
  topScores.splice(idx > -1 ? idx : topScores.length, 0, inputScore);
  if (topScores.length > 10) {
    topScores.sort((a, b) => b - a);
    topScores = topScores.slice(0, 10);
  }
  localStorage.setItem("boggleTeam", JSON.stringify({ score: topScores }));
  scoresObj = JSON.parse(localStorage.boggleTeam);
  return topScores;
};

mixedButton.addEventListener("click", getStartGame);

const used = [];
let counter = 0;
let timeOut = false;

allLetters.forEach((item) => {
  item.addEventListener("mousedown", (event) => {
    if (timeOut) {
      pushLetter(event);
    }
  });
});

function getStartGame(event) {
  if (timeOut === true) {
    return null;
  }
  event.preventDefault();
  timeOut = true;
  localStorageUse(score.value);
  getInput();

  let seconds = 5;
  const timer = setInterval(() => {
    if (seconds <= 0) {
      timeOut = false;
      clearInterval(timer);
    }
    timerSpan.innerText = seconds;
    seconds--;
  }, 1000);
}

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
  ["H", "I", "M", "N", "U", "Q"],
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
