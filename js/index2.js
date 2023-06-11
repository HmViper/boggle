let result = [];

let arr = [];
const countScore = (word) => {
  const arrCheck = arr.findIndex((el) => el === word);
  if (arrCheck === -1) {
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
  } else {
    result.push(0);
  }
  score.innerText = result.reduce((sum, n) => sum + n);
  return result.reduce((sum, n) => sum + n);
};
