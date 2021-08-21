## 前言

轮播图，基本是前端程序员在学习js的时候，都会拿来练手的组件，因此我特意花时间用原生js实现了一下无缝轮播图，此外还有用vue封装的pc端无缝轮播图和移动端无缝轮播图！

## html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./main.css">
</head>

<body>
    <div class="container">
        <h2>Carousel</h2>
        <div class="carousel">
            <div class="panels">
                <div class="active panels-item">1</div>
                <div class="panels-item">2</div>
                <div class="panels-item">3</div>
                <div class="panels-item">4</div>
            </div>
            <div class="arrow">
                <i class="left-arrow"></i>
                <i class="right-arrow"></i>
            </div>
            <ul class="poins">
                <li class="active"><button></button></li>
                <li><button></button></li>
                <li><button></button></li>
                <li><button></button></li>
            </ul>
        </div>
    </div>
    <script>

        // js修改style样式：dom.style.color='red',不能直接dom.style='color:red'
        // 通过Object.assign()，将新的style复制到原本的dom元素
        const css = ($node, newStyle) => Object.assign($node.style, newStyle)
        const animation = {
            // 垂直轮播
            vertical($from, $to, direction) {
                // 首先清空原本的style样式，然后再自定义样式，因为如果不先清空style，
                // 会导致第二轮轮播的时候，之前设置的setTimeout的样式先执行css()，这时候就会出问题，
                // 所以应该在每次轮播时，先清空之前的style，再重新设置css()和setTimeout
                $from.style = ''
                $to.style = ''
                css($from, {
                    transform: `translateY(0)`,
                    zIndex: 10
                })
                css($to, {
                    transform: `translateY(${direction === 'pre' ? '-' : ''}100%)`,
                    zIndex: 10
                })
                setTimeout(() => css($from, {
                    transform: `translateY(${direction === 'next' ? '-' : ''}100%)`,
                    transition: `.4s`,
                }), 0)
                setTimeout(() => css($to, {
                    transform: `translateY(0)`,
                    transition: `.4s`,
                }), 0)
            },
            // 水平轮播
            horizontal($from, $to, direction) {
                $from.style = ''
                $to.style = ''
                css($from, {
                    transform: `translateX(0)`,
                    zIndex: 10
                })
                css($to, {
                    transform: `translateX(${direction === 'pre' ? '-' : ''}100%)`,
                    zIndex: 10
                })
                setTimeout(() => css($from, {
                    transform: `translateX(${direction === 'next' ? '-' : ''}100%)`,
                    transition: `.4s`,
                }), 0)
                setTimeout(() => css($to, {
                    transform: `translateX(0)`,
                    transition: `.4s`,
                }), 0)
            },
        }
        class Carousel {
            constructor($root, mode, delay) {
                this.mode = mode
                this.delay = delay || 2000
                this.timer = null
                this.$root = $root;
                this.$panels = $root.querySelectorAll('.panels div');
                this.$next = $root.querySelector('.arrow .right-arrow');
                this.$pre = $root.querySelector('.arrow .left-arrow');
                this.$poins = $root.querySelectorAll('.poins li');
                this.loopStart()
                this.bindEvent()
            }
            // 绑定事件
            bindEvent() {
                this.$next.onclick = this.next.bind(this);
                this.$pre.onclick = this.pre.bind(this);
                this.$poins.forEach($poin => $poin.onclick = this.goPage.bind(this))
                // 循环轮播
                this.$root.onmouseover = () => clearInterval(this.timer)
                this.$root.onmouseleave = () => this.loopStart()
            }
            // 下一个
            next() {
                let fromIndex = this.getIndex()
                let toIndex = (fromIndex + 1) % this.$panels.length
                this.setActive(toIndex)
                animation[this.mode](this.$panels[fromIndex], this.$panels[toIndex], 'next')
            }
            // 上一个
            pre() {
                let fromIndex = this.getIndex()
                let toIndex = (fromIndex - 1 + this.$panels.length) % this.$panels.length
                this.setActive(toIndex)
                // animation[this.mode](this.$panels[fromIndex], this.$panels[toIndex])
                animation[this.mode](this.$panels[fromIndex], this.$panels[toIndex], 'pre')
            }
            // 指定轮播图
            goPage(e) {
                // 判断点击的dom对象是不是li,如果是li则直接返回target
                // 如果点击的是li下面的button,则返回button的父节点，即li
                const $clickNode = e.target.nodeName === 'BUTTON' ? e.target.parentNode : e.target
                // 查找当前点击的节点在poins的下标
                let toIndex = [...this.$poins].indexOf($clickNode)
                let fromIndex = this.getIndex()
                if (toIndex === fromIndex) return
                if (fromIndex > toIndex) {
                    animation[this.mode](this.$panels[fromIndex], this.$panels[toIndex], 'pre')
                }
                else {
                    animation[this.mode](this.$panels[fromIndex], this.$panels[toIndex], 'next')
                }
                this.setActive(toIndex)
            }
            // 获取当前轮播图
            getIndex() {
                return [...this.$poins].indexOf(this.$root.querySelector('.poins li.active'))
            }
            // 设置当前轮播图
            setActive(index) {
                console.log(this.$poins);
                this.$poins.forEach($poin => $poin.classList.remove('active'))
                this.$poins[index].classList.add('active')
                this.$panels.forEach($panel => $panel.classList.remove('active'))
                this.$panels[index].classList.add('active')

            }
            // 开始轮播
            loopStart() {
                this.timer = setInterval(() => {
                    this.next()
                }, this.delay);
            }

        }

        let carousel = document.querySelector('.carousel')
        // 第一个参数为轮播图的根元素，必传
        // 第二个参数为轮播图模式：vertical/horizontal，必传
        // 第三个参数为轮播间隔时间，可不传，默认2000毫秒
        var p = new Carousel(carousel, 'vertical', 1000)

    </script>
