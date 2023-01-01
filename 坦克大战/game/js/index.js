const totalCount=Object.values(resList).flat().length//需加载的图片总个数
const progress=document.querySelector('.progress')//进度条
const progressBox=document.querySelector('.progress-box')//进度条盒子
const box=document.querySelector('.box')//主体盒子
const btnStart=document.querySelector('.btnStart')//开始按钮
const textBox=document.querySelector('.textBox')//文字
const bgm=document.querySelector('#bgm')//背景音乐
const element=document.querySelector('#game')//vanvas元素
const startBox=document.querySelector('.startBox')
const canvas=element.getContext('2d')//2d渲染上下文
let enemyArrList=[] //敌人
let hero=null//英雄
let bg=null//背景
const score=new Score()
let loadCount=0//已经加载的资源个数

/*扁平数组
    方法一：
        Array.flat()   Array.flat(deep) deep为深度 也可用Infinity无限扁平
    方法二:
        const arr=[]
        Object.values(resList).forEach(item=>{
            item.forEach(i=>{
            arr.push(i)
            })
        })
     方法三：
        console.log([].concat(...Object.values(resList)));
*/ 

for(let k in resList){
    if(Array.isArray(resList[k])){
        resList[k].forEach(item => {
             const img=new Image()//创建图片对象
             img.src=item 
             resObj[k].push(img)//保存资源
             img.onload=()=>{
                loadCount++
                progress.style.backgroundSize=`${loadCount/totalCount*100}% 100%`
                if(loadCount===totalCount){
                    progress.style.transition='all 1s'
                    initGame()
                }    
            } 
        });
    }
}
//游戏初始化
function initGame(){
    // 绘制背景
    bg=new Bg()
    //注意此处不要使用 style.width
    //游戏界面的宽度
    element.width=document.documentElement.clientWidth
    element.height=document.documentElement.clientHeight
    progressBox.remove()//移除进度条
    bg.draw(canvas)
    //显示主体
    box.style.transform='translateY(0)'
    box.style.opacity='1'
    box.style.transition='all 1s' 

    //点击开始
    btnStart.addEventListener('click',()=>{
        btnStart.remove()
        textBox.style.opacity=1
        bgm.play()
        textBox.addEventListener('animationend',()=>{
            startBox.remove()
            starGame()//开始游戏
        })
        textBox.style.animationPlayState="running"
    })
}
//开始游戏
function starGame(){
    hero=new Hero()
    // 绘制初始英雄
    hero.drawHead(canvas)
    hero.draw(canvas)
    
    //监听键盘事件
    addKeyDownListener(hero)
    //重绘
    setInterval(()=>{
        bg.draw(canvas)//绘制背景
        hero.draw(canvas)//绘制英雄
        score.draw(canvas)//分数
        if(enemyArrList.length<8){//敌人数量不够时创建新的敌人，始终保持有8个
            for(let i=0;i<8-enemyArrList.length;i++){
                enemyArrList.push(new Enemy())
            }
        }
        for(let i=0;i<enemyArrList.length;i++){
            //绘制敌人
            enemyArrList[i].draw(canvas)
        }
    },40)
}
//按键按下
function addKeyDownListener(hero){
    document.addEventListener('keydown',(e)=>{
        if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){
            hero.move(e.key)
        }else if(e.key=='e'){
            //攻击
            hero.attack()
            crash(0)
        } else if(e.key=='q'){
            //大招
            hero.boom()
            crash(1)
        }
    })
}
//判断是否攻击到敌人
function crash(arg){
    const heroX=hero.x
    const heroY=hero.y
    enemyArrList.forEach(item=>{
        // 攻击到
        if(!(item.x+item.width<heroX || heroX+hero.width<item.x || item.y+item.height<heroY || heroY+hero.height<item.y)){
          if(arg===0){
            item.hp-=20//敌人血量减少
            hero.mp = hero.mp===100?100:hero.mp+5//英雄蓝量增加
          }else if(arg===1&&hero.mp===100){
            item.hp-=100//敌人血量减少
            score.upup()
          }
        }
    })
    if(arg===1){hero.mp=0}
}








