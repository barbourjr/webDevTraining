import toggleDarkMode from "./ToggleDarkMode.js";
import fetchData from "./fetchData.js";
import { buildCard, handleNotEnoughJokes } from "./Utils.js";

const myResetButton = document.getElementById('resetButton');
const mySubmitButton = document.getElementById('submitButton');
const myCardContainer = document.getElementById('cardContainer');
const modeBox = document.getElementById('mode_box');

let term = document.getElementById('search_term')
let limit = document.getElementById('limit');

async function getJokes() {
  myCardContainer.innerText = "";
  fetchData(term, limit).then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      if (!data.results.length) {
        myCardContainer.innerText = "No jokes found.";
        return;
      }
      data.results.forEach((entry) => {
        Object.entries(entry).forEach(([key, value]) => {
          if (key === 'joke') {
            let card = buildCard();
            let cardDetails = document.createElement("div");
            cardDetails.classList.add('card__details');
            cardDetails.innerText = value;
            card.appendChild(cardDetails);
            myCardContainer.appendChild(card);
          }
        })
      })
      if ((limit.value > data.total_jokes) && term.value) {
        let card = handleNotEnoughJokes(data.total_jokes, term.value);
        myCardContainer.appendChild(card);
        mySubmitButton.innerHTML = 'Get Another Dad Joke';
      }
    } else {
      throw new Error('Something went wrong on API server!');
    }
  }).catch((error) => {
    console.error(error);
  });
}

function clearForm(form) {
  form.reset();
  myCardContainer.innerText = "";
  mySubmitButton.innerText = "Get Dad Joke(s)";
  const mode = window.localStorage.getItem('mode');
  if (mode && mode === 'dark') toggleDarkMode(modeBox);
  window.localStorage.removeItem(mode);
}

document.addEventListener("DOMContentLoaded", function () {
  modeBox.addEventListener("change", function () {
    toggleDarkMode(this);
  })
  mySubmitButton.addEventListener("click", function () {
    getJokes();
  })
  myResetButton.addEventListener("click", function () {
    clearForm(this.form);
  })
  toggleDarkMode(modeBox)
})
module.exports = getJokes()






