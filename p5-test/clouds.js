function Clouds(){
    this.x = width+100;
    this.y = random(height);
    this.w = random(100,300);
    this.h = random(50,150);
    this.color = random(200,250);
    this.speed = random(0,3);

    this.show = function(){
        var x= this.x;
        var y= this.y;
        var w= this.w;
        var h= this.h;
        stroke(this.color);
        fill(this.color);
        beginShape();
        rect(x,y,w,h);
        rect(x-w/4, y+(h/2),w/4,h/2)
        rect(x+w, y+((h/4)*2),w/4,h/2)
        rect(x+w+w/6, y+(h/2)+(h/4),w/2,h/4)
        endShape();
    }

    this.update = function(){
        this.x -= this.speed;
    }

}