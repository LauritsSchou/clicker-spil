"use strict";
let points = 0;
let lives = 0;
let isGameRunning = false;
window.addEventListener("load", ready);

function ready() {
  console.log("JS ready");
  document.querySelector("#btn_start").addEventListener("click", start);
  document.querySelector("#btn_restart").addEventListener("click", showStartScreen);
  document.querySelector("#btn_restart2").addEventListener("click", showStartScreen);
}

function start() {
  isGameRunning = true;
  console.log("start");
  resetLives();
  showGameScreen();
  resetPoints();
  startAnimation();
  addPosition();
  registerClicks();
  animationRestart();
  addSpeed();
  startTimer();
  startMusic();
}
function startMusic() {
  document.querySelector("#sound_music").play();
  document.querySelector("#sound_music").loop = true;
}
function showGameScreen() {
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}
function resetLives() {
  lives = 3;
  document.querySelector("#heart1").classList.remove("broken_heart");
  document.querySelector("#heart2").classList.remove("broken_heart");
  document.querySelector("#heart3").classList.remove("broken_heart");
  document.querySelector("#heart1").classList.add("active_heart");
  document.querySelector("#heart2").classList.add("active_heart");
  document.querySelector("#heart3").classList.add("active_heart");
}
function startTimer() {
  console.log("start timer");
  document.querySelector("#time_sprite").classList.add("shrink");
  document.querySelector("#time_sprite").addEventListener("animationend", timeIsUp);
}
function resetPoints() {
  points = 0;
  displayPoints();
}
function startAnimation() {
  document.querySelector("#robber1_container").classList.add("robber1_walk");
  document.querySelector("#robber2_container").classList.add("robber1_walk");
  document.querySelector("#robber3_container").classList.add("robber1_walk");
  document.querySelector("#civilian1_container").classList.add("civilian1_walk");
  document.querySelector("#civilian2_container").classList.add("civilian1_walk");
  document.querySelector("#civilian3_container").classList.add("civilian1_walk");
}
function addPosition() {
  document.querySelector("#robber1_container").classList.add("position1");
  document.querySelector("#robber2_container").classList.add("position2");
  document.querySelector("#robber3_container").classList.add("position3");
  document.querySelector("#civilian1_container").classList.add("position4");
  document.querySelector("#civilian2_container").classList.add("position5");
  document.querySelector("#civilian3_container").classList.add("position6");
}
function registerClicks() {
  console.log("registerclicks");
  document.querySelector("#robber1_container").addEventListener("mousedown", dieRobber);
  document.querySelector("#robber2_container").addEventListener("mousedown", dieRobber);
  document.querySelector("#robber3_container").addEventListener("mousedown", dieRobber);
  document.querySelector("#civilian1_container").addEventListener("mousedown", dieCivilian);
  document.querySelector("#civilian2_container").addEventListener("mousedown", dieCivilian);
  document.querySelector("#civilian3_container").addEventListener("mousedown", dieCivilian);
}
function animationRestart() {
  document.querySelector("#robber1_container").addEventListener("animationiteration", robberRestart);
  document.querySelector("#robber2_container").addEventListener("animationiteration", robberRestart);
  document.querySelector("#robber3_container").addEventListener("animationiteration", robberRestart);
  document.querySelector("#civilian1_container").addEventListener("animationiteration", civilianRestart);
  document.querySelector("#civilian2_container").addEventListener("animationiteration", civilianRestart);
  document.querySelector("#civilian3_container").addEventListener("animationiteration", civilianRestart);
}
function addSpeed() {
  document.querySelector("#robber1_container").classList.add("speed1");
  document.querySelector("#robber2_container").classList.add("speed2");
  document.querySelector("#robber3_container").classList.add("speed3");
  document.querySelector("#civilian1_container").classList.add("speed1");
  document.querySelector("#civilian2_container").classList.add("speed2");
  document.querySelector("#civilian3_container").classList.add("speed3");
}
function dieRobber() {
  console.log("dieRobber");
  let robber = this;
  robber.removeEventListener("click", dieRobber);
  robber.classList.add("paused");
  robber.querySelector("img").classList.add("rotate");
  robber.addEventListener("animationend", deadRobber);
  document.querySelector("#sound_dieRobber").play();
  document.querySelector("#sound_dieRobber").currentime = 0;
  incrementPoints();
}

