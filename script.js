"use strict";

window.addEventListener("load", start);
let points = 0;
let lives = 3;

function start() {
  console.log("start");
  document.querySelector("#robber1_container").classList.add("robber1_walk");
  document.querySelector("#civilian1_container").classList.add("civilian1_walk");
  document.querySelector("#robber1_container").addEventListener("click", dieRobber);
  document.querySelector("#civilian1_container").addEventListener("click", dieCivilian);
}
function dieRobber() {
  console.log("dieRobber");
  document.querySelector("#robber1_container").removeEventListener("click", dieRobber);
  document.querySelector("#robber1_container").classList.add("paused");
  document.querySelector("#robber1_sprite").classList.add("rotate");
  document.querySelector("#robber1_container").addEventListener("animationend", deadRobber);
  incrementPoints();
}
function incrementPoints() {
  points++;
  displayPoints();
  function displayPoints() {
    document.querySelector("#robber_count").textContent = points;
    if (points > 2) {
      levelComplete();
    }
  }
}
function deadRobber() {
  console.log("deadRobber");
  document.querySelector("#robber1_container").removeEventListener("animationend", deadRobber);
  document.querySelector("#robber1_sprite").classList.remove("rotate");
  document.querySelector("#robber1_container").classList.remove("paused");
  document.querySelector("#robber1_container").classList.remove("robber1_walk");
  document.querySelector("#robber1_container").offsetWidth;
  document.querySelector("#robber1_container").classList.add("robber1_walk");
  document.querySelector("#robber1_container").addEventListener("click", dieRobber);
}

function dieCivilian() {
  console.log("dieCivilian");
  document.querySelector("#civilian1_container").removeEventListener("click", dieCivilian);
  document.querySelector("#civilian1_sprite").classList.add("rotate");
  document.querySelector("#civilian1_container").classList.add("paused");
  document.querySelector("#civilian1_container").addEventListener("animationend", deadCivilian);
  decrementLives();
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
  document.querySelector(`#heart${lives + 1}`).classList.remove("active_heart");
  document.querySelector(`#heart${lives + 1}`).classList.add("broken_heart");
}

function deadCivilian() {
  console.log("deadCivilian");
  document.querySelector("#civilian1_container").removeEventListener("animationend", deadCivilian);
  document.querySelector("#civilian1_sprite").classList.remove("rotate");
  document.querySelector("#civilian1_container").classList.remove("paused");
  document.querySelector("#civilian1_container").classList.remove("civilian1_walk");
  document.querySelector("#civilian1_container").offsetWidth;
  document.querySelector("#civilian1_container").classList.add("civilian1_walk");
  document.querySelector("#civilian1_container").addEventListener("click", dieCivilian);
}
function levelComplete() {
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#levelCompleteMessage").textContent = `Congratulations. You killed ${points} robbers`;

  end();
}

function gameOver() {
  console.log("game over");
  document.querySelector("#game_over").classList.remove("hidden");
  end();
}

function end() {
  document.querySelector("#robber1_container").classList.remove("robber1_walk");
  document.querySelector("#civilian1_container").classList.remove("civilian1_walk");
  document.querySelector("#robber1_container").removeEventListener("click", dieRobber);
  document.querySelector("#civilian1_container").removeEventListener("click", dieCivilian);
}
