let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#ff4d4d";
      box.style.backgroundColor = "#ffe6e6";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "#4d79ff";
      box.style.backgroundColor = "#e6e6ff";
      turnO = true;
    }

    box.disabled = true;
    count++;

    let winnerPattern = checkWinner();
    if (winnerPattern) {
      highlightWinner(winnerPattern);
      celebrateWinner();
      return;
    }

    if (count === 9) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#ffffc7";
    box.style.color = "#b0413e";
    box.classList.remove("winner");
  });
};

const showWinner = (winner) => {
  msg.innerText = `🎉 Winner is ${winner}! 🎉`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let a = boxes[pattern[0]].innerText;
    let b = boxes[pattern[1]].innerText;
    let c = boxes[pattern[2]].innerText;

    if (a && a === b && b === c) {
      showWinner(a);
      return pattern;
    }
  }
  return null;
};

const highlightWinner = (pattern) => {
  pattern.forEach((index) => {
    boxes[index].classList.add("winner");
  });
};

const celebrateWinner = () => {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
  });
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
