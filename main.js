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
    card.setAttribute("data-id", `${imgName}`);
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
    this.player = new Player();
    this.board = new Board();
    this.activeCards = [];
    this.boardElement = document.querySelector(".cards");
    this.cardElements;
    this.timer = document.querySelector("#timer");
    this.seconds = 0;
    this.minutes = 0;
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
  addEventListenerToBoardCards() {
    this.cardElements = document.querySelectorAll(".card-image-container");
    for (let element of this.cardElements) {
      element.addEventListener("click", event => {
        element.classList.toggle("active-front");
        element.classList.toggle("active-back");
        let cardIdentity = event.target.dataset.id;
        this.startTimer();
        console.log(cardIdentity);
      });
    }
  }
  startTimer() {
    this.activeCards = document.querySelectorAll(
      ".card-image-container.active-front.active-back"
    );
    if (this.activeCards.length == 2) {
      for (let card of this.cardElements) {
        card.setAttribute("style", "pointer-events: none;");
      }
      //this.showTimer();
      this.checkIfCardsEqual();
      setTimeout(() => {
        for (let card of this.cardElements) {
          card.removeAttribute("style", "pointer-events: none;");
        }
        this.activeCards[0].classList.toggle("active-front");
        this.activeCards[1].classList.toggle("active-front");
        this.activeCards[0].classList.toggle("active-back");
        this.activeCards[1].classList.toggle("active-back");
      }, 3000);
    }
  }
  // showTimer() {
  //   const setSeconds = setTimeout(() => {
  //     this.seconds++;
  //     if ((this.seconds = 60)) {
  //       this.seconds = 0;
  //       this.minutes++;
  //     }
  //     timer.innerText = `${this.minutes}:${
  //       this.seconds > 9 ? this.seconds : "0" + this.seconds
  //     }`;
  //   }, 10000);
  //   if (this.minutes === 1) {
  //     clearTimeout(setSeconds);
  //     this.seconds = 0;
  //     this.minutes = 0;
  //     return;
  //   } else {
  //     this.showTimer();
  //   }
  // }
  checkIfCardsEqual() {
    if (this.activeCards[0].dataset.id === this.activeCards[0].dataset.id) {
      this.player.score += 1;
      this.activeCards[0].setAttribute("style", "pointer-events: none;");
      this.activeCards[1].setAttribute("style", "pointer-events: none;");
    } else {
      this.player.wrongMoves += 1;
      this.activeCards = [];
    }
  }
  start() {
    this.allocateImagesToGame(this.boardElement);
    this.addEventListenerToBoardCards();
  }
}
let game = new Game();
game.start();
