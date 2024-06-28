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

// Function to get a random country from the countries array
function startGame(startingCountry) {
  getAnswerButtons(startingCountry);
  userMadeChoice = false; //Reset user choose state
  checkTimeHandler(); // Start the timer for the round
  answerButtonsState(false);
}
function getStartingCountry() {
  let randomCountry = Math.floor(Math.random() * countriesList.length);
  return countriesList[randomCountry];
}
/**
 * Function to verify the selected answer by user
 */
function verifyAnswerHandler(rightAnswer, userAnswer) {
  const correctCount = document.getElementById('correct-count');
  const incorrectCount = document.getElementById('incorrect-count');

  // Set correct and incorrect answers count
  setAnswerCount(rightAnswer, userAnswer, correctCount, incorrectCount);

  // Update played rounds count
  setRoundsLeft();

  // Disable all buttons to prevent multiple clicks
  answerButtonsState(true);

  // Timer handler
  clearTimeout(timer); // Clear the timer if the user selects an answer

  // Check if the game is over
  gameOverHandler(correctCount, incorrectCount);

  // return the result of the comparison
  return rightAnswer === userAnswer;
}

function setAnswerCount(rightAnswer, userAnswer, correctCount, incorrectCount) {
  let correctCountValue = parseInt(correctCount.innerText);
  let incorrectCountValue = parseInt(incorrectCount.innerText);

  if (userAnswer === rightAnswer) {
    userScore += 1;
    console.log(userScore);
    correctCountValue += 1;
    correctCount.innerText = correctCountValue;
  } else {
    incorrectCountValue += 1;
    incorrectCount.innerText = incorrectCountValue;
  }
}

function setRoundsLeft() {
  const roundsLeft = document.getElementById('rounds-count');
  let roundsLeftValue = parseInt(roundsLeft.innerText);

  if (roundsLeftValue > 0) {
    roundsLeftValue--;

    roundsLeft.innerText = roundsLeftValue;
  }
}

function checkTimeHandler() {
  if (timer) {
    clearInterval(timer); // Clear any existing timer before starting a new one
  }
  let timeRemain = 6; // set countdown time to 6 seconds
  const timeCounterElement = document.querySelector('.timer-sec');
  // Set the timer to decrease timeRemain every second
  timer = setInterval(function () {
    if (timeRemain > 0) {
      timeRemain--;
    } else {
      // If time runs out
      clearInterval(timer);
      const incorrectCount = document.getElementById('incorrect-count');
      let incorrectCountValue = parseInt(incorrectCount.innerText);
      incorrectCountValue += 1;
      incorrectCount.innerText = incorrectCountValue;

      if (!userMadeChoice) {
        setRoundsLeft();

        // Move to the next question
        nextQuestion();
      }
    }
    timeCounterElement.innerText = timeRemain;
  }, 1000);
}

function gameOverHandler(correctCount, incorrectCount) {
  let correctCountValue = parseInt(correctCount.innerText);
  let incorrectCountValue = parseInt(incorrectCount.innerText);
  let isGameOver = correctCountValue + incorrectCountValue >= 10;

  if (isGameOver) {
    showResultBox();
    // Change the text of the next button to "Game Over"
    const nextBtn = document.getElementById('next-btn');
    nextBtn.innerText = 'Game Over!';

    // Stop the game with early return
    return;
  } else {
  }
}

function preparedAnswers(initialCountry) {
  const countries = [];
  // Add initial country to the countries array
  if (initialCountry) {
    countries.push(initialCountry);
    while (countries.length < 4) {
      // Generates a random number between 0 and 26 (countries array have 27 items)
      const randomCountryIndex = Math.floor(
        Math.random() * countriesList.length
      );
      let currentCountry = countriesList[randomCountryIndex].name;
      if (!countries.includes(currentCountry)) {
        countries.push(currentCountry);
      }
    }
    return shuffleCountries(countries);
  }
}

function shuffleCountries(array) {
  let i = array.length;
  while (i !== 0) {
    let randomIndex = Math.floor(Math.random() * i);
    i--;
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

function getAnswerButtons(initialCountry) {
  const rightAnswer = initialCountry;
  let countries = preparedAnswers(rightAnswer);
  const answerButtons = document.querySelectorAll('.answer-button');

  if (countries && countries.length) {
    answerButtons.forEach((button, index) => {
      // Remove the 'right-answer' and 'wrong-answer' classes from previous question
      button.classList.remove('right-answer');
      button.classList.remove('wrong-answer');
      // Set buttons text
      button.innerText = countries[index];

      // Remove existing event listeners using cloneNode
      let newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);

      // Add new event listener
      newButton.addEventListener('click', function () {
        userMadeChoice = true;
        handleAnswerClick(newButton, rightAnswer);
      });
    });
  }
}

function handleAnswerClick(button, rightAnswer) {
  const isCorrect = verifyAnswerHandler(rightAnswer, button.innerText);
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

function nextQuestion() {
  const correctCount = parseInt(
    document.getElementById('correct-count').innerText
  );
  const incorrectCount = parseInt(
    document.getElementById('incorrect-count').innerText
  );
  if (correctCount + incorrectCount >= 10) {
    return;
  }
  const nextCountry = getStartingCountry();
  document.getElementById(
    'flag-image'
  ).src = `https://flagcdn.com/h160/${nextCountry.code}.png`;
  startGame(nextCountry.name);
  // disable the next button until the user selects an answer
  document.getElementById('next-btn').disabled = true;
}

// Toggle the state of the option buttons
// State can be true (enabled) or false (disabled)
function answerButtonsState(state) {
  const buttons = document.querySelectorAll('.answer-button');
  buttons.forEach((button) => {
    button.disabled = state;
  });
}

const resultBox = document.querySelector('.result-box');
const restartQuiz = resultBox.querySelector('.buttons .restart');
const exitQuiz = resultBox.querySelector('.buttons .quit');

let userScore = 0;
function showResultBox() {
  infoBox.classList.remove('active'); // Hide the info box
  quizBox.classList.remove('activeQuiz'); //Hid the Quiz
  resultBox.classList.add('activeResult'); //Show the Quiz Result box
  const scoreResult = resultBox.querySelector('.score-text');

  if (userScore > 7 && userScore <= 10) {
    let scoreTag =
      `<span>and congrats, You got only&nbsp;<span>` +
      userScore +
      `</span>&nbsp;out of&nbsp;<span>10</span></span>`;
    scoreResult.innerHTML = scoreTag;
  } else if (userScore > 4 && userScore <= 7) {
    let scoreTag =
      `<span>and nice, You got only&nbsp;<span>` +
      userScore +
      `</span>&nbsp;out of&nbsp;<span>10</span></span>`;
    scoreResult.innerHTML = scoreTag;
  } else {
    let scoreTag =
      `<span>and sorry, You got only&nbsp;<span>` +
      userScore +
      `</span>&nbsp;out of&nbsp;<span>10</span></span>`;
    scoreResult.innerHTML = scoreTag;
  }
}
