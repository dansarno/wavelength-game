let sketchWidth = 1400;
let sketchHeight = 800;
let arcDiameter = sketchHeight * 0.8;
let arcRadius = arcDiameter / 2;
let xorigin = sketchWidth / 2;
let yorigin = 0.5 * sketchHeight;
let pairsTable;
let coloursTable;
let card;
let device;
let board;
let button2, button3, button4, button5;
let token1, token2, guessingToken;
let game, teamA, teamB;
let isNextGo = false;

function preload() {
  pairsTable = loadTable("pairs.csv", "csv");
  coloursTable = loadTable("colours.csv", "csv");
  token1 = loadImage('assets/token_1.png');
  token2 = loadImage('assets/token_2.png');
  guessingToken = loadImage('assets/guessing_token.png');
}

function setup() {
  createCanvas(sketchWidth, sketchHeight);
  background(221);
  textAlign(CENTER);
  textFont('Helvetica');
  textSize(sketchHeight / 40);

  angleMode(RADIANS);

  device = new Device(xorigin, yorigin, arcRadius);

  teamA = new Team('Left Brain');
  teamB = new Team('Right Brain');

  game = new WavelengthGame(device, teamA, teamB);

  card = new Card(0, height * 0.3, height * 0.2, height * 0.2, pairsTable.getArray(), coloursTable.getArray());
  card.newScale();

  board = new Board(game, xorigin, yorigin + sketchHeight * 0.1, sketchWidth * 0.9, sketchHeight * 0.9);

  button2 = createButton('Peak');
  button2.position(0.25 * width, 0.75 * height);
  button2.mousePressed(togglePeak);

  button3 = createButton('New');
  button3.position(0.5 * width, 0.9 * height);
  button3.mousePressed(newCard);

  button4 = createButton('Random');
  button4.position(400, 120);
  button4.mousePressed(randTarget);

  button5 = createButton('Guess');
  button5.position(0.75 * width, 0.75 * height);
  button5.mousePressed(guess);
}

function draw() {
  background(255);

  board.render();
  device.render();
  card.render();
  game.render();
}

function mouseDragged() {
  device.moveDial();
}

function mouseClicked() {
  device.moveDial();
}

function togglePeak() {
  if (device.peak) {
    device.peak = false;
  } else {
    device.peak = true;
  }
}

function guess() {
  if (isNextGo == false) {
    device.reveal();
    game.makeGuess();
    isNextGo = true;
    button5.html('Next Go');
  } else {
    button5.html('Guess');
    device.randomiseTarget();
    card.newScale();
    isNextGo = false;
    game.nextTurn();
  } 
}

function randTarget() {
  device.randomiseTarget();
}

function newCard() {
  card.newScale();
}
