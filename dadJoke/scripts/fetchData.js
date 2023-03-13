// import node-fetch
//const fetch = import('node-fetch');
// set url as constant
const URL = 'https://icanhazdadjoke.com/search';

fetch(URL)
.then((response) => response.text())
.then((body) => {
    console.log(body);
}).catch(err => console.error(err));
