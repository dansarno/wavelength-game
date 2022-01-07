class Card {
  constructor(r, tableArray, colours) {
    this.deviceRadius = r;
    this.pairs = tableArray;
    this.colours = colours;
    this.left = null;
    this.leftColour = null;
    this.right = null;
    this.rightColour = null;
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

    let cardHeight = 0.2 * height;
    let cardY = (this.deviceRadius * 0.25) + (cardHeight / 2);

    fill(this.leftColour);
    rect(-cardHeight / 2, cardY, cardHeight, cardHeight);
    fill(this.leftColour);
    rect(-cardHeight / 2 - 10, cardY, cardHeight, cardHeight, 10);

    fill(this.rightColour);
    rect(cardHeight / 2, cardY, cardHeight, cardHeight);
    fill(this.rightColour);
    rect(cardHeight / 2 + 10, cardY, cardHeight, cardHeight, 10);

    fill(0);
    text(this.left, -cardHeight / 2, 1.5 * cardY, 120, cardHeight + 10);
    text(this.right, cardHeight / 2, 1.5 * cardY, 120, cardHeight + 10);
    rectMode(CORNER);

    let v0 = createVector(-40, cardY - 40);
    let v1 = createVector(-cardHeight / 2, 0);
    this.#drawArrow(v0, v1);
    
    let v2 = createVector(40, cardY - 40);
    let v3 = createVector(cardHeight / 2, 0);
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