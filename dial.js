class Dial {
  constructor(x, y) {
    this.position = 5;
    this.xorigin = x;
    this.yorigin = y;
  }

  render() {
    let mouseTheta = this.#position2theta(this.position);

    stroke(185, 55, 59);
    strokeWeight(5);
    line(0, 0, arcRadius * cos(-mouseTheta), arcRadius * sin(-mouseTheta));

    fill(185, 55, 59);
    circle(0, 0, 25);
  }

  moveDial() {
    let mouseTheta = atan(abs(this.yorigin - mouseY) / (mouseX - this.xorigin));

    if (mouseTheta < 0) {
      mouseTheta = mouseTheta + PI;
    }

    this.position = this.#theta2position(mouseTheta);
  }

  #theta2position(theta) {
    return ((PI - theta) / PI) * 10;
  }

  #position2theta(position) {
    return PI - ((position / 10) * PI);
  }
}