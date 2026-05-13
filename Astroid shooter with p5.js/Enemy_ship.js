class Enemy_ship{
    constructor(){
        this.x = random(width-60)
        this.y =   -10
        this.s = random(20,60)
        this.speed = 4
        
    }

    show(){
        fill("red")
        stroke("lightgrey")
        rect(this.x,this.y,this.s)
    }

    move(){
        this.y += this.speed
    }

     bullet_collision(other){
        let difference = dist(this.x,this.y,other.x,other.y)
        if(difference < this.s + other.r){
            return true
        } else {
            return false
        }
   
    }

    

  

    
}