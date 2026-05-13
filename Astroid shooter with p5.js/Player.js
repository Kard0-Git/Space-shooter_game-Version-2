class Player{
    constructor(){
        this.x = width/2
        this.y = 300
        this.size = 30
        this.healthX = 100
        this.healthY = 14
        this.col = 'rgb(7, 141, 7)'
        this.speed = 7
    }
 
    show(){
        fill("lightblue")
        stroke("grey")
        rect(this.x,this.y,this.size)
    }

    show_health(){
        fill(this.col)
        rect(280,30,this.healthX,this.healthY)
    }

    health_text(){
        fill("white")
        text(`health: ${this.healthX}`,280,20)
    }

    move_left(){
        this.x -= this.speed
    }

    move_right(){
        this.x += this.speed

    }
//Checking for collisions between the player and the astroid
      player_collision(rock){
        let player_pos = dist(this.x,this.y,rock.x,rock.y)
        //Checking for the middlepoint of the width and height of both objects
        if(player_pos < this.size + rock.s){
            return true
        } else{
            return false
        }
    }

   
}