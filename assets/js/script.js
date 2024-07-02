document.getElementById('next-btn').addEventListener('click', nextQuestion);

// All required elements
const startBtn = document.querySelector('.start-btn button');
const infoBox = document.querySelector('.info-box');
const exitBtn = infoBox.querySelector('.buttons .quit');
const startGameBtn = infoBox.querySelector('.buttons .start-game');
const quizBox = document.querySelector('.quiz-box');
let timer; // Declare a global timer variable
let userMadeChoice; //Store state to check if the user picked any choose

// When the Start button clicked, it will display the info box
startBtn.onclick = () => {
  infoBox.classList.add('active');
};

// When the Exit button clicked, it will hide the info box
exitBtn.onclick = () => {
  infoBox.classList.remove('active');
};

// When the Continue button clicked
startGameBtn.onclick = () => {
  infoBox.classList.remove('active'); // Hide the info box
  quizBox.classList.add('activeQuiz'); //Show the Quiz
  initGame();
};

/**
 * Initialize the game
 * select a country, update flag, disable next button and start game.
 */
function initGame() {
  let startingCountry = getStartingCountry();
  document.getElementById(
    'flag-image'
  ).src = `https://flagcdn.com/h160/${startingCountry.code}.png`;

  // disable the next button until the user selects an answer
  document.getElementById('next-btn').disabled = true;
  startGame(startingCountry.name);
}

const countriesList = [
  { code: 'at', name: 'Austria' },
  { code: 'be', name: 'Belgium' },
  { code: 'bg', name: 'Bulgaria' },
  { code: 'hr', name: 'Croatia' },
  { code: 'cy', name: 'Cyprus' },
  { code: 'cz', name: 'Czech Republic' },
  { code: 'dk', name: 'Denmark' },
  { code: 'ee', name: 'Estonia' },
  { code: 'fi', name: 'Finland' },
  { code: 'fr', name: 'France' },
  { code: 'de', name: 'Germany' },
  { code: 'gr', name: 'Greece' },
  { code: 'hu', name: 'Hungary' },
  { code: 'ie', name: 'Ireland' },
  { code: 'it', name: 'Italy' },
  { code: 'lv', name: 'Latvia' },
  { code: 'lt', name: 'Lithuania' },
  { code: 'lu', name: 'Luxembourg' },
  { code: 'mt', name: 'Malta' },
  { code: 'nl', name: 'Netherlands' },
  { code: 'pl', name: 'Poland' },
  { code: 'pt', name: 'Portugal' },
  { code: 'ro', name: 'Romania' },
  { code: 'sk', name: 'Slovakia' },
  { code: 'si', name: 'Slovenia' },
  { code: 'es', name: 'Spain' },
  { code: 'se', name: 'Sweden' },
];

/**
 * Start the quiz game
 * setup answer buttons, reset user choice state, start timer, enable buttons.
 */
function startGame(startingCountry) {
  getAnswerButtons(startingCountry);
  userMadeChoice = false; //Reset user choose state
  checkTimeHandler(); // Start the timer for the round
  answerButtonsState(false);
}

/**
 * Get a random country from the country list
 * @returns {object} Randomly selected country oject from countriesList
 */
function getStartingCountry() {
  let randomCountry = Math.floor(Math.random() * countriesList.length);
  // Return the country object at the random index
  return countriesList[randomCountry];
}

/**
 * Handle the answer verification
 * update counts, manage timer, check game over state
 */
function verifyAnswerHandler(rightAnswer, userAnswer) {
  const correctCount = document.getElementById('correct-count');
  const incorrectCount = document.getElementById('incorrect-count');

  // Update correct and incorrect answers count
  setAnswerCount(rightAnswer, userAnswer, correctCount, incorrectCount);

  // Update played rounds left count
  setRoundsLeft();

  // Disable all buttons to prevent multiple clicks
  answerButtonsState(true);

  // Clear the time if the user selects an answer
  clearTimeout(timer); // Clear the timer if the user selects an answer

  // Check if the game is over
  gameOverHandler(correctCount, incorrectCount);

  // return whether the user's answer is correct
  return rightAnswer === userAnswer;
}

/**
 * Update the correct and incorrect answer counts based on the user's answer
 */
