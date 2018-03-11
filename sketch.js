
var snake;
var food;
var mine;
var dir;
const scl = 25;
const url = window.location.href;
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

  var fRate = 12;
  if (detectMobile()) {
    addMobileControls();
    fRate = 5;
  }

  handleGetRequest();
  snake = new Snake(scl, width, height);
  frameRate(fRate);
  generateObstacles();
}

function draw() {
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

function detectMobile() {
  if (navigator.userAgent.match('Android') ||
      navigator.userAgent.match('webOS')   ||
      navigator.userAgent.match('iPhone')  ||
      navigator.userAgent.match('iPad')    ||
      navigator.userAgent.match('iPod')    ||
      navigator.userAgent.match('BlackBerry') ||
      navigator.userAgent.match('Windows Phone')) {
    return true;
  } else {
    return false;
  }
}

function addMobileControls() {
  var topDiv = createDiv('');
  var bottomDiv = createDiv('');
  var upButton = createButton('Up');
  upButton.style('height', '240px');
  upButton.style('width', '240px');
  upButton.style('margin', '20px');
  upButton.mousePressed(moveUp);
  topDiv.child(upButton);
  topDiv.style('margin-left', '300px')
  var downButton = createButton('Down');
  downButton.style('height', '240px');
  downButton.style('width', '240px');
  downButton.style('margin', '20px');
  downButton.mousePressed(moveDown);
  var leftButton = createButton('Left');
  leftButton.style('height', '240px');
  leftButton.style('width', '240px');
  leftButton.style('margin', '20px');
  leftButton.mousePressed(moveLeft);
  var rightButton = createButton('Right');
  rightButton.style('height', '240px');
  rightButton.style('width', '240px');
  rightButton.style('margin', '20px');
  rightButton.mousePressed(moveRight);
  bottomDiv.child(leftButton);
  bottomDiv.child(downButton);
  bottomDiv.child(rightButton);
  bottomDiv.style('margin-left', '20px');
}

function moveUp() {
  if (dir !== 'down') {
    dir = 'up';
    snake.dir(0, -1);
  }
}

function moveLeft() {
  if (dir !== 'right') {
    dir = 'left';
    snake.dir(-1, 0);
  }
}

function moveDown() {
  if (dir !== 'up') {
    dir = 'down';
    snake.dir(0, 1);
  }
}

function moveRight() {
  if (dir !== 'left') {
    dir = 'right';
    snake.dir(1, 0);
  }
}
