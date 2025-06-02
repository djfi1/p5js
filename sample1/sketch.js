//첫화면

//장면1
let baseW = 1200;  //x비율
let baseH = 800;  //y비율
let scaleFactor, offsetX, offsetY;  //기준좌표계 설정 변수
let HR = 0;  //핸들 회전
let excelColor, breakColor;
let breakState = false;  //브레이크 감지
let gearY = -150;  //기어 위치
let gearState = "P"  //현재 기어 단계
let draggingGear = 0;  //마우스 드래그 상태
let SR = 15;  //사이드브레이크 회전
let sX = -250;  //사이드브레이크 버튼 위치
let sideB = false;  //사이드브레이크 감지

//장면2
let a = -100
let tx = [0, 0, 0, 0, 0]
let ty = [0, 0, 0, 0, 0]
let ts = [0, 0, 0, 0, 0]

//장면3
let x = 50;
let y = 650;
let r = 0;

let Ant = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  excelColor = color(180);
  breakColor = color(180);
}

function draw() {
  background(255);
  text(Ant, 100, 100)

  if(Ant == 1){
    push();
    rectMode(CENTER);
    strokeWeight(3);
    textAlign(CENTER, CENTER);
    referenceFrame();
    handle();
    pedel();
    gear();
    sideBreak();
    turnOn();
    pop();
  }
  else if(Ant == 2){
    background(200, 230, 255)
    a += 3
    if(a >= width){
      a = -100
      for(let i = 0; i < 5; i++){
        tx[i] = random(i / 5 * width, (i + 1) / 5 * width)
        ty[i] = random(height - 250, height - 400)
        ts[i] = random(0.8, 1.2)
      }
    }
  fill("#52A352")
  quad(0, height, width, height, width, height - 400, 0, height - 400)
  
  fill(0)
  quad(0, height - 250, 0, height - 50, width, height - 50, width, height - 250)
  fill(120)
  quad(0, height - 50, width, height - 50, width, height - 40, 0, height - 40)
  quad(0, height - 250, width, height - 250, width, height - 240, 0, height - 240)
  fill(255, 255, 0)
  for (let i = 0; i < windowWidth; i = i + 200)
    {
      quad(i, height - 150, i, height - 140, i + 100, height - 140,i + 100, height - 150)
    }
  for(let i = 0; i < 5; i++){
    drawTree(tx[i], ty[i], ts[i])
  }

  drawCar(a, height - 90); // 자동차 위치 (x, y)
  }
  //장면3
  else if(Ant == 3){
    push();
    pop();
    background(0,255,255);
    referenceFrame();  //가장 먼저 호출 해야 됨

    drawRoad();
    drawMountain();
    if(x<830) {
      drawCar(x,y);
      x+=5;
      y-=1;
    }

    else if(x>=830) {
    x +=3;
    y +=4;
    r +=2;
    push();
    translate(x,y);
    rotate(radians(r));
    drawCar(0,0);
    pop();

    }
    text(windowWidth, 100, 100)
    text(windowHeight, 300, 300)
  }
  //오프닝
  else if(Ant == 0) {
    push();
    textAlign(CENTER, CENTER);
    Opening();
  
    pop();
  }
  //엔딩
  else if(Ant == 4) {
    push();
    textAlign(CENTER, CENTER);
    textSize(100);
    text("엔딩크레딧",windowWidth / 2, windowHeight / 2);
    pop();
  }

}
//오프닝
function Opening() {
  textSize(100);
  text("과속하지 마세요", windowWidth/2, windowHeight/2 - 100);
  textSize(30);
  text("맹창명, 김민석, 조민혁", windowWidth/2, windowHeight/2);
  text("f를 눌러 전체화면", windowWidth/2, windowHeight/2 + 100);
  text("< >를 눌러 화면 전환", windowWidth/2, windowHeight/2 + 200);
}

//장면1
function referenceFrame() {
  scaleFactor = min(windowWidth / baseW, windowHeight / baseH);
  offsetX = (windowWidth - baseW * scaleFactor) / 2;
  offsetY = (windowHeight - baseH * scaleFactor) / 2;

  translate(offsetX, offsetY);
  scale(scaleFactor);
}

