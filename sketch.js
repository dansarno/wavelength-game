let sketchWidth = 600;
let sketchHeight = 400;
let arcDiameter = sketchHeight * 1.2;
let arcRadius = arcDiameter / 2;
let table;
let pair;
let x2 = 0;
let y2 = -arcRadius;
let target;
let segmentTheta;
let showGuard;
let peak;
let device;

function preload() {
  table = loadTable("pairs.csv", "csv");
}

function setup() {
  createCanvas(sketchWidth, sketchHeight);
  background(220);
  textAlign(CENTER);
  textFont('Helvetica');
  textSize(16);

  angleMode(RADIANS);

  pair = new Scale(table.getArray());
  pair.newScale();

  device = new Device(width / 2, (3 * height) / 4, arcRadius);

  showGuard = true;
  peak = false;
}

function draw() {
  background(220);

  device.render();
  device.checkScore();
}

function mouseDragged() {
  device.moveDial();
}

function mouseClicked() {
  device.moveDial();
}

function toggleReveal() {
  if (showGuard) {
    showGuard = false;
  } else {
    showGuard = true;
  }
}

function keyPressed() {
  if (key === "r" || key === "R") {
    toggleReveal()
  }

  if ((key === "p" || key === "P") && showGuard) {
    if (peak) {
      peak = false;
    } else {
      peak = true;
    }
  }
}
