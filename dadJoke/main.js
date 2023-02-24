//import validator from 'validator';

const mySubmitButton = document.getElementById('submitButton');
const myCardContainer = document.getElementById('cardContainer');
const myMemeImage = document.getElementById('dadJokeMeme');
const modeBox = document.getElementById('mode_box');
let listElements = document.querySelectorAll(".jokelist li");
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
      let jokeStringArray = [];
      const data = await response.json();
      if (!data.results.length) {
        myCardContainer.innerText = "No jokes found.";
        return;
      }
      data.results.forEach((entry) => {
        Object.entries(entry).forEach(([key, value]) => {
          if (key === 'joke') {
            let card = buildCard()
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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

function handleNotEnoughJokes(total_jokes) {
  if (limit.value > total_jokes && term.value) {
    let card = buildCard()
    let cardDetails = document.createElement("div");
    cardDetails.classList.add('card__details')
    cardDetails.innerText = "Sorry, we only have " + total_jokes + " jokes about " + term.value +"(s)."
    card.appendChild(cardDetails)
    myCardContainer.appendChild(card);
  } 
}

function buildCard() {
  let card = document.createElement("div");
  card.classList.add("card")
  let jokeImg = document.createElement("img");
  jokeImg.classList.add('jokeImg');
  jokeImg.src = "images/dadJokeLoading.jpg"
  jokeImg.alt = 'Image of a Dad Joke Loading.';
  card.appendChild(jokeImg)
  return card;
}

function clearForm(form) {
  form.reset();
  myCardContainer.innerText = ""
  mySubmitButton.innerText = "Get Dad Joke(s)"
  const mode = window.localStorage.getItem('mode');
  if (mode && mode === 'dark') toggleDarkMode()
  window.localStorage.removeItem(mode)
}

function toggleDarkMode() {
  
  if (modeBox.checked === true) {
    document.documentElement.classList.remove("light")
    document.documentElement.classList.add("dark")
    window.localStorage.setItem('mode', 'dark');
  } else {
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light")
    window.localStorage.setItem('mode', 'light');
  }

  const mode = window.localStorage.getItem('mode');
  if (mode && mode == 'dark') {
    modeBox.checked = true;
    document.documentElement.classList.remove("light")
    document.documentElement.classList.add("dark")
  }

  if (mode && mode == 'light') {
    modeBox.checked = false;
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light")
  }
} 
/**
 * @param {string} text
 * @return {string}

function sanitizeHTML(text) {
  var element = document.createElement('div');
  element.innerText = text;
  return element.innerHTML;
}

function validateForm() {
  sanitizeHTML(jokeSearch);
  getJokes();
}
 */





