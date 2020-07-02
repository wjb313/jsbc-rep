// Define constants for manipulating DOM

const gamePage = document.querySelector(".gamePage");
const landPage = document.querySelector(".landPage");
const guessTracker = document.querySelector(".guessTracker");
const winPage = document.querySelector(".winPage");
const launchBtn = document.querySelector("#launchBtn");
const resetBtn = document.querySelector("#resetBtn");
const gamePageWrapper = document.querySelector(".gamePageWrapper");
const winPageGuess = document.querySelector("#winPageGuess");

const sayHellowLinting = (fname) => {
  console.log("balls");
};

// Define function for populating grid with number range
const range = function (start, end) {
  for (i = start; i <= end; i++) {
    const gridBox = document.createElement("div");
    gridBox.textContent = i;
    gridBox.id = "number" + i;
    gridBox.className = "numbers";
    gamePage.appendChild(gridBox);
  }
};

range(1, 30);

// Declare variable for holding random number
let randomNumber;

// Define function for generating random number
const generateNumber = function (maxNum, minNum) {
  randomNumber = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
  console.log(randomNumber);
};

// Handle button click to generate random number and launch gamePage
launchBtn.addEventListener("click", function () {
  generateNumber(1, 30);
  landPage.style.display = "none";
  gamePageWrapper.style.display = "flex";
  gamePage.style.display = "grid";
});

// Handle guesses when number is clicked
let guessCount = 0;

gamePage.addEventListener("click", function (e) {
  let guessCurrent = e.target;
  let guessCurrentNumber = parseInt(guessCurrent.textContent);

  if (guessCurrent.className === "numbers") {
    // Limit scope of clicks to actual numbers, not the grid outside the numbers
    if (guessCurrentNumber === randomNumber) {
      // Handle correct guess
      // Increment the guess tracker
      guessCount++;

      // Switch from gamePage to winPage
      gamePage.style.display = "none";
      gamePageWrapper.style.display = "none";
      winPage.style.display = "flex";

      // Populate text telling how many guesses it took
      winPageGuess.textContent = "It took you " + guessCount + " guesses.";
    } else if (guessCurrentNumber > randomNumber) {
      // Handle high guess
      // Increment the guess tracker
      guessCount++;

      // Change grid box content to notify high guess and turn red
      guessCurrent.textContent = "Too High";
      guessCurrent.style.color = "red";

      // Clear out any existing child element to prep for writing new
      while (guessTracker.firstChild) {
        guessTracker.removeChild(guessTracker.firstChild);
      }

      // Set grammar to deal with single or plural guesses
      if (guessCount === 1) {
        guessTracker.textContent = "You have guessed " + guessCount + " time.";
        /*guessTracker.appendChild(guesses);*/
      } else {
        guessTracker.textContent = "You have guessed " + guessCount + " times.";
        // guessTracker.appendChild(guesses);
        console.log("nope");
      }
    } else {
      // Handle low guess
      // Increment the guess tracker
      guessCount++;

      //Change grid box content to notify low guess and turn red
      guessCurrent.textContent = "Too Low";
      guessCurrent.style.color = "red";

      // Clear out any existing child element to prep for writing new
      while (guessTracker.firstChild) {
        guessTracker.removeChild(guessTracker.firstChild);
      }

      // Set grammar to deal with single or plural guesses
      if (guessCount === 1) {
        guessTracker.textContent = "You have guessed " + guessCount + " time.";
        // guessTracker.appendChild(guesses);
      } else {
        guessTracker.textContent = "You have guessed " + guessCount + " times.";
        // guessTracker.appendChild(guesses);
      }
    }
  }
});

// Reveal button based on animationend event firing in winPage
const showBtn = document.querySelector("#winPageGuess");

showBtn.addEventListener("animationend", function () {
  resetBtn.style.opacity = 1;
});

showBtn.addEventListener("webkitAnimationEnd", function () {
  resetBtn.style.opacity = 1;
});

// Reset game for new play
resetBtn.addEventListener("click", function () {
  // Switch from winPage to landpage gamePage.style.display = "none";
  winPage.style.display = "none";
  resetBtn.style.opacity = "0";
  landPage.style.display = "";

  // Reset all grid box contents back to numbers and original colors
  const resetColor = document.querySelectorAll(".numbers");
  for (i = 0; i < resetColor.length; i++) {
    resetColor[i].style.color = "blue";
  }

  range(1, 30);

  // Clear text from guess tracker box
  guessTracker.textContent = "";

  // Reset guessCount to 0
  guessCount = 0;
});
