class Bullet {
    constructor() {
        // 子弹速度
        this.speed = 10
        // 子弹位置(敌人一次发射一个，玩家一次发射两个)
        this.x = 0
        this.y = 0
        this.x1=0
        this.y1=0
        this.direction = 'up'
        //子弹图片
        this.upAttack = resObj.bullet[0]//上攻击
        this.downAttack = resObj.bullet[1]//下攻击
        this.leftAttack = resObj.bullet[2]//左攻击
        this.rightAttack = resObj.bullet[3]//右攻击
        // 当前图片
        this.currentImg = null
        // 子弹大小
        this.width = this.upAttack.width
        this.height = this.upAttack.height
    }
    // 玩家发射子弹
    draw(timer) {
        switch (this.direction) {
            case 'U':
                this.currentImg = this.upAttack
                this.x1=this.x
                this.y1=this.y-50
                break;
            case 'D':
                this.currentImg = this.downAttack
                this.x1=this.x
                this.y1=this.y+50
                break
            case 'L':
                this.currentImg = this.leftAttack
                this.x1=this.x-50
                this.y1=this.y
                break;
            case 'R':
                this.currentImg = this.rightAttack
                this.x1=this.x+50
                this.y1=this.y
                break
        }
        ctx.drawImage(this.currentImg, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.currentImg, this.x1, this.y1, this.width, this.height)
        this.move(timer)//沿着方向移动
    }
    // 敌人发射子弹
    drawEnemy(timer){
        switch (this.direction) {
            case 'U':
                this.currentImg = this.upAttack
                break;
            case 'D':
                this.currentImg = this.downAttack
                break
            case 'L':
                this.currentImg = this.leftAttack
                break;
            case 'R':
                this.currentImg = this.rightAttack
                break
        }
        ctx.drawImage(this.currentImg, this.x, this.y, this.width, this.height)
        this.move(timer)//沿着方向移动
    }
    move(timer) {
        switch (this.direction) {
            case 'U':
                this.y -= this.speed
                // 如果y1不等于0，说明是玩家打出来的子弹，第二发子弹出界清除定时器
                if(this.y1!=0){
                    if(this.y1<gameTop) {clearInterval(timer)}
                }else {
                    //敌人打出来的子弹，子弹出界，一个子弹出界清除定时器
                    if(this.y<gameTop) {clearInterval(timer)}
                }
                break;
            case 'D':
                this.y += this.speed
                if(this.y1!=0){
                    if(this.y1>gamebottom) {clearInterval(timer)}
                }else{
                    if(this.y>gamebottom) {clearInterval(timer)}
                }
                break
            case 'L':
                this.x -= this.speed
                if(this.x1!=0){
                    if(this.x1<0) {clearInterval(timer)}
                }else {
                    if(this.x<0) {clearInterval(timer)}
                }
                break;
            case 'R':
                this.x += this.speed
               if(this.x1!=0){
                if(this.x1>gameRight) {clearInterval(timer)}
               }else{
                if(this.x>gameRight) {clearInterval(timer)}
               }
                break
        }
        // 越界删除
        if((this.x1===0&&this.y1===0)&&
            (this.x<0||this.x>gameRight||this.y<gameTop||this.y>gamebottom)){
                enemyAttackBlast.forEach((item,index)=>{
                    if(item===this){
                        enemyAttackBlast.splice(index,1)
                    }
                })

        }
    }

}