class Snake {
  constructor(scl) {
    this.scl = scl;
    this.poss = createVector(scl, scl);
    this.xspeed = 0;
    this.yspeed = 0;
    this.score = 0;
    this.tail = [];
  }

  eat(food) {
    var d = dist(this.poss.x, this.poss.y, food.x, food.y);
    if (d === 0) {
      this.score++;
      return true;
    } else {
      return false;
    }
  }

  dir(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  death(mine) {
    var isDead = false;
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.poss.x, this.poss.y, pos.x, pos.y);
      var dMine = dist(this.poss.x, this.poss.y, mine.x, mine.y);
      if (d === 0 || dMine === 0) {
        isDead = true;
        this.score = 0;
        this.tail = [];
      }
    }
    return isDead;
  }

  update() {
    if (this.score === this.tail.length) {
      for (var i = 0; i < this.tail.length; i++) {
        this.tail[i] = this.tail[i+1];
      }
    }
    this.tail[this.score-1] = createVector(this.poss.x, this.poss.y);
    this.poss.x += this.xspeed*this.scl;
    this.poss.y += this.yspeed*this.scl;
    this.poss.x = constrain(this.poss.x, 0, width-this.scl);
    this.poss.y = constrain(this.poss.y, 0, height-this.scl);
  }

  show() {
    fill(0, 255, 0);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, this.scl, this.scl);
    }
    rect(this.poss.x, this.poss.y, this.scl, this.scl);
  }
}
