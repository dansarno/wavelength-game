class WavelengthGame {
  constructor(device, teamA, teamB) {
    this.device = device;
    this.teamA = teamA;
    this.teamB = teamB;
    this.turn = teamA;
    this.winner = null;
  }

  makeGuess() {
    let newScore = this.device.checkScore();
    this.turn.score += newScore;
    if (this.turn.score >= 10) {
      this.winner = this.turn;
      this.turn.score = 10;
      this.endGame();
    } else {
      this.nextTurn();
    }
  }

  nextTurn() {
    if (this.turn == this.teamA) {
      this.turn = this.teamB;
    } else {
      this.turn = this.teamA;
    }
  }

  render() {
    if (this.winner != null) {
      textSize(100);
      noStroke();
      fill(0);
      text(`${this.turn.name} Wins!!!`, 0, 0)
    }
  }

  endGame() {
    textSize(100);
    noStroke();
    fill(0);
    text(`${this.turn.name} Wins!!!`)
  }

}

class Team {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  reset() {
    this.score = 0;
  }
}

class Board {
  constructor(x, y, w, h) {
    this.xorigin = x;
    this.yorigin = y;
    this.width = w;
    this.height = h;
  }

  render() {
    rectMode(CENTER);

    // Game box
    strokeWeight(7);
    stroke(23, 71, 102);
    fill(43, 91, 122);
    rect(this.xorigin, this.yorigin, this.width, this.height, 10); 

    // Team titles
    noStroke();
    fill(3, 51, 82);
    textSize(this.height / 15);
    text("Left Brain", this.xorigin - this.width * 0.38, this.yorigin - this.height * 0.4);
    text("Right Brain", this.xorigin + this.width * 0.38, this.yorigin - this.height * 0.4);

    textSize(this.height / 35);

    // Left scoring slots
    this.drawScoringSlots(this.xorigin - this.width * 0.41, this.yorigin - this.height * 0.1, this.width * 0.04, this.height * 0.05, this.height * 0.02, this.width * 0.03, 'left');

    // Right scoring slots
    this.drawScoringSlots(this.xorigin + this.width * 0.41, this.yorigin - this.height * 0.1, this.width * 0.04, this.height * 0.05, this.height * 0.02, this.width * 0.03, 'right');
  }

  drawScoringSlots(xorigin, yorigin, slotLength, slotSeparation, thickness, textOffset, position) {
    let textPositionFactor;
    if (position == "left") {
      textPositionFactor = -1;
    } else {
      textPositionFactor = 1;
    }

    for (let i = 0; i <= 10; i++) {
      noStroke();
      fill(3, 51, 82);
      text(str(10 - i), xorigin + textPositionFactor * (slotLength / 2 + textOffset), yorigin + (i * slotSeparation) + 5);

      stroke(0, 48, 79);
      strokeWeight(thickness);
      line(xorigin - slotLength / 2, yorigin + (i * slotSeparation), xorigin + slotLength / 2, yorigin + (i * slotSeparation));
    }
  }
}

