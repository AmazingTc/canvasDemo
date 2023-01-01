class Enemy{
    constructor(){
        //速度
        this.speed=3
        //是否存活
        this.isAlive=true
        // 位置
        this.x= Math.round(Math.random() * gameRight);
        this.y= Math.round(Math.random() * (gamebottom - gameTop)) + gameTop;
        // 大小
        this.width=resObj.enemy[0].width
        this.height=resObj.enemy[0].height
        //图片
        this.down=resObj.enemy[0]
        this.left=resObj.enemy[1]
        this.right=resObj.enemy[2]
        this.up=resObj.enemy[3]
        // 方向
        this.direction=''
        this.currentImg=resObj.enemy[0]
        this.turnDirection()//随机方向
        //爆炸
        this.blast=resObj.blast
        this.blastIndex=0
        this.bullet=null
        //随机转向
        setInterval(()=>{
           this.turnDirection()
        },this.getRandom(1,8)*1000)
        // 随机攻击
        setInterval(()=>{
           if(this.isAlive===true){
             this.attack()
           }
        },this.getRandom(2,5)*1000)
    }
    // 绘制
    draw(){
        ctx.drawImage(this.currentImg,this.x,this.y,this.width,this.height)
        this.move()
    }
    // 移动，且到边界随机转向
    move(){
        switch(this.direction){
            case 'U':
                this.y-=this.speed
                this.currentImg=this.up
                if(this.y<80){
                    this.y=80
                    this.turnDirection()
                }
                break
            case 'D':
                this.y+=this.speed
                this.currentImg=this.down
                if(this.y>gamebottom){
                    this.y=gamebottom
                    this.turnDirection()
                }
                break
            case 'L':
                this.x-=this.speed
                this.currentImg=this.left
                if(this.x<0){
                    this.x=0
                    this.turnDirection()
                }
                break   
            case 'R':
                this.x+=this.speed
                this.currentImg=this.right
                if(this.x>gameRight){
                    this.x=gameRight
                    this.turnDirection()
                }
                break
        }
        if(this.isAlive===false){
            this.speed=0
        }
    }
    // 转向
    turnDirection(){
        //去1到4随机数，方便给坦克随机方向
        const random=this.getRandom(1,4)
        switch(random){
            case 1:
                this.direction='U'
                this.currentImg=resObj.enemy[3]
                break
            case 2:
                this.direction='D'
                this.currentImg=resObj.enemy[0]
                break
            case 3:
                this.direction='L' 
                this.currentImg=resObj.enemy[1]
                break   
            case 4:
                this.direction='R'
                this.currentImg=resObj.enemy[2]
                break
        }
    }
    //攻击
    attack(){
        let bullet=new Bullet()
        this.bullet=bullet
        enemyAttackBlast.push(bullet)
        bullet.direction=this.direction//设置子弹方向
        // 设置子弹位置
        if(this.direction==='U'){
            bullet.x=this.x+5
            bullet.y=this.y-20
        }
        if(this.direction==='R'){
            bullet.y=this.y+5
            bullet.x=this.x+20
        }
        if(this.direction==='D'){
            bullet.x=this.x+5
            bullet.y=this.y+20
        }
        if(this.direction==='L'){
            bullet.y=this.y+5
            bullet.x=this.x-20
        }
        enemyAttackBlast.push()
        //开启定时器，发射子弹
        let timer=setInterval(()=>{
            if(this.isAlive===true){
                bullet.drawEnemy(timer)
            }
        },20)
    }
    destroy(index) {
        this.isAlive=false
        this.speed=0
        let timers=setInterval(()=>{
            if(this.blastIndex===7){
                clearInterval(timers)
                enemyArr.splice(index,1)
                this.blastIndex=0
            }
            this.currentImg=this.blast[this.blastIndex]
            this.blastIndex++
        },20)
    }
    //获取范围内随机数
    getRandom(min,max){
        const random=Math.round(Math.random()*(max-min)+min)
        return random
    }
    
}