/*
2020-1 Computer Grapics :: PROJECT 7 - CINEMATOGRAPHY
20141150 Minwoo Choo

< MANUAL >
ARROW_UP Key: go forward
ARROW_DOWN Key: go backward
ARROW_LEFT Key: rotate left
ARROW_RIGHT Key: rotate right

W Key: Up
S Key: Down

Mouse Click: switch pov mode

P Key: screen shot
*/

let scene = 0;
let sounds = {
  'bgm': undefined,
  'drone': undefined
}
let drone;
let drone_loc = {
  x: 0,
  y: 0,
  z: 0,
  altitude: 0,  // range: 0 to 1000?
  rotX: 0,
  rotY: 0,
  rotZ: 0
}
//let keymap;

let font_georgia;
let cgSplashName;

//let scene_timer;
let rot = 0;

let X = 0;
let Y = 0;
let Z = 1700;
let centerX = 0;
let centerY = 0;
let centerZ = 0;
let h = 20;

let spotPos, spotDir, modelPos;
let mrot, srot;
let isPlayed = false;

function preload() {
  font_georgia = loadFont('assets/georgia.ttf');
  // sounds.bgm = loadSound('assets/bgm.mp3');
  // sounds.drone = loadSound('assets/drone.mp3');
  // keymap = loadImage('assets/keymap.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(RGB, 255, 255, 255, 1);
  /*
  gl = this._renderer.GL;
  gl.disable(gl.DEPTH_TEST);*/

  cgSplashName = new Text("Drone CAM", 100, -300, 0, 0, color(255, 255, 255, 1), font_georgia);
  drone = new Drone(1);
  //scene_timer = new Timer(3000, handleScene);

  spotPos = new p5.Vector(-1000, 2000, 200);
  modelPos = new p5.Vector(-200, 1000, 0);
  mrot = 0;
  srot = 0;

  //sounds.bgm.play();
}

function draw() {
  background(0);

  // scene control
  if (scene === 0) {
    // drawSplash();
    // return;
  }

  // light setting
  lights();
  pointLight(100, 100, 100, sin(srot) * 4000, -1300, cos(srot) * 100 - 100);


  srot += 0.01;
  spotPos.x = 200 * cos(srot);
  spotPos.y = 200 * sin(srot);
  spotDir = p5.Vector.sub(modelPos, spotPos);
  spotLight(0, 100, 100, spotPos, spotDir, radians(90), 1);

  // camera setting
  camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);

  // drawSpace();
  drone.display();
  handlePropeller();

  /*if (!sounds.bgm.isPlaying()) {
    getAudioContext().resume();
    sounds.bgm.play();
  }*/

  handleKeyDown();
}

function handleKeyDown() {
  if (keyIsDown(UP_ARROW)) {
    // go forward
    Z -= 10;
    Y = cos(Z / 50) * 60 - 100;  // walk effect
  } else if (keyIsDown(DOWN_ARROW)) {
    // go backward
    Z += 10;
    Y = cos(Z / 50) * 60 - 100;  // walk effect
  }
  if (keyIsDown(LEFT_ARROW)) {
    // turn your head to the left
    X -= 20;
  } else if (keyIsDown(RIGHT_ARROW)) {
    // turn your head to the right
    X += 20;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    /*if (!sounds.walk.isPlaying()) {
      sounds.walk.play();
    }*/
  }
  if (keyCode === 80) {
    saveImage();
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    /*if (sounds.walk.isPlaying()) {
      sounds.walk.stop();
    }*/
  }
}

function saveImage() {
  saveCanvas("image", "jpg");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}