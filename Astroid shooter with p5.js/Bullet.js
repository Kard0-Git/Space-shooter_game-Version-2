class Bullet{
    constructor(x,y){
        this.x = x;
        this.y = y
        this.r = 5
       
    }

    show(){
        fill("white")
        circle(this.x,this.y,this.r)
    }

    move(){
        this.y -= 6
    }

   
}