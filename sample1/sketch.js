function setup() {
  createCanvas(400, 400);
  background(220);
}
  
function draw() {
  noStroke();
  fill(0);
  ellipse(mouseX, mouseY, 10, 10);
}