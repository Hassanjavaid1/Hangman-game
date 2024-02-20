import { wordsArray, hangmanBody } from "./HangmenApi.js";

const buttons = document.querySelectorAll(".keyboard_btn");
const hangmen_img = document.getElementById("hangmen_img");
const wordHint = document.getElementById("hint");
let Incorrect_guess = document.getElementById("Incorrect_guess");
let correct_answer = document.getElementById("correct_answer");
let modal = document.getElementById("myModal");
const playAgain = document.getElementById("play_again");
let wow_img = document.getElementById("result_img");
let count = 1;
let index = 0;
let currentWord = "";
let currentHint = "";

const HangmentFunc = () => {
  let random = Math.floor(Math.random() * 30);
  const { hint, word } = wordsArray[random];
  currentWord = word;
  currentHint = hint;
  guessedWord(word);
  wordHint.innerHTML = `<span>Hint:</span> ${hint}`;
};

const guessedWord = (word) => {
  let word_li = document.getElementById("word_li");
  word_li.innerHTML = "";
  for (let i = 0; i < word.length; i++) {
    let li = document.createElement("li");
    li.textContent = "_";
    word_li.appendChild(li);
  }
};

const checkGameOver = () => {
  if (index >= hangmanBody.length) {
    modal.style.display = "block";
    let loser = new Audio("Audio/loser.mp3");
    loser.play();
    correct_answer.innerHTML = `The correct answer was <span class ='word'>${currentWord}</span>`;
    return true;
  }
  return false;
};

const checkWin = () => {
  let allGuessed = true;
  let word_li = document.getElementById("word_li");
  word_li.childNodes.forEach((node) => {
    if (node.textContent === "_") {
      allGuessed = false;
    }
  });
  if (allGuessed) {
    modal.style.display = "block";
    let winner = new Audio("Audio/wow.mp3");
    winner.play();
    wow_img.src = "Hangmen/wow img.gif";
    correct_answer.innerHTML = "Congratulations! You've guessed the word!";
    return true;
  }
  return false;
};

const handleGuess = (guessedLetter) => {
  let word = currentWord.toLowerCase();
  let correctGuess = false;
  let word_li = document.getElementById("word_li");

  for (let i = 0; i < word.length; i++) {
    if (word[i] === guessedLetter) {
      word_li.childNodes[i].textContent = guessedLetter;
      correctGuess = true;
    }
  }

  if (!correctGuess) {
    hangmen_img.src = hangmanBody[index++].img;
    const wrong_audio = new Audio("Audio/audio wrong answer.mp3");
    Incorrect_guess.innerHTML = `Incorrect guess:<span> ${count++}/6 </span>`;
    wrong_audio.play();
    buttons.forEach((button) => {
      if (button.textContent === guessedLetter) {
        button.classList.add("wrong");
      }
    });
  }
};

const audioPlay = () => {
  let audio = new Audio("Audio/buttonClick.mp3");
  audio.play();
};

HangmentFunc();

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!checkGameOver() && !checkWin()) {
      handleGuess(button.textContent);
      audioPlay();
      checkWin(); // Check for win after each guess
    }
  });
});

playAgain.addEventListener("click", () => {
  count = 0;
  index = 0;
  buttons.forEach((button) => {
    button.classList.remove("wrong");
  });
  hangmen_img.src = "Hangmen/hangman-0.svg";
  Incorrect_guess.innerHTML = `Incorrect guess:<span> ${count++}/6 </span>`;
  modal.style.display = "none";
  HangmentFunc();
});
