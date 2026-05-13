class Spaceship{
    constructor(){
        this.x = width/2
        this.y = 300
        this.size = 30
        this.healthX = 100
        this.healthY = 14
        this.col = 'rgb(7, 141, 7)'
    }
 
    show(){
        fill("black")
        stroke("grey")
        rect(this.x,this.y,this.size)
    }

    show_health(){
        fill(this.col)
        rect(280,30,this.healthX,this.healthY)
    }

    health_text(){
        fill("black")
        text(`health: ${this.healthX}`,280,20)
    }

    move_left(){
        this.x -= 5
    }

    move_right(){
        this.x += 5

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