function setAnswerCount(rightAnswer, userAnswer, correctCount, incorrectCount) {
  // Parse current counts from the elements
  let correctCountValue = parseInt(correctCount.innerText);
  let incorrectCountValue = parseInt(incorrectCount.innerText);

  // Update counts based on whether the user's answer is correct
  if (userAnswer === rightAnswer) {
    userScore += 1; // Increment user score
    correctCountValue += 1; //Increment correct count
    correctCount.innerText = correctCountValue; // Update correct count element
  } else {
    incorrectCountValue += 1; // Increment incorrect count
    incorrectCount.innerText = incorrectCountValue; // Update incorrect count element
  }
}

/**
 * Decrement the rounds left count and update the display
 */
function setRoundsLeft() {
  // Get the element displaying the rounds left count
  const roundsLeft = document.getElementById('rounds-count');

  // Parse the current rounds left count from the element
  let roundsLeftValue = parseInt(roundsLeft.innerText);

  if (roundsLeftValue > 0) {
    roundsLeftValue--;

    // Update the rounds left element with the new count
    roundsLeft.innerText = roundsLeftValue;
  }
}

/**
 * Handle the countdown timer for each round.
 * If the user does not select an answer in time, increment the incorrect count and move to next question.
 */
function checkTimeHandler() {
  // Clear any existing timer before starting a new one
  if (timer) {
    clearInterval(timer);
  }

  // set countdown timer to 6 second
  let timeRemain = 6;
  const timeCounterElement = document.querySelector('.timer-sec');

  // Set the timer to decrease timeRemain every second
  timer = setInterval(function () {
    if (timeRemain > 0) {
      timeRemain--; // Decrement the remaining time
    } else {
      // If time runs out
      clearInterval(timer); // Clear the timer

      answerButtonsState(true); // Disable buttons

      //  Increment the incorrect answer count
      const incorrectCount = document.getElementById('incorrect-count');
      let incorrectCountValue = parseInt(incorrectCount.innerText);
      incorrectCountValue += 1;
      incorrectCount.innerText = incorrectCountValue;

      // If the user did not make a choice, update rounds left and move to the next question
      if (!userMadeChoice) {
        setRoundsLeft();

        // Move to the next question
        nextQuestion();
      }
    }
    // Update the timer display
    timeCounterElement.innerText = timeRemain;
  }, 1000);
}

/**
 * Handle the gamer over logic
 * check if the game is over, display result, and stop the game.
 */
function gameOverHandler(correctCount, incorrectCount) {
  // Parse the current correct and incorrect counts
  let correctCountValue = parseInt(correctCount.innerText);
  let incorrectCountValue = parseInt(incorrectCount.innerText);

  // Check if the total number of the questions answered in 10 or more.
  let isGameOver = correctCountValue + incorrectCountValue >= 10;

  if (isGameOver) {
    showResultBox(); // display the result box

    // Change the text of the next button to "Game Over"
    const nextBtn = document.getElementById('next-btn');
    nextBtn.innerText = 'Game Over!';

    // Stop the game with early return
    return;
  }
}

/**
 * Prepare an array of answers including the initial country and three random countries.
 */
function preparedAnswers(initialCountry) {
  const countries = [];

  // Add initial country to the countries array
  if (initialCountry) {
    countries.push(initialCountry);

    // Add random countries until there are 4 in total
    while (countries.length < 4) {
      // Generates a random index to select a country from the countries list.
      const randomCountryIndex = Math.floor(
        Math.random() * countriesList.length
      );
      let currentCountry = countriesList[randomCountryIndex].name;

      // Add the country if it's not already in the array
      if (!countries.includes(currentCountry)) {
        countries.push(currentCountry);
      }
    }
    // Shuffle the countries array before returning it
    return shuffleCountries(countries);
  }
}

/**
 * Shuffle an array of country names using the Fisher-Yates algorithm
 */
function shuffleCountries(array) {
  let i = array.length;

  // Continue until all elements have been shuffled
  while (i !== 0) {
    // Pick a random index from the remaining elements.
    let randomIndex = Math.floor(Math.random() * i);
    i--;

    // Swap the current element with the element at the random index
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }

  // Return the shuffled array
  return array;
}

/**
 * Set up the answer buttons with the prepared answers and attach event listeners.
 */
