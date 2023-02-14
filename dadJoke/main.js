//import validator from 'validator';

const mybutton = document.getElementById('dadJokeButton');
const myTextArea = document.getElementById('jokeArea');
const myMemeImage = document.getElementById('dadJokeMeme');
let url = new URL('https://icanhazdadjoke.com/search')
var jokeSearch = document.getElementById('jokeSearch').innerText;
var limit = document.getElementById('limit').innerText;
var maxPage;
async function getJokes(limit = 1,term='') {
  //const userName = 'barbourjr'
  //const repo = 'webDevTraining'
  let myJSON;
  const myHeaders = new Headers();
  //const formData = new FormData();
  url.searchParams.set('limit', limit);
  url.searchParams.set('term', jokeSearch);
  myHeaders.append('Accept', 'application/json');
  console.log("URL: ", url)
  let response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      myTextArea.innerHTML = JSON.stringify(data.results)
      mybutton.innerHTML = 'Get Another Dad Joke'
      myMemeImage.hidden = false
    }).catch(function(error) {
      console.log("Error: ", error)
    })
}


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
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





