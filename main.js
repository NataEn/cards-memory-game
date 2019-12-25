class Player {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.score = 0;
    this.wrongMoves = 0;
  }

  didWin(score) {}
  showInPlayersBoard(player) {}
}

class Game {
  constructor(theme, difficulty) {
    this.theme = theme;
    this.difficulty = difficulty;
    this.imagesOnBoard = [];
  }
  shuffleCards = imagesArray => {
    let j, x, i;
    for (i = imagesArray.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = imagesSrcArray[i];
      imagesArray[i] = imagesArray[j];
      imagesArray[j] = x;
    }
    return imagesArray;
  };
  getRandomDuplicateImages = windowImagesNameArray => {
    let imagesForGame = [];
    for (let i = 0; i < this.difficulty; i++) {
      let randomImageIndex = Math.floor(Math.random() * this.difficulty);
      let possibleImage = windowImagesNameArray[randomImageIndex];
      if (!imagesForGame.includes(possibleImage)) {
        imagesForGame.push(possibleImage);
        imagesForGame.push(possibleImage);
      }
    }
    return shuffleCards(imagesForGame);
  };
  returnCardElement(imgName) {
    let card = document.createElement("div");
    card.setAttribute("class", "card-flip");
    let cardBack = document.createElement("img");
    cardBack.setAttribute("src", `./img/${this.theme}/${imgName}.jpg`);
    cardBack.setAttribute("class", "cardBack img-fluid img-thumbnail");
    cardBack.setAttribute("alt", `cardBack-${imgName}`);
    let cardFront = document.createElement("img");
    cardFront.setAttribute("src", "./img/cardFront.jpg");
    cardFront.setAttribute("class", "cardFront img-fluid img-thumbnail");
    cardFront.setAttribute("alt", "cardFront");
    card.appendChild(cardBack);
    card.appendChild(cardFront);
    return card;
  }
  addCardsToBoard(boardElement, shuffledImagesNamesArray) {
    for (let imageName of shuffledImagesNamesArray) {
      let cardElement = returnCardElement(imgName);
      boardElement.appendChild(cardElement);
    }
  }
}

WindowGame = {};
WindowGame.animalImages = [
  "bird",
  "cat",
  "checken",
  "cow",
  "dogs",
  "donkey",
  "dolfin",
  "ducks",
  "fox",
  "giraffe",
  "hedgehog",
  "kengeru",
  "lion",
  "lutra",
  "mammoth",
  "monky",
  "perrot",
  "pugs",
  "sealion",
  "shark",
  "sheep",
  "slouth",
  "tiger",
  "zebra"
];
WindowGame.veggetableImages = [
  "cabbage",
  "carob",
  "carrot",
  "caulliflower",
  "celery",
  "cucumber",
  "garlic",
  "lettuce",
  "onion",
  "paprika",
  "potato",
  "radish",
  "tomato"
];
WindowGame.fruitImages = [
  "banana",
  "blueberry",
  "grapes",
  "guyava",
  "apple",
  "kiwi",
  "lemon",
  "litchi",
  "mandarina",
  "mellon",
  "orange",
  "peach",
  "pear",
  "pongranade",
  "raspberry",
  "strawberry",
  "watermellon"
];
WindowGame.board = document.querySelector(".cards");
WindowGame.allocateImagesToGame = () => {};
