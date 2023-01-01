const btnRed=document.querySelector('#btnRed')//红色画笔
const btnBlue=document.querySelector('#btnBlue')//蓝色画笔
const btnPink=document.querySelector('#btnPink')//粉色画笔
const btnBlod=document.querySelector('#btnBlod')//画笔加粗
const btnSink=document.querySelector('#btnSink')//画笔变细
const btnclean=document.querySelector('#btnclean')//清空画板
const btnXiangpi=document.querySelector('#btnXiangpi')//橡皮
const canvas=document.querySelector('#canvas')
const color=document.querySelector('#color')//色块
const shape=document.querySelector('#shape')//形状
const range=document.querySelector('#range')//滑块
const ctx=canvas.getContext('2d')
let pain=new Pain()
let shapes=new Shape()
eventBind()//绑定点击事件
canvas.addEventListener('mousedown',function(){
    //开始绘图
    canvas.addEventListener('mousemove',draw,false)
})
canvas.addEventListener('mouseup',()=>{
    //停止绘图
    canvas.removeEventListener("mousemove",this.draw,false)
    pain=new Pain()
})   
function draw(e){
    const x=e.offsetX
    const y=e.offsetY
    pain.move(x,y)
}

//n个事件绑定
function eventBind(){
    range.onchange=function(){
       painWidth=this.value
       pain=new Pain()
    }
    btnBlod.onclick=function(){
        if(painWidth>30){
            painWidth=30
        }else{
            painWidth++
        }
    }
    btnSink.onclick=function(){
        if(painWidth<2){
            painWidth=2
        }else{
            painWidth--
        }
    }
    btnRed.onclick=function(){
        painColor='red'
    }
    btnBlue.onclick=function(){
        painColor='blue'
    }
    btnPink.onclick=function(){
        painColor='pink'
    }
    btnclean.onclick=function(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        painColor='black'
    }
    btnXiangpi.onclick=function(){
        painColor='white'
    }
    //绘制圆形
    shape.onclick=function(){
        ctx.beginPath()
        // painColor='transparent'
        canvas.addEventListener('mousedown',shapeDown)
        function shapeDown(event){
            const start={startx:event.offsetX,starty:event.offsetY}
            canvas.addEventListener('mouseup',drawShap,false)
            function drawShap(e){
                canvas.removeEventListener('mousedown',shapeDown)
                canvas.removeEventListener('mouseup',drawShap)
                    e.stopPropagation()
                    console.log(111);
                    const end={endx:e.offsetX,endy:e.offsetY}
                    let a =start.startx-end.endx
                    let b=start.starty-end.endy
                    let x=(start.startx+end.endx)/2
                    let y=(start.starty+end.endy)/2
                    shapes.x=x
                    shapes.y=y
                    shapes.radius=Math.sqrt(a*a+b*b)
                    shapes.draw()
                    // canvas.removeEventListener('mouseup')
                    painColor='black'
                    shapes.radius=0
                    shapes=new Shape()
            }
        }
    }
    color.addEventListener('change',function(){
        painColor=this.value
    })
}