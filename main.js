class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.wrongMoves = 0;
    this.submitNameButton = document.querySelector("#submit");
    this.inputName = document.querySelector("input");
    this.playersStorage = window.localStorage;
    this.userData = {
      name: this.name,
      score: this.score,
      wrong_moves: this.wrongMoves
    };
  }
  listenForUserSubscription() {
    console.log("entered subscription function");
    debugger;
    this.inputName.addEventListener("input", e => {
      //e.preventDefault();
      console.log(e.target.value);
      this.name = e.target.value;
    });
    this.submitNameButton.addEventListener("click", () => {
      console.log("entered submit");
      this.playersStorage.setItem("currentPlayer", this.name);
    });
  }
  returnUserData() {
    this.userData = {
      name: this.name,
      score: this.score,
      wrongMoves: this.wrongMoves
    };
    return this.userData;
  }
  // handelUserSubscription() {
  //   console.log(this.submitNameButton);
  //   this.submitNameButton.addEventListener("click", () => {
  //     console.log("entered submit");
  //     this.playersStorage.setItem("currentPlayer", this.name);
  //   });
  // }
  setBestPlayer() {
    let playerInStorage = JSON.parse(this.playersStorage.getItem("bestPlayer"));
    let currentPlayer = this.returnUserData();
    console.log(playerInStorage, currentPlayer);
    if (!playerInStorage) {
      this.playersStorage.setItem("bestPlayer", JSON.stringify(currentPlayer));
      return this.returnUserData();
    } else if (
      playerInStorage.score < this.score &&
      playerInStorage.wrongMoves < this.wrongMoves
    ) {
      this.playersStorage.setItem("bestPlayer", JSON.stringify(currentPlayer));
      return currentPlayer;
    } else return playerInStorage;
  }
}

class Board {
  constructor(theme = "fruits", difficulty = 6) {
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
    this.player = new Player("Player");
    this.board = new Board();
    this.activeCards = [];
    this.boardElement = document.querySelector(".cards");
    this.cardElements;
    this.seconds = 0;
    this.minutes = 0;
    this.correctMoves = 0;
    this.wrongGuessesElement = document.querySelector("span.wrongGuesses");
    this.scoreElement = document.querySelector("span.score");
    this.selectDifficulty = document.querySelector("#difficulty");
    this.selectedTheme = document.querySelector("#theme");
    this.newGameButton = document.querySelector("#newGame");
    this.subscribeButton = document.querySelector("#subscribe");
    this.winnersModal = document.querySelector("#won_or_start");
  }
  allocateImagesToGame() {
    this.boardElement = document.querySelector(".cards");
    this.boardElement.innerHTML = "";
    console.log(
      "allocating games resources",
      this.boardElement,
      this.board.theme,
      this.board.difficulty
    );
    let imagesArray;
    if (this.board.theme === "animals") {
      console.log("allocated animals");
      imagesArray = this.board.getRandomDuplicateImages(this.animalImages);
      this.board.addCardsToBoard(this.boardElement, imagesArray);
    } else if (this.board.theme === "fruits") {
      console.log("allocated fruits");
      imagesArray = this.board.getRandomDuplicateImages(this.fruitImages);
      this.board.addCardsToBoard(this.boardElement, imagesArray);
    } else if (this.board.theme === "vegetables") {
      console.log("allocated vegetables");
      imagesArray = this.board.getRandomDuplicateImages(this.veggetableImages);
      this.board.addCardsToBoard(this.boardElement, imagesArray);
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
  listenToDifficultySelect() {
    this.selectDifficulty.addEventListener("change", e => {
      if (parseInt(e.target.value)) {
        this.board.difficulty = parseInt(e.target.value);
      }
      console.log("difficulty", this.board.difficulty);
      this.allocateImagesToGame();
      this.addEventListenerToBoardCards();
    });
  }
  listenToThemeSelect() {
    this.selectedTheme.addEventListener("change", e => {
      this.board.theme = e.target.value;
      this.allocateImagesToGame();
      this.addEventListenerToBoardCards();
      console.log("theme", this.board.theme);
    });
  }
  startTimer() {
    this.activeCards = document.querySelectorAll(
      ".card-image-container.active-front.active-back"
    );
    if (this.activeCards.length == 2) {
      for (let card of this.cardElements) {
        card.setAttribute("style", "pointer-events: none;");
      }

      setTimeout(() => {
        for (let card of this.cardElements) {
          card.removeAttribute("style", "pointer-events: none;");
        }
        this.activeCards[0].classList.toggle("active-front");
        this.activeCards[1].classList.toggle("active-front");
        this.activeCards[0].classList.toggle("active-back");
        this.activeCards[1].classList.toggle("active-back");
        this.checkIfCardsEqual();
      }, 1000);
    }
  }
  checkIfWon() {
    this.player.returnUserData();
    if (this.correctMoves === this.board.difficulty) {
      this.showWinnerOnNewGameModal();
      this.newGameButton.click();
    }
  }
  checkIfCardsEqual() {
    if (this.activeCards[0].dataset.id === this.activeCards[1].dataset.id) {
      this.player.score += 1;
      this.scoreElement.innerHTML = this.player.score;
      this.correctMoves += 1;
      this.activeCards[0].classList.add("correct");
      this.activeCards[1].classList.add("correct");
      console.log("a match" + this.player.score);
      this.checkIfWon();
    } else {
      this.player.wrongMoves += 1;
      this.wrongGuessesElement.innerHTML = this.player.wrongMoves;
      this.activeCards = [];
    }
  }
  showWinnerOnNewGameModal() {
    let gameWinner = this.player.setBestPlayer();
    this.winnersModal = document.querySelector("#won_or_start");

    this.winnersModal.innerHTML =
      "You finished the puzzel! \n <h4>Our Best Player is:</h4>" +
      `${gameWinner.name} with score of ${gameWinner.score} and with the minimal ${gameWinner.wrongMoves} wrong moves`;
    this.resetGame();
  }
  resetGame() {
    this.newGameButton.addEventListener("click", () => {
      this.winnersModal.innerHTML = "Starting new Game";
      this.board = new Board();
      this.correctMoves = 0;
      this.activeCards = [];
      this.start();
    });
  }
  start() {
    this.listenToDifficultySelect();
    this.listenToThemeSelect();
    this.allocateImagesToGame();
    this.addEventListenerToBoardCards();
    this.player.listenForUserSubscription();
  }
}
let game = new Game();
game.start();
