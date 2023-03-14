// import node-fetch
import {fetch} from 'node-fetch';
// set url as constant
const URL = 'https://icanhazdadjoke.com/search';

try {
    const response = await fetch(URL)
} catch (error) {
    console.log("Error: ", error)
}

export default response.body ? response.body : 'Empty Response Body!'

