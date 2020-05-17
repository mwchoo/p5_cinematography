function drawSpace() {
  push();
  translate(0, -500, 800);
  specularMaterial(20, 20, 20);
  shininess(20);
  //fill(20);

  // bottom
  //texture(textureMat.concrete);
  noStroke();

  // front-back
  push();
  translate(0, 0, -1500);
  texture(textures.backpanel);
  plane(4000, 2000);
  pop();
  rotateX(HALF_PI);
  translate(0, 1000, -1000);
  plane(4000, 5000);

  // left
  rotateY(HALF_PI);
  translate(-1000, 0, -2000);
  push();
  texture(textures.leftpanel);
  push();
  rotateY(-HALF_PI);
  pop();
  plane(2000, 5000);
  pop();

  // top
  rotateY(HALF_PI);
  translate(-2000, 0, -1000);
  plane(4000, 5000);

  // right
  rotateY(HALF_PI);
  translate(-1000, 0, -2000);
  push();
  texture(textures.rightpanel);
  plane(2000, 5000);
  pop();
  pop();
}

function drawStand() {
  push();
  translate(0, 430, 0);
  noStroke();
  specularMaterial(60, 60, 60);
  shininess(30);
  cylinder(600, 60);
  pop();
}

function drawStage() {
  push();
  translate(0, 470, 0);
  specularMaterial(40, 40, 40);
  shininess(100);
  box(3998, 60, 1800);
  pop();
}

function drawElecDisplay() {
  push();
  translate(0, -500, 0);
  noStroke();
  texture(textures.nightsky);
  cylinder(650, 400, 24, 1, false, false);
  pop();
}