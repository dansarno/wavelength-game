class Device {
  constructor(x, y, r) {
    this.xorigin = x;
    this.yorigin = y;
    this.radius = r;

    this.dialPosition = 5;
    this.dialLength = 0.8 * r;
    this.dialDiameter = 0.42 * r;

    this.targetWidth = 0.4;
    this.targetPosition = random(this.targetWidth, 10 - this.targetWidth);

    this.screenShown = true;
    this.peak = false;
    this.screenPosition = 0;
    // this.screenSpeed = 0.04; // rad/frame
    this.screenRevealAnimation = false;
    this.screenConcealAnimation = false;
    this.screenHandleWidth = this.radius * 0.1;

    this.newWheelPosition = 0;
    this.currentWheelPosition = 0;
    this.oldWheelPosition = 0;
    this.wheelAnimation = false;
  }

  moveDial() {
    let mouseTheta = atan(abs(this.yorigin - mouseY) / (mouseX - this.xorigin));

    if (this.yorigin - mouseY > 0 && 
        mag(this.xorigin - mouseX, this.yorigin - mouseY) < this.radius && 
        mag(this.xorigin - mouseX, this.yorigin - mouseY) > this.dialDiameter / 2 && 
        abs(mouseTheta) > 0.12) {

      if (mouseTheta < 0) {
        mouseTheta = mouseTheta + PI;
      }
  
      this.dialPosition = this.theta2position(mouseTheta); 
    }
  }

  randomiseTarget() {
    this.newWheelPosition = this.oldWheelPosition + ((((random() > 0.5) * 2) - 1) * random(2, 4));
    this.wheelAnimation = true;
    this.peak = false;
    this.conceal();
  }

  wheelTurning() {
    if (round(this.currentWheelPosition, 1) == round(this.newWheelPosition, 1)) {
      this.targetPosition = random(this.targetWidth + 0.12, 10 - this.targetWidth - 0.12);
      this.wheelAnimation = false;
      this.oldWheelPosition = this.currentWheelPosition;
    } else {
      this.currentWheelPosition += (this.newWheelPosition - this.oldWheelPosition) / 100;
      this.wheelAnimation = true;
    }
  }

  reveal() {
    let stopPosition = tan(this.screenHandleWidth / this.radius);
    if (this.screenPosition <= -PI + stopPosition) {
      this.screenShown = false;
      this.screenRevealAnimation = false;
    } else {
      if (abs(this.screenPosition - (-PI + stopPosition)) < (PI - stopPosition) / 100) {
        this.screenPosition = -PI + stopPosition;
      } else {
        this.screenPosition -= (PI - stopPosition) / 100;
      }
      this.screenRevealAnimation = true;
    }
  }

  conceal() {
    if (this.screenPosition >= 0) {
      this.screenConcealAnimation = false;
    } else {
      if (abs(this.screenPosition) < PI / 100) {
        this.screenPosition = 0;
      } else {
        this.screenPosition += PI / 100;
      }
      this.screenConcealAnimation = true;
      this.screenShown = true;
    }
  }

  checkScore() {
    let score = null;

    let isGreaterThanOuterTargetMin = this.targetPosition - 2.5 * this.targetWidth < this.dialPosition;
    let isLessThanOuterTargetMax = this.targetPosition - 1.5 * this.targetWidth > this.dialPosition;
    if (isGreaterThanOuterTargetMin && isLessThanOuterTargetMax) {
      score = 2;
    }

    let isGreaterThanMiddleTargetMin = this.targetPosition - 1.5 * this.targetWidth < this.dialPosition;
    let isLessThanMiddleTargetMax = this.targetPosition - 0.5 * this.targetWidth > this.dialPosition;
    if (isGreaterThanMiddleTargetMin && isLessThanMiddleTargetMax) {
      score = 3;
    }

    let isGreaterThanTargetMin = this.targetPosition - this.targetWidth/2 < this.dialPosition;
    let isLessThanTargetMax = this.targetPosition + this.targetWidth/2 > this.dialPosition;
    if (isGreaterThanTargetMin && isLessThanTargetMax) {
      score = 4;
    }

    isGreaterThanMiddleTargetMin = this.targetPosition + 0.5 * this.targetWidth < this.dialPosition;
    isLessThanMiddleTargetMax = this.targetPosition + 1.5 * this.targetWidth > this.dialPosition;
    if (isGreaterThanMiddleTargetMin && isLessThanMiddleTargetMax) {
      score = 3;
    }

    isGreaterThanOuterTargetMin = this.targetPosition + 1.5 * this.targetWidth < this.dialPosition;
    isLessThanOuterTargetMax = this.targetPosition + 2.5 * this.targetWidth > this.dialPosition;
    if (isGreaterThanOuterTargetMin && isLessThanOuterTargetMax) {
      score = 2;
    }

    return score;
  }

  theta2position(theta) {
    return ((PI - theta) / PI) * 10;
  }

  position2theta(position) {
    return PI - ((position / 10) * PI);
  }

  drawWheel(xorigin, yorigin, radius, delta, numPoints, initTheta) {
  
    rotate(initTheta);

    let increment = TWO_PI / numPoints;
    
    stroke(200);
    strokeWeight(2);
    fill(241, 236, 226);
    
    beginShape();
    for (let i = 0; i <= numPoints + 2; i++) {
      let isOdd = ((i % 2) * 2) - 1;
      
      let x = (radius + (isOdd * delta)) * cos(i * increment) + xorigin;
      let y = (radius + (isOdd * delta)) * sin(i * increment) + yorigin;
      
      curveVertex(x, y);
    }
    endShape();

    rotate(-initTheta);
  }

  drawScreen(xorigin, yorigin, radius, handleWidth) {
    arc(xorigin, yorigin, radius * 2, radius * 2, PI, 0, PIE);

    rectMode(CENTER);
    let handleLength = handleWidth * 5;

    stroke(100, 142, 150);
    strokeWeight(2);
    fill(120, 162, 170);
    rect(xorigin + radius + handleLength / 4, yorigin - handleWidth / 2, handleLength, handleWidth, 30);
    noStroke();
    rectMode(CORNER);
  }

  drawScoringSlots(xorigin, yorigin, radius, position) {
    let textPositionFactor;
    if (position == "left") {
      textPositionFactor = -1;
    } else {
      textPositionFactor = 1;
    }

    let slotLength = radius * 0.25;
    let slotSeparation = radius * 0.13;
    for (let i = 0; i <= 10; i++) {
      noStroke();
      fill(3, 51, 82);
      text(str(10 - i), xorigin + textPositionFactor * (slotLength / 2 + 40), yorigin + (i * slotSeparation) + 5);

      stroke(13, 61, 92);
      strokeWeight(15);
      line(xorigin - slotLength / 2, yorigin + (i * slotSeparation), xorigin + slotLength / 2, yorigin + (i * slotSeparation));
    }
  }

  render() {

    translate(xorigin, yorigin);
    textSize(sketchHeight / 40);

    // Wheel outer grip
    if (this.wheelAnimation) {
      this.wheelTurning();
    }

    this.drawWheel(0, 0, this.radius * 1.12, this.radius * 0.03, 60, this.currentWheelPosition);

    // Housing
    noStroke();
    fill(15, 17, 50);
    circle(0, 0, this.radius * 2.15);

    // Housing reflections
    noFill();
    stroke(200);
    strokeWeight(this.radius / 150);
    arc(0, 0, this.radius * 2.11, this.radius * 2.11, PI * 0.95, PI * 1.1);
    arc(0, 0, this.radius * 2.11, this.radius * 2.11, PI * 1.95, PI * 2.1);

    // Wheel inner arc
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
    let labelRadiusFactor = 0.92;

    fill(0);
    rectMode(CENTER);
    rotate(-this.position2theta(this.targetPosition - this.targetWidth * 2) + PI/2);
    text('2', 0, -this.radius * labelRadiusFactor);
    rotate(this.position2theta(this.targetPosition - this.targetWidth * 2) - PI/2);

    rotate(-this.position2theta(this.targetPosition - this.targetWidth) + PI/2);
    text('3', 0, -this.radius * labelRadiusFactor);
    rotate(this.position2theta(this.targetPosition - this.targetWidth) - PI/2);

    rotate(-this.position2theta(this.targetPosition) + PI/2);
    text('4', 0, -this.radius * labelRadiusFactor);
    rotate(this.position2theta(this.targetPosition) - PI/2);
    
    rotate(-this.position2theta(this.targetPosition + this.targetWidth) + PI/2);
    text('3', 0, -this.radius * labelRadiusFactor);
    rotate(this.position2theta(this.targetPosition + this.targetWidth) - PI/2);

    rotate(-this.position2theta(this.targetPosition + this.targetWidth * 2) + PI/2);
    text('2', 0, -this.radius * labelRadiusFactor);
    rotate(this.position2theta(this.targetPosition + this.targetWidth * 2) - PI/2);
    rectMode(CORNER);

    // Screen
    if (this.screenRevealAnimation) {
      this.reveal();
    }

    if (this.screenConcealAnimation) {
      this.conceal();
    }

    if (this.peak) {
      fill(128, 170, 178, 200);
    } else {
      fill(128, 170, 178);
    }

    rotate(this.screenPosition);
    this.drawScreen(0, 0, this.radius, this.screenHandleWidth);
    rotate(-this.screenPosition);

    // Base
    fill(15, 17, 50);
    arc(0, 0, this.radius * 2.1, this.radius * 2.1, TWO_PI, PI, PIE);

    // Base guard right
    beginShape();
    vertex(0, 0);
    vertex(this.radius * 0.87, 0);
    vertex(this.radius * 0.87 * cos(-0.12), this.radius * 0.87 * sin(-0.12));
    endShape();

    // Base guard left
    beginShape();
    vertex(0, 0);
    vertex(-this.radius * 0.87, 0);
    vertex(-this.radius * 0.87 * cos(0.12), -this.radius * 0.87 * sin(0.12));
    endShape();

    // Base stand
    beginShape();
    vertex(-this.radius * 0.6, 0);
    vertex(this.radius * 0.6, 0);
    vertex(this.radius * 0.7, this.radius * 1.3);
    vertex(-this.radius * 0.7, this.radius * 1.3);
    endShape();

    // Dial
    let mouseTheta = this.position2theta(this.dialPosition);

    stroke(185, 55, 59);
    strokeWeight(this.radius / 40);
    line(0, 0, this.dialLength * cos(-mouseTheta), this.dialLength * sin(-mouseTheta));

    noStroke();
    fill(185, 55, 59);
    circle(0, 0, this.dialDiameter);

    fill(135, 5, 9);
    textSize(28);
    text("GUESS", 0, 10);

    // Dial reflections
    noFill();
    stroke(200);
    strokeWeight(this.radius / 120);
    arc(0, 0, this.dialDiameter * 0.9, this.dialDiameter * 0.9, PI * 0.85, PI * 1.2);
    arc(0, 0, this.dialDiameter * 0.9, this.dialDiameter * 0.9, PI * 1.85, PI * 2.2);

    // BUTTONS

    // Peak
    fill(200);
    stroke(100);
    strokeWeight(8);
    circle(-200, 80, 80);
  }
}