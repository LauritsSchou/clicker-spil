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
  document.querySelector("#robber1_container").classList.add("die");
}
