const $startBox = document.querySelector(".start_box");
const $xButton = document.querySelector(".x_button");
const $allBoxs = document.querySelectorAll(".box");
const $playerBoard = document.querySelector(".player_board");
const $finalBox = document.querySelector(".final_box");
const $finalTitle = document.querySelector(".final_title");
const $restartButton = document.querySelector(".restart_button");
const playerOIcon = "far fa-circle";
const playerXIcon = "fas fa-times";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let xPlayer = "x";
let oPlayer = "o";
let oTurn;
console.log(oTurn);

$xButton.addEventListener("click", () => {
  $startBox.classList.add("hidden");
  $playerBoard.classList.add("showing");
});

$allBoxs.forEach((box) => {
  box.addEventListener("click", clickedBox, { once: true });
});

function clickedBox(e) {
  oTurn = false;
  const box = e.target;
  const currentPlayer = oTurn ? oPlayer : xPlayer;
  if (xPlayer === "x") {
    box.innerHTML = `<i class="${playerXIcon}"></i>`;
    box.classList.add(currentPlayer);
    xPlayer = "o";
  } else {
    box.innerHTML = `<i class="${playerOIcon}"></i>`;
    box.classList.add(currentPlayer);
    xPlayer = "x";
  }

  if (checkingWinner(currentPlayer)) {
    console.log(checkingWinner(currentPlayer));
    endGame(false);
  } else if (isDraw(currentPlayer)) {
    console.log(isDraw(currentPlayer));
    endGame(true);
  }

  function endGame(draw) {
    if (draw) {
      $playerBoard.classList.remove("showing");
      $playerBoard.classList.add("hidden");
      $finalBox.classList.add("showing");

      $finalTitle.innerHTML = `<span> Draw 😁</span>`;
    } else {
      $playerBoard.classList.remove("showing");
      $playerBoard.classList.add("hidden");
      $finalBox.classList.add("showing");

      $finalTitle.innerHTML = `<span> Player <p>${currentPlayer}</p> Winning!😁</span>`;
    }
  }
}

function isDraw(currentPlayer) {
  return [...$allBoxs].every((index) => {
    return index.classList.contains(currentPlayer);
  });
}

function checkingWinner(currentPlayer) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return $allBoxs[index].classList.contains(currentPlayer);
    });
  });
}
