class Enemy_Bullet{
    constructor(x,y){
        this.x = x;
        this.y = y
        this.r = 5
       
    }

    show(){
        push()
        fill("red")
        circle(this.x,this.y,this.r)
        pop()
    }

    move(){
        this.y += 6
    }

    hits(other){
        let bul_dist = dist(this.x,this.y,other.x,other.y)

        if(bul_dist < this.r + other.size - 20){
            return true
        } else {
            return false
        }
    }
}