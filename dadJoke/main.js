const mybutton = document.getElementById('dadJokeButton');
const myTextArea = document.getElementById('jokeArea');
const url = 'https://icanhazdadjoke.com/'
async function getJoke(url = '', data = {}) {
  //const userName = 'barbourjr'
  //const repo = 'webDevTraining'
  let myJSON;
  const myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');

  try {
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    })
    myJSON = await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      console.log('There was a SyntaxError', error);
    } else {
      console.log('There was an error', error);
    }
  } if (myJSON) {
    console.log('Use the JSON here!', JSON.stringify(myJSON));
  }
}

