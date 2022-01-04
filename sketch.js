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
let dial;

function preload() {
  table = loadTable("pairs.csv", "csv");
}

function setup() {
  createCanvas(sketchWidth, sketchHeight);
  background(220);
  textAlign(CENTER);
  textFont('Helvetica');
  textSize(16);

  pair = new Scale(table.getArray());
  pair.newScale();

  dial = new Dial(width / 2, (3 * height) / 4);

  showGuard = true;
  peak = false;

  fill(255);
  noStroke();
  arc(width / 2, (3 * height) / 4, arcDiameter, arcDiameter, PI, 0, CHORD);

  segmentTheta = PI / 64;
  target = random(-segmentTheta, -PI + segmentTheta);
}

function draw() {
  background(220);

  noStroke();
  fill(255);
  arc(width / 2, (3 * height) / 4, arcDiameter, arcDiameter, PI, 0, CHORD);

  translate(width / 2, (3 * height) / 4);

  noStroke();
  fill(201, 153, 58);
  arc(
    0,
    0,
    arcDiameter,
    arcDiameter,
    target - 5 * segmentTheta,
    target + 5 * segmentTheta,
    PIE
  );
  fill(170, 202, 165);
  arc(
    0,
    0,
    arcDiameter,
    arcDiameter,
    target - 3 * segmentTheta,
    target + 3 * segmentTheta,
    PIE
  );
  fill(209, 101, 72);
  arc(
    0,
    0,
    arcDiameter,
    arcDiameter,
    target - segmentTheta,
    target + segmentTheta,
    PIE
  );

  if (showGuard) {
    if (peak) {
      fill(128, 170, 178, 200);
    } else {
      fill(128, 170, 178);
    }
    arc(0, 0, arcDiameter, arcDiameter, PI, 0, CHORD);
  }

  fill(220);
  rect(-width / 2, 0, width, height / 4);

  fill(0);
  rectMode(CENTER);
  text(pair.left, -width / 4, 50, 120, 80);
  text(pair.right, width / 4, 50, 120, 80);
  rectMode(CORNER);

  dial.render();
}

function mouseDragged() {
  dial.moveDial();
}

function mouseClicked() {
  dial.moveDial();
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
