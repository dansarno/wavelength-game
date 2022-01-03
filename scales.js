class Scale {
  constructor(tableArray) {
    this.pairs = tableArray;
    this.left = null;
    this.right = null;
  }

  newScale() {
    let randScale = random(this.pairs);
    this.left = randScale[0];
    this.right = randScale[1];
  }
}