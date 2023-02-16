//import validator from 'validator';

const mybutton = document.getElementById('submitButton');
const myJokeList = document.getElementById('jokeList');
const myMemeImage = document.getElementById('dadJokeMeme');
let term = document.getElementById('search_term')
let limit = document.getElementById('limit');
var maxPage;
async function getJokes() {

  let url = new URL('https://icanhazdadjoke.com/search')
  myJokeList.innerText=""
  let myHeaders = new Headers();
  //const formData = new FormData();
  if (term !== "") url.searchParams.append('term', term.value);
  if (limit !=="") url.searchParams.append('limit', limit.value); 
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
      console.log("Data: ", data)
      data.results.forEach((entry) => {
        Object.entries(entry).forEach(([key, value]) => {
          // key: the name of the object key
          if (key === 'joke'){
            let li = document.createElement("li");
            li.textContent = value
            jokeStringArray.push(value)
          }
        })
      })

      jokeStringArray.forEach((entry) => {
        //console.log("Entry: ", entry)
        let li = document.createElement("li");
        li.textContent = entry
        myJokeList.appendChild(li);
      }
      
      )
      await handleNotEnoughJokes(data.total_jokes);
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

function handleNotEnoughJokes(total_jokes) {
  if (limit.value > total_jokes && term.value) {
    let li = document.createElement("li");
    li.textContent = "Sorry, we only have " + total_jokes + " jokes about " + term.value +"(s)."
    myJokeList.appendChild(li);
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





