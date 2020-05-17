class Drone {
  constructor(sz) {
    this.size = sz;
    this.on = false;
    this.x = 0; //
    this.y = 0; //
    this.z = 0; //
    this.altitude = 0;  // range: 0 to 1000?
    this.rotX = 0;
    this.rotY = 0;
    this.rotZ = 0;
    this.prop_speed = {  // range: 0 to 255 (simulate PWM)
      front_left: 0,
      front_right: 0,
      rear_left: 0,
      rear_right: 0
    }
  }

  display() {
    push();
    noStroke();
    specularMaterial(200, 200, 200);
    shininess(20);
    box(40, 20, 80);
    box(50, 15, 90);

    // draw front-left arm
    push();
    translate(-50, 0, -50);
    rotateY(HALF_PI/2);
    box(15, 15, 80);
    pop();


    pop();
  }
}