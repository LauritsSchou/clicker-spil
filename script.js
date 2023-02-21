window.addEventListener("load", start);
function start() {
  console.log("start");
  document.querySelector("#robber1_container").addEventListener("click", die);
}
function die() {
  console.log("die");
  document
    .querySelector("#robber1_container")
    .removeEventListener("click", die);
  document.querySelector("#robber1_sprite").classList.add("die");
  document.querySelector("#robber1_container").classList.add("paused");
  document
    .querySelector("#robber1_container")
    .addEventListener("animationend", dead);
}
function dead() {
  console.log("dead");
  document.querySelector("#robber1_sprite").classList.remove("die");
  document.querySelector("#robber1_container").classList.remove("paused");
  document.querySelector("#robber1_container").addEventListener("click", die);
}
