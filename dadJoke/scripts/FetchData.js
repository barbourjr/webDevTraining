async function fetchData(term, limit) {
    let url = new URL('https://icanhazdadjoke.com/search');
    let myHeaders = new Headers();

    if (term !== "") url.searchParams.append('term', term.value);
    if (limit !=="") url.searchParams.append('limit', limit.value ? limit.value : 1);
    myHeaders.set('Accept', 'application/json');
    const request = new Request(url, {
        method: 'GET', 
        headers: myHeaders,
        mode: 'cors'
    })
    return await fetch(request);
}
export default fetchData;