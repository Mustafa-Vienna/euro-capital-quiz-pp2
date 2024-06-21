// Wait for the DOM to finish loading before running the game
document.addEventListener('DOMContentLoaded', initGame);

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

function verifyAnswer(rightAnswer, userAnswer) {
  // console.log(`The user selected ${country.code}`);
  // Declare initial variables

  //
  const correctCount = document.getElementById('correct-count');
  const incorrectCount = document.getElementById('incorrect-count'); //

  let correctCountValue = parseInt(correctCount.innerText);
  let incorrectCountValue = parseInt(incorrectCount.innerText);

  let isGameOver = correctCountValue + incorrectCountValue >= 10;
  let timeRemain = 15; // set countdown time to 15 seconds
  if (isGameOver) return; //Do something when the game is over
  console.log('rightAnswer');
  if (userAnswer === rightAnswer) {
    correctCountValue += 1;
    correctCount.innerText = correctCountValue;
    console.log('right');
  } else {
    incorrectCountValue += 1;
    incorrectCount.innerText = incorrectCountValue;
    console.log('wrong');
  }
}

// This function is trigged when the mouse pointer moves over the answer buttons
// It changes the background color of the buttons to highlight it
let answerBtn = document.querySelectorAll('#answer-buttons .button');
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
  let countries = preparedAnswers(initialCountry);
  const answerButtons = document.querySelectorAll('.answer-button');

  if (countries && countries.length) {
    answerButtons.forEach((button, index) => {
      button.innerHTML = countries[index];

      // Remove any previous click handlers
      button.replaceWith(button.cloneNode(true));
      button = document.querySelectorAll('.answer-button')[index];

      // Create a new event handler for each button
      button.addEventListener('click', () => {
        verifyAnswer(initialCountry, button.innerText);
      });
    });
  }
}

document.getElementById('next').addEventListener('click', nextGame);

function nextGame() {
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
  const nextCountry = getStartingCountry();
  document.getElementById(
    'flag-image'
  ).src = `https://flagcdn.com/h160/${nextCountry.code}.png`;
  startGame(nextCountry.name);
  console.log('Next game will start');
}
