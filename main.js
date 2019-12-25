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
  returnCard() {}
  returnImagesAccordingToTheme(theme) {}
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
WindowGame.allocateImagesToGame = () => {};
