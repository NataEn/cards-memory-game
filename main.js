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

class Board {
  constructor(theme = "animals", difficulty = 6) {
    this.theme = theme;
    this.difficulty = difficulty;
    this.activeCards = [];
  }
  shuffleCards = imagesArray => {
    let j, x, i;
    for (i = imagesArray.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = imagesArray[i];
      imagesArray[i] = imagesArray[j];
      imagesArray[j] = x;
    }
    return imagesArray;
  };
  getRandomDuplicateImages = windowImagesNameArray => {
    let imagesForGame = [];
    while (imagesForGame.length < this.difficulty * 2) {
      let randomImageIndex = Math.floor(Math.random() * this.difficulty);
      let possibleImage = windowImagesNameArray[randomImageIndex];
      if (!imagesForGame.includes(possibleImage)) {
        imagesForGame.push(...[possibleImage, possibleImage]);
      }
    }
    let suffledCards = this.shuffleCards(imagesForGame);

    return suffledCards;
  };
  returnCardElement(imgName) {
    let card = document.createElement("div");
    card.setAttribute(
      "class",
      "card-image-container card-flip col-xs-4 col-md-2"
    );
    card.addEventListener("click", event => {
      card.classList.add("active-front");
      card.classList.add("active-back");
      let cardIdentity = event.target.dataset.id;
      this.activeCards.push(event.target);
      this.stopFlippingCards();

      console.log(cardIdentity);
    });
    let cardBack = document.createElement("div");
    cardBack.setAttribute(
      "style",
      `background-image:url("./img/${this.theme}/${imgName}.jpg")`
    );
    cardBack.setAttribute("class", "card-flip  card-back img-thumbnail");

    let cardFront = document.createElement("div");
    cardFront.setAttribute(
      "style",
      'background-image:url("./img/cardFront.jpg")'
    );
    cardFront.setAttribute("class", "card-flip card-front img-thumbnail");
    cardFront.setAttribute("data-id", `${imgName}`);
    card.appendChild(cardBack);
    card.appendChild(cardFront);
    return card;
  }
  addCardsToBoard(boardElement, shuffledImagesNamesArray) {
    for (let imageName of shuffledImagesNamesArray) {
      let cardElement = this.returnCardElement(imageName);
      boardElement.appendChild(cardElement);
    }
  }
  stopFlippingCards() {
    if (this.activeCards.length == 2) {
      let cardsCreated = document.querySelectorAll(".card");
      let cardsNotfliped = document.querySelectorAll(
        ".card:not(.active-front):not(.active-back)"
      );
      console.log(document.querySelectorAll(".card"));
      console.log(cardsNotfliped);
    }
    console.log(this.activeCards.length);
  }
  checkIfCardsEqual(cardOneId, CardTwoId) {
    if (cardOneId === CardTwoId) {
      //keep them open==remove event listener from card
      //add a point to users score
      //open further clicking on cards
    } else {
      //start timer
      //add 1 to wrong Moves
    }
  }
}

class Game {
  constructor() {
    this.animalImages = [
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
    this.veggetableImages = [
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
    this.fruitImages = [
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
    this.board = new Board();
    this.boardElement = document.querySelector(".cards");
  }
  allocateImagesToGame(boardElement) {
    let imagesArray;
    if (this.board.theme === "animals") {
      imagesArray = this.board.getRandomDuplicateImages(this.animalImages);
      this.board.addCardsToBoard(boardElement, imagesArray);
    } else if (gameObject.theme === "fruits") {
      imagesArray = this.board.getRandomDuplicateImages(this.fruitImages);
      this.board.addCardsToBoard(boardElement, imagesArray);
    } else if (gameObject.theme === "vegetables") {
      imagesArray = this.board.getRandomDuplicateImages(this.veggetableImages);
      this.board.addCardsToBoard(boardElement, imagesArray);
    }
  }
  start() {
    console.log(this.boardElement);
    this.allocateImagesToGame(this.boardElement);
  }
}
let game = new Game();
game.start();
// WindowGame = {};
// WindowGame.animalImages = [
//   "bird",
//   "cat",
//   "checken",
//   "cow",
//   "dogs",
//   "donkey",
//   "dolfin",
//   "ducks",
//   "fox",
//   "giraffe",
//   "hedgehog",
//   "kengeru",
//   "lion",
//   "lutra",
//   "mammoth",
//   "monky",
//   "perrot",
//   "pugs",
//   "sealion",
//   "shark",
//   "sheep",
//   "slouth",
//   "tiger",
//   "zebra"
// ];
// WindowGame.veggetableImages = [
//   "cabbage",
//   "carob",
//   "carrot",
//   "caulliflower",
//   "celery",
//   "cucumber",
//   "garlic",
//   "lettuce",
//   "onion",
//   "paprika",
//   "potato",
//   "radish",
//   "tomato"
// ];
// WindowGame.fruitImages = [
//   "banana",
//   "blueberry",
//   "grapes",
//   "guyava",
//   "apple",
//   "kiwi",
//   "lemon",
//   "litchi",
//   "mandarina",
//   "mellon",
//   "orange",
//   "peach",
//   "pear",
//   "pongranade",
//   "raspberry",
//   "strawberry",
//   "watermellon"
// ];
// WindowGame.board = document.querySelector(".cards");
// WindowGame.cardSNotFlipped;

// WindowGame.totalCards = document.querySelectorAll(".card-flip");

// WindowGame.startNewGame = () => {
//   //handel get gameObject.theme
// };
// WindowGame.allocateImagesToGame = gameObject => {
//   let imagesArray;
//   if (gameObject.theme === "animals") {
//     imagesArray = gameObject.getRandomDuplicateImages(WindowGame.animalImages);
//     gameObject.addCardsToBoard(WindowGame.board, imagesArray);
//   } else if (gameObject.theme === "fruits") {
//     imagesArray = gameObject.getRandomDuplicateImages(WindowGame.fruitImages);
//     gameObject.addCardsToBoard(WindowGame.board, imagesArray);
//   } else if (gameObject.theme === "vegetables") {
//     imagesArray = gameObject.getRandomDuplicateImages(
//       WindowGame.veggetableImages
//     );
//     gameObject.addCardsToBoard(WindowGame.board, imagesArray);
//   }
// };
// WindowGame.returnFlippedCard = () => {};
// WindowGame.start = () => {
//   let newBoard = new Board();
//   console.log(newBoard);
//   WindowGame.allocateImagesToGame(newBoard);
// };
// WindowGame.start();
// console.log(WindowGame.board);
