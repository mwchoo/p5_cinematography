/*
2020-1 Computer Grapics :: PROJECT 7 - CINEMATOGRAPHY
20141150 Minwoo Choo

< MANUAL >
W Key: go forward (CAM)
S Key: go backward (CAM)
A Key: rotate left (CAM)
D Key: rotate right (CAM)

ARROW_UP Key: go forward (DRONE)
ARROW_DOWN Key: go backward (DRONE)
ARROW_LEFT Key: go left (DRONE)
ARROW_RIGHT Key: go right (DRONE)

R Key: take off (DRONE)
F Key: landing (DRONE)

Mouse Click: switch pov mode
Mouse Move: cam angle (in drone pov)

P Key: screen shot
*/

let scene = 0;
let pov_mode = 0;
let sounds = {
  'bgm': undefined,
  'drone': undefined
}
let drone;
//let keymap;

let font_georgia;
let cgSplashName;

//let scene_timer;
let rot = 0;

let X = -160;  // 0;
let Y = -160;  // 0;
let Z = 550;  //1700;
let centerX = 0;
let centerY = -100;
let centerZ = 0;
let h = 20;

let spotPos, spotDir, modelPos;
let mrot, srot;
let isPlayed = false;

document.onselectstart = function () {
  // prevent mouse drag or text/element selection
  window.getSelection().removeAllRanges();
};

function preload() {
  font_georgia = loadFont('assets/georgia.ttf');
  sounds.bgm = loadSound('assets/bgm.mp3');
  sounds.drone = loadSound('assets/drone.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(RGB, 255, 255, 255, 1);
  /*
  gl = this._renderer.GL;
  gl.disable(gl.DEPTH_TEST);*/

  cgSplashName = new Text('Drone CAM', 100, -300, 0, 0, color(255, 255, 255, 1), font_georgia);
  drone = new Drone(1);
  //scene_timer = new Timer(3000, handleScene);

  spotPos = new p5.Vector(-1000, 2000, 200);
  modelPos = new p5.Vector(-200, 1000, 0);
  mrot = 0;
  srot = 0;

  initBuildings();
  getAudioContext().resume();
  sounds.bgm.play();
  createDiv("<div class='info-wrapper'>" +
    "<h2 id='pov-info'>Default POV (CAM 0)</h2>" +
    "<h3 id='drone-pos'>Drone POS: (0, 0, 0)</h3>" +
    "<h3 id='drone-speed'>Propeller Speed: (0, 0, 0, 0)</h3>" +
    "<h3 id='altitude'>Altitude: 0 ft</h3>" +
    "<h3 id='cam-pos'>CAM POS: (0, 0, 0), (0, 0, 0)</h3>" +
    "</div>"
  );
  createDiv("<div class='keymap-wrapper'>" +
    "<img src='assets/keymap.png'>" +
    "</div>");
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

  //drawCity();
  drawBuildings();
  drone.display();

  if (!sounds.bgm.isPlaying()) {
    getAudioContext().resume();
    sounds.bgm.play();
  }

  handleDisplay();
  handleKeyDown();
  handlePov();
  handleDroneSound();
}

function handlePov() {
  if (pov_mode === 0) {
    /*X = -160;
    Y = -160;
    Z = 550;
    centerX = 0;
    centerY = -100;
    centerZ = 0;*/
  } else if (pov_mode === 1) {
    // drone mode
    X = drone.x;
    Y = drone.y + 100;
    Z = drone.z + 200;
    centerX = mouseX + 500;
    centerY = mouseY - drone.y;
  }
}

function handleDisplay() {
  const pov_info = document.getElementById('pov-info');
  const drone_pos = document.getElementById('drone-pos');
  const drone_speed = document.getElementById('drone-speed');
  const altitude = document.getElementById('altitude');
  const cam_pos = document.getElementById('cam-pos');
  const {x, y, z} = drone;
  const {front_left, front_right, rear_left, rear_right} = drone.propeller;
  pov_info.innerText = pov_mode === 0 ? 'Default POV (CAM 0)' : 'Drone POV (CAM 1)';
  drone_pos.innerText = 'Drone Pos: (' + parseInt(x) + ', ' + parseInt(y) + ', ' + parseInt(z) + ')';
  drone_speed.innerText = 'Propeller Speed: ' + front_left.rot_speed.toFixed(3) + ', '
    + front_right.rot_speed.toFixed(3) + ', ' + rear_left.rot_speed.toFixed(3) + ', '
    + rear_right.rot_speed.toFixed(3) + ')';
  altitude.innerText = 'Altitude: ' + parseInt(y) * -1 + ' ft';
  cam_pos.innerText = 'CAM POS: (' + parseInt(X) + ', ' + parseInt(Y) + ', ' + parseInt(Z) + ')'
    + ' (' + parseInt(centerX) + ', ' + parseInt(centerY) + ', ' + parseInt(centerZ) + ')';
}

function handleKeyDown() {
  // handle rot speed of propeller to control altitude
  const {y, propeller} = drone
  const {front_left, front_right, rear_left, rear_right} = propeller;
  if (keyIsDown(82)) {  // R key - take off
    front_left.setSpeedUp(0.005);
    front_right.setSpeedUp(0.005);
    rear_left.setSpeedUp(0.005);
    rear_right.setSpeedUp(0.005);
  } else if (keyIsDown(70)) {  // F key - landing
    front_left.setSpeedDown(0.005);
    front_right.setSpeedDown(0.005);
    rear_left.setSpeedDown(0.005);
    rear_right.setSpeedDown(0.005);
  }


  if (keyIsDown(87)) {
    // W: go forward
    Z -= 10;
    Y = cos(Z / 50) * 60 - 100;  // walk effect
    centerX = 0;
    centerY = -100;
    centerZ = 0;
  } else if (keyIsDown(83)) {
    // S: go backward
    Z += 10;
    Y = cos(Z / 50) * 60 - 100;  // walk effect
    centerX = 0;
    centerY = -100;
    centerZ = 0;
  }
  if (keyIsDown(65)) {
    // A: turn your head to the left
    X -= 20;
    centerX = 0;
    centerY = -100;
    centerZ = 0;
  } else if (keyIsDown(68)) {
    // D: turn your head to the right
    X += 20;
    centerX = 0;
    centerY = -100;
    centerZ = 0;
  }

  if (y < 0) {  // altitude > 0
    if (keyIsDown(UP_ARROW)) {
      // go forward
      //drone.z -= 5;
      drone.x += 5;
    } else if (keyIsDown(DOWN_ARROW)) {
      // go backward
      //drone.z += 5;
      drone.x -= 5;
    }
    if (keyIsDown(LEFT_ARROW)) {
      // go left
      //drone.x -= 5;
      drone.z -= 5;
    } else if (keyIsDown(RIGHT_ARROW)) {
      // go right
      //drone.x += 5;
      drone.z += 5;
    }
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
  drone_acc = 0;
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    /*if (sounds.walk.isPlaying()) {
      sounds.walk.stop();
    }*/
  }
}

function mouseClicked() {
  // mouse click event to control pov mode
  if (pov_mode !== 1) {
    pov_mode++;
  } else {
    pov_mode = 0;
  }
}

function saveImage() {
  saveCanvas("image", "jpg");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}