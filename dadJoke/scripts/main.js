//import * as Utils from './Utils'
import { ToggleDarkMode } from "./ToggleDarkMode.js";
import { Utils } from "./Utils.js";

const myResetButton = document.getElementById('resetButton');
const mySubmitButton = document.getElementById('submitButton');
const myCardContainer = document.getElementById('cardContainer');
const modeBox = document.getElementById('mode_box');

let term = document.getElementById('search_term')
let limit = document.getElementById('limit');

async function getJokes() {

  let url = new URL('https://icanhazdadjoke.com/search')
  
  myCardContainer.innerText = ""

  let myHeaders = new Headers();

  if (term !== "") url.searchParams.append('term', term.value);
  if (limit !=="") url.searchParams.append('limit', limit.value ? limit.value : 1);
  myHeaders.set('Accept', 'application/json');
  const request = new Request(url, {
    method: 'GET', 
    headers: myHeaders,
    mode: 'cors'
  })
   fetch(request)
  .then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      if (!data.results.length) {
        myCardContainer.innerText = "No jokes found.";
        return;
      }
      data.results.forEach((entry) => {
        Object.entries(entry).forEach(([key, value]) => {
          if (key === 'joke') {
            let card = Utils.buildCard()
            let cardDetails = document.createElement("div");
            cardDetails.classList.add('card__details')
            cardDetails.innerText = value
            card.appendChild(cardDetails)
            myCardContainer.appendChild(card);
          }
        })
      })
      
      handleNotEnoughJokes(data.total_jokes);
      mySubmitButton.innerHTML = 'Get Another Dad Joke';

    } else {
      throw new Error('Something went wrong on API server!');
    }
  }).catch((error) => {
    console.error(error);
  });
}

function handleNotEnoughJokes(total_jokes) {
  if ((limit.value > total_jokes) && term.value) {
    let card = Utils.buildCard();
    let cardDetails = document.createElement("div");
    cardDetails.classList.add('card__details');
    cardDetails.innerText = "Sorry, we only have " + total_jokes + " jokes about " + term.value +"(s)."
    card.appendChild(cardDetails);
    myCardContainer.appendChild(card);
  } 
}

function clearForm(form) {
  form.reset();
  myCardContainer.innerText = "";
  mySubmitButton.innerText = "Get Dad Joke(s)";
  const mode = window.localStorage.getItem('mode');
  if (mode && mode === 'dark') ToggleDarkMode.toggleDarkMode(modeBox);
  window.localStorage.removeItem(mode);
}

document.addEventListener("DOMContentLoaded", function () {
  modeBox.addEventListener("change", function () {
    ToggleDarkMode.toggleDarkMode(this);
  })
  mySubmitButton.addEventListener("click", function () {
    getJokes();
  })
  myResetButton.addEventListener("click", function () {
    clearForm(form);
  })
})






