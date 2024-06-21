// Wait for the DOM to finish loading before running the game
document.addEventListener('DOMContentLoaded', function () {
  let startingCountry = getStartingCountry();
  document.getElementById(
    'flag-image'
  ).src = `https://flagcdn.com/h160/${startingCountry.code}.png`;
  startGame(startingCountry);
});

// Declare initial variables
let correctCount = 0;
let incorrectCount = 0;
let timeRemain = 15; // set countdown time to 15 seconds

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

let answerBtn = document.querySelectorAll('#answer-buttons .button');
const nextBtn = document.getElementById('next');
let displayedCountry;

answerBtn.forEach((button) => {
  button.addEventListener('mouseover', (event) => {
    event.target.style.backgroundColor = 'hsl(0, 0%, 40%)';
  });
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
  countries.push(initialCountry.name);
  while (countries.length < 4) {
    const randomCountryIndex = Math.floor(Math.random() * 27); // Generates a random number between 0 and 26
    let currentCounty = countriesList[randomCountryIndex].name; //the list of countries are unique, not duplicated
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
  console.log(initialCountry);
  let countries = preparedAnswers(initialCountry);
  document.querySelectorAll('.answer-button').forEach((button, index) => {
    button.innerHTML = countries[index];
  });
}

/**
 * Function to verify the selected answer by user
 */
function verifyAnswer() {
  console.log(`The user selected ${country.code}`);
}

startGame();