function screenToCanvas(mx, my) {
  return {
    x: (mx - offsetX) / scaleFactor,
    y: (my - offsetY) / scaleFactor
  };
}

// 핸들
function handle() {
push();
  
let x = baseH - 300;

// 경계선
line(baseW / 2, 0, baseW / 2, baseH);
line(0, x, baseW, x);
line(0, 0, 0, baseH);
line(baseW, 0, baseW, baseH);
textSize(50);
fill(120);
translate(baseW/4, (baseH - 300)/2);
//배경
fill(0);
text("←", -100, -100);
text("→", 100, -100);

//핸들
rotate(radians(HR));
fill(120);
circle(0, 0, 200);
fill(255);
noStroke()
circle(0,0,150);
fill(120);
rect(0,-5,180,40);
rect(0,50,40,75);
stroke(0);
noFill();
circle(0,0,30);

if(keyIsPressed) {
if(keyCode === RIGHT_ARROW) {
HR += 5;
} else if (keyCode === LEFT_ARROW) {
HR -= 5;
}
}
pop();
}
// 페달
function pedel() {
  push();
  let x = baseH - 150;
  noStroke();
  textSize(30);
  
  fill(breakColor);
  rect(180, x, 180, 100, 5);
  text("s", 180, x - 80);
  
  fill(excelColor);
  rect(450, x, 100, 180, 5);
  text("w", 450, x - 120);

  // 눌렀을 때 어둡게
  if (keyIsPressed && key === 's') {
    breakColor = color(100);
    breakState = true;
  } else {
    breakColor = color(180);
    breakState = false;
  }

  if (keyIsPressed && key === 'w') {
    excelColor = color(100);
  } else {
    excelColor = color(180);
  }
  pop();
}

// 기어
function gear() {
  push();
  let gearBoxX = baseW * 3 / 4;
  let gearBoxY = (baseH - 300) / 2;
  textSize(30);
  let gearX = -50;
  let transmission = ["P", "R", "N", "D"];
  
  translate(gearBoxX, gearBoxY);

  //마우스를 기준 좌표로 변환
  let canvasMouse = screenToCanvas(mouseX, mouseY);
  let my = canvasMouse.y - gearBoxY;  //기준 좌표의 mouseY
  let mx = canvasMouse.x - gearBoxX;  //기준 좌표의 mouseX
  
  fill(0);
  text("s를 누른 상태로 드래그", gearX, -230);
  rect(gearX,0,100,400,40);
  fill(255);
  rect(gearX,0,80,380,30);
  
  //기어 단계 표시
  textSize(50);
  for(let i =0; i < 4; i++) {
    fill(0);
    text(transmission[i],150, -150 + i*100);
    
    rect(50, -150 + i*100, 80, 10); 
    
  }
  fill(0);
  rect(gearX, gearY, 300, 100, 20);
  fill(255);
  rect(gearX, gearY-25, 260, 30, 50);
  
  if (
    mouseIsPressed &&
    breakState == true &&
    !draggingGear &&
    my > gearY - 50 &&
    my < gearY + 50 &&
    mx > gearX - 150 &&
    mx < gearX + 150
  ) {
    draggingGear = true;
  }

  // 드래그 중일 때 위치 업데이트
  if (draggingGear) {
    gearY = constrain(my, -150, 150);
  } else {
  // 자동 정렬 및 상태 저장
    if (gearY < -100) {
      gearY = -150;
      gearState = "P";
    } else if (gearY < 0) {
      gearY = -50;
      gearState = "R";
    } else if (gearY < 100) {
      gearY = 50;
      gearState = "N";
    } else {
      gearY = 150;
      gearState = "D";
    }
  }
  
  pop();
}

//드래그 감지
function mouseReleased() {
  draggingGear = false;
}

