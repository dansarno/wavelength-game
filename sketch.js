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
let button, button2, button3, button4;

function preload() {
  pairsTable = loadTable("pairs.csv", "csv");
  coloursTable = loadTable("colours.csv", "csv");
}

function setup() {
  createCanvas(sketchWidth, sketchHeight);
  background(221);
  textAlign(CENTER);
  textFont('Helvetica');
  textSize(sketchHeight / 40);

  angleMode(RADIANS);

  device = new Device(xorigin, yorigin, arcRadius);

  card = new Card(arcRadius, pairsTable.getArray(), coloursTable.getArray());
  card.newScale();

  board = new Board(xorigin, yorigin + sketchHeight * 0.1, sketchWidth * 0.9, sketchHeight * 0.9);

  button = createButton('Reveal');
  button.position(0.75 * width, 0.75 * height);
  button.mousePressed(toggleScreen);

  button2 = createButton('Peak');
  button2.position(0.25 * width, 0.75 * height);
  button2.mousePressed(togglePeak);

  button3 = createButton('New');
  button3.position(0.5 * width, 0.9 * height);
  button3.mousePressed(newCard);

  button4 = createButton('Random');
  button4.position(150, 0);
  button4.mousePressed(randTarget);
}

function draw() {
  background(220);

  board.render();

  device.render();
  // device.checkScore();

  card.render();
}

function mouseDragged() {
  device.moveDial();
}

function mouseClicked() {
  device.moveDial();
}

function toggleScreen() {
  if (device.screenShown) {
    device.reveal();
  } else {
    device.conceal()
  }
}

function togglePeak() {
  if (device.peak) {
    device.peak = false;
  } else {
    device.peak = true;
  }
}

function randTarget() {
  device.randomiseTarget();
}

function newCard() {
  card.newScale();
}
