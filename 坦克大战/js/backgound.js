class Background{
    constructor(w,h){
        this.color='#E0FFFF'
        this.width=w
        this.height=h
    }
    draw(ctx){
        ctx.fillStyle=this.color
        ctx.fillRect(0,0,this.width,this.height);
        ctx.fillStyle='skyblue'
        ctx.fillRect(0,80,this.width,this.height);
    }
}