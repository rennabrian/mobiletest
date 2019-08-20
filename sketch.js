
let W=240;

let myFont;

let noOfPlayers = 2;
let gameTreeIndex = 0; //0 is the start of the game, 1 should be accessable from 0 and is the playtime code

let menuPause;
let menuMain;

let lastKey;
let spinner;

let gameWidth = 288;
let gameHeight = 224;
let gameScale;
function preload() {
  myFont = loadFont('PressStart2P.ttf');
}

function setup() {
  gameScale = 2;
  createCanvas(gameWidth * gameScale, gameHeight * gameScale);
  scale(2);
  
  
  textFont(myFont);
  textSize(16);

  
  
  menuMain = new Menu('Press Start', ['2UP', '3UP', '4UP'],[]);
  
} 


function draw() {
    scale(gameScale);
	background("#f8ecf8");
    if (gameTreeIndex == 0) {
        translate(0.5 * gameWidth - 0.5 * menuMain.width, 0.5 * gameHeight - 0.5 * menuMain.height);
        menuMain.display();
        let x = menuMain.isReady();
        if (x != null) {
            numberOfPlayers = x + 2;
            gameTreeIndex = 1;
            let b = [];
            for (let j = 0; j < numberOfPlayers; j++) {
                b[j] = 'P' + (j + 1);
            }
            menuPause = new Menu('Who Won?', b, ['None, Continue']);
            spinner = new Spinner(numberOfPlayers);
        }
    } else if (gameTreeIndex == 1) {
        translate(0.5 * gameWidth, 0.5 * gameHeight);
        spinner.display();
        let x = spinner.getStatus();
        if (x == 1)
            gameTreeIndex = 3;
    } else if (gameTreeIndex == 3) {
        translate(0.5 * gameWidth - 0.5 * menuMain.width, 0.5 * gameHeight - 0.5 * menuMain.height);
        menuPause.display();
        let x = menuPause.isReady();
        if (x != null) {
            spinner.play();
            gameTreeIndex = 1;
        }
    }
        
} 

function keyPressed() {
  let keyIndex = -1;
  print(key);
  if (key >= 'a' && key <= 'z') {
    keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
  }


  if (key == ' ') {

    // If it's not a letter key, clear the screen
	
      
  } 
}