const collection = document.querySelectorAll(".btn");
const LETTERS = [
  "AAEEGN",
  "ABBJOO",
  "ACHOPS",
  "AFFKPS",
  "AOOTTW",
  "CIMOTU",
  "DEILRX",
  "DELRVY",
  "DISTTY",
  "EEGHNW",
  "EEINSU",
  "EHRTVW",
  "EIOSST",
  "ELRTTY",
  "HIMNUQu",
  "HLNNRZ",
];
let randomLetter = "";
function createLetters(LETTERS) {
  let arrWord = ``;
  for (let i = 0; i < LETTERS.length; i++) {
    arrWord = LETTERS[i];
    randomLetter += arrWord[Math.floor(Math.random() * 5) + 1];
  }

  return randomLetter;
}

collection.forEach((elem, i) => {
  elem.textContent = randomLetter[i];
});
