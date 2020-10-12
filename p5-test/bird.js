var g = 1;
var upG = -21;

function Bird () {
    this.y = height/2;
    this.x = width/4;
    this.velocity = 0;
    this.isDead = false;
    this.pipeColor = color(0,200,0,255);

    this.show = function(){
        stroke(0);
        beginShape();
        strokeWeight(2);
        fill(250,150,0);//body color
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

    this.dies = function(){
        this.isDead = true;
    }

    this.update = function(){
        if(!this.isDead){
            this.fall();
            if(this.y<=0){
                this.y = 0;
                this.velocity = 0;
            }
            if(this.y>=height){
                this.y = height;
                this.velocity = 0;
            }
        }else{
            if(keyIsPressed){
                if(key == 'r'){
                    this.isDead = false;
                    this.velocity=0;
                    this.y=height/2;
                }
            }
        }
    }

    this.fall = function(){
        this.velocity += g;
        this.y += this.velocity;
    }

    this.jump = function(){
        this.velocity += upG;
    }
}