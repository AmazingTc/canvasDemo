class Score{
    constructor(){
        this.x=document.documentElement.clientWidth-100
        this.y=80
        this.scroe=0
    }
    draw(ctx){
        //绘制血量信息
        ctx.fillStyle='red'
        ctx.textAlign="center"
        ctx.font="20px 微软雅黑"
        ctx.fillText(`当前得分为：${this.scroe}`,this.x,this.y)
    }
    upup(){
        this.scroe++
    }
}