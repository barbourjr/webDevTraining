export class Utils {
    buildCard() {
        let card = document.createElement("div");
        card.classList.add("card");
        let jokeImg = document.createElement("img");
        jokeImg.classList.add('jokeImg');
        jokeImg.src = "../images/dadJokeLoading.jpg";
        jokeImg.alt = 'Image of a Dad Joke Loading.';
        card.appendChild(jokeImg);
        return card;
    }
}