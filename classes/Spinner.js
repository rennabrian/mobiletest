const PAUSE = 1;

 function drawtext( x, y, text_array,l2r) {
  
    var pos_x = x;
    for ( var i = 0; i < text_array.length; ++ i ) {
        var part = text_array[i];
        var t = part[0];
        var c = part[1];
        var w = textWidth( t );
        fill( c );
        text( t, pos_x, y);
        if (l2r)
        pos_x += w;
    else
        pos_x -= w;
    }
  }
  
class Spinner {
  constructor(p) {
      this.wait = 400;
      this.timeElapsed = 0;
      this.status = 0;
      this.players = p;
    this.colors = ['#FDDFDF','#DEFDE0','#FCF7DE','#DEF3FD'];
    this.width =180;
this.spinning = false;
this.spaces = 16;
this.goal = 0;
this.theta2 = 0;
this.currentSpace = 0;
this.theta =  TWO_PI / this.spaces  /2;
  this.r = this.width * sin(this.theta)/(2 * sin(this.theta)+2);
    this.smDeltaA = 0;
    this.smDeltaB = 0;
    this.smDeltaC = 0;
    this.smVMax = .3;
    this.smA = 0.027;
    this.smD = 0.004;
    this.smT = 0;
    this.smTb = 0;
    this.smTc = 0;
    this.smX0 = 0;
    this.smTd = 0;
    if (this.players == 2) this.quad = [1,2,1,2];
    if (this.players == 3) this.quad = [1,2,3,2];
    if (this.players == 4) this.quad = [1,2,3,4];
  }
 

  display() {
    let x = getLastKey();
    if (x == 'p') {
       this.status = 1;
    }
    if (x == ' ')
        this.initiateSpinning();
    key = null;
    
    fill('black');
    stroke('#1b1735');
    let tallExtend = 0.55 * this.width;
    let longExtend = 0.65 * this.width;
    line(0, tallExtend, 0, 0.35*this.width);
    line(0, -tallExtend, 0, -0.35*this.width);
    line(longExtend, 0, 0.35*this.width, 0);
    line(-longExtend, 0, -0.35*this.width, 0);
    stroke('#1b1735');
      
    for (let x = 0; x < this.spaces; x++) {
        fill(this.colors[x % this.colors.length]);
        let a = 0.5 * this.width - this.r;
        let b = x * 2 * this.theta + this.theta
        circle(a * cos(b), a * sin(b),  2 * this.r);
    }
    fill(0);
    stroke('#f1daf1');

    let W = this.width;
    let r = this.r;
    textAlign(LEFT, TOP);
    textSize(8)
    drawtext(-longExtend,-tallExtend, [['Left', 'DarkOrchid '],[' Foot', 'black']],true);
    textSize(16);
    fill(0);
    text(this.quad[0]+'UP',-longExtend,-tallExtend + 16);
    
    textAlign(RIGHT, TOP);
    textSize(8)
    drawtext(longExtend,-tallExtend, [[' Foot', 'black'],['Right', 'DarkOrchid ']], false);
    textSize(16);
    fill(0);
    text(this.quad[1]+'UP',longExtend,-tallExtend + 16);
    
    textAlign(LEFT, BOTTOM);
    textSize(8)
    drawtext(-longExtend, tallExtend, [['Left', 'DarkOrchid '],[' Foot', 'black']],true);
    textSize(16);
    fill(0);
    text(this.quad[3]+'UP',-longExtend, tallExtend - 16);
    
    textAlign(RIGHT, BOTTOM);
    textSize(8)
    drawtext(longExtend, tallExtend, [[' Foot', 'black'],['Right', 'DarkOrchid ']], false);
    textSize(16);
    fill(0);
    text(this.quad[2]+'UP',longExtend, tallExtend - 16);

      noStroke();

        push();
            fill('darkred');
            translate(0,W/60);
            rotate(this.theta2);

            circle(W/2 - 2 *r - W/16, 0, W/8);
            circle(0-W/2 + W/48, 0, W/24);

            quad(W/2 - 2 *r - W/16,W/16,
                W/2 - 2 *r - W/16,-W/16,
                0-W/2 + W/48, -W/48,
                0-W/2 + W/48, W/48);
        pop();
        push();
            fill('crimson');
            rotate(this.theta2);		 

            circle(W/2 - 2 *r - W/16, 0, W/8);
            circle(0-W/2 + W/48, 0, W/24);

            quad(W/2 - 2 *r - W/16,W/16,
                W/2 - 2 *r - W/16,-W/16,
                0-W/2 + W/48, -W/48,
                0-W/2 + W/48, W/48);
        pop();
        fill('darkred');
        circle(0,0,W/16);
        fill('crimson');
        rotate(1);
        rect(-W/67,-W/130,W/36,W/65); 
		 
        if (this.spinning) { 
            if (this.smT < this.smTb) {
                this.theta2 = this.smX0 + 0.5 * this.smA * this.smT * this.smT;
            }
            else if (this.smT < this.smTc) {
                this.theta2 = this.smX0 + this.smDeltaA + this.smVMax * (this.smT - this.smTb);
            }
            else if (this.smT < this.smTd) {
                let a = this.smT - this.smTc;
                this.theta2 =  this.smX0 + this.smDeltaA + this.smDeltaB + this.smVMax * a - 0.5 * this.smD * a * a;
            }
            else {
                this.theta2 = this.goal % TWO_PI;
                this.spinning = false;
            }
            this.smT++; 
        } else {
            this.timeElapsed ++;
            if ((this.wait > 0) & (this.timeElapsed > this.wait))
              this.initiateSpinning();
        }
  
    }
    initiateSpinning() {
        this.timeElapsed = 0;
        if ((this.players > 2) & (this.theta2 != 0)) {
            let a;
            a = floor(this.currentSpace/4);
            let b = int(random(this.players -1))+1
            print(this.quad[a]);
            this.quad[a] = ((this.quad[a]-1 + b) % this.players)+1;
            
            print(' ' + a + ' ' + b);
        }
        this.currentSpace = int(random(this.spaces));
        this.spinning = true;
        this.smDeltaA = 0.5 * this.smVMax * this.smVMax / this.smA;
        this.smDeltaC = 0.5 * this.smVMax * this.smVMax / this.smD;
        this.goal = ceil((this.smDeltaA + this.smDeltaC)/ TWO_PI) * TWO_PI + this.currentSpace * TWO_PI / this.spaces + this.theta - 0.6 * this.theta + random() * 1.2 * this.theta;
        this.smDeltaB = this.goal - this.smDeltaA - this.smDeltaC - this.theta2;
        this.smT = 0;
        this.smTb = this.smVMax / this.smA;
        this.smTc = this.smTb + this.smDeltaB / this.smVMax;
        this.smTd = this.smTc + this.smVMax / this.smD;
        this.smX0 = this.theta2;
    }
    getStatus() {
      return this.status;
      }
      play(){
          this.status = 0;
      }
  
}

function keyReleased() {
  lastKey = key;
}

function getLastKey() {
  let x = lastKey;
  lastKey = '';
  return x;
}