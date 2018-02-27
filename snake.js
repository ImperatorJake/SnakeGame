class Snake {

  constructor() {
    
    this.poss = createVector(0, 0);
    this.xspeed = 1;
    this.yspeed = 0;
    this.score = 0;
    this.tail = [];

  }

  eat(pos) {

    var d = dist(this.poss.x, this.poss.y, pos.x, pos.y);
    if (d < 1) {
      this.score++;
      console.log('Score: ', this.score);
      return true;
    } else {
      return false;
    }

  }

  dir(x, y) {

    this.xspeed = x;
    this.yspeed = y;

  }

  death() {

    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.poss.x, this.poss.y, pos.x, pos.y);
      if (d < 1) {
        console.log('You died with a score of: ', this.score, ' Starting Over!')
        this.score = 0;
        this.tail = [];
      }
    }

  }

  update() {

    if (this.score === this.tail.length) {
      for (var i = 0; i < this.tail.length-1; i++) {
        this.tail[i] = this.tail[i+1];
      }
    }

    this.tail[this.score-1] = createVector(this.poss.x, this.poss.y);

    this.poss.x = this.poss.x + this.xspeed*scl;
    this.poss.y = this.poss.y + this.yspeed*scl;

    this.poss.x = constrain(this.poss.x, 0, width-scl);
    this.poss.y = constrain(this.poss.y, 0, height-scl);

  }

  show() {

    fill(0, 255, 0);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }

    rect(this.poss.x, this.poss.y, scl, scl);
  }

}
