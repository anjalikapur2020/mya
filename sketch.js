var player
var splashScreen, playButton, aboutButton
var level1img
var enemyGroup,enemy,alien1,alien2,alien3,playerimg,dust,dustGroup
var playerhealth =300
var playermaxHealth=300
var alienhealth =300
var alienmaxHealth=300


function preload() {
   splashScreen = loadImage("assets/splash.gif")
   gameState = "wait"
   level1img = loadImage("assets/level1bg.jpg")
   alien1=loadImage("assets/alien3.png")
   alien2=loadImage("assets/alien1flip.png")
   alien3=loadImage("assets/alien1.png")
playerimg=loadImage("assets/player.png")

}

function setup() {
   // createCanvas(400, 400)

   createCanvas(windowWidth, windowHeight)

   player = createSprite(100, height - 100)
   player.addImage(playerimg)
   player.visible = false


   // playButton=createImg("")
   // playButton.position(x,y)
   // playButton.size(width,height)

   // playButton=createButton("PLAY")
   // playButton.position(100,height-height/4)
   // playButton.size(100,100)

   playButton = createImg("assets/play.png")
   playButton.position(100, height - height / 4)
   playButton.size(150, 150)



   aboutButton = createImg("assets/about.png")
   aboutButton.position(250, height - height / 4)
   aboutButton.size(150, 150)

   playButton.hide()
   aboutButton.hide()
 enemyGroup=new Group()
 dustGroup=new Group()



// player.debug=true
 player.setCollider("rectangle", 0, 0, player.width / 2, player.height / 2+55)


 invisibleGround = createSprite(width / 2, height- 80, width, 20)
 invisibleGround.visible = false



}


function draw() {
   player.collide(invisibleGround)
   if (gameState == "wait") {
      background(splashScreen)
      playButton.show()
      aboutButton.show()
   }


   playButton.mousePressed(() => {
      gameState = "level1"
      playButton.hide()
      aboutButton.hide()
   })



   aboutButton.mousePressed(() => {
      aboutGame()
      playButton.hide()
      aboutButton.hide()
   })


   if (gameState == "level1") {
      background(level1img)
      spawnEnemies()
      playermovement()
      player.visible = true
      healthBar(50,50,playerhealth,playermaxHealth,"red")
      healthBar(width-350,50,alienhealth,alienmaxHealth,"#6cc417")


if(player.isTouching(enemyGroup)){
   playerhealth -=10
   enemyGroup.destroyEach()
}

if(player.isTouching(dustGroup)){
   alienhealth -=10
   enemyGroup.destroyEach()
   dustGroup.destroyEach()
}
   }


   drawSprites()


}

function healthBar(x,y,h,mx,clr){

   noFill()
   stroke("black")
   strokeWeight(2)
   rect(x,y,mx,20)
   fill(clr)
     rect(x,y,h,20)

}


function aboutGame() {
   swal({
      title: "Lets PLAY",
      text: "Save yourself from the enemies & reach your SPACESHIP",
      textAlign: "center",
      imageUrl: "assets/spaceship.png",
      imageSize: "200x200",
      confirmButtonText: "Lets Play",
      confirmButtonColor: "black"
   },
      function () {
         gameState = "wait"
      }
   )


}

function spawnEnemies(){
   if(frameCount%150==0){
   randy=Math.round(random(50,height-100))
   enemy=createSprite(width-100,height-200 )
   enemy.velocityX=-2
   // enemy.debug=true

randimage=Math.round(random(1,3))

switch(randimage){

case 1: enemy.addImage(alien1)
enemy.scale=0.5
break;

case 2: enemy.addImage(alien2)
enemy.scale=0.5

break;

case 3: enemy.addImage(alien3)
enemy.scale=2
enemy.y=height-180
enemy.setCollider("rectangle",0,0,enemy.width/2,enemy.height/2)
break;

default:break;
}
enemyGroup.add(enemy)
}
}



function playermovement() {

   if (keyDown("RIGHT_ARROW")) {
       player.x += 5
   }

   if (keyDown("LEFT_ARROW")) {
       player.x -= 5
   }
   if (keyDown("UP_ARROW")) {
      player.velocityY = -5
  }
  player.velocityY += 0.8


     if(keyDown("space")){
     shoot()
     }

   //   if(keyDown("UP_ARROW")){
   //     player.y -=5
   //   }

  

}

function shoot() {

  dust= createSprite(player.x,player.y)
//   dust.addImage()

dust.velocityX +=2
dustGroup.add(dust)


}