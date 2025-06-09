//장면1
let baseW = 1200;  //x비율
let baseH = 800;  //y비율
let scaleFactor, offsetX, offsetY;  //기준좌표계 설정 변수
let HR = 0;  //핸들 회전
let excelColor, breakColor;
let breakState = false;  //브레이크 감지
let gearY = -150;  //기어 위치
let gearState = "P"  //현재 기어 단계
let colors; //기어 색상 배열
let colorIndex = 0; //기어 색상 인덱스1
let draggingGear = 0;  //마우스 드래그 상태
let SR = 15;  //사이드브레이크 회전
let sX = -250;  //사이드브레이크 버튼 위치
let sideB = false;  //사이드브레이크 감지
let sideState = "lock";  //현재 사이드브레이크 상태
let engine = "OFF";  //엔진 상태
let start = -1;  //시동

//장면2
let a = -100
let tx = [0, 0, 0, 0, 0]
let ty = [0, 0, 0, 0, 0]
let ts = [0, 0, 0, 0, 0]
let speed = 3;

//장면3
let x = 50;
let y = 650;
let r = 0;

let sx = 1000;
let sy = 900;
let nums = [];


let Ant = 0;

//오프닝
let ox;
let oy;
let numO = [];

//엔딩
let textMassage;
let AIcode;
let textH;

function setup() {
  createCanvas(windowWidth, windowHeight);
  excelColor = color(180);
  breakColor = color(180);
  colors = [color(255, 0, 0), color(0, 0, 0)];
  makeR();
  makeR2();
  
  ox = windowWidth;
  oy = windowHeight - 100;
  //엔딩크레딧
  textH = windowHeight;
  textMassage = '김민석\n이번 프로젝트를 진행하면서, 한 학기 동안 배운 내용만으로도 주제에 맞는 디자인과 인터랙션 요소를\n 구현해내며 생각보다 많은 것을 표현할 수 있다는 점이 신기하고 흥미로웠습니다.\n특히, AI를 활용하는 과정에서는 처음에 원하는 결과가 잘 나오지 않아 어려움을 겪었지만, \n프로젝트를 진행하면서 AI에게 효과적으로 질문하는 방법을 익히게 되었고, \n앞으로도 다른 프로젝트에서 AI를 얼마나 잘 활용하느냐가 중요한 역량이 될 것이라는 점을 느꼈습니다.\n다만, 코드가 점점 길어지고 변수도 많아지면서 작은 수정조차 쉽지 않아 \n코드의 구조화와 주석의 중요성을 깨달았습니다.\n\n맹창영\n이번에 art&tech 수업을 하면서 처음으로 자바스크립트와 p5를 배우게 되었는데\n이해가 잘 안돼서 어려울 때도 있었지만 천천히 알아가면서 배운 점이 매우 많았다고 생각한다.\n단순히 글자만 나오는 코드가 아니라 실시간으로 그림이 그려지는 p5.js에서만 할 수 있는 것이 있을거라고 생각해\n 수업이 끝나고 앞으로도 더 많은 활용방안이 있을지 찾아봐야겠다고 생각했다.\n 또한 팀플을 하면서 각자의 의견을 합쳐서 어떤 식으로 만들어내야할지 고민을 하고,\n 각자 맡은 역할을 제대로 하여서 결과물이 완성되었을 때 뿌듯함까지 느껴졌다.\n 앞으로 이러한 팀플을 더욱 많이 하게 될 텐데 그 때를 위한 좋은 경험이 된 것 같았다.\n\n조민혁\n대학교에 처음 와서 무언가 프로젝트를 해볼 수 있었는데 좋은 경험이였습니다.\n또 강의시간에 가르쳐주신 것들을 충분히 이용해볼 수 있어서 더 뜻 깊었던 것 같습니다.\n그리고 모르는 부분이 있을 때나 오류가 있을 때 동급생이지만 \n팀원들에게 조언을 구하며 진행할 수 있어서 좋았습니다.\n그리고 다같이 서로의 것들을 확인해가며 피드백을 주고받을 수 있었고 그랬기에 \n원했던 결과물을 만들어낼 수 있었던 것 같습니다.\n';
  AIcode = `//AI 사용 콘텐츠 30%
let baseW = 1200;  //x비율
let baseH = 800;  //y비율
let scaleFactor, offsetX, offsetY;  //기준좌표계 설정 변수
let draggingGear = 0;

function setup() {
  colors = [color(255, 0, 0), color(0, 0, 0)];
}

function draw() {
//색 반복
if (frameCount % 20 === 0) {	
    colorIndex = 1 - colorIndex;
    }
}

//기준좌표계
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

function gear() {
  let gearBoxX = baseW * 3 / 4;
  let gearBoxY = (baseH - 300) / 2;

  //마우스를 기준 좌표로 변환
  let canvasMouse = screenToCanvas(mouseX, mouseY);
  let my = canvasMouse.y - gearBoxY;  //기준 좌표의 mouseY
  let mx = canvasMouse.x - gearBoxX;  //기준 좌표의 mouseX

  if(gearState == "D") {
    fill(0);
  }
  else {
   fill(colors[colorIndex]); //기어 깜빡이
  }

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
}

function mouseReleased() {
  draggingGear = false;
}

function keyPressed() {
  if (key === 'b') {
    sideB = !sideB;
    if (sideB && SR == 0) {
      SR = 0.1;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

배경화면 그라데이션 코드
function drawSkyGradient() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(135, 206, 250), color(255, 255, 255), inter);
    stroke(c);
    line(0, y, width, y);
  }
}
나무 생성 함수
function drawTree(x, y, s = 1) {
  let trunkWidth = 20 * s;
  let trunkHeight = 60 * s;
  let leafSize = 60 * s;

  // 줄기
  fill(101, 67, 33);
  rect(x - trunkWidth / 2, y - trunkHeight, trunkWidth, trunkHeight);

  // 잎사귀
  fill(34, 139, 34);
  ellipse(x, y - trunkHeight - leafSize * 0.2, leafSize * 1.4, leafSize * 1.4);
  ellipse(x - leafSize * 0.4, y - trunkHeight - leafSize * 0.1, leafSize, leafSize);
  ellipse(x + leafSize * 0.4, y - trunkHeight - leafSize * 0.1, leafSize, leafSize);
  ellipse(x - leafSize * 0.25, y - trunkHeight - leafSize * 0.5, leafSize, leafSize);
  ellipse(x + leafSize * 0.25, y - trunkHeight - leafSize * 0.5, leafSize, leafSize);
}
자동차 생성 함수
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
`;
}

