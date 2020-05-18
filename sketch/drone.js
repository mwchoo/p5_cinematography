class Drone {
  constructor(sz) {
    this.size = sz;
    this.on = false;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.propeller = {
      front_left: new Propeller(),
      front_right: new Propeller(),
      rear_left: new Propeller(),
      rear_right: new Propeller()
    }
  }

  handleAltitude() {
    /*
    0.0 ~ 0.45: landing
    0.45 ~ 0.55: stable
    0.55 ~ 1.0: take off
     */
    const {front_left, front_right, rear_left, rear_right} = this.propeller;
    if (valInRange(0.0, 0.1, front_left.rot_speed) &&
      valInRange(0.0, 0.1, front_right.rot_speed) &&
      valInRange(0.0, 0.1, rear_left.rot_speed) &&
      valInRange(0.0, 0.1, rear_right.rot_speed)) {
      // landing -1
      if (this.y < 0) {
        this.y += 10;
      }
    } else if (valInRange(0.1, 0.45, front_left.rot_speed) &&
      valInRange(0.1, 0.45, front_right.rot_speed) &&
      valInRange(0.1, 0.45, rear_left.rot_speed) &&
      valInRange(0.1, 0.45, rear_right.rot_speed)) {
      // landing -2
      if (this.y < 0) {
        this.y += (1 - front_left.rot_speed) ^ 2;
      }
    } else if (valInRange(0.55, 1, front_left.rot_speed) &&
      valInRange(0.55, 1, front_right.rot_speed) &&
      valInRange(0.55, 1, rear_left.rot_speed) &&
      valInRange(0.55, 1, rear_right.rot_speed)) {
      // take off
      this.y -= front_left.rot_speed ^ 2;
    }
  }

  drawArms() {
    // draw front-left arm
    push();
    translate(-50, 0, -50);
    rotateY(HALF_PI / 2);
    box(15, 15, 90);

    translate(0, -10, -40);
    cylinder(10, 5);

    push();
    translate(0, 32, -2.5);
    box(15, 30, 5);
    pop();

    // draw front-left propeller
    this.propeller.front_left.display();
    pop();

    // draw rear-left arm
    push();
    translate(-50, 0, 50);
    rotateY(-HALF_PI / 2);
    box(15, 15, 90);

    translate(0, -10, 40);
    cylinder(10, 5);

    push();
    translate(0, 32, -2.5);
    box(15, 30, 5);
    pop();

    // draw rear-left propeller
    this.propeller.rear_left.display();
    pop();

    // draw front-right arm
    push();
    translate(50, 0, -50);
    rotateY(-HALF_PI / 2);
    box(15, 15, 90);

    translate(0, -10, -40);
    cylinder(10, 5);

    push();
    translate(0, 32, -2.5);
    box(15, 30, 5);
    pop();

    // draw front-right propeller
    this.propeller.front_right.display();
    pop();

    // draw rear-right arm
    push();
    translate(50, 0, 50);
    rotateY(HALF_PI / 2);
    box(15, 15, 90);

    translate(0, -10, 40);
    cylinder(10, 5);

    push();
    translate(0, 32, -2.5);
    box(15, 30, 5);
    pop();

    // draw front-right propeller
    this.propeller.rear_right.display();
    pop();
  }

  display() {
    push();
    this.handleAltitude();
    translate(this.x, this.y - 50, this.z);
    noStroke();
    specularMaterial(200, 200, 200);
    shininess(20);
    box(40, 20, 80);
    box(50, 15, 90);

    push();
    translate(0, 20, 0);
    //specularMaterial(20, 20, 20);
    //shininess(60);
    emissiveMaterial(20, 20, 20);
    box(40, 20, 80);
    pop();

    this.drawArms();

    pop();
  }
}

class Propeller {
  constructor() {
    this.rot = 0;
    this.rot_speed = 0;  // range: 0 to 1 (simulate PWM)
  }

  setSpeedUp(val) {
    if (this.rot_speed < 1) {
      this.rot_speed += val;
    }
    if (this.rot_speed > 1) {
      this.rot_speed = 1;  // exception handling
    }
  }

  setSpeedDown(val) {
    if (this.rot_speed > 0) {
      this.rot_speed -= val;
    }
    if (this.rot_speed < 0) {
      this.rot_speed = 0;  // exception handling
    }
  }

  display() {
    push();
    translate(0, -4, 0);
    this.rot += this.rot_speed;
    rotateY(this.rot);
    specularMaterial(20, 20, 20);
    shininess(20);
    cylinder(7, 4);

    push();
    translate(0, 0, -30);
    rotateX(HALF_PI);
    rotateY(HALF_PI / 4);
    ellipse(0, 0, 10, 70);
    pop();

    push();
    translate(0, 0, 30);
    rotateX(HALF_PI);
    rotateY(-HALF_PI / 4);
    ellipse(0, 0, 10, 70);
    pop();
    pop();
  }
}

function handleDroneSound() {
  const {propeller} = drone;
  const {front_left} = propeller;
  if (front_left.rot_speed > 0.1) {
    if (!sounds.drone.isPlaying()) {
      getAudioContext().resume();
      sounds.drone.play();
    }
  } else {
    sounds.drone.stop();
  }
}