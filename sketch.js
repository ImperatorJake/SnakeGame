var s;
var food;
var scl = 25;
var dir = 'right';

function setup() {

  createCanvas(600, 600);
  s = new Snake();
  frameRate(12);
  pickLocation();
  
}

function pickLocation() {

  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)),
                      floor(random(rows)));
  food.mult(scl);

}

function draw() {

  background(110);

  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();

  fill(190, 0 , 190);
  rect(food.x, food.y, scl, scl);

}

function keyPressed() {

  if (keyCode === UP_ARROW && dir !== 'down') {
    dir = 'up';
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW && dir !== 'up') {
    dir = 'down';
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW && dir !== 'left') {
    dir = 'right';
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW && dir !== 'right') {
    dir = 'left';
    s.dir(-1, 0);
  }

}
