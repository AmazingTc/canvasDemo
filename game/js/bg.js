class Bg{
    constructor(){
        this.x=0
        this.y=0
        this.img=resObj.bg[0]
        this.width=this.img.width
        this.height=this.img.height
    }
    //绘制背景
    draw(ctx){
        //显示背景
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }

}