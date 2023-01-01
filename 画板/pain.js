let painColor = 'black'
let painWidth = 10
class Pain {
    constructor() {
        this.pathArr = []
        this.color = painColor
        this.width = painWidth
    }
    //画笔移动
    move(x, y) {
        this.x = x
        this.y = y
        this.pathArr.push({ x, y })
        this.render()
    }
    //渲染鼠标移动的路径
    render() {
        ctx.save()
        let arr = this.pathArr
        ctx.strokeStyle = painColor
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.lineWidth = this.width
        for (let i = 1; i < arr.length; i++) {
            const { x: centerX, y: centerY } = arr[i - 1]
            const { x: endX, y: endY } = arr[i]
            ctx.beginPath()
            if (i == 1) {
                ctx.moveTo(centerX, centerY)
                ctx.lineTo(endX, endY)
            } else {
                const { x: startX, y: startY } = arr[i - 2]
                const lastX = (startX + centerX) / 2
                const lastY = (startY + centerY) / 2
                const x = (centerX + endX) / 2
                const y = (centerY + endY) / 2
                ctx.moveTo(lastX, lastY)
                ctx.quadraticCurveTo(centerX, centerY, x, y)
            }
            ctx.stroke()
            // ctx.restore()
        }
    }

}