// 사이드 브레이크
function sideBreak() {
  push();
  noStroke();
  textSize(30);
  translate(baseW*3/4 + 100, baseH - 150);
  point(0,0);
  
  push();
  fill(50);
  rotate(radians(SR));
  rect(sX, -50, 50, 30, 5);
  fill(100);
  rect(-170, -50, 150, 50, 5);
  rect(-100, -50, 11, 50);
  fill(150);
  quad(-70,50, 80,50, -95,-75, -95,-25);
  fill(0);
  
  if(sideB === false) {
    sX = -250;
    text("b", -290, -50);
  } else {
    sX = -230;
    text("↑", -280, -70);
    text("↓",-280, -30);
    if(keyIsPressed) {
    if (keyCode === UP_ARROW && SR <= 15) {
      SR += 1;
      } else if (keyCode === DOWN_ARROW && SR >= 0) {
      SR -= 1;
      }
    }  
  }
  pop();
  fill(100);
  rect(-50,70,300,100,30);
  
  pop();
}


// 시동(미완)
function turnOn() {
  push();
  pop();
}

// 전체화면 전환
function keyPressed() {
  let fs = fullscreen();
  if(key == "f") {
   fullscreen(!fs); 
  }
  //사이드 브레이크
  if (key === 'b') {
    sideB = !sideB;
    // console.log("sideB 상태:", sideB);
  }
  // 장면전환
  if(key == '.' || key == '>'){
      Ant += 1;
    if(Ant == 2){
      drawSkyGradient(); // 그라데이션 배경
      }
    }
  else if(key == ',' || key == '<'){
      Ant -= 1;
      if(Ant == 2){
        drawSkyGradient(); // 그라데이션 배경
      }
    }
}

// 창 크기 변경 시 캔버스 다시 설정
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


//장면2
function drawCar(x, y) {
  // 차체
  fill(255, 0, 0); // 빨간색
  noStroke();
  rect(x, y - 20, 120, 20); // 아래 본체
  rect(x + 20, y - 40, 80, 20); // 윗부분

  // 창문
  fill(200);
  rect(x + 50, y - 38, 20, 16); // 앞 창문
  rect(x + 75, y - 38, 20, 16); // 뒷 창문

  // 바퀴
  fill(50);
  ellipse(x + 25, y, 20, 20);
  ellipse(x + 95, y, 20, 20);
}

function drawTree(x, y, s = 1) {
  // s는 크기 비율
  let trunkWidth = 20 * s;
  let trunkHeight = 60 * s;
  let leafSize = 60 * s;

  // 줄기
  fill(101, 67, 33); // 갈색
  rect(x - trunkWidth / 2, y - trunkHeight, trunkWidth, trunkHeight);

  // 잎사귀
  noStroke()
  fill(34, 139, 34); // 진녹색
  ellipse(x, y - trunkHeight - leafSize * 0.2, leafSize * 1.4, leafSize * 1.4);
  ellipse(x - leafSize * 0.4, y - trunkHeight - leafSize * 0.1, leafSize, leafSize);
  ellipse(x + leafSize * 0.4, y - trunkHeight - leafSize * 0.1, leafSize, leafSize);
  ellipse(x - leafSize * 0.25, y - trunkHeight - leafSize * 0.5, leafSize, leafSize);
  ellipse(x + leafSize * 0.25, y - trunkHeight - leafSize * 0.5, leafSize, leafSize);
}

function drawSkyGradient() {
  push()
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(135, 206, 250), color(255, 255, 255), inter);
    stroke(c);
    line(0, y, width, y);
  }
  pop()
}

//장면3
function drawRoad() {
push();
// 절벽
fill(160, 82, 45);
quad(870, 400, 1200, 1000, -500, 1000, -500, 0);

// 도로
fill(0, 128, 0);
strokeWeight(150); // 이미 scale 적용됨
stroke(150);
ellipse(200, 400, 1200, 400); // baseW = 1200 기준 위치
pop();
}

function drawMountain() {
push();
noStroke();
fill(0, 128, 0);
triangle(-500, 500, 700, 400, 250, -300);

fill(0, 100, 0);
triangle(700, 400, 250, -300, 600, 450);
pop();
}