function getAnswerButtons(initialCountry) {
  const rightAnswer = initialCountry;
  let countries = preparedAnswers(rightAnswer);
  const answerButtons = document.querySelectorAll('.answer-button');

  if (countries && countries.length) {
    answerButtons.forEach((button, index) => {
      // Remove the 'right-answer' and 'wrong-answer' classes from previous question
      button.classList.remove('right-answer');
      button.classList.remove('wrong-answer');

      // Set the button text to one of the prepared answers
      button.innerText = countries[index];

      // Remove existing event listeners using cloneNode
      let newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);

      // Add new event listener to handle the answer click
      newButton.addEventListener('click', function () {
        userMadeChoice = true;
        handleAnswerClick(newButton, rightAnswer);
      });
    });
  }
}

/**
 * Handle the answer button click event
 * verify the answer, update button styles, and manage the button states.
 */
function handleAnswerClick(button, rightAnswer) {
  // Verify if the user's answer is correct
  const isCorrect = verifyAnswerHandler(rightAnswer, button.innerText);

  // Add the appropriate class to the button based on whether the answer is correct
  if (isCorrect) {
    button.classList.add('right-answer');
  } else {
    button.classList.add('wrong-answer');
  }
  // Disable all buttons to prevent multiple clicks
  answerButtonsState(true);

  // Enable the next button
  document.getElementById('next-btn').disabled = false;
}

/**
 * Move the next question
 * check if the game is over, update the flag image, and start the next round.
 */
function nextQuestion() {
  // Get the current counts of the correct and incorrect answers
  const correctCount = parseInt(
    document.getElementById('correct-count').innerText
  );
  const incorrectCount = parseInt(
    document.getElementById('incorrect-count').innerText
  );

  // Check if the total number of answered questions in 10 or more
  if (correctCount + incorrectCount >= 10) {
    // Navigate to the result view after game is over
    gameOverHandler(
      document.getElementById('correct-count'),
      document.getElementById('incorrect-count')
    );
    return; //Exit the game if the game is over
  }

  // Get a new country for the net question
  const nextCountry = getStartingCountry();

  // Update the flag image to show the flag of the new country
  document.getElementById(
    'flag-image'
  ).src = `https://flagcdn.com/h160/${nextCountry.code}.png`;

  // Start the game with the new country
  startGame(nextCountry.name);

  // disable the next button until the user selects an answer
  document.getElementById('next-btn').disabled = true;
}

/**
 * Enable and disable all answer buttons.
 */
function answerButtonsState(state) {
  // Select all elements with the class 'answer-button'
  const buttons = document.querySelectorAll('.answer-button');

  // Set the 'disabled' property of each button to the specified state
  buttons.forEach((button) => {
    button.disabled = state;
  });
}

// Result button
const resultBox = document.querySelector('.result-box'); //Result box
const restartQuiz = resultBox.querySelector('.buttons .restart'); //Restart button in the result box
const exitQuiz = resultBox.querySelector('.buttons .quit'); // Exit button ub tge result box

/**
 * Handle the restart quiz button click event
 */
restartQuiz.onclick = () => {
  window.location.reload();
};

/**
 * Handle the exit quiz button click event
 */
exitQuiz.onclick = () => {
  window.location.reload();
};

let userScore = 0;
/**
 * Show the result box with the user's score and a msg based on their performance
 */
function showResultBox() {
  infoBox.classList.remove('active'); // Hide the info box
  quizBox.classList.remove('activeQuiz'); //Hid the Quiz
  resultBox.classList.add('activeResult'); //Show the Quiz Result box

  // Get the element to display the score
  const scoreResult = resultBox.querySelector('.score-text');

  // Display a msg based on the user's score
  if (userScore > 7 && userScore <= 10) {
    let scoreTag =
      `<span>Congrats, You got only&nbsp;<span>` +
      userScore +
      `</span>&nbsp;out of&nbsp;<span>10</span></span>`;
    scoreResult.innerHTML = scoreTag;
  } else if (userScore > 4 && userScore <= 7) {
    let scoreTag =
      `<span>Nice, You got only&nbsp;<span>` +
      userScore +
      `</span>&nbsp;out of&nbsp;<span>10</span></span>`;
    scoreResult.innerHTML = scoreTag;
  } else {
    let scoreTag =
      `<span>Sorry, You got only&nbsp;<span>` +
      userScore +
      `</span>&nbsp;out of&nbsp;<span>10</span></span>`;
    scoreResult.innerHTML = scoreTag;
  }
}
