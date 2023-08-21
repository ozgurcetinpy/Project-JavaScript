'use strict';

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'Correct Number!';

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent--;

// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

//////////////////////////////////////////////////

// document.querySelector('.check').addEventListener('click', function () {
//   console.log(document.querySelector('.guess').value);
// });

const secretNumber = Math.trunc(Math.random() * 20 + 1);
let highScore = 0;

const writeValue = function () {
  let guess = Number(document.querySelector('.guess').value);
  let score = document.querySelector('.score').textContent;

  // When input is invalid
  if (!guess) {
    document.querySelector('.message').textContent = 'No Number!';

    // When the player wins
  } else if (guess === secretNumber) {
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.message').textContent = 'Correct Number';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highScore) {
      document.querySelector('.highscore').textContent = score;
    }

    //When guess is different
  } else if (guess !== secretNumber) {
    guess > secretNumber
      ? (document.querySelector('.message').textContent = 'make it lower')
      : (document.querySelector('.message').textContent = 'make it higher');
    document.querySelector('.score').textContent--;
    document.querySelector('body').style.backgroundColor = 'red';
    if (score <= 1) {
      document.querySelector('.message').textContent = 'Game Over !!!';
    }
  }
};

const playAgain = function () {
  const secretNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = 10;
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
};

document.querySelector('.check').addEventListener('click', writeValue);
document.querySelector('.again').addEventListener('click', playAgain);
