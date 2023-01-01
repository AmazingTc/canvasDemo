const canvas = document.querySelector('#canvas')
canvas.width = document.documentElement.clientWidth
const canvasWidth=canvas.width
const canvasHeight=canvas.height
const ctx = canvas.getContext('2d')
const startBox=document.querySelector('.startBox')
const startDouble=document.querySelector('#startDouble')
const startOne=document.querySelector('#start')
const gameTop=80//游戏区上边界
const gameRight=1480///游戏区又边界
const gamebottom=603//游戏区下边界
let bg=null
let tank=null
let enemyArr=[]//敌人
let enemyAttackBlast=[]
const resList = {
    blast: [
        "./img/blast1.gif",
        "./img/blast2.gif",
        "./img/blast3.gif",
        "./img/blast4.gif",
        "./img/blast5.gif",
        "./img/blast6.gif",
        "./img/blast7.gif",
        "./img/blast8.gif",
    ],
    born: [
        "./img/born1.gif",
        "./img/born2.gif",
        "./img/born3.gif",
        "./img/born4.gif",
    ],
    enemy: [
        "./img/enemy1D.gif",
        "./img/enemy1L.gif",
        "./img/enemy1R.gif",
        "./img/enemy1U.gif",
        "./img/enemy2D.gif",
        "./img/enemy2L.gif",
        "./img/enemy2R.gif",
        "./img/enemy2U.gif",
        "./img/enemy3D.gif",
        "./img/enemy3L.gif",
        "./img/enemy3R.gif",
        "./img/enemy3U.gif",
    ],
    play1: [
        "./img/p1tankD.gif",
        "./img/p1tankL.gif",
        "./img/p1tankR.gif",
        "./img/p1tankU.gif",
    ],
    play2: [
        "./img/p2tankD.gif",
        "./img/p2tankL.gif",
        "./img/p2tankR.gif",
        "./img/p2tankU.gif",
    ],
    head:[
        "./img/head1.jpg",
        "./img/head2.jpg",
    ],
    bullet:[
        "./img/bullet_up.png",
        "./img/bullet_down.png",
        "./img/bullet_left.png",
        "./img/bullet_right.png",
    ]

}//资源文件
const totalCount=Object.values(resList).flat().length //资源数量
const resObj = {blast: [],born: [],play1: [],play2:[],enemy:[],head:[],bullet:[]}
let loadCount = 0//已加载资源数量
let playerCount=1
for(let k in resList){
    if(Array.isArray(resList[k])){
        resList[k].forEach(item => {
             const img=new Image()
             img.src=item 
             resObj[k].push(img)//保存对应资源
             img.onload=()=>{
                loadCount++
                if(loadCount===totalCount){
                    startOne.addEventListener('click',()=>{
                        startBox.style.display='none'
                        startGame()
                        eventBind()
                    })
                }    
            } 
        });
    }
}
function startGame() {
    //游戏背景
    bg = new Background(canvasWidth,canvasHeight)
    //创建玩家1
    tank=new Tank()
    tank.speed=0
    //创建玩家2
    setInterval(()=>{
         bg.draw(ctx)
         tank.draw(ctx)
         if(enemyArr.length<8){
            for(let i=0;i<8-enemyArr.length;i++){
                enemyArr.push(new Enemy())
            }
         }
         enemyArr.forEach(item=>{
            item.draw()
         })
    },30)
    

    
}
function eventBind(){
    window.addEventListener('keydown',function(e){
            if(["w","a","s","d"].includes(e.key)){
                if(e.key==="d"){
                    tank.direction="R"
                }
                if(e.key==="w"){
                    tank.direction="U"
                }
                if(e.key==="a"){
                    tank.direction="L"
                }
                if(e.key==="s"){
                    tank.direction="D"
                }
                if(tank.speed===0) tank.speed=5
            }else if(e.key==='e'){
                tank.attack()
            }
            
    })
}