</body>

</html>
```



## main.css

```css
.container {
  width: 80%;
  margin: 100px auto 0;
  box-shadow: 0 0 4px 1px rgba(232, 237, 250, 0.5);
  border: 1px solid #ebebeb;
  border-radius: 3px;
  padding: 20px;
  box-sizing: border-box;
}
.carousel {
  position: relative;
  text-align: center;
  height: 300px;
  overflow: hidden;
  z-index: 30;
}
.carousel:hover .arrow i:nth-child(1) {
  left: 15px;
  opacity: 1;
}
.carousel:hover .arrow i:nth-child(2) {
  right: 15px;
  opacity: 1;
}
.carousel .panels:hover {
  cursor: pointer;
}
.carousel .panels .active {
  z-index: 10;
}
.carousel .panels :nth-child(1) {
  background-color: aqua;
}
.carousel .panels :nth-child(2) {
  background-color: burlywood;
}
.carousel .panels :nth-child(3) {
  background-color: pink;
}
.carousel .panels :nth-child(4) {
  background-color: lightblue;
}
.carousel .panels .panels-item {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.carousel .arrow i {
  position: absolute;
  cursor: pointer;
  top: 50%;
  width: 36px;
  height: 36px;
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: rgba(31, 45, 61, 0.1);
  opacity: 0;
  transition: 0.3s;
  z-index: 30;
}
.carousel .arrow i:hover {
  background-color: rgba(31, 45, 61, 0.2);
}
.carousel .arrow .left-arrow {
  left: -20px;
}
.carousel .arrow .right-arrow {
  right: -20px;
}
.carousel .poins {
  position: absolute;
  margin: 0;
  padding: 0;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.carousel .poins li {
  display: inline-block;
  list-style: none;
  cursor: pointer;
  padding: 5px;
  z-index: 99;
}
.carousel .poins li button {
  opacity: 0.5;
  cursor: pointer;
  width: 30px;
  height: 3px;
  border: 0;
  outline: none;
  background-color: white;
  transition: 0.3s;
}
.carousel .poins li.active button {
  opacity: 1;
}

```

