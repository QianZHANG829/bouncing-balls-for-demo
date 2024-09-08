let particles = [];
let isFist = false;
 
function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < 500; i++) {
    let p = new Particle(random(width), random(height));
    particles.push(p); // add new particles to array
  }
}

function draw() {
  background(0,20); // leave some motion trace
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }
}

function mousePressed(){
  isFist=true;
}

function mouseReleased(){
  isFist=false; 
}


class Particle {
  constructor(x, y) {
    this.p = createVector(x, y);
    this.v = createVector(random(-1, 1), random(-1, 1));
    this.a = createVector(0, 0);
    this.radius = 10;
    let color1 = color(255,105,180,200);
    let color2=color(0,0,255,150);
    this.col=lerpColor(color1,color2,random(0,1));// color between color1 and 2.
  }

  update() {
    this.p.add(this.v);
    this.v.add(this.a); // a = accelorate distance per sec
    this.v.limit(3);
  
    
    //edge
    if(this.p.x-this.radius<=0 ||this.p.x+this.radius>width){
      this.v.x *=-1;
      //this.p.x=width-this.radius;
    }
     if(this.p.y-this.radius<=0 ||this.p.y+this.radius>=height){
      this.v.y *=-1;
      //this.p.y=height-this.radius;
    }
    
    
    
    //seek
    let center = createVector(width/2,height/2);
    if(isFist){
      let diff=p5.Vector.sub(center,this.p); //calculate the distance between center and point
      this.a=diff.div(300) //accelerator to center
      this.a.limit(4)
    }else{
      this.a.x=0;
      this.a.y=0;
    }
  }

  display() {
    noStroke();
    fill(this.col);
    ellipse(this.p.x, this.p.y, this.radius * 2, this.radius * 2);
  }
}
