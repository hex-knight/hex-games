//objets
var bird;
var pipes = [];
var clouds = [];
var sun;
var moon;
//variables
var score = 0;
var bestScore = 0;
var start = true;
var musicOn = false;
var mode;
var gettingDark = true;
//sky colors
var skyR = 100;
var skyG = 100;
var skyB = 250;
const cycles = 5;
const TOTAL = 200;
var gens = 1;
var counter = 0;
let slider;
let gravSlider;
let jumpSlider;
let learnRate;
var learningRate;
var dific;
var sepr;
function preload() {
  flap = loadSound("sounds/flap.wav");
  wink = loadSound("sounds/point.wav");
  lose = loadSound("sounds/lose.wav");
  play = loadSound("sounds/play.wav");
}

function setup() {
  if (displayWidth > displayHeight) {
    createCanvas(displayWidth * 0.9, displayHeight * 0.9);
    mode = "pc";
  } else {
    createCanvas(displayWidth, displayHeight * 0.9);
    mode = "mobile";
  }
  slider = createSlider(1, 15, 1);
  slider.position(12,height-31)
  gravSlider = createSlider(0,1.5,1,.1);
  gravSlider.position(slider.x+slider.width+10,height-31);
  jumpSlider = createSlider(1,20,9,1);
  jumpSlider.position(gravSlider.x+gravSlider.width+10,height-31);
  learnRate = createSlider(0.001,0.05,0.005,0.001);
  learnRate.position(jumpSlider.x+jumpSlider.width+10, height-31);
  // bird = new Bird();
  birds = [];
  savedBirds = [];
  for (i = 0; i < TOTAL; i++) {
    birds.push(new Bird());
  }
  //   pipes.push(new Pipes());
  clouds.push(new Clouds());
  clouds[0].x = width / 4;
  clouds.push(new Clouds());
  clouds[1].x = width / 2;
  sun = new Sun();
  moon = new Moon();
  textSize(20);
  fill(0);
}

function draw() {
  background(skyR, skyG, skyB);

  for (let n = 0; n < slider.elt.value; n++) {
    if (start) {
      if (counter % 100 == 0) {
        pipes.push(new Pipes());
      }
    }
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      if (pipes[i].offScreen()) {
        pipes.splice(i, 1);
        score++;
      }
      for (let j = birds.length - 1; j >= 0; j--) {
        if (
          pipes[i].hitBird(birds[j]) ||
          birds[j].y <= 0 ||
          birds[j].y >= height
        ) {
          savedBirds.push(birds.splice(j, 1));
        }
      }
    }
    if (birds.length === 0) {
      restart();
    }
    for (const bird of birds) {
      if (
        slider.elt.value === "1" ||
        (slider.elt.value > "1" &&
          (counter % parseInt(slider.elt.value)) * 2 === 0)
      ) {
        bird.show();
      }
      bird.update();
      if (bird.think(pipes)) {
        bird.jump();
      }
    }
    for (const pipe of pipes) {
      if (
        slider.elt.value === "1" ||
        (slider.elt.value > "1" &&
          (counter % parseInt(slider.elt.value)) * 2 === 0)
      ) {
        pipe.show();
      }
    }
    counter++;
    fill(250)
    strokeWeight(0)
    text("Gen:\t" + gens, 50, 50);
    text("Birds:\t" + birds.length, 50, 100);
    text("Score:\t" + score, 50, 150);
    text("Best:\t" + bestScore, 50, 200);
    text("Speed:\tx" + slider.elt.value, 50, 250);
    
  }
  fill(0,0,0,40);
    rect(10, height-60,(learnRate.x+learnRate.width)-slider.x+10,50)
    fill(250)
    strokeWeight(0)
    text("David Mariscal Fernández - SIA 2 - Proyecto Final", 50, 20);
    text("Speed:\tx" + slider.elt.value, 20, height-40);
    text("Gravity:\tx" + gravSlider.elt.value, gravSlider.x, height-40);
    text("Jump:\tx" + jumpSlider.elt.value, jumpSlider.x, height-40);
    text("L.Rate:\tx" + learnRate.elt.value, learnRate.x, height-40);
    learningRate=learnRate.value()
    g = gravSlider.value();
}

function mouseClicked() {
  if (mode == "pc") {
    if (
      mouseX > width / 3 &&
      mouseX < width / 3 + width / 6 &&
      mouseY > (height / 3) * 2 &&
      mouseY < (height / 3) * 2 + width / 15
    ) {
      if (!start) {
        start = true;
        if (musicOn) {
          play.play();
        }
      } else {
        if (!bird.isDead) {
          bird.jump();
          flap.play();
        } else {
          if (musicOn) {
            play.play();
          }
          restart();
        }
      }
    }
  }
  return false;
}

function buttons() {
  fill(200);
  rect(width / 3, (height / 3) * 2, width / 6, width / 15);
  fill(200);
  rect(width / 3, (height / 3) * 2 + width / 14, width / 3, width / 15);
  fill(0);
  textSize(width / 15);
  text("Start", width / 3, (height / 3) * 2 + width / 16);
  text(
    `Music: ${musicOn ? "on" : "off"}`,
    width / 3,
    (height / 3) * 2 + (width / 15) * 2
  );
}

function restart() {
  counter = 0;
  gens++;
  nextGen();
  pipes = [];
  pipes.push(new Pipes());
  if (bestScore < score) {
    bestScore = score;
  }
  score = 0;
}
