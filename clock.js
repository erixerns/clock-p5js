
var clock;
function setup(){
  frameRate(60);
  createCanvas(200, 200);
  clock=new Clock();
}

function draw(){
  clock.render();
}

var tempX = 1;

Clock = function(){
  this.x=width/2;
  this.y=height/2;
  this.radius=150;
  this.second=second();
  this.hour=hour();
  this.minute=minute();
  this.size=10;
  this.pos = (this.radius-this.size-5)/2;

  this.render = function(){
    this.updateSecond();
    this.drawClockFace();
    this.drawHands();
    this.drawMainPoints();
  };

  this.drawHands=function(){
    this.drawSecond();
    this.drawMinute();
    this.drawHour();
  };

  this.drawMainPoints = function(){
    push();
    stroke(0);
    strokeWeight(5);
    line(this.x+sin(0)*70, this.y+cos(PI)*70, this.x+sin(0)*70, this.y+cos(PI)*70+15);
    strokeWeight(2);
    line(this.x+sin(0)*70, this.y+cos(PI)*70, this.x+sin(0)*70, this.y+cos(PI)*70+15);
    pop();
  };

  this.updateSecond = function(){
    if(frameCount%1 === 0)
      this.second+=1/60;
  };
  this.updateMinute = function(){
    this.minute++;
  };
  this.updateHour = function(){
    this.hour++;
  };

  this.drawSecond=function(){
    push();
    var t = this.second%60;
    fill(0,255,0);
    noStroke();
    t=map(t, 0, 60, 0, 2*PI);
    ellipse(this.x+sin(t)*this.pos,this.y+cos(t+PI)*this.pos,this.size,this.size);
    pop();

  };
  this.drawMinute = function(){
    push();
    var t = minute()%60+second()/60;
    fill(0,0,255);
    t=map(t, 0, 60, 0, 2*PI);
    noStroke();
    ellipse(this.x+sin(t)*this.pos,this.y+cos(t+PI)*this.pos,this.size,this.size);
    if(t===0)
      this.updateHour();
    pop();
  };

  this.drawHour = function(){
    push();
    var t = hour()%12;
    fill(255,0,0);
    t=map(t, 0, 12, 0, 2*PI);
    noStroke();
    ellipse(this.x+sin(t)*(this.radius-this.size-5)/2,this.y+cos(t+PI)*(this.radius-this.size-5)/2,this.size,this.size);
    pop();
  };

  this.drawClockFace = function(){
    push();
    fill(220);
    strokeWeight(2);
    stroke(255, 100, 100);
    ellipse(this.x, this.y, this.radius, this.radius);
    pop();
  };
};