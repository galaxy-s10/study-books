# 参考

https://www.runoob.com/w3cnote/html5-canvas-intro.html

## canvas元素

```html
<canvas id="share" width="600" height="600">你的浏览器不支持 canvas，请升级你的浏览器。</canvas>
```

##  渲染上下文(Thre Rending Context)

```js
let canvas = document.getElementById('share')
console.log(canvas);
let ctx = canvas.getContext('2d')
console.log(ctx);
```

### 绘制矩形

1、**fillRect(x, y, width, height)**：绘制一个填充的矩形。

2、**strokeRect(x, y, width, height)**：绘制一个矩形的边框。

3、**clearRect(x, y, widh, height)**：清除指定的矩形区域，然后这块区域会变的完全透明。

## 绘制路径 (`path`)

1. `beginPath()`

   新建一条路径，路径一旦创建成功，图形绘制命令被指向到路径上生成路径

2. `moveTo(x, y)`

   把画笔移动到指定的坐标`(x, y)`。相当于设置路径的起始点坐标。

3. `closePath()`

   闭合路径之后，图形绘制命令又重新指向到上下文中

4. `stroke()`

   通过线条来绘制图形轮廓

5. `fill()`

   通过填充路径的内容区域生成实心的图形

### 绘制线段

```js
var canvas = document.getElementById('tutorial');
if (!canvas.getContext) return;
var ctx = canvas.getContext("2d");
ctx.beginPath(); //新建一条path
ctx.moveTo(50, 50); //把画笔移动到指定的坐标
ctx.lineTo(200, 50);  //绘制一条从当前位置到指定坐标(200, 50)的直线.
//闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
ctx.closePath();
ctx.stroke(); //绘制路径。
```

### 绘制三角形边框

```js
var canvas = document.getElementById('tutorial');
if (!canvas.getContext) return;
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(200, 50);
if (!canvas.getContext) return;
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(200, 50);
ctx.lineTo(200, 200);

ctx.fill(); //填充闭合区域。如果path没有闭合，则fill()会自动闭合路径。
ctx.lineTo(200, 200);

ctx.fill(); //填充闭合区域。如果path没有闭合，则fill()会自动闭合路径。
```

### 绘制圆弧

1、**arc(x, y, r, startAngle, endAngle, anticlockwise)**: 以`(x, y)` 为圆心，以`r` 为半径，从 `startAngle` 弧度开始到`endAngle`弧度结束。`anticlosewise` 是布尔值，`true` 表示逆时针，`false` 表示顺时针(默认是顺时针)。

```js
var canvas = document.getElementById('tutorial');
if (!canvas.getContext) return;
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.arc(50, 50, 40, 0, Math.PI / 2, false);
ctx.stroke();
```

2、**arcTo(x1, y1, x2, y2, radius)**: 根据给定的控制点和半径画一段圆弧，最后再以直线连接两个控制点。