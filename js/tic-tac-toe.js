
// Constant

const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

// Variables 

  let board;
  let winner;
  let player;
  let playerIcons = {};

// Cached Element

  const currPlayerEl = document.getElementById("currPlayer");
  const winnerEl = document.getElementById("winner");
  const boardEl = document.getElementById("board");
  const resetBtnEl = document.getElementById("reset");
  const startBtnEl = document.getElementById("start");
  const icon1El = document.getElementById("icon1");
  const icon2El = document.getElementById("icon2");
  const statusEl = document.getElementById("game-status");

  const popup = document.getElementById("popup");
  const popupBtn = document.getElementById("close");

// Event Listener 

  startBtnEl.addEventListener("click", startGame);
  boardEl.addEventListener("click", handleClick);
  resetBtnEl.addEventListener("click", () => location.reload());

  popupBtn.addEventListener("click", () => popup.remove());

// Functions 

  function startGame() {
    const icon1 = icon1El.value;
    const icon2 = icon2El.value;
  
    if (icon1 === icon2) {
      popup.style.display = "flex";
    //   popup.style.visibility= "visible";
      return;
    } else {
        popup.style.display = "none";
    }
  
    playerIcons[1] = icon1;
    playerIcons[-1] = icon2;
  
    init();
  
    statusEl.style.display = "flex";
    boardEl.style.pointerEvents = "auto";
  }
  
  function init() {
    board = Array(9).fill(null);
    winner = null;
    player = 1;
    render();
  }
  
  function render() {
    currPlayerEl.innerText = playerIcons[player] || "";
  
    if (winner) {
      winnerEl.innerText = winner === "T" ? "It's a tie!" : `Winner is ${playerIcons[winner]}`;
      winnerEl.style.visibility = "visible";
    } else {
      winnerEl.style.visibility = "hidden";
    }
  
    board.forEach((val, idx) => {
      const sq = document.getElementById(idx);
      sq.innerText = val ? playerIcons[val] : "";
    });
  }
  
  function handleClick(evt) {
    const idx = parseInt(evt.target.id);
    if (winner || board[idx]) return;
  
    board[idx] = player;
    player *= -1;
    winner = checkWinner();
    render();
  }
  
  function checkWinner() {
    for (const [a, b, c] of WINNING_COMBOS) {
      const total = Math.abs((board[a] || 0) + (board[b] || 0) + (board[c] || 0));
      if (total === 3) return board[a];
    }
    return board.includes(null) ? null : "T";
  }
  