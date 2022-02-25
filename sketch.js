var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var backgr;
var player;
var restart
function preload(){
  banana1 = loadImage("banana.png");
  backImage = loadImage("jungle.jpg");
  stone1 = loadImage("stone.png");
  monkey_running =   loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
obstacle1IMG = loadImage("banana.png");
monkeyend = loadAnimation("Monkey_03.png");
restartImg = loadImage("restart.png");
}


function setup() {
  createCanvas(600,400);
  backgr = createSprite(0,0,800,400);
  backgr.addImage(backImage);


player = createSprite(50,250,20,50);
player.addAnimation("Running",monkey_running);
player.addAnimation("collided",monkeyend);
player.scale = 0.18;

invisibleGround = createSprite(235,305,460,5);
invisibleGround.visible = false;

restart = createSprite(250,180);
restart.addImage(restartImg);

restart.scale = 0.05;
restart.visible = false;

obstacleGroup = new Group();
}

function draw() {
  background(255,255,255);  
  player.collide(invisibleGround);

  player.velocityY = player.velocityY + 0.8

  

if (gameState === PLAY){
  spawnObstacles();
  spawnStone();

  score = score + Math.round(getFrameRate()/60);

 

  if(keyDown(UP_ARROW) && player.y >= 170){
    player.velocityY = -8;  
  }

  player.velocityY = player.velocityY + 0.8

  if(obstacleGroup.isTouching(player)){
    gameState = END;
}
}

else if(gameState === END){

  restart.visible = true;
  player.velocityY = 0;
  player.changeAnimation("collided",monkeyend);
  obstacleGroup.setVelocityXEach(0);

  if(mousePressedOver(restart)) {
    reset();
  }
}

  

  
  drawSprites();
  text("Score: "+ score,200,50);
} 
function spawnObstacles(){
  if(frameCount % 100 === 0) {
    var obstacle1 = createSprite(480,160,10,40);
    obstacle1.y = Math.round(random(190,250));
    //obstacle.debug = true;
    obstacle1.velocityX = -3;
    obstacleGroup.add(obstacle1);
    obstacle1.addImage(obstacle1IMG);
    obstacle1.scale = 0.05;
  }
}

function spawnStone(){
  if(frameCount %  90 === 0){
  var obstacle2 = createSprite(480,270,10,10);
  obstacle2.velocityX = -3;
  obstacleGroup.add(obstacle2);
  obstacle2.addImage(stone1);
  obstacle2.scale = 0.25;
}
}

function reset(){
  gameState === PLAY;

 // obstacleGroup = destroyEach();
  player.changeAnimation("Running",monkey_running);
  restart.visible = false;
  score = 0;
}