
var clock;
function setup(){
  // Set framerate to 60 as that is what we use to calulate time
  frameRate(60);
  createCanvas(200, 200);
  // Make the object
  clock=new Clock();
}

function draw(){
  background(0,1);
  clock.render();
}

Clock = function(){
  // ================
  // Object Variables
  // ================
  this.x=width/2;
  this.y=height/2;
  this.radius=150;

  // Initialize the clock with actual times
  this.second=second();
  this.hour=hour();
  this.minute=minute();

  // Size of each clock dots
  this.size=10;

  this.pos = (this.radius-this.size-5)/2;

  // ================
  // Object Functions
  // ================
  this.render = function(){
    this.updateSecond();
    this.drawClockFace();
    this.drawHands();
    this.drawMainPoints();
  };

  // ================
  // Update Functions
  // ================
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

  // ==============
  // Draw Functions
  // ==============
  this.drawHands=function(){
    this.drawSecond();
    this.drawMinute();
    this.drawHour();
  };

  this.drawMainPoints = function(){
    push();
    fill(255);
    stroke(255);
    line(this.x+sin(0)*70, this.y+cos(PI)*70, this.x+sin(0)*70, this.y+cos(PI)*70+15);
    pop();
  };

  this.drawSecond=function(){
    push();
    var t = this.second%60;
    fill(0,255,0);
    t=map(t, 0, 60, 0, 2*PI);
    ellipse(this.x+sin(t)*this.pos,this.y+cos(t+PI)*this.pos,this.size,this.size);
    pop();

  };

  this.drawMinute = function(){
    push();
    var t = minute()%60+second()/60;
    fill(0,0,255);
    t=map(t, 0, 60, 0, 2*PI);
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
    ellipse(this.x+sin(t)*this.pos,this.y+cos(t+PI)*this.pos,this.size,this.size);
    pop();
  };

  this.drawClockFace = function(){
    push();
    fill(0);
    strokeWeight(3);
    stroke(255);
    ellipse(this.x, this.y, this.radius, this.radius);
    pop();
  };
};