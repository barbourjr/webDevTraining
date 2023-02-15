//import validator from 'validator';

const mybutton = document.getElementById('submitButton');
const myTextArea = document.getElementById('jokeArea');
const myMemeImage = document.getElementById('dadJokeMeme');

var maxPage;
async function getJokes() {
  //const userName = 'barbourjr'
  //const repo = 'webDevTraining'
  let url = new URL('https://icanhazdadjoke.com/search')
  let term = document.getElementById('search_term')
  let limit = document.getElementById('limit').value;
  let myHeaders = new Headers();
  //const formData = new FormData();
  if (term !== "") url.searchParams.append('term', term.value);
  if (limit !=="") url.searchParams.append('limit', limit); 
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
      data.results.forEach((entry) => {
        Object.entries(entry).forEach(([key, value]) => {
          // key: the name of the object key
          if (key === 'joke'){
            jokeStringArray.push(value)
          }
        })
      })
      var jokesString = jokeStringArray.toString().split()
      var finalJokeString = jokesString.join('<br>')
      myTextArea.innerHTML = finalJokeString
      mybutton.innerHTML = 'Get Another Dad Joke';
      myMemeImage.hidden = false;
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





