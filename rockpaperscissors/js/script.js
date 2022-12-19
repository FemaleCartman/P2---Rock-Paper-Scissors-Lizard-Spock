// Selecting elements
const overlay = document.querySelector(".overlay");
const modalEl = document.querySelector(".game__modal");
const btnOpenModal = document.querySelector(".btn-modal");
const btnCloseModal = document.querySelector(".btn-close");
const containerSelection = document.querySelector(".game__initial-box");
const containerInitial = document.querySelector(".game__initial");
const containerMain = document.querySelector("main");

// Modal rules
const openModal = function () {
  modalEl.classList.add("open");
  overlay.classList.add("open");
};

const closeModal = function () {
  modalEl.classList.remove("open");
  overlay.classList.remove("open");
};

btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Maximum tries = 10 , Score Limit = 3 by default
let score = 0, tries = 0, maxTry = 10, scoreLimit = 3;


// Show max tries
const tryElement = document.getElementById("tries");
tryElement.textContent = maxTry - tries;

// Show the score goal
const goalElement = document.getElementById("goal");
goalElement.textContent = scoreLimit;

containerSelection.addEventListener("click", function (e) {
  
// Get the clicked button
const clicked = e.target.closest(".game__selection");

if (!clicked) return;

// Game start
containerInitial.style.display = "none";
const containerImg = clicked.querySelector("img");
const classValue = clicked.getAttribute("class");
const youSelection = clicked.getAttribute("data-selection"); // Player's selection
const urlImg = containerImg.getAttribute("src");

// Computer Selection
const optionsComputer = ["lizard", "rock", "paper", "spock", "scissors"];
const selectingOptionComputer = (option) =>
  option[Math.floor(Math.random() * option.length)];
const computerOption = selectingOptionComputer(optionsComputer);

// Empty container inserter after choice is clicked
const html = `<article class="game__start">
                  <div class="game__start-content">
                    <p class="game__start-title">You Picked</p>
                    <div class="${classValue} game__big game__selection-start" data-selection="${youSelection}">
                      <div class="game__selection-oval game__big-oval">
                        <img class="game__win-img" aria-hidden="true" src="${urlImg}" alt="">
                      </div>
                    </div>
                  </div>
                  <div class="game__start-content">
                    <p class="game__start-title">The House Picked</p>
                    <div class="game__empty"></div>
                  </div>
               </article>`;

  let computerSelection = `<div class="game__selection game__${computerOption} game__big game__selection-start" data-selection="${computerOption}">
                  <div class="game__selection-oval game__big-oval">
                    <img class="game__win-img" aria-hidden="true" src="./assets/images/icon-${computerOption}.svg" alt="">
                  </div>
               </div>`;

  containerMain.insertAdjacentHTML("beforeend", html);

// Empty container
let emptyContainer = document.querySelector(".game__empty");
const containerStart = document.querySelector(
  ".game__start-content:last-child"
);

//Empty container filled out with player and computer choices
setTimeout(() => {
  if (emptyContainer.classList.contains("game__empty"))
    emptyContainer.remove();
  emptyContainer = computerSelection;
  containerStart.insertAdjacentHTML("beforeend", emptyContainer);

  const winSelection = ["scissors", "paper", "rock", "lizard", "spock"];
  const loseSelectionOne = ["paper", "rock", "lizard", "spock", "scissors"];
  const loseSelectionTwo = ["lizard", "spock", "scissors", "paper", "rock"];

  //Increase try count and update the tries that are left
  tries++;
  tryElement.textContent = maxTry - tries;

  // Check for all possibilities to detect win/lose
  winSelection.forEach((selec, index) => {
    checkedValue(selec, loseSelectionOne[index]);
    checkedValue(selec, loseSelectionTwo[index]);
  });

  if (youSelection === computerOption) {
    draw();
  }
}, 2000);


// Win or lose result
function checkedValue(value1, value2) {
  if (youSelection === value1 && computerOption === value2) {
    youWin();
  }
  else if (youSelection === value2 && computerOption === value1) {
    computerWin();
  }
}

// Player won, increase the score
function youWin() {
  displayResult(
    "You Win",
    "game__circleOne",
    "game__circleTwo",
    "game__circleThree"
  );
  setTimeout(() => {
    score++;
    document.querySelector(".game__number").textContent = score;
    // If score reached to limit(5), you won
    if (score >= scoreLimit) {
      if (!alert("Congrats, You Won!")) { window.location.reload(); }
    }
    // If maximum tries reached, you lost
    else if (tries > maxTry) {
      if (!alert("Maximum tries exceeded. You Lost!")) { window.location.reload(); }
    }
  }, 2000);

}

//Computer won, reduce the score
function computerWin() {
  displayResult(
    "You Lose",
    "game__circleOne",
    "game__circleTwo",
    "game__circleThree"
  );
  setTimeout(() => {
    if (score === 0) {
      document.querySelector(".game__number").textContent = score;
    } else {
      score--;
      document.querySelector(".game__number").textContent = score;
    }
    // If maximum tries reached, you lost
    if (tries >= maxTry) {
      if (!alert("Maximum tries exceeded. You Lost!")) { window.location.reload(); }
    }
  }, 2000);

}


//Draw, score is not changing
function draw() {
  displayResult("DRAW",
    "game__circleOne",
    "game__circleTwo",
    "game__circleThree");
  if (tries >= maxTry) {
    if (!alert("Maximum tries exceeded. You Lost!")) { window.location.reload(); }
  }
}


// Display result
function displayResult(message, circleOne, circleTwo, circleThree) {
  setTimeout(() => {

    let gameStart = document.querySelector(".game__start");
    if (gameStart) {
      gameStart.remove();
    }
    
// HTML to show results on page
const html = `
    <article class="game__win">
      <div class="game__start-content">
        <p class="game__start-title">You Picked</p>

        <div class="game__win-circle">
          <div class="${classValue} game__big game__win-selection" data-selection="${youSelection}">
            <div class="game__selection-oval game__big-oval">
              <img class="game__win-img" aria-hidden="true" src="${urlImg}" alt="">
            </div>
            <span aria-hidden="true" class="${message === "You Win" ? circleOne : ""
        } circle-properties">
            </span>
            <span aria-hidden="true" class="${message === "You Win" ? circleTwo : ""
        } circle-properties"></span>
            <span aria-hidden="true" class="${message === "You Win" ? circleThree : ""
        } circle-properties"></span>
          </div>
          </div>
      </div>

      <div class="game__message-box">
        <p class="game__message">${message}</p>
        <a href="" class="btn-again">Play Again</a>
      </div>

      <div class="game__start-content game__start-win">
        <p class="game__start-title">The House Picked</p>
        <div class="game__win-circle">
        <div class="game__selection game__${computerOption} game__big game__selection-start" data-selection="${computerOption}">
        <div class="game__selection-oval game__big-oval">
          <img class="game__win-img" aria-hidden="true" src="./assets/images/icon-${computerOption}.svg" alt="">
        </div>
        <span aria-hidden="true" class="${message === "You Lose" ? circleOne : ""
        } circle-properties">
        </span>
        <span aria-hidden="true" class="${message === "You Lose" ? circleTwo : ""
        } circle-properties"></span>
        <span aria-hidden="true" class="${message === "You Lose" ? circleThree : ""
        } circle-properties"></span>
      </div>
     </div>
        </div>
      </div>
    </article>
    `;

    containerMain.insertAdjacentHTML("beforeend", html);

    // to avoid the sidebar when the circles appear
    document.body.style.overflowY = "hidden";

    const gameWin = document.querySelector(".game__win");
    gameWin.style.display = "flex";
    document
      .querySelector(".btn-again")
      .addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(".game__win").style.display = "none";
        document.querySelector(".game__win").remove();
        document.body.style.overflowY = "visible";
        containerInitial.style.display = "grid";
      });

  }, 2000);
}
});


// Dark mode
const dark = document.querySelector(".game__darkMode");

const selectionHover = document.querySelectorAll(".game__selection");

dark.addEventListener("click", function (e) {
  e.preventDefault();
  document.body.classList.toggle("dark-mode");
  dark.classList.toggle("active");

  selectionHover.forEach((sel) => {
    sel.classList.toggle("dark-mode");
  });
});



// House pick image not showing
// Add responsiveness