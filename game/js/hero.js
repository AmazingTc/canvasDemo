class Hero {
    constructor() {
        this.x = 100
        this.y = 400
        this.speed = 10//速度
        this.headImg = resObj.heroHead[0]//头像
        this.hp = 100//当前血条
        this.totalHp = 100//总血条
        this.mp = 0//大招
        this.totalMp = 100
        this.direction = 'right'//方向
        // 左右移动的图片
        this.leftImgs = resObj.heroLeft
        this.rightImgs = resObj.heroRight
        // 左右攻击图片
        this.attackLeftImgs =  resObj.attackLeft 
        this.arrackRightImgs =resObj.attackRight
        this.attackImgIndex=0
        // 图片大小
        this.width = this.rightImgs[0].width
        this.height = this.rightImgs[0].height
        this.imgIndex = 0//显示图片索引，默认第一张
        this.isAttack = false//攻击状态
        this.currentImgs = this.rightImgs//当前应用图片
        //大招图片，状态
        this.boomImgs = resObj.boom
        this.isBoom = false
        this.boomImgsIndex = 0
        const audio = new Audio()
        // 攻击音效
        audio.src = './music/attack.wav'
        this.attackMusic = audio
        // 大招音效
        this.boomMusic = new Audio()
        this.boomMusic.src = './music/attack3.mp3'
    }
    //绘制英雄
    draw(ctx) {
        // 判断是否为攻击状态
        if (this.isAttack) {
            if (this.direction === 'left') {
                this.currentImgs = this.attackLeftImgs
            } else if (this.direction == 'right') {
                this.currentImgs = this.arrackRightImgs
            }
            ctx.drawImage(this.currentImgs[this.attackImgIndex++], this.x, this.y, this.width, this.height)
            if(this.attackImgIndex>=this.arrackRightImgs.length){
                this.attackImgIndex=0
                this.isAttack=false
            }
        } else if (this.isBoom) {
            this.currentImgs=this.boomImgs
            ctx.drawImage(this.currentImgs[this.boomImgsIndex++],this.x-60,this.y-60)
            if(this.boomImgsIndex>=this.boomImgs.length){
                this.boomImgsIndex=0
                this.isBoom=false
            }
        } else {
            if (this.direction === 'left') {
                this.currentImgs = this.leftImgs
            } else if (this.direction == 'right') {
                this.currentImgs = this.rightImgs
            }
            ctx.drawImage(this.currentImgs[this.imgIndex], this.x, this.y, this.width, this.height)
        }
        this.drawHead(canvas)
    }
    // 绘制英雄信息
    drawHead(ctx) {
        ctx.drawImage(this.headImg, 10, 70, 70, 70)
        ctx.strokeStyle = 'black'
        // 血条相关
        ctx.strokeRect(80, 80, 200, 20) //血条位置和大小
        const gradientHp = ctx.createLinearGradient(0, 0, 200, 20)//创建线性渐变对象
        gradientHp.addColorStop(0, "tomato")//开始渐变色
        gradientHp.addColorStop(1, "red")//结束渐变色
        ctx.fillStyle = gradientHp//填充渐变
        ctx.fillRect(80, 80, this.hp / this.totalHp * 200, 20)//填充的位置和大小
        // 蓝条相关
        ctx.strokeRect(80, 110, 200, 20) //蓝条位置和大小
        const gradientHp1 = ctx.createLinearGradient(0, 0, 200, 20)//创建线性渐变对象
        gradientHp1.addColorStop(0, "skyblue")
        gradientHp1.addColorStop(1, "blue")
        ctx.fillStyle = gradientHp1
        ctx.fillRect(80, 110, this.mp / this.totalMp * 200, 20)
    }
    //移动
    move(direction){
       if(direction=='ArrowRight'){
        this.direction='right'
        this.x+=this.speed
       } 
       if(direction=='ArrowLeft'){
        this.direction='left'
        this.x-=this.speed
       } 
       if(direction=='ArrowUp'){
        this.y-=this.speed
       } 
       if(direction=='ArrowDown'){
        this.y+=this.speed
       }
       if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(direction)){
        //改变图片索引
        this.imgIndex+=1
        //防止越界
        if(this.imgIndex>=this.leftImgs.length){
            this.imgIndex=0
        }
       }
       //防止英雄出界
       if(this.y>540){
        this.y=540
       }else if(this.y<280){
        this.y=280
       } 
       if(this.x<-30){
        this.x=-30
       }else if(this.x>1320){
        this.x=1320
       }
    }
    // 攻击
    attack(){
        this.isAttack=true
        this.playAttackMusic()//播放音效
    }
    //大招
    boom(){
        if(this.mp>=this.totalMp){
            this.isBoom=true
            this.playBoomMusic()//播放音效

        }else{
            return
        }
    }
    //攻击音效
    playAttackMusic(){
        this.attackMusic.play()
    }
    //大招音效
    playBoomMusic(){
        this.boomMusic.play()
    }
}