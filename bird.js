var g = .8;
var upG = -12;
// let c = color(random(250),random(250),random(250));
function Bird (brain, col) {
    this.y = height/2;
    this.x = width/4;
    this.velocity = 0;
    this.isDead = false;
    this.pipeColor = color(0,200,0,255);

    this.score = 0;
    this.fitness = 0;
    if(brain){
            this.brain = brain.copy();
    }else{
    this.brain = new NeuralNetwork(5,8,2);
    // this.inputs = []
    if(col){
        this.color = col;
    }else{
        this.color = color(random(250),random(250),random(250));
    }
    }

    this.show = function(){
        stroke(0);
        beginShape();
        strokeWeight(2);
        fill(this.color);//body color
        ellipse(this.x,this.y,30,30);//body
        stroke(0);
        strokeWeight(1);
        fill(255);//eyeball color
        ellipse(this.x+10,this.y-7,15,15);//eyeball
        fill(0);//eye color
        ellipse(this.x+14,this.y-7,4,4);//eye
        fill(255,130,0);//wing color
        ellipse(this.x-10,this.y+5,20,15);//wing
        fill(255,255,0);
        vertex(this.x+10,this.y);
        vertex(this.x+15,this.y-2);
        vertex(this.x+30,this.y);
        vertex(this.x+15,this.y+8);
        vertex(this.x+10,this.y);
        endShape();
    }

    this.mutate = function(){
        this.brain.mutate(learningRate);
    }

    this.think = function(pipes){
        let closest = null;
        let closestD = Infinity;
        
        for(let i = 0; i < pipes.length ; i++){
            let d = (pipes[i].x+pipes[i].w) - this.x;
            if(d < closestD && d > 0){
                closest = pipes[i];
                closestD = d;
            }
        }
        if(closest === null){
            console.log(pipes);
        }

        let inputs = [];
        // console.log(this.velocity)
        inputs[0] = this.y / height;
        inputs[1] = this.velocity / 10;
        inputs[2] = closest.top / height;
        inputs[3] = (closest.top + closest.sep) / height;
        inputs[4] = closest.x / width;
        
        let output = this.brain.predict(inputs);
        if( output[0] > output[1] && this.velocity >= 0) {
            return true;
        }
        return false;
    }

    this.dies = function(){
        this.isDead = true;
    }

    this.update = function(){
            this.score++;
            this.velocity += g;
            this.y += this.velocity;
            // if(this.y<=0){
            //     this.y = 0;
            //     this.velocity = 0;
            // }
            // if(this.y>=height){
            //     this.y = height;
            //     this.velocity = 0;
            // }
        // }
        // else{
        //     if(keyIsPressed){
        //         if(key == 'r'){
        //             this.reborn();
        //         }
        //     }
        // }
    }

    this.reborn = function(){
        this.isDead = false;
        this.velocity=0;
        this.y=height/2;
    }

    this.fall = function(){
        
    }

    this.jump = function(){
        this.velocity += upG;
    }
}