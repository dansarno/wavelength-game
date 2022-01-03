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
let showTarget;

function preload() {
  table = loadTable("pairs.csv", "csv");
}

function setup() {
  createCanvas(sketchWidth, sketchHeight);
  textAlign(CENTER);

  pair = new Scale(table.getArray());
  pair.newScale();

  background(220);

  showTarget = true;

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

  if (showTarget) {
    fill(128, 170, 178);
    arc(0, 0, arcDiameter, arcDiameter, PI, 0, CHORD);
  }

  fill(220);
  rect(-width / 2, 0, width, height / 4);

  fill(0);
  text(pair.left, -width / 4, 0, 70, 80);
  text(pair.right, width / 4, 0, 70, 80);

  stroke(185, 55, 59);
  strokeWeight(5);
  line(0, 0, x2, y2);

  fill(185, 55, 59);
  circle(0, 0, 25);
}

function mouseDragged() {
  moveDial();
}

function mouseClicked() {
  moveDial();
}

function moveDial(){
    let mouseTheta = atan(abs((3 * height) / 4 - mouseY) / (mouseX - width / 2));

  if (mouseTheta < 0) {
    mouseTheta = mouseTheta + PI;
  }

  // print(((PI - mouseTheta) / PI) * 10);

  x2 = arcRadius * cos(-mouseTheta);
  y2 = arcRadius * sin(-mouseTheta);
}

function keyPressed() {
  if (key === "r") {
    if (showTarget) {
      showTarget = false;
    } else {
      showTarget = true;
    }
  }
}
