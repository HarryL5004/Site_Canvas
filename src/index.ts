import * as p5 from 'p5';

const myP5 = (s) => {
  const roses: Array<Rose> = []
  let rose1Canvas: p5.Graphics, 
      rose2Canvas: p5.Graphics, 
      rose3Canvas: p5.Graphics; // 4/2, 5/3, 7/3
  
  class Rose {
    pos: p5.Vector;
    vel: p5.Vector;
    radians: number;
    rotateDir: number;
    initAngle: number;
    amp: number;
    type: p5.Graphics;

    constructor(roseType: p5.Graphics) {
      this.pos = s.createVector(s.random(s.width));
      this.vel = s.createVector(1, s.random(1, 4));
      this.radians = 0;
      this.rotateDir = s.random(0, 1) < 0.5 ? 1 : -1;
      this.initAngle = s.random(0, 2 * s.PI);
      this.amp = s.random(5, 90);
      this.type = roseType;
    }

    update(): void {
      this.pos.y += this.vel.y;
      this.radians += s.PI / 180 * this.rotateDir;
      this.initAngle += s.PI / 60;
    }

    render(): void {
      s.push()
      s.imageMode(s.CENTER)
      s.translate(this.pos.x + s.sin(this.initAngle)*this.amp, this.pos.y)
      s.rotate(this.radians)
      s.image(this.type, 0, 0);
      s.pop();
    }
  }

  const drawRose = (n: number, d: number, 
                    strokeColor: string, fillColor: string): p5.Graphics => {
    let canvas = s.createGraphics(s.width / 2, s.height / 2);
    canvas.push();
    canvas.translate(s.width / 4, s.height / 4);
    canvas.beginShape();
    canvas.stroke(strokeColor);
    canvas.strokeWeight(3);
    canvas.fill(fillColor);
    for (let i = 0; i < s.TWO_PI * d; i += 0.1) {
      let r = 20 * s.cos(n / d * i);
      let x = r * s.cos(i)
      let y = r * s.sin(i);
      canvas.vertex(x, y)
    }
    canvas.endShape(s.CLOSE);
    canvas.pop()
    return canvas
  }
  
  const randRose = (): void => {
    let randNum = s.randomGaussian(0.5);
    if (randNum <= 0.33)
      roses.push(new Rose(rose1Canvas))
    if (randNum <= 0.66)
      roses.push(new Rose(rose2Canvas))
    if (randNum > 0.66)
      roses.push(new Rose(rose3Canvas))
  }  
    
  const setBgColor = (): void => {
    let from = s.color('#e3f2fd');
    let to = s.color('#000051');
    s.background(s.lerpColor(from, to, s.norm(s.mouseY, 0, s.height)))
  }
  
  s.setup = () => {
    document.body.style.overflow = "hidden"; // get rid of scrollbars
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.frameRate(60);
    s.background('#e3f2fd');

    rose1Canvas = drawRose(4, 2, '#ba2d65', '#ffcdd2');
    rose2Canvas = drawRose(5, 3, '#e53935', '#fae');
    rose3Canvas = drawRose(7, 3, '#fae', '#fff176');
  }
  
  s.draw = () => {
    if (roses.length < 20)
      randRose();
    s.resizeCanvas(s.windowWidth, s.windowHeight);
    setBgColor();
  
    for (let rose of roses) {
      rose.update();
      rose.render();
      if (rose.pos.y >= s.height || rose.pos.x >= s.width)
        roses.splice(roses.indexOf(rose), 1);
    }
  }
}

const sketchInstance = new p5(myP5, document.getElementById('main'));