let sketchWidth = 1200;
let sketchHeight = 800;
let arcDiameter = sketchHeight;
let arcRadius = arcDiameter / 2;
let pairsTable;
let coloursTable;
let card;
let x2 = 0;
let y2 = -arcRadius;
let target;
let segmentTheta;
let device;
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

  device = new Device(width / 2, 0.6 * height, arcRadius);

  card = new Card(arcRadius, pairsTable.getArray(), coloursTable.getArray());
  card.newScale();

  peak = false;

  button = createButton('Reveal');
  button.position(0, 0);
  button.mousePressed(toggleScreen);

  button2 = createButton('Peak');
  button2.position(50, 0);
  button2.mousePressed(togglePeak);

  button3 = createButton('New');
  button3.position(100, 0);
  button3.mousePressed(newCard);

  button4 = createButton('Random');
  button4.position(150, 0);
  button4.mousePressed(randTarget);
}

function draw() {
  background(220);

  translate(width / 2, 0.6 * height);

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
