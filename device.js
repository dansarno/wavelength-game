class Device {
  constructor(x, y, r) {
    this.xorigin = x;
    this.yorigin = y;
    this.radius = r;
    this.dialPosition = 5;
    this.dialLength = 0.8 * r;
    this.dialDiameter = 0.35 * r;
    this.targetWidth = 0.4;
    this.targetPosition = random(3 * this.targetWidth, 10 - (3 * this.targetWidth));
    this.showScreen = true;
  }

  moveDial() {
    let mouseTheta = atan(abs(this.yorigin - mouseY) / (mouseX - this.xorigin));

    if (mouseTheta < 0) {
      mouseTheta = mouseTheta + PI;
    }

    this.dialPosition = this.theta2position(mouseTheta);
  }

  checkScore(){
    let isGreaterThanTargetMin = this.targetPosition - this.targetWidth/2 < this.dialPosition;
    let isLessThanTargetMax = this.targetPosition + this.targetWidth/2 > this.dialPosition;
    if (isGreaterThanTargetMin && isLessThanTargetMax) {
      noStroke();
      fill(0);
      text("Hi", 0, 0);
    }
  }

  theta2position(theta) {
    return ((PI - theta) / PI) * 10;
  }

  position2theta(position) {
    return PI - ((position / 10) * PI);
  }

  render() {

    translate(this.xorigin, this.yorigin);
    
    // Device

    // Device background arc
    noStroke();
    fill(241, 236, 226);
    arc(0, 0, this.radius * 2, this.radius * 2, PI, 0, CHORD);


    // 2 point targets
    noStroke();
    fill(224, 173, 66);
    arc(
      0,
      0,
      this.radius * 2,
      this.radius * 2,
      -this.position2theta(this.targetPosition - (2.5 * this.targetWidth)),
      -this.position2theta(this.targetPosition - (1.5 * this.targetWidth)),
      PIE
    );
    arc(
      0,
      0,
      this.radius * 2,
      this.radius * 2,
      -this.position2theta(this.targetPosition + (1.5 * this.targetWidth)),
      -this.position2theta(this.targetPosition + (2.5 * this.targetWidth)),
      PIE
    );

    // 3 point targets
    fill(221, 87, 72);
    arc(
      0,
      0,
      this.radius * 2,
      this.radius * 2,
      -this.position2theta(this.targetPosition - (1.5 * this.targetWidth)),
      -this.position2theta(this.targetPosition - (0.5 * this.targetWidth)),
      PIE
    );
    arc(
      0,
      0,
      this.radius * 2,
      this.radius * 2,
      -this.position2theta(this.targetPosition + (0.5 * this.targetWidth)),
      -this.position2theta(this.targetPosition + (1.5 * this.targetWidth)),
      PIE
    );

    // 4 point target
    fill(91, 135, 151);
    arc(
      0,
      0,
      this.radius * 2,
      this.radius * 2,
      -this.position2theta(this.targetPosition - (0.5 * this.targetWidth)),
      -this.position2theta(this.targetPosition + (0.5 * this.targetWidth)),
      PIE
    );

    // Target labels
    fill(0);
    rectMode(CENTER);
    rotate(-this.position2theta(this.targetPosition - this.targetWidth * 2) + PI/2);
    text('2', 0, -this.radius * 0.9);
    rotate(this.position2theta(this.targetPosition - this.targetWidth * 2) - PI/2);

    rotate(-this.position2theta(this.targetPosition - this.targetWidth) + PI/2);
    text('3', 0, -this.radius * 0.9);
    rotate(this.position2theta(this.targetPosition - this.targetWidth) - PI/2);

    rotate(-this.position2theta(this.targetPosition) + PI/2);
    text('4', 0, -this.radius * 0.9);
    rotate(this.position2theta(this.targetPosition) - PI/2);
    
    rotate(-this.position2theta(this.targetPosition + this.targetWidth) + PI/2);
    text('3', 0, -this.radius * 0.9);
    rotate(this.position2theta(this.targetPosition + this.targetWidth) - PI/2);

    rotate(-this.position2theta(this.targetPosition + this.targetWidth * 2) + PI/2);
    text('2', 0, -this.radius * 0.9);
    rotate(this.position2theta(this.targetPosition + this.targetWidth * 2) - PI/2);
    rectMode(CORNER);

    if (showGuard) {
      if (peak) {
        fill(128, 170, 178, 200);
      } else {
        fill(128, 170, 178);
      }
      arc(0, 0, this.radius * 2, this.radius * 2, PI, 0, CHORD);
    }

    fill(220);
    rect(-width / 2, 0, width, height / 4);

    fill(0);
    rectMode(CENTER);
    text(pair.left, -width / 4, 50, 120, 80);
    text(pair.right, width / 4, 50, 120, 80);
    rectMode(CORNER);

    // Dial

    let mouseTheta = this.position2theta(this.dialPosition);

    stroke(185, 55, 59);
    strokeWeight(this.radius / 40);
    line(0, 0, this.dialLength * cos(-mouseTheta), this.dialLength * sin(-mouseTheta));

    fill(185, 55, 59);
    circle(0, 0, this.dialDiameter);
  }
}