
var snake;
var food;
var mine;
var dir;
const scl = 25;
const url = '';
var totalScore = 0;
var highScores;
var score;
var deathMSG;

function setup() {
  axios.defaults.withCredentials = true;
    score = createDiv('Score: '+totalScore);
    score.style('font-size', '24pt');
    deathMSG = createDiv('');
    deathMSG.style('font-size', '24pt');
    deathMSG.style('color','red');
  createCanvas(800, 800);
    highScores = createDiv('Highscores: ');
    highScores.style('font-size', '24pt');
  handleGetRequest();
  snake = new Snake(scl, width, height);
  frameRate(12);
  generateObstacles();
}

function draw() {
  handleGetRequest();
  background(110);
  if (snake.eat(food)) {
    totalScore = snake.getScore();
    score.html('Score: '+totalScore);
    deathMSG.html('', true);
    generateObstacles();
  }
  if (snake.death(mine)) {
    score.html('Score: '+snake.getScore());
    deathMSG.html('You died with a score of: '+totalScore+' Starting Over!');
    handlePostRequest();
  }
  snake.update();
  snake.show();
  fill(190, 0 , 190);
  rect(food.x, food.y, scl, scl);
  fill(250, 150 , 0);
  rect(mine.x, mine.y, scl, scl);
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

function handleGetRequest() {
  axios.get(url+'getSession')
       .then((res) => {
         if (res.data.highscores) {
           var scoreString = 'Highscores: '
           res.data.highscores.forEach((score) => {
             scoreString += (' '+score+',');
           });
           highScores.html(scoreString, true);
         }
         // console.log(res);
       })
       .catch((error) => {
         highScores.html(error+' ~~~ Cannot load Highscores!');
         // console.log(error);
  });
}

function handlePostRequest() {
  axios.post(url+'postToSession', { highscore: totalScore })
       .then((res) => {
         if (res.data.highscores) {
           var scoreString = 'Highscores: '
           res.data.highscores.forEach((score) => {
             scoreString += (' '+score+',');
           });
           highScores.html(scoreString, true);
         }
         // console.log(res);
       })
       .catch((error) => {
         highScores.html(error+' ~~~ Cannot load Highscores!');
         console.log(error);
  });
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
