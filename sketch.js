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
  let canvas = createCanvas(sketchWidth, sketchHeight);
  canvas.parent('sketch-container');
  
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
}

function draw() {
  background(255);

  board.render();
  device.render();
  card.render();
  game.render();

  mouseOver();
}

function mouseDragged() {
  device.moveDial();
}

function mouseOver() {
  if (mag(xorigin - mouseX, yorigin - mouseY) < device.dialRadius) {
    device.mouseOnDial = true;
  } else {
    device.mouseOnDial = false;
  }

  if (mag(xorigin + device.peakX - mouseX, yorigin + device.peakY - mouseY) < device.peakDiameter / 2) {
    device.mouseOnPeak = true;
  } else {
    device.mouseOnPeak = false;
  }

  if (mouseX > xorigin + card.newButtonX - card.newButtonW / 2 && 
      mouseX < xorigin + card.newButtonX + card.newButtonW / 2 && 
      mouseY > yorigin + card.newButtonY - card.newButtonH / 2 &&
      mouseY < yorigin + card.newButtonY + card.newButtonH / 2
      ) {
    card.mouseOnNew = true;
  } else {
    card.mouseOnNew = false;
  }
}

function mouseClicked() {
  device.moveDial();

  if (mag(xorigin - mouseX, yorigin - mouseY) < device.dialRadius) {
    guess();
  }

  if (mag(xorigin + device.peakX - mouseX, yorigin + device.peakY - mouseY) < device.peakDiameter / 2) {
    togglePeak();
  }

  if (mouseX > xorigin + card.newButtonX - card.newButtonW / 2 && 
    mouseX < xorigin + card.newButtonX + card.newButtonW / 2 && 
    mouseY > yorigin + card.newButtonY - card.newButtonH / 2 &&
    mouseY < yorigin + card.newButtonY + card.newButtonH / 2
    ) {
    card.newScale();
}
}

function togglePeak() {
  if (device.peak) {
    device.peak = false;
  } else {
    device.peak = true;
  }
}

function guess() {
  if (!device.screenRevealAnimation && !device.screenConcealAnimation) {
    if (isNextGo == false) {
      device.reveal();
      game.makeGuess();
      isNextGo = true;
    } else {
      device.randomiseTarget();
      card.newScale();
      isNextGo = false;
      game.nextTurn();
    } 
  }
}

function randTarget() {
  device.randomiseTarget();
}