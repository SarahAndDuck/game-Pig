'use strict';

function getElementBySelector(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}
// игроки
const playerElements = document.querySelectorAll('.player');
// текущие очки(счета)
const currentScoreElements = document.querySelectorAll('.current-score');
// текущие очки(счета)
const scoresElements = document.querySelectorAll('.score');
// кнопка кидать кости
const btnRoll = getElementBySelector('.btn--roll');
// отображение кости
const dice = getElementBySelector('.dice');
// кнопка сохранить значение счета
const btnHold = getElementBySelector('.btn--hold');
//  сброс игры
const btnNew = getElementBySelector('.btn--new');
//инициализация
let currentScorePlayers = [0, 0];
let scorePlayers = [0, 0];
let activePlyer;
dice.classList.add('hidden');

// сгенерировать случайное число
function getDiceNumber() {
  return Math.trunc(Math.random() * 6) + 1;
}
// получить индекс текуцего игрока
function getActivePlayer() {
  for (let i = 0; i < 2; i++) {
    if (playerElements[i].classList.contains('player--active')) {
      activePlyer = i;
    }
  }
  return activePlyer;
}
// сменить игрока
function changePlayer() {
  for (let i = 0; i < 2; i++)
    playerElements[i].classList.toggle('player--active');
  activePlyer = getActivePlayer();
  currentScorePlayers = [0, 0];
  currentScoreElements[0].textContent = currentScorePlayers[0];
  currentScoreElements[1].textContent = currentScorePlayers[1];
}
// индекс текущего игрока
activePlyer = getActivePlayer();
// игрок бросает кость
function eventRollHandler() {
  if (dice.classList.contains('hidden')) {
    dice.classList.remove('hidden');
  }
  // получаем случайное число для кубика
  const DiceNumber = getDiceNumber();
  // отображаем число на кубике
  dice.src = `dice${DiceNumber}.png`;
  // если выпало 1
  if (DiceNumber === 1) {
    changePlayer();
  }
  //   иначе увеличиваем текущий счет на количество выпавших очков на кубике
  else {
    currentScorePlayers[activePlyer] =
      currentScorePlayers[activePlyer] + DiceNumber;
    //   отображаем текущий счет
    currentScoreElements[activePlyer].textContent =
      currentScorePlayers[activePlyer];
  }
}
function eventHoldHandler() {
  scorePlayers[activePlyer] += Number(
    currentScoreElements[activePlyer].textContent
  );
  scoresElements[activePlyer].textContent = scorePlayers[activePlyer];
  //   если число очков больше или равно 100 игрок выиграл
  if (scorePlayers[activePlyer] >= 50) {
    setTimeout(() => {
      alert(
        `игрок ${activePlyer + 1} выиграл со счетом ${
          scorePlayers[activePlyer]
        }`
      );
      eventNewGameHandler();
    }, 100);
  }
  // иначе сменить игрока
  else changePlayer();
}
function eventNewGameHandler() {
  currentScorePlayers = [0, 0];
  scorePlayers = [0, 0];
  for (let i = 0; i < 2; i++) {
    currentScoreElements[i].textContent = 0;
    scoresElements[i].textContent = 0;
  }
  playerElements[0].classList.add('player--active');
  playerElements[1].classList.remove('player--active');
  activePlyer = getActivePlayer();
  dice.classList.add('hidden');
}
btnRoll.addEventListener('click', eventRollHandler);
btnHold.addEventListener('click', eventHoldHandler);
btnNew.addEventListener('click', eventNewGameHandler);
