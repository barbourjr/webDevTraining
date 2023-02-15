//import validator from 'validator';

const mybutton = document.getElementById('submitButton');
const myTextArea = document.getElementById('jokeArea');
const myMemeImage = document.getElementById('dadJokeMeme');

var maxPage;
async function getJokes() {
  //const userName = 'barbourjr'
  //const repo = 'webDevTraining'
  let url = new URL('https://icanhazdadjoke.com/search')
  let term = document.getElementById('jokeSearch').innerText;
  let limit = document.getElementById('limit').innerText;
  let myJSON;
  let myHeaders = new Headers();
  //const formData = new FormData();
  if (term !== "") url.searchParams.append('term', term);
  if (limit !=="") url.searchParams.append('limit', limit); 
  myHeaders.set('Accept', 'application/json');
  //myHeaders.set("Access-Control-Allow-Origin", 'https://icanhazdadjoke.com');
  console.log("URL: ", url)
  const request = new Request(url, {
    method: 'GET', 
    headers: myHeaders,
    mode: 'cors'
  })
  fetch(request)
  .then((response) => {
    if (response.status === 200) {
      console.debug(response);
      const data = response.json
      myTextArea.innerHTML = JSON.stringify(data.results)
      mybutton.innerHTML = 'Get Another Dad Joke'
      myMemeImage.hidden = false
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





