class Tank {
    constructor() {
        this.x = Math.floor(Math.random() * canvas.width)
        this.y = Math.floor(Math.random() * (canvas.height - 80))
        this.speed = 5//速度
        this.direction = 'U'//方向
        this.hp = 100
        this.totalHp = 100
        this.score = 0
        this.totalScore = 100
        this.headerImg = resObj.head[0]
        this.up = resObj.play1[3]//上移
        this.right = resObj.play1[2]//下移
        this.left = resObj.play1[1]//左移
        this.down = resObj.play1[0]//右移
        // 大小
        this.width=resObj.play1[3].width
        this.height=resObj.play1[3].height
        this.bullet=[]//子弹    
        this.currentImg = this.up
        this.attackMusic = new Audio()
        this.attackMusic.src = './music/firepreview.mp3'
        // 击中敌人爆炸音效
        this.blastMusic = new Audio()
        this.blastMusic.src = './music/blast.wav'


    }
    //绘制坦克
    draw(ctx) {
        ctx.drawImage(this.currentImg, this.x, this.y, this.width, this.height)
        this.move()
        this.drawHead()
    }
    //角色信息
    drawHead() {
        ctx.drawImage(this.headerImg, 0, 0, 80, 80)
        ctx.strokeStyle = 'black'
        // 血条相关
        ctx.strokeRect(90, 10, 200, 20) //血条位置和大小
        const gradientHp = ctx.createLinearGradient(0, 0, 200, 20)//创建线性渐变对象
        gradientHp.addColorStop(0, "red")//开始渐变色
        gradientHp.addColorStop(1, "tomato")//结束渐变色
        ctx.fillStyle = gradientHp//填充渐变
        ctx.fillRect(90, 10, this.hp / this.totalHp * 200, 20)//填充的位置和大小

        ctx.font = "30px 楷体"
        ctx.fillText(`得分：${this.score}`, 90, 60)

    }
    move() {
        switch (this.direction) {
            case 'U':
                this.y -= this.speed
                if (this.y < gameTop) { this.y = 80 }
                this.currentImg = this.up
                break;
            case 'R':
                this.x += this.speed
                if (this.x > gameRight) { this.x = gameRight }
                this.currentImg = this.right
                break;
            case 'D':
                this.y += this.speed
                if (this.y > gamebottom) { this.y = gamebottom }
                this.currentImg = this.down
                break;
            case 'L':
                this.x -= this.speed
                if (this.x < 0) { this.x = 0 }
                this.currentImg = this.left
                break;
        }
        enemyAttackBlast.forEach((item,index)=>{
            if ((item.x >= this.x && item.x <= this.x + this.width) &&
            item.y >= this.y && item.y <= this.y + this.height) {
                    this.hp--
                }
        })   
    }
    attack() {
        this.attackMusic.play()
        let bullet=new Bullet()
        bullet.direction = this.direction
        if (this.direction === 'U') {
           bullet.x = this.x + 5
            bullet.y = this.y - 20
        }
        if (this.direction === 'R') {
            bullet.y = this.y + 5
            bullet.x = this.x + 20
        }
        if (this.direction === 'D') {
           bullet.x = this.x + 5
           bullet.y = this.y + 20
        }
        if (this.direction === 'L') {
            bullet.y = this.y + 5
            bullet.x = this.x - 20
        }
        this.bullet.push(bullet)
        for(let i=0;i<this.bullet.length;i++){
            let current=this.bullet[i]
            if(current.y<gameTop||current.y>gamebottom||current.x<0||current.x>gameRight){
                this.bullet.splice(i,1)
            }
        }
        let timer = setInterval(() => {
            if(bullet!=null){
                bullet.draw(timer)
            }
            //判断是否有被击中的敌人
            enemyArr.forEach((item, index) => {
                    if (bullet && (bullet.x >= item.x && bullet.x <= item.x + item.width) &&
                    (bullet.y >= item.y && bullet.y <= item.y + item.height)) {
                        //爆炸动画
                        item.destroy(index)
                        //爆炸音效
                        this.blastMusic.play()
                        //删除子弹
                        this.bullet.splice(this.bullet.indexOf(bullet),1)
                        bullet=null
                        this.score++
                    }
                })
        }, 20)
    }
}