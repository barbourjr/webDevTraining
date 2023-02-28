function buildCard() {
    let card = document.createElement("div");
    card.classList.add("card");
    let jokeImg = document.createElement("img");
    jokeImg.classList.add('jokeImg');
    jokeImg.src = "images/dadJokeLoading.jpg";
    jokeImg.alt = 'Image of a Dad Joke Loading.';
    card.appendChild(jokeImg);
    return card;
};
function handleNotEnoughJokes(total_jokes, termValue) {
    {
      let card = buildCard();
      let cardDetails = document.createElement("div");
      cardDetails.classList.add('card__details');
      cardDetails.innerText = "Sorry, we only have " + total_jokes + " jokes about " + termValue +"(s).";
      card.appendChild(cardDetails);
      return card;
    } 
  }
export {
    buildCard,
    handleNotEnoughJokes
};