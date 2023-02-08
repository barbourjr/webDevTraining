const mybutton = document.getElementById('dadJokeButton');
const myTextArea = document.getElementById('jokeArea');

async function getJoke() {
    //const userName = 'barbourjr'
    //const repo = 'webDevTraining'
    let response = await fetch('curl -H "Accept: application/json" https://icanhazdadjoke.com/');
    let myJSON = await response.json();
    return JSON.parse(myJSON);
  }
getJoke().then(myJSON => console.log(data));

