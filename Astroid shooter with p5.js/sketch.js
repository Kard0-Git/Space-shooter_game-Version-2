let spaceship;
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

function setup() {
  createCanvas(400, 400);
  spaceship = new Spaceship()
  

 
    }

function keyPressed(){
  // function to shoot the bullets, changing the origin to the spaceships x position
  if( key === ' '){
    bullet = new Bullet(spaceship.x,250,25)
    bullet_list.push(bullet)
  }
}

function draw() {

  if(gameover == false){
     background(220);
    spaceship.show()
    spaceship.show_health()
    spaceship.health_text()
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
      if(enemy_bullet_list[i].hits(spaceship)){
        
        spaceship.healthX -= 5

        if(spaceship.healthX <= 75){
          spaceship.col = 'rgb(14, 194, 14)'
        }

        if(spaceship.healthX <= 50){
          spaceship.col = 'rgb(204, 223, 36)'
        }

        if(spaceship.healthX <= 30){
          spaceship.col = 'rgb(202, 173, 9)'
        }

        if(spaceship.healthX <= 15){
          spaceship.col = 'rgb(209, 45, 4)'
        }

        if (spaceship.healthX <= 0){
          spaceship.healthX = 0;
          gameover = true
          text(`Game Over:`,width/2 - 40,height/2)
          text(`Astroids destoyed: ${current_score/score_incriment}`,width/2-75,height - 150)
          //text(`high score ${current_high_score}`,width/2-80, height - 300)

        }

      }
      
  }

    }

function player_controls(){
   if(keyIsDown(65) === true){
    spaceship.move_left()
  }
  if(keyIsDown(68) === true){
    spaceship.move_right()
  }
}

function GameOver(){
   for(let i = 0; i<enemy_ship_list.length; i++){
      if(enemy_ship_list[i].y >= width - 40){
        gameover = true
        text(`Game Over:`,width/2 - 40,height/2)
        text(`Astroids destoyed: ${current_score/score_incriment}`,width/2-75,height - 150)
        //text(`high score ${current_high_score}`,width/2-80, height - 300)
    }
  }
}




