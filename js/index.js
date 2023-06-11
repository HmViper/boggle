const boggle = document.querySelector(".boggle");
let down = false; // флаг нажатия кнопки мыши
let word = ""; // готовое слово при отпускании кнопки мыши
let tempWord = ""; // переменная временного хранения буквы при перемещении
const score = document.querySelector(".score");

["mousedown", "mousemove", "mouseup"].forEach((event) =>
  boggle.addEventListener(event, selectWord)
); // задаем слушатели на все поле boggle

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

  score.innerText = result.reduce((sum, n) => sum + n);
  return result.reduce((sum, n) => sum + n);
};
