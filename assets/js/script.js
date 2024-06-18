// Wait for the DOM to finish loading before running the game
document.addEventListener('DOMContentLoaded', function () {
  let country = getRandomCountry();
  document.getElementById(
    'flag-image'
  ).src = `https://flagcdn.com/h160/${country.code}.png`;
});

// Declare initial variables
let correctCount = 0;
let incorrectCount = 0;
let timeRemain = 15; // set countdown time to 15 seconds

const countries = [
  { code: 'at', name: 'Austria' },
  { code: 'be', name: 'Belgium' },
  { code: 'bg', name: 'Bulgaria' },
];

// Function to get a random country from the countries array

function getRandomCountry() {
  let randomCountry = Math.floor(Math.random() * countries.length);
  return countries[randomCountry];
}
