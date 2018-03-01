
var snake;
var food;
var mine;
var totalScore = 0;
var scl = 25;
var dir = 'right';

var score;
var deathMSG;

function setup() {

  score = createDiv('Score: '+totalScore);
  score.style('font-size', '24pt');
  deathMSG = createDiv('');
  deathMSG.style('font-size', '24pt');
  deathMSG.style('color','red');

  createCanvas(800, 800);

  snake = new Snake(scl);
  frameRate(12);

  generateObstacles();

}

function generateObstacles() {

  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)),
                      floor(random(rows)));
  mine = createVector(floor(random(cols)),
                      floor(random(rows)));
  food.mult(scl);
  mine.mult(scl);
}

function draw() {

  background(110);

  if (snake.eat(food)) {
    totalScore = snake.score;
    score.html('Score: '+totalScore);
    deathMSG.html('', true);
    generateObstacles();
  }

  if (snake.death(mine)) {
    score.html('Score: '+snake.score);
    deathMSG.html('You died with a score of: '+totalScore+' Starting Over!');
  }

  snake.update();
  snake.show();

  fill(190, 0 , 190);
  rect(food.x, food.y, scl, scl);
  fill(250, 150 , 0);
  rect(mine.x, mine.y, scl, scl);

}

function keyPressed() {

  if (keyCode === UP_ARROW && dir !== 'down') {
    dir = 'up';
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW && dir !== 'up') {
    dir = 'down';
    snake.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW && dir !== 'left') {
    dir = 'right';
    snake.dir(1, 0);
  } else if (keyCode === LEFT_ARROW && dir !== 'right') {
    dir = 'left';
    snake.dir(-1, 0);
  }

}
