class Drone {
  constructor(sz) {
    this.size = sz;
    this.on = false;
    this.x = 0; //
    this.y = 0; //
    this.z = 0; //
    this.altitude = 0;  // range: 0 to 1000?
    this.rotX = 0; //
    this.rotY = 0; //
    this.rotZ = 0; //
    this.propeller = {
      front_left: new Propeller(),
      front_right: new Propeller(),
      rear_left: new Propeller(),
      rear_right: new Propeller()
    }
  }

  drawArms() {
    // draw front-left arm
    push();
    translate(-50, 0, -50);
    rotateY(HALF_PI/2);
    box(15, 15, 90);

    translate(0, -10, -40);
    cylinder(10, 5);

    // draw front-left propeller
    this.propeller.front_left.display();
    pop();

    // draw rear-left arm
    push();
    translate(-50, 0, 50);
    rotateY(-HALF_PI/2);
    box(15, 15, 90);

    translate(0, -10, 40);
    cylinder(10, 5);

    // draw rear-left propeller
    this.propeller.rear_left.display();
    pop();

    // draw front-right arm
    push();
    translate(50, 0, -50);
    rotateY(-HALF_PI/2);
    box(15, 15, 90);

    translate(0, -10, -40);
    cylinder(10, 5);

    // draw front-right propeller
    this.propeller.front_right.display();
    pop();

    // draw rear-right arm
    push();
    translate(50, 0, 50);
    rotateY(HALF_PI/2);
    box(15, 15, 90);

    translate(0, -10, 40);
    cylinder(10, 5);

    // draw front-right propeller
    this.propeller.rear_right.display();
    pop();

    pop();
  }

  display() {
    push();
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
    this.rot_speed = {  // range: 0 to 255 (simulate PWM)
      front_left: 0,
      front_right: 0,
      rear_left: 0,
      rear_right: 0
    }
  }

  display() {
    push();
    translate(0, -4, 0);
    rotateY(mouseX/10);
    specularMaterial(20, 20, 20);
    shininess(20);
    cylinder(7, 4);

    push();
    translate(0, 0, -30);
    rotateX(HALF_PI);
    rotateY(HALF_PI/4);
    ellipse(0, 0, 10, 70);
    pop();

    push();
    translate(0, 0, 30);
    rotateX(HALF_PI);
    rotateY(-HALF_PI/4);
    ellipse(0, 0, 10, 70);
    pop();
    pop();
  }
}

function handlePropeller() {
  // ToDo. check propeller turn on
}