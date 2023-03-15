import fetch from 'node-fetch'
async function getData () {
    // set url as constant
    const URL = 'https://icanhazdadjoke.com/search';
    const response = await fetch(URL)
    .then((response) => response.text())
    .then((body) => {
        console.log(body);
    }).catch(err => console.error(err));
    return response ? response.body : "Error"
}

export default getData

