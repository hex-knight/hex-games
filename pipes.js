function Pipes(){
    this.x = width;
    this.top = random(height/20,height/4*3);
    this.sep = height/5;
    this.w = 60;
    this.point = 1;
    //this.bottom = random(height/2);

    this.show = function(){
        fill(0,200,0);
        beginShape();
        stroke(0);
        rect(this.x,0,this.w,this.top);//top pipe
        rect(this.x-5,this.top-30,this.w+10,30); //top pipe end
        rect(this.x,this.top+this.sep,this.w,height-this.top-this.sep);//top pipe
        rect(this.x-5,this.top+this.sep,this.w+10,30); //top pipe end
        endShape();  
    }

    this.update = function(){
        this.x-=4;
    }

    this.getPoint = function(){
        return this.point>0?this.point--:0;
    }

    this.hitBird = function(bird){
        if((bird.y < this.top || bird.y > this.top+this.sep)
        && (bird.x > this.x && bird.x<this.x+this.w)){
            return true;
        }
        else{
            return false;
        }
    }

    this.randomize = function(){
        this.top = random(height/4)*3;
    }
}
