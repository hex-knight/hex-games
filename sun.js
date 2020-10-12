function Sun(){
    this.x = width;
    this.y = 0;
    
    this.show = function(){
        noStroke();
        fill(250,250,0,175);
        ellipse(this.x,this.y,100,100);
    }

    this.dawn = function(){
        this.x -= width/800;
        this.y += height/1200 * 2;
    }
    this.restablish = function(){
        this.x = width +12.25;
        this.y = -12.25;
    }
}