function Moon(){
    this.x = 0;
    this.y = height;
    
    this.show = function(r,g,b){
        noStroke();
        fill(150);
        ellipse(this.x,this.y,50,50);
        fill(50);
        ellipse(this.x+50/10,this.y-50/10,36,36);
    }

    this.dawn = function(){
        this.x += width/800;
        this.y -= height/1200 * 2;
    }
    this.restablish = function(){
        this.x = -12.25;
        this.y = height+12.25;
    }
}