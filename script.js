'use strict';
//draw flowchart for applications to have a good idea of what we'll have to do. diagram.net

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let current0 = document.querySelector('#current--0');
let current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing; //state variable

//initializing
const init = function () {
  //starting conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; //state variable

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add('hidden');
  //remove winner class
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  //remove active class from 2nd player and add to 1st player
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  // switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  //using toggle will make sure it is only on one of the elements at once
};

//rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    //display the dice
    diceEl.classList.remove('hidden');

    //to display the image according to the rolled dice number, we manipulate using the src property
    diceEl.src = `./images/dice-${dice}.png`; //loading any of the images dynamically using template strings

    //check for a rolled 1.
    if (dice !== 1) {
      //add the dice to the current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//holding current score
btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player's score
    scores[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player's score >= 100
    if (scores[activePlayer] >= 30) {
      //finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      diceEl.classList.add('hidden');
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//resetting the game at any point in time
btnNew.addEventListener('click', init);
