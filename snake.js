class Snake {
  constructor(scl, width, height) {
    this.scl = scl;
    this.width = width;
    this.height = height;
    this.poss = createVector(scl, scl);
    this.xDirectionChange = 0;
    this.yDirectionChange = 0;
    this.score = 0;
    this.tail = [];
  }

  getScore() {
    return this.score;
  }

  dir(x, y) {
    this.xDirectionChange = x;
    this.yDirectionChange = y;
  }

  eat(food) {
    var didEatFood = false;
    var dFood = dist(this.poss.x, this.poss.y, food.x, food.y);
    if (dFood === 0) {
        this.score++;
        didEatFood = true;
    }
    return didEatFood;
  }

  death(mine) {
    var isDead = false;
    var dMine = dist(this.poss.x, this.poss.y, mine.x, mine.y);
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var dSelf = dist(this.poss.x, this.poss.y, pos.x, pos.y);
      var dMineTail = dist(pos.x, pos.y, mine.x, mine.y);
      if (dSelf === 0 || dMine === 0 || dMineTail === 0) {
        isDead = true;
        this.score = 0;
        this.tail = [];
      }
    }
    return isDead;
  }

  update() {
    if (!(this.score === this.tail.length)) {
      this.tail[this.tail.length] = null;
    }
    for (var i = 0; i < this.tail.length; i++) {
      if (!(this.tail.length <= (i+1))) {
        this.tail[this.tail.length-i-1] = this.tail[this.tail.length-i-2];
      }
    }
    if (this.score !== 0) {
      this.tail[0] = createVector(this.poss.x, this.poss.y);
    }
    this.poss.x += this.xDirectionChange*this.scl;
    this.poss.y += this.yDirectionChange*this.scl;
    this.poss.x = constrain(this.poss.x, 0, this.width-this.scl);
    this.poss.y = constrain(this.poss.y, 0, this.height-this.scl);
  }

  show() {
    fill(0, 255, 0);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, this.scl, this.scl);
    }
    rect(this.poss.x, this.poss.y, this.scl, this.scl);
  }
}
