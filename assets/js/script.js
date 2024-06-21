// Wait for the DOM to finish loading before running the game
document.addEventListener('DOMContentLoaded', initGame);

// Declare initial variables
let correctCount = 0;
let incorrectCount = 0;
let timeRemain = 15; // set countdown time to 15 seconds

function initGame() {
  let startingCountry = getStartingCountry();
  document.getElementById(
    'flag-image'
  ).src = `https://flagcdn.com/h160/${startingCountry.code}.png`;
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
}
function getStartingCountry() {
  let randomCountry = Math.floor(Math.random() * countriesList.length);
  return countriesList[randomCountry];
}
/**
 * Function to verify the selected answer by user
 */

// let startingCountry;
let isExist = true;
function verifyAnswer(rightAnswer, userAnswer) {
  // console.log(`The user selected ${country.code}`);
  if (!isExist) return;
  console.log(rightAnswer);
  if (userAnswer === rightAnswer) {
    correctCount++;
    document.getElementById('correct-count').innerText = correctCount;
    console.log('right ');
  } else {
    incorrectCount++;
    document.getElementById('incorrect-count').innerText = correctCount;
    console.log('in');
  }
}

// function userSelect(button) {
//   const userAnswer = button.innerText;
//   verifyAnswer(userAnswer);
// }

let answerBtn = document.querySelectorAll('#answer-buttons .button');
const nextBtn = document.getElementById('next');
let displayedCountry;

// This function is trigged when the mouse pointer moves over the answer buttons
// It changes the background color of the buttons to highlight it

answerBtn.forEach((button) => {
  button.addEventListener('mouseover', (event) => {
    event.target.style.backgroundColor = 'hsl(0, 0%, 40%)';
  });

  // This function is triggered when the mouse pointer leaves the specific buttons
  // It changes the background color of the button to its original state
});
answerBtn.forEach((button) => {
  button.addEventListener('mouseout', (event) => {
    event.target.style.backgroundColor = 'hsl(0, 0%, 60%)';
  });
});

function preparedAnswers(initialCountry) {
  const countries = [];
  // Add initial country to the countries array
  console.log(initialCountry);
  if (initialCountry) {
    countries.push(initialCountry);
  }

  while (countries.length < 4) {
    // Generates a random number between 0 and 26 (countries array have 27 items)
    const randomCountryIndex = Math.floor(Math.random() * 27);
    //the list of countries are unique, not duplicated
    let currentCounty = countriesList[randomCountryIndex].name;
    if (!countries.includes(currentCounty)) {
      countries.push(currentCounty);
    }
  }
  // Here i need to shuffle the counties
  console.log(countries);
  return shuffleCountries(countries);
}

//
function shuffleCountries(array) {
  let i = array.length;
  while (i != 0) {
    let randomIndex = Math.floor(Math.random() * i);
    i--;
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
function getAnswerButtons(initialCountry) {
  let countries = preparedAnswers(initialCountry);
  const answerButtons = document.querySelectorAll('.answer-button');

  answerButtons.forEach((button, index) => {
    button.innerHTML = countries[index];
  });
  answerButtons.forEach((button) => {
    let buttonValue = button.innerText;
    button.addEventListener('click', () => {
      // console.log(initialCountry.name);
      //
      if (initialCountry) {
        verifyAnswer(initialCountry, buttonValue);
      }
    });
  });
}

function incrementPositiveScore() {
  let oldScore = parseInt(document.getElementById('correct-count').innerText);
  document.getElementById('correct-count').innerText = ++oldScore;
}

function incrementNegativeScore() {
  let oldScore = parseInt(document.getElementById('incorrect-count').innerText);
  document.getElementById('incorrect-count').innerText = ++oldScore;
}

document.getElementById('next').addEventListener('click', nextGame);
function nextGame() {
  // gamesCount starts with one, because we already have staring game when the application loads
  let gamesCount = 1;
  while (gamesCount <= 10) {
    initGame();
    gamesCount++;
  }
  console.log('next game will start');
}

startGame();
