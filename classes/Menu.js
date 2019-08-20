

class MenuOption {
    constructor(x, y, t) {
        this.caption = t;
        this.x = x;
        this.y = y;

    }
    display(underline) {
        textAlign(RIGHT, TOP)
        noStroke();
        fill(0);
        text(this.caption,this.x,this.y);
        if (underline)
        stroke(0);
        line(this.x - 16, this.y + 9, this.x, this.y + 9);
    }
}

class Menu {
  constructor(q, a1, a2) {
    this.width = 128;
    this.height = 64;
    this.selected = 0;
    this.ready = false;
    this.question = q;
    let index = 0;
    this.answers = [];
    for (let x = 0; x < a1.length; x++) {
      this.answers[index++] = new MenuOption(120 - 32 * (a1.length - x - 1), 32, a1[x]);
    }
    for (let x = 0; x < a2.length; x++) {
      this.answers[index++] = new MenuOption(120 - 32 * (a2.length - x - 1), 48, a2[x]);
    }
  }
  display() {
    let x = getLastKey();
    if (x == 'ArrowLeft')
      this.selected = constrain(this.selected - 1, 0, this.answers.length - 1);
    if (x == 'ArrowRight')
      this.selected = constrain(this.selected + 1, 0, this.answers.length - 1);
    if (x == ' ')
       this.ready = true;
    key = null;
    fill('orange');
    stroke(0);
    rect(0, 0, this.width, this.height);
    fill('black');
    noStroke();
    textSize(8);
    textAlign(LEFT, TOP)
    text(this.question, 8, 16);
    for (let x = 0; x < this.answers.length; x++) {
      if (x == this.selected)
        this.answers[x].display(true);
      else
        this.answers[x].display(false);
    }
  }
  isReady() {
      if (this.ready == true) {
        this.ready = false;
        return this.selected;
      } else {
           return null;
      }
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