function deadRobber() {
  console.log("deadrobber");
  let robber = this;
  robber.removeEventListener("animationend", deadRobber);
  robber.querySelector("img").classList.remove("rotate");
  robber.classList.remove("paused");
  if (isGameRunning) {
    robberRestart.call(this);
  }
  robber.addEventListener("mousedown", dieRobber);
}
function robberRestart() {
  console.log("robberrestart");
  let robber = this;
  robber.classList.remove("robber1_walk");
  robber.offsetWidth;
  robber.classList.add("robber1_walk");
  robber.classList.remove("speed1", "speed2", "speed3");
  let speed = Math.floor(Math.random() * 3) + 1;
  robber.classList.add("speed" + speed);

  robber.classList.remove("position1", "position2", "position3", "position4", "position5", "position6");
  let pos = Math.floor(Math.random() * 6) + 1;
  robber.classList.add("position" + pos);
}

function dieCivilian() {
  console.log("dieCivilian");
  let civilian = this;
  civilian.removeEventListener("click", dieCivilian);
  civilian.classList.add("paused");
  civilian.querySelector("img").classList.add("rotate");
  civilian.addEventListener("animationend", deadCivilian);
  document.querySelector("#sound_dieCivilian").play();
  document.querySelector("#sound_dieCivilian").volume = 0.3;
  document.querySelector("#sound_dieCivilian").currentTime = 0;
  decrementLives();
}

function deadCivilian() {
  let civilian = this;
  console.log("deadCivilian");
  civilian.removeEventListener("animationend", deadCivilian);
  civilian.querySelector("img").classList.remove("rotate");
  civilian.classList.remove("paused");
  if (isGameRunning) {
    civilianRestart.call(this);
  }
  civilian.addEventListener("mousedown", dieCivilian);
}
function civilianRestart() {
  console.log("civilianrestart");
  let civilian = this;
  civilian.classList.remove("civilian1_walk");
  civilian.offsetWidth;
  civilian.classList.add("civilian1_walk");
  civilian.classList.remove("speed1", "speed2", "speed3");
  let speed = Math.floor(Math.random() * 3) + 1;
  civilian.classList.add("speed" + speed);

  civilian.classList.remove("position1", "position2", "position3", "position4", "position5", "position6");
  let pos = Math.floor(Math.random() * 6) + 1;
  civilian.classList.add("position" + pos);
}
function incrementPoints() {
  points++;
  displayPoints();
}
function displayPoints() {
  document.querySelector("#robber_count").textContent = points;
  // if (points > 2) {
  //   levelComplete();
  // }
}

function decrementLives() {
  lives--;
  displayDecrementLives();
  if (lives == 0) {
    gameOver();
  }
}
function displayDecrementLives() {
  console.log(`#heart${lives}`);
  document.querySelector(`#heart${lives + 1}`).classList.add("blink");
  document.querySelector(`#heart${lives + 1}`).classList.remove("active_heart");
  document.querySelector(`#heart${lives + 1}`).classList.add("broken_heart");
}

function levelComplete() {
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#levelCompleteMessage").textContent = `You killed ${points} robbers`;
  document.querySelector("#sound_levelComplete").play();
  end();
}

function gameOver() {
  console.log("game over");
  document.querySelector("#sound_gameOver").play();
  document.querySelector("#game_over").classList.remove("hidden");
  end();
}
function timeIsUp() {
  levelComplete();
}
function showStartScreen() {
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function end() {
  console.log("end");
  isGameRunning = false;
  document.querySelector("#sound_music").pause();
  document.querySelector("#robber1_container").classList.remove("robber1_walk");
  document.querySelector("#robber2_container").classList.remove("robber1_walk");
  document.querySelector("#robber3_container").classList.remove("robber1_walk");
  document.querySelector("#civilian1_container").classList.remove("civilian1_walk");
  document.querySelector("#civilian2_container").classList.remove("civilian1_walk");
  document.querySelector("#civilian3_container").classList.remove("civilian1_walk");
  document.querySelector("#robber1_container").removeEventListener("click", dieRobber);
  document.querySelector("#robber2_container").removeEventListener("click", dieRobber);
  document.querySelector("#robber3_container").removeEventListener("click", dieRobber);
  document.querySelector("#civilian1_container").removeEventListener("click", dieCivilian);
  document.querySelector("#civilian2_container").removeEventListener("click", dieCivilian);
  document.querySelector("#civilian3_container").removeEventListener("click", dieCivilian);
  document.querySelector("#time_sprite").classList.remove("shrink");
}
