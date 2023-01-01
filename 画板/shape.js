class Shape{
    constructor(){
        this.x=0
        this.y=0
        this.radius=0//半径
    }
    //绘制圆形
    draw(){
        ctx.save()
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fillStyle=painColor
        ctx.fill()
        ctx.stroke();
        ctx.restore()   
    }
    
}