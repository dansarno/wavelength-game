class Card {
  constructor(x, y, w, h, tableArray, colours) {
    this.xorigin = x;
    this.yorigin = y;
    this.width = w;
    this.height = h;
    this.pairs = tableArray;
    this.colours = colours;
    this.left = null;
    this.leftColour = null;
    this.right = null;
    this.rightColour = null;
    this.mouseOnNew = false;
  }

  newScale() {
    let randScale = random(this.pairs);
    this.left = randScale[0];
    this.right = randScale[1];

    let numColours = this.colours.length;
    let randIndex = int(random(numColours));
    let otherRandIndex = (randIndex + 2) % numColours;

    this.leftColour = this.colours[randIndex];
    this.rightColour = this.colours[otherRandIndex];
  }

  render() {
    rectMode(CENTER);
    noStroke();
    textSize(sketchHeight / 40);

    // New button
    if (this.mouseOnNew) {
      fill(65, 67, 100);
    } else {
      fill(45, 47, 80);
    }
    this.newButtonX = this.xorigin + this.width * 0.75;
    this.newButtonY = this.yorigin + this.height * 0.6;
    this.newButtonW = this.width / 2;
    this.newButtonH = this.height / 4;
    rect(this.xorigin + this.width * 0.75, this.yorigin + this.height * 0.6, this.width / 2, this.height / 4, 10);

    textSize(18);
    fill(200);
    text("NEW", this.xorigin + this.width * 0.75, this.yorigin + this.height * 0.65);

    // LHS
    fill(this.leftColour);
    rect(this.xorigin - this.width / 2, this.yorigin, this.width, this.height);
    fill(this.leftColour);
    rect(this.xorigin - this.width / 2 - 5, this.yorigin, this.width, this.height, 7);

    // RHS
    fill(this.rightColour);
    rect(this.xorigin + this.width / 2, this.yorigin, this.width, this.height);
    fill(this.rightColour);
    rect(this.xorigin + this.width / 2 + 5, this.yorigin, this.width, this.height, 7);

    // Text
    fill(0);
    text(this.left, this.xorigin - this.width / 2, this.yorigin + this.height * 0.45, this.width * 0.8, this.height + 10);
    text(this.right, this.xorigin + this.width * 0.55, this.yorigin + this.height * 0.45, this.width * 0.8, this.height + 10);
    rectMode(CORNER);

    // Left arrow
    let v0 = createVector(this.xorigin - this.width * 0.32, this.yorigin - this.height * 0.28);
    let v1 = createVector(-this.width * 0.4, 0);
    this.#drawArrow(v0, v1);
    
    // Right arrow
    let v2 = createVector(this.xorigin + this.width * 0.32, this.yorigin - this.height * 0.28);
    let v3 = createVector(this.height * 0.4, 0);
    this.#drawArrow(v2, v3);
  }

  #drawArrow(base, vec) {
    push();
    stroke(0);
    strokeWeight(3);
    fill(0);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 6;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }
}