class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,350);
    car1.addAnimation("car1",car1_img);
    car1.scale = 4;

    car2 = createSprite(100,450);
    //car2.addAnimation("car2",car2_img);
    //car2.scale = 4;

    car3 = createSprite(100,550);
    //car3.addAnimation("car3",car3_img);
    //car3.scale = 4;

    car4 = createSprite(100,650);
    //car4.addAnimation("car4",car4_img);
    //car4.scale = 4;

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(255);
      ///
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var y = 175 ;
      var x;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 200;
        //use data form the database to display the cars in y direction
        x = displayWidth - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)


       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x;
          camera.position.y = windowHeight/2;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);


    }
   
    drawSprites();
  }

  end(){
    console.log(player.rank);
    console.log("Game Ended");
  }
}
