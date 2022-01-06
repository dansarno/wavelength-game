class Device {
  constructor(x, y, r) {
    this.xorigin = x;
    this.yorigin = y;
    this.radius = r;

    this.dialPosition = 5;
    this.dialLength = 0.8 * r;
    this.dialDiameter = 0.35 * r;

    this.targetWidth = 0.4;
    this.targetPosition = random(this.targetWidth, 10 - this.targetWidth);

    this.screenShown = true;
    this.screenPosition = 0;
    this.screenSpeed = 0.1; // pos/frame
    this.screenRevealAnimation = false;
    this.screenConcealAnimation = false;
  }

  moveDial() {
    let mouseTheta = atan(abs(this.yorigin - mouseY) / (mouseX - this.xorigin));

    if (mouseTheta < 0) {
      mouseTheta = mouseTheta + PI;
    }

    this.dialPosition = this.theta2position(mouseTheta);
  }

  randomiseTarget() {
    this.targetPosition = random(this.targetWidth, 10 - this.targetWidth);
  }

  reveal() {
    if (this.screenPosition >= 10) {
      this.screenShown = false;
      this.screenRevealAnimation = false;
    } else {
      this.screenPosition += this.screenSpeed;
      this.screenRevealAnimation = true;
    }
  }

  conceal() {
    if (this.screenPosition <= 0) {
      this.screenShown = true;
      this.screenConcealAnimation = false;
    } else {
      this.screenPosition -= this.screenSpeed;
      this.screenConcealAnimation = true;
    }
  }

  checkScore() {
    let isGreaterThanOuterTargetMin = this.targetPosition - 2.5 * this.targetWidth < this.dialPosition;
    let isLessThanOuterTargetMax = this.targetPosition - 1.5 * this.targetWidth > this.dialPosition;
    if (isGreaterThanOuterTargetMin && isLessThanOuterTargetMax) {
      noStroke();
      fill(0);
      text("2", 0, 0);
    }

    let isGreaterThanMiddleTargetMin = this.targetPosition - 1.5 * this.targetWidth < this.dialPosition;
    let isLessThanMiddleTargetMax = this.targetPosition - 0.5 * this.targetWidth > this.dialPosition;
    if (isGreaterThanMiddleTargetMin && isLessThanMiddleTargetMax) {
      noStroke();
      fill(0);
      text("3", 0, 0);
    }

    let isGreaterThanTargetMin = this.targetPosition - this.targetWidth/2 < this.dialPosition;
    let isLessThanTargetMax = this.targetPosition + this.targetWidth/2 > this.dialPosition;
    if (isGreaterThanTargetMin && isLessThanTargetMax) {
      noStroke();
      fill(0);
      text("4", 0, 0);
    }

    isGreaterThanMiddleTargetMin = this.targetPosition + 0.5 * this.targetWidth < this.dialPosition;
    isLessThanMiddleTargetMax = this.targetPosition + 1.5 * this.targetWidth > this.dialPosition;
    if (isGreaterThanMiddleTargetMin && isLessThanMiddleTargetMax) {
      noStroke();
      fill(0);
      text("3", 0, 0);
    }

    isGreaterThanOuterTargetMin = this.targetPosition + 1.5 * this.targetWidth < this.dialPosition;
    isLessThanOuterTargetMax = this.targetPosition + 2.5 * this.targetWidth > this.dialPosition;
    if (isGreaterThanOuterTargetMin && isLessThanOuterTargetMax) {
      noStroke();
      fill(0);
      text("2", 0, 0);
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

    // Screen

    if (this.screenRevealAnimation) {
      this.reveal();
    }

    if (this.screenConcealAnimation) {
      this.conceal();
    }

    if (peak) {
      fill(128, 170, 178, 200);
    } else {
      fill(128, 170, 178);
    }
    arc(0, 0, this.radius * 2, this.radius * 2, TWO_PI - this.position2theta(this.screenPosition), 3 * PI, PIE);

    // Base

    fill(220);
    rect(-width / 2, 0, width, height / 4);

    // Card

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