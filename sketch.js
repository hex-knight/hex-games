//objets
var bird;
var pipes = [];
var clouds = [];
var sun;
var moon;
//variables
var score = 0;
var bestScore = 0;
var start = false;
var musicOn = false;
var mode;
var gettingDark = true;
//sky colors
var skyR = 100;
var skyG = 100;
var skyB = 250;

function preload() {
    flap = loadSound("sounds/flap.wav")
    wink = loadSound("sounds/point.wav")
    lose = loadSound("sounds/lose.wav")
    play = loadSound("sounds/play.wav")
}

function setup() {
    if (displayWidth > displayHeight) {
        createCanvas(displayWidth * .90,
            displayHeight * .90);
        mode = "pc";
    } else {
        createCanvas(displayWidth,
            displayHeight * .90);
        mode = "mobile";
    }
    bird = new Bird();
    pipes.push(new Pipes());
    clouds.push(new Clouds());
    clouds[0].x = width / 4;
    clouds.push(new Clouds());
    clouds[1].x = width / 2;
    sun= new Sun();
    moon = new Moon();
}


function draw() {
    background(skyR, skyG, skyB);
    sun.show();
    moon.show(skyR, skyG, skyR);
    if(frameCount % 2 == 0){
        if(skyB>=250){
            gettingDark=true;
            moon.restablish();
        }
        if(skyB < 10){
            gettingDark=false;
            sun.restablish();
        }
        if(gettingDark){
            sun.dawn();
            skyB-=.24;
            skyG-=.5;
            skyR-=.5;
        }
        if(!gettingDark){
            moon.dawn();
            skyB+=.25;
            skyG+=.5;
            skyR+=.5;
        }
    }
    if (frameCount % 150 == 0) {
        clouds.push(new Clouds());
    }
    for (i = clouds.length - 1; i > 0; i--) {
        clouds[i].show();
        clouds[i].update();
        if (clouds[i].x < -100) {
            clouds.slice(i, 1);
        }
    }
    if (!start) {
        bird.show();
        buttons();

    } else {
        if (!bird.isDead) {
            if (frameCount % 120 == 0) {
                pipes.push(new Pipes());
                bestScore = max(bestScore, score)
            }
        }
        for (i = pipes.length - 1; i > 0; i--) {
            pipes[i].show();
            if (!bird.isDead) {
                pipes[i].update();

                if (pipes[i].hitBird(bird)) {
                    gameLost();
                }
                if (pipes[i].x < bird.x - 50) {
                    var p = pipes[i].getPoint();
                    score += p
                    p == 1 ? wink.play() : null;
                }
                if (pipes[i].x < -50) {
                    pipes.splice(i, 1)
                }
            }
        }

        bird.show();
        bird.update();
        showScore();
    }
}

function mouseClicked() {
    if (mode == "pc") {
        if (mouseX > width / 3 && mouseX < width / 3 + width / 6 &&
            mouseY > height / 3 * 2 && mouseY < height / 3 * 2 + width / 15) {
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
        if (mouseX > width / 3 && mouseX < width / 3 * 2 &&
            mouseY > height / 3 * 2 + width / 14
            && mouseY < height / 3 * 2 + width / 14 + width / 15) {
            if (!start) {
                //musicOn = !musicOn;
                return;
            } else {
                // if (bird.isDead) {
                //     musicOn = !musicOn;
                //     return;
                // }
            }
        }
    }
    return false;
}

function buttons() {

    fill(200);
    rect(width / 3, height / 3 * 2, width / 6, width / 15);
    fill(200);
    rect(width / 3, height / 3 * 2 + width / 14, width / 3, width / 15);
    fill(0);
    textSize(width / 15);
    text("Start",
        width / 3, height / 3 * 2 + width / 16);
    text(`Music: ${musicOn ? "on" : "off"}`,
        width / 3, height / 3 * 2 + width / 15 * 2);
}

function restart() {
    pipes = [];
    pipes.push(new Pipes());
    score = 0;
    bird.reborn();
}

function gameLost() {
    play.stop();
    bird.dies();
    lose.play();
}

function showScore() {
    fill(0);
    stroke(150);
    strokeWeight(2.5)
    if (!bird.isDead) {
        if(mode == "pc"){
            textSize(width / 20);
        //fill(0);
        text(`Score: ${score}`, width / 20, height / 10);    
        }else{
        textSize(width / 15);
        //fill(0);
        text(`Score: ${score}`, width / 15, height / 10);}
    } else {
        textSize(width / 9);
        text("GAME OVER", width / 5, height / 3);
        textSize(width / 12);
        text(`Score: ${score}`, width / 3, height / 2);
        text(`Best: ${bestScore}`, width / 3, height / 2 + width / 12);
        buttons();
    }

}

function touchStarted(event) {
    if (mode == "mobile") {
        if (!start) {
            if (mouseX > width / 3 && mouseX < width / 3 + width / 6 &&
                mouseY > height / 3 * 2 && mouseY < height / 3 * 2 + width / 15) {
                start = true;
                if (musicOn) {
                    play.play();
                }
            }
        } else {
            if (!bird.isDead) {
                bird.jump();
                flap.play();
            } else {
                if (mouseX > width / 3 && mouseX < width / 3 + width / 6 &&
                    mouseY > height / 3 * 2 && mouseY < height / 3 * 2 + width / 15) {
                    if (musicOn) {
                        play.play();
                    }
                    restart();
                }
            }
        }
    }
    if (mouseX > width / 3 && mouseX < width / 3 * 2 &&
        mouseY > height / 3 * 2 + width / 14
        && mouseY < height / 3 * 2 + width / 14 + width / 15) {
        if (!start) {
            musicOn = !musicOn;
        } else {
            if (bird.isDead) {
                musicOn = !musicOn;
            }
        }
    }
    return false;
}

function musicButton() {

}

function keyPressed() {
    if(start == true && !bird.isDead){
        bird.jump();
        flap.play();
    }
}