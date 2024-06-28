// Wait for the DOM to finish loading before running the game
document.addEventListener('DOMContentLoaded', initGame);

document.getElementById('next-btn').addEventListener('click', nextQuestion);
// All required elements
const startBtn = document.querySelector('.start-btn button');
const infoBox = document.querySelector('.info-box');
const exitBtn = infoBox.querySelector('.buttons .quit');
const continueBtn = infoBox.querySelector('.buttons .restart');
const quizBox = document.querySelector('.quiz-box');
const correctCountElement = document.getElementById('correct-count');
const incorrectCountElement = document.getElementById('incorrect-count');
const questionCounterElement = document.querySelector('.total-que span');

// When the Start button clicked, it will display the info box
startBtn.onclick = () => {
  infoBox.classList.add('active');
};

// When the Exit button clicked, it will hide the info box
exitBtn.onclick = () => {
  infoBox.classList.remove('active');
};

// When the Continue button clicked
continueBtn.onclick = () => {
  infoBox.classList.remove('active'); // Hide the info box
  quizBox.classList.add('activeQuiz'); //Show the Quiz
  queCount = 0; //reset question count
  initGame(); //start the game
};

function initGame() {
  let startingCountry = getStartingCountry();
  document.getElementById(
    'flag-image'
  ).src = `https://flagcdn.com/h160/${startingCountry.code}.png`;
  startGame(startingCountry.name);
  correctCountElement.innerText = 0;
  incorrectCountElement = 0;
  queCount = 0;
  nextQuestion();
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
  answerButtonsState(false);
}
function getStartingCountry() {
  let randomCountry = Math.floor(Math.random() * countriesList.length);
  return countriesList[randomCountry];
}
/**
 * Function to verify the selected answer by user
 */
function verifyAnswer(rightAnswer, userAnswer) {
  // console.log(`The user selected ${country.code}`);
  // Declare initial variables
  const correctCount = document.getElementById('correct-count');
  const incorrectCount = document.getElementById('incorrect-count'); //

  let correctCountValue = parseInt(correctCount.innerText);
  let incorrectCountValue = parseInt(incorrectCount.innerText);

  let isGameOver = correctCountValue + incorrectCountValue >= 10;
  if (isGameOver) return; //Do something when the game is over
  // console.log('rightAnswer');
  if (userAnswer === rightAnswer) {
    correctCountValue += 1;
    correctCount.innerText = correctCountValue;
    // console.log('right');
  } else {
    incorrectCountValue += 1;
    incorrectCount.innerText = incorrectCountValue;
    // console.log('wrong');
  }
  answerButtonsState(true);
  return rightAnswer === userAnswer;
  // changeButtonsBackground(rightAnswer);
  // Returning a boolean, check if it is a right answer
  // return userAnswer === rightAnswer;
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
      // Remove the 'right-answer' class and set button text
      button.classList.remove('right-answer');
      button.innerText = countries[index];

      // Remove existing event listeners
      let newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);

      // Add new event listener
      newButton.addEventListener('click', function () {
        handleAnswerClick(newButton, rightAnswer);
      });
    });
  }
}

function handleAnswerClick(button, rightAnswer) {
  const isCorrect = verifyAnswer(rightAnswer, button.innerText);
  if (isCorrect) {
    button.classList.add('right-answer');
    console.log('This is the right button');
  } else {
    console.log('This is the wrong button');
  }
  // Disable all buttons to prevent multiple clicks
  answerButtonsState(true);
  // Highlight the correct answer
  changeButtonsBackground(rightAnswer);
}

function nextQuestion() {
  const correctCount = parseInt(
    document.getElementById('correct-count').innerText
  );
  const incorrectCount = parseInt(
    document.getElementById('incorrect-count').innerText
  );
  if (correctCount + incorrectCount >= 10) {
    console.log('Game over. No more rounds.');
    return;
  }

  queCount++;
  const nextCountry = getStartingCountry();
  document.getElementById(
    'flag-image'
  ).src = `https://flagcdn.com/h160/${nextCountry.code}.png`;
  startGame(nextCountry.name);
  updateQuestionQuestionCounter(queCount, 10);
}

function updateQuestionCounter(current, total) {
  questionCounterElement.innerHTML = `<div><span>${current}</span>of<span>${total}</span>Questions</div>`;
}
// Toggle the state (enabled / disabled) of the option buttons
function answerButtonsState(state) {
  const buttons = document.querySelectorAll('.answer-button');
  buttons.forEach((button) => {
    button.disabled = state;
  });
}

function changeButtonsBackground(rightAnswer) {
  const buttons = document.querySelectorAll('.answer-button');
  buttons.forEach((button) => {
    if (button.innerHTML === rightAnswer) {
      button.classList.add('right-answer');
    }
  });
}
let queCount = 0;
