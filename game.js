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

    // Update score for the Left/Right Phase
    let correct = this.device.checkLeftOrRight()
    if (correct && newScore != 4) {
      if (this.turn == this.teamA) {
        this.teamB.score += 1;
      } else {
        this.teamA.score += 1;
      }
    }

    this.turn.score += newScore;
    if (this.turn.score >= 10) {
      this.winner = this.turn;
      this.turn.score = 10;
      this.endGame();
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
      rectMode(CENTER);
      fill(200);
      strokeWeight(10);
      stroke(50);
      rect(0, 0, 1000, 200, 50);

      textSize(100);
      noStroke();
      fill(15, 17, 50);
      text(`${this.turn.name} Wins!!!`, 0, 30)
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
  constructor(game, x, y, w, h) {
    this.game = game;
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
    fill(63, 111, 142);
    rect(this.xorigin, this.yorigin, this.width, this.height, 10); 

    // Team titles
    textSize(this.height / 15);

    if (this.game.turn === this.game.teamA) {
      strokeWeight(8);
      stroke(3, 51, 82);
      fill(241, 236, 226);
    } else {
      fill(3, 51, 82);
      noStroke();
    }
    text("Left Brain", this.xorigin - this.width * 0.38, this.yorigin - this.height * 0.4);
    
    if (this.game.turn === this.game.teamB) {
      strokeWeight(8);
      stroke(3, 51, 82);
      fill(241, 236, 226);
    } else {
      fill(3, 51, 82);
      noStroke();
    }
    text("Right Brain", this.xorigin + this.width * 0.38, this.yorigin - this.height * 0.4);

    textSize(this.height / 35);

    // Left scoring slots
    this.drawScoringSlots(this.xorigin - this.width * 0.41, this.yorigin - this.height * 0.1, this.width * 0.04, this.height * 0.05, this.height * 0.02, this.width * 0.03, 'left');

    // Right scoring slots
    this.drawScoringSlots(this.xorigin + this.width * 0.41, this.yorigin - this.height * 0.1, this.width * 0.04, this.height * 0.05, this.height * 0.02, this.width * 0.03, 'right');

    // Left token
    image(token2, 135, height * 0.815 - this.game.teamA.score * 36, 108, 120);

    // Right token
    image(token1, 1155, height * 0.815 - this.game.teamB.score * 36, 108, 120);

    // // Guessing token
    // let rightPositionDelta = 0;
    // if (this.game.turn === this.game.teamB) {
    //   rightPositionDelta = 800;
    // }
    // image(guessingToken, 300 + rightPositionDelta, height - 200, 50, 150);

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
      if (position == "left" && this.game.teamA.score === 10 - i) {
        strokeWeight(2);
        stroke(3, 51, 82);
      }

      if (position == "right" && this.game.teamB.score === 10 - i) {
        strokeWeight(2);
        stroke(3, 51, 82);
      }

      text(str(10 - i), xorigin + textPositionFactor * (slotLength / 2 + textOffset), yorigin + (i * slotSeparation) + 5);

      stroke(0, 48, 79);
      strokeWeight(thickness);
      line(xorigin - slotLength / 2, yorigin + (i * slotSeparation), xorigin + slotLength / 2, yorigin + (i * slotSeparation));
    }
  }
}

