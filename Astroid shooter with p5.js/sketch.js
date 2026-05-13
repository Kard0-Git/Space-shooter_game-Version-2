let player;
let bullet;
let bullet_list = []
let enemy_ship
let enemy_ship_list = []
let current_score = 0
let high_score = 0
let restart_button
let gameover = false
let score_incriment = 20
let enemy_bullet
let enemy_bullet_list = []
let hs_storage
let get_hs
let hs_text
let cs_text

function setup() {
  createCanvas(400, 400);
  player = new Player()
  
 
    }

function keyPressed(){
  // function to shoot the bullets, changing the origin to the spaceships x position
  if( key === ' '){
    bullet = new Bullet(player.x,250,25)
    bullet_list.push(bullet)
  }
}

function draw() {

  if(gameover == false){
     background(0);
    player.show()
    player.show_health()
    player.health_text()
    frameRate(60)

  for(bullet of bullet_list){
   bullet.show()
   bullet.move()
   }

   for(enemy_bullet of enemy_bullet_list){
    enemy_bullet.show()
    enemy_bullet.move()
   }

   for(enemy_ship of enemy_ship_list){
    enemy_ship.show()
    enemy_ship.move()
   }

  }// this is where the gameover if ends

  
  spawn_enemies()
  spawn_enem_bullet()
  player_gets_hit()
  main_game_logic()
  player_controls()
  GameOver()

  
  text(`Score: ${current_score}`,0,70)
  text(`high score ${high_score}`,0,100)
  textSize(20)
  


} // draw loopb end



function main_game_logic(){
   for(let i = 0; i<enemy_ship_list.length; i++){
    for(let j = 0; j<bullet_list.length; j++){
      if(enemy_ship_list[i].bullet_collision(bullet_list[j])){
        enemy_ship_list.splice(i,1)
        current_score += score_incriment
        high_score += score_incriment
        //Saving high score to the broswer
        if(localStorage){
          localStorage.setItem("high_score", JSON.stringify(high_score))
        }
 
        bullet_list.splice(j,1)
        //removes the bullet apon collision so the bullet dosent just to straight through the ship
        break
      } 

    }
  }
  if(localStorage){
    const save_scores = localStorage.getItem("high_score")


    if(save_scores){
      high_score = JSON.parse(save_scores)
    
    }

    if(high_score){
      if(high_score > current_score){
        high_score += 0;
      }

      if(current_score > high_score){
        high_score = current_score
      }
    }

}

 if(localStorage){
       localStorage.setItem("high_score", JSON.stringify(high_score))
       
        }

}

function spawn_enemies(){
  if(frameCount % 80 == 0){
   enemy_ship = new Enemy_ship()
    enemy_ship_list.push(enemy_ship)
}
}
//to spawn bullets from enemys every 50 frames
function spawn_enem_bullet(){
  for(let i = 0; i<enemy_ship_list.length; i++){
    if(frameCount % 80 == 0){
    enemy_bullet = new Enemy_Bullet((enemy_ship_list[i].x + enemy_ship_list[i].s/2),enemy_ship_list[i].y)
    enemy_bullet_list.push(enemy_bullet)

    }
  }
}

//function to decriment player health when the enemy bullet hits the spaceship

function player_gets_hit(){
  for(let i = 0; i<enemy_bullet_list.length; i++){
      if(enemy_bullet_list[i].hits(player)){
        
        player.healthX -= 5

        if(player.healthX <= 75){
          player.col = 'rgb(14, 194, 14)'
        }

        if(player.healthX <= 50){
          player.col = 'rgb(204, 223, 36)'
        }

        if(player.healthX <= 30){
          player.col = 'rgb(202, 173, 9)'
        }

        if(player.healthX <= 15){
          player.col = 'rgb(209, 45, 4)'
        }

        if (player.healthX <= 0){
          player.healthX = 0;
          gameover = true

          text(`Game Over:`,width/2 - 40,height/2)
          text(`Astroids destoyed: ${current_score/score_incriment}`,width/2-75,height - 150)
          //text(`high score ${current_high_score}`,width/2-80, height - 300)

        }

        enemy_bullet_list.splice(i,1)
        break


      }
      
  }

    }

function player_controls(){
   if(keyIsDown(65) === true){
    player.move_left()
  }
  if(keyIsDown(68) === true){
    player.move_right()
  }
}

function GameOver(){
 
   for(let i = 0; i<enemy_ship_list.length; i++){
      if(enemy_ship_list[i].y >= width - 40){
        gameover = true
        fill("white")
        text(`Game Over:`,width/2 - 40,height/2)
        text(`Astroids destoyed: ${current_score/score_incriment}`,width/2-75,height - 150)
        //text(`high score ${current_high_score}`,width/2-80, height - 300)
    }
  }

}




