class Enemy{
    constructor(){
        this.imgs=resObj.enemy//图片
        this.imgIndex=0//图片索引
        this.width=this.imgs[0].width//绘图宽度
        this.height=this.imgs[0].height//绘图高度
        //绘图位置
        this.x=document.documentElement.clientWidth
        this.y=Math.floor((Math.random()*(540-280+1)+280))
        //血量
        this.hp=100
        this.totalHp=100
        //速度
        this.speed=Math.random()*3+2
    }
    //绘制敌人
    draw(ctx){
        this.move()
        //绘制血量信息
        ctx.fillStyle='black'
        ctx.textAlign="center"
        ctx.font="14px 微软雅黑"
        ctx.fillText(`${this.hp}/${this.totalHp}`,this.x+this.width/2+5,this.y-15)
        //绘制血条
        ctx.strokeStyle = 'black'
        ctx.fillStyle='red'
        ctx.strokeRect(this.x+5, this.y-10, this.width, 5) //血条位置和大小
        ctx.fillRect(this.x+5, this.y-10, this.hp / this.totalHp * this.width, 5)//填充的位置和大小
        // 绘制人物
        ctx.drawImage(this.imgs[this.imgIndex++],this.x,this.y,this.width,this.height)
        if(this.imgIndex>=this.imgs.length){
            this.imgIndex=0
        }
    }
    //敌人移动
    move(){
        this.x-=this.speed
        //出界或死亡后删除敌人
        if(this.x+this.width<=0||this.hp<=0){
           enemyArrList.splice(enemyArrList.indexOf(this),1)
        }
        if(this.hp<=0){
            score.upup()
        }
        
    }
}