function draw() {
  background(255);
  
  //장면1
  if(Ant == 1){
    push();
    referenceFrame();
    if (frameCount % 20 === 0) {
    colorIndex = 1 - colorIndex;
    }
    rectMode(CENTER);
    strokeWeight(3);
    textAlign(CENTER, CENTER);
    drawLine();
    handle();
    pedel();
    gear();
    sideBreak();
    turnOn();
    pop();
  }
  //장면2
  else if(Ant == 2){
    push();
    noStroke()
    background(200, 230, 255)
    a += speed
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
    textSize(30)
    text("속도 : ", 100, 100)
    text(speed + 97, 180, 100);
    fill(240, 0, 0);
    ellipse(width - 100, 100, 120)
    fill(255)
    ellipse(width - 100, 100, 100)
    fill(0)
    textSize(40)
    stroke(10)
    text('130', width - 131, 115)
    pop();
  }
  //장면3
  else if(Ant == 3){
    push();
    background(0,255,255);
    referenceFrame();  //가장 먼저 호출 해야 됨

    drawRoad();
    drawMountain();
    if(x<810) {
      drawCar(x,y);
      x+=10;
      y-=3;
    }

    else if(x>=810) {
    x +=4;
    y +=5;
    r +=2;
    push();
    translate(x,y);
    rotate(radians(r));
    drawCar(0,0);
    pop();

    }
    if(y>1500) {
      smoke();
      sy -=2;
    }
    pop();
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
    textAlign(CENTER, TOP);
    ending();
    pop();
  }

}
//오프닝
function Opening() {
  push();
  smokeO();
  textSize(100);
  drawCar(windowWidth/2-50,windowHeight/2-100);
  oy-=2;
  textSize(30);
  text("f를 눌러 전체화면", windowWidth/2, windowHeight/2);
  text("< >를 눌러 화면 전환", windowWidth/2, windowHeight/2 + 100);
  pop();

}
//엔딩
function ending() {
  push();
  textSize(100);
  text('THE END',windowWidth/2, textH);
  textSize(30);
  text(textMassage +'\n' +AIcode,windowWidth/2, textH+300);
  if(textH + 1200 > 0) {
     textH -=1;
  } else {
    textH -= 5;
  }
  // text(textH, 50,50);
  pop();
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

// 경계선
function drawLine() {
  push();
  let x = baseH - 300;
  line(baseW/2, 0, baseW/2, baseH);
  line(0, x, baseW, x);
  line(0, 0, 0, baseH);
  line(baseW, 0, baseW, baseH);
  fill(100);
  pop();
}

// 핸들
function handle() {
  push();

  let x = baseH - 300;

  textSize(50);
  fill(120);
  translate(baseW/4, (baseH - 300)/2);  //300, 250
  //배경
  fill(0);
  text("←", -100, -100);
  text("→", 100, -100);


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
  for(let i =0; i < 3; i++) {
    fill(0);
    text(transmission[i],150, -150 + i*100);
    rect(50, -150 + i*100, 80, 10); 
  }
  
  rect(50, 150, 80, 10);
  if(gearState == "D") {
    fill(0);
  }
  else {
   fill(colors[colorIndex]); //기어 깜빡이
  }
  text(transmission[3], 150, 150);

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
  
  push();  //손잡이
  fill(50);
  rotate(radians(SR));
  rect(sX, -50, 50, 30, 5);
  fill(100);
  rect(-170, -50, 150, 50, 5);
  rect(-100, -50, 11, 50);
  fill(150);
  quad(-70,50, 80,50, -95,-75, -95,-25);

  if(sideB == false && SR == 0) {
    sideState = "open";
    fill(0);
  } else {
    sideState = "lock";
    fill(colors[colorIndex]);
  }
  
  if (sideB === false) {  // 사이드브레이크 OFF
    sX = -250;
    text("b", -290, -50);
  } else {  // 사이드브레이크 ON
    sX = -230;
    if (SR > 0) {
      text("↓", -280, -30);
      fill(0);
      text("↑", -280, -70);
    }
    if (keyIsPressed) {
      if (keyCode === UP_ARROW && SR < 15) {
        SR += 0.5;
      } else if (keyCode === DOWN_ARROW && SR > 0) {
        SR -= 0.5;
        if(SR < 0) {
          SR = 0;
        }
      } else if (SR == 0) {
        sideB = false;
      }
    }
  }
  pop();
  // console.log(sideState);
  // console.log(SR);
  // console.log("sideB 상태:", sideB);
  
  fill(100);  //몸통
  rect(-50,70,300,100,30);
  pop();
}

// 시동
function turnOn() {
  push();
  textSize(30);
  fill(255,0,0);
  noStroke();
  if (gearState == "D" && sideState == "open" && start == 1) {
    engine = "ON";
  } else if (start == 1) {
    engine = "ready";
  } else {
    engine = "OFF";
  }
  
  if(engine == "OFF") {
    text("s + t로 시동을 켜세요.", baseW/4, 50);
  } else if(engine == "ready") {
    text("기어와 사이드 브레이크를 조정하세요.", baseW/4, 50);
  } else {
    text("시동이 켜졌습니다.", baseW/4, 50);
    text("다음 장면으로 넘어가세요", baseW/4, 100);
  }
  pop();
}

// 전체화면 전환
function keyPressed() {
  let fs = fullscreen();
  if (key == "f") {
    fullscreen(!fs);
  }

  // 사이드 브레이크 제어
  if (key === 'b') {
    sideB = !sideB;
    if (sideB && SR == 0) {
      SR = 0.1;
    }
  }
  //시동
  if ( key === 't') {
    if (breakState == true) {
    start *= -1;
    }
  }
  // 장면전환
  if(key == '.' ||  key == '>'){
    if(Ant == 1 && engine == "ON"){
      Ant += 1;
    }
    else if(Ant == 2 && speed >= 30){
      Ant += 1;
    }
    else if(Ant != 1 && Ant != 2) {
      Ant += 1;
    }
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
  
  else if(Ant == 2 && key == 'w'){
    speed += 3;
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

function smoke() {
  
  push();
  noStroke();
  fill(125,125,125,150);

  for(let i = 0;i<1000;i++){
    ellipse(sx,sy+100*i,nums[i],150);
  }  
  pop();
  
}
function makeR() {
  for(let i = 0;i<1000;i++) {
      nums[i] = int(random(150,250));    
  }
}

function makeR2() {
  for(let i = 0;i<1000;i++) {
    numO[i] = int(random(50,150));
  }
}


function smokeO() {
  push();
  noStroke();
  fill(125,125,125,150);
  
  for(let i = 0; i< 1000; i++) {
    ellipse(ox+80,oy+35*i-60,numO[i],50);
    if(oy+35*i>windowHeight/2-100) {
      fill(256);
  }
  }
  pop();
  
  
}