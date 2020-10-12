var bird;
var pipes = [];
var clouds = [];
var score = -1;
var bestScore = 0;
var start = false;

function preload(){
    flap = loadSound("sounds/flap.wav")
    wink = loadSound("sounds/point.wav")
    lose = loadSound("sounds/lose.wav")
    play = loadSound("sounds/play.wav")
}

function setup() {
    createCanvas(370, 800);
    bird = new Bird();
    pipes.push(new Pipes());
    clouds.push(new Clouds());
    clouds[0].x = width / 4;
    clouds.push(new Clouds());
    clouds[1].x = width / 2;
}


function draw() {
    
    background(150, 150, 255);
    if (!bird.isDead) {
        if (frameCount % 150 == 0) {
            clouds.push(new Clouds());
        }
        if (frameCount % 120 == 0) {
            pipes.push(new Pipes());
            score++;
            start?wink.play():null
            bestScore = max(bestScore, score)
        }
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
        textSize(50);
        fill(0);
        text("Press Space to Start", width /10, height / 3);
        if (keyIsPressed) {
            if (key == ' ') {
                start = true;
                play.play();
            }
        }
        // if (touchStarted()) {
        //         start = true;
        //         play.play();
        //         touchEnded();
        // }
    }else{
        for (i = pipes.length - 1; i > 0; i--) {
            pipes[i].show();
            if (!bird.isDead) {
                pipes[i].update();
                if (pipes[i].hitBird(bird)) {
                    bird.dies();
                    lose.play();
                    play.stop();
                }
                if (pipes[i].x < -50) {
                    pipes.splice(i, 1)
                }
            } else {
                if (keyIsPressed) {
                    if (key == 'r') {
                        pipes = [];
                        pipes.push(new Pipes());
                        score = -1;
                        play.play();
                        break;
                    }
                }
            }
        }

    bird.show();
    bird.update();
    showScore();
    }
}

function showScore() {
    if (!bird.isDead) {
        textSize(30);
        fill(0);
        text(`Score: ${score >= 0 ? score : 0}`, width / 3, height / 8);
    } else {
        textSize(50);
        fill(0);
        text("GAME OVER", width / 4, height / 3);
        textSize(25);
        text(`Score: ${score >= 0 ? score : 0}`, width / 3, height / 3 + 50);
        text(`Best: ${bestScore}`, width / 3, height / 3 + 80);
        textSize(20);
        text("Press R / touch to Restart", width / 4, height / 3 + 100);
    }

}

function touchStarted(event){
    if(!start){
        start=true;
        play.play();
    }else{
        if(!bird.isDead){
            bird.jump();
            flap.play();
        }else{
            pipes = [];
            pipes.push(new Pipes());
            score = -1;
            play.play();
            bird.reborn();
        }
    }
    return false;
}

function keyPressed() {
    if (key == ' ') {
        bird.jump();
        flap.play();
    }
}