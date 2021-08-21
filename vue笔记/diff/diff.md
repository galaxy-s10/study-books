# vue的diff算法

`Vue`和`React`在更新`dom`时，使用的算法相同，都是基于[snabbdom](https://github.com/snabbdom/snabbdom)。snabbdom翻译为：速度。

## 为什么使用diff

真实dom的开销是很大的，这个跟性能优化中的重绘意义类似。某些时候我们修改了页面中的某个数据，如果直接渲染到真实DOM中会引起整棵树的重绘，那么我们能不能只让我们改变过的数据映射到真实 DOM,做一个最少的重绘呢，这就是diff算法要解决的事情。

## 先序深度优先

新旧节点（新旧节点都是指虚拟dom对象）的比较采用先序深度优先遍历。

![diff1](C:\Users\Administrator\Desktop\diff1.jpg)



## 同层比较

同层比较Diff算法中，新旧节点（新旧节点都是指虚拟dom对象）的比较是同层级的比较，不会跨层比较。比如下图出现的 四次比较（从 first 到 fouth），他们的共同特点都是有**相同的父节点。**比如蓝色部分的比较，新旧子节点的父节点是相同节点 1。比如红色部分的比较，新旧子节点的父节点都是 2

![diff1](C:\Users\Administrator\Desktop\diff2.jpg)

比较逻辑：

1. 两个节点相同，但不在相同层级上，无法复用
2. 两个节点相同，在同一层级，但父节点不同，无法复用
3. **两个节点相同，在同一层级，且父节点相同，可以复用**

# 虚拟dom

虚拟 `DOM`：用 `JavaScript` 对象描述 `DOM` 的层次结构。`DOM` 中的一切属性都在虚拟 `DOM` 中有对应的属性。

virtual DOM和真实DOM的区别

> virtual DOM是将真实的 DOM 的数据抽取出来，以对象的形式模拟树形结构，diff算法比较的也是virtual DOM

dom结构

```html
<ul>
    <li>牛奶</li>
    <li>咖啡</li>
</ul>
```

js对象

```js
{
    "sel":"ul",
    "data":{},
    "children":[
        {
            "sel":"li",
            "data":{

            },
            "text":"牛奶"
        },
        {
            "sel":"li",
            "data":{},
            "text":"咖啡"
        }
    ]
}
```

## 创建虚拟dom对象

```js
/**
 * vnode函数返回一个虚拟dom节点:
 * sel:选择器
 * data:数据
 * children:子虚拟dom
 * text:文本
 * elm:真实dom对象
 */
function vnode(sel, data, children, text, elm) {
    return { sel, data, children, text, elm }
}


/**
 * h函数创建虚拟dom对象
 * 目前只支持这三种格式的h函数：
 * 第一种：h('div', {}, '文字')
 * 第二种：h('div', {}, [])，注意，这里的第三个参数[]，里面必须h函数返回的虚拟dom对象。
 * 第三种：h('div', {}, h())
 */

function h(sel, data, c) {
    // 检查参数的个数
    if (arguments.length !== 3)
        throw new Error('h函数必须传入3个参数')
    // 检查参数 c 的类型
    if (typeof c === 'string' || typeof c === 'number') {
        // 说明现在调用h函数的是第一种格式
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) {
        // 说明现在调用h函数的是第二种格式
        var children = []
        for (var i = 0; i < c.length; i++) {
            // 检查 c[i] 必须是个虚拟dom对象
            if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel')))
                throw new Error('传入的数组参数中存在非虚拟dom对象')
            children.push(c[i])
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        // 说明现在调用h函数的是第三种格式
        var children = [c]
        return vnode(sel, data, children, undefined, undefined)
    } else {
        throw new Error('传入的第三个参数类型不对')
    }
}

```

```js
// 创建vnode1虚拟dom对象
var vnode1 = h('div', {}, '我是div')
// 创建vnode2虚拟dom对象
var vnode2 = h('ul', {}, [
    h('li', {}, 'vnode2-xxx'),
    h('li', {}, 'vnode2-yyy'),
])
// vnode1虚拟dom对象的结构
var vnode11 = {
    sel: "div",
    data: {},
    children: undefined,
    text: "我是div",
    elm: undefined
}
// vnode2虚拟dom对象的结构
var vnode22 = {
    sel: "ul",
    data: {},
    children: [
        {
            sel: "li",
            data: {},
            children: undefined,
            text: "vnode2-xxx",
            elm: undefined
        },
        {
            sel: "li",
            data: {},
            children: undefined,
            text: "vnode2-yyy",
            elm: undefined
        }
    ],
    text: undefined,
    elm: undefined
}
```

## 转化为真实dom

```js
// 将虚拟dom创建为真实dom
function createElement(vnode) {
    // 创建一个 DOM 节点
    var domNode = document.createElement(vnode.sel)
    // 判断是子节点还是文本？（二选一，要么是子节点要么是文本）
    if (
        vnode.text !== '' &&
        (vnode.children === undefined || vnode.children.length === 0)
    ) {
        // 它内部是文字
        domNode.innerText = vnode.text
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        // 它内部是子节点，就要递归创建节点
        for (var i = 0; i < vnode.children.length; i++) {
            // 得到当前这个 child
            var ch = vnode.children[i]
            var chDom = createElement(ch)
            // 将节点插入到父节点的末尾处
            domNode.appendChild(chDom)
        }
    }
    // 补充 elm 属性
    vnode.elm = domNode
    // 返回 elm，elm是一个纯dom对象
    return vnode.elm
}
```

```js
console.log(createElement(vnode1)); //真实dom：<div>我是div</div>
console.log(createElement(vnode2));//真实dom：<ul><li>vnode2-xxx</li><li>vnode2-yyy</li></ul>
```

# diff算法

diff翻译为"差异"，vue在更新dom操作时，会和新旧节点进行比较，使用最小量更新（即不会一律全部删除，重新新建，而是尽可能的在原本基础上进行"修补"）

## patch

```js
// 将patch中新旧节点是同一个节点的操作抽离出来
function patchVnode(oldVnode, newVnode) {
    if (newVnode === oldVnode) {
        console.log('新旧节点是同一个引用，啥都不做。')
    } else {
        if (newVnode.text != "" && newVnode.children == undefined || newVnode.children.length == 0) {
            // 如果新节点是文本
            if (newVnode.text == oldVnode.text) {
                console.log('新节点的文本和旧文本节点的文本一样，啥都不干')
            } else {
                console.log('新节点的文本和旧文本节点的文本不一样，直接innerText')
                oldVnode.elm.innerText = newVnode.text
            }
        } else {
            // 新节点有children节点

            if (oldVnode.text != "" && oldVnode.children == undefined || oldVnode.children.length == 0) {
                // 新节点有children，且旧节点有text(即没有children)
                console.log('新节点有children，且旧节点有text(即没有children)')
                console.log(newVnode)
                console.log(oldVnode)
                oldVnode.elm.innerText = ""
                oldVnode.text = ""
                for (var i = 0; i < newVnode.children.length; i++) {
                    let newVnodeElm = createElement(newVnode.children[i])
                    oldVnode.elm.appendChild(newVnodeElm)
                }
                oldVnode.children = newVnode.children
                // oldVnode.elm.appendChild(c)
            } else {
                console.log('新节点有children，且旧节点也有children，最为复杂');
                // 新节点有children，且旧节点也有children，最为复杂
                // 未完待续
            }
        }
    }
}

// 新旧节点比较差异，进行修补
function patch(oldVnode, newVnode) {
    // 判断传入的第一个参数，是DOM节点还是虚拟节点？
    if (oldVnode.sel === '' || oldVnode.sel === undefined) {
        // 传入的第一个参数是DOM节点，此时要包装为虚拟节点
        oldVnode = vnode(
            oldVnode.tagName.toLowerCase(),
            {},
            [],
            undefined,
            oldVnode
        )
        console.log('传入的第一个参数是DOM节点，此时要包装为虚拟节点')
        console.log(oldVnode)
    }
    // 判断 oldVnode和newVnode 是不是同一个节点
    // 即节点key相同，且节点选择器相同
    if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
        console.log('是同一个节点，开始精细化比较')
        patchVnode(oldVnode, newVnode)
    } else {
        console.log('不是同一个节点(即选择器和key都不一样)，暴力删除旧的，插入新的')
        let newVnodeElm = createElement(newVnode)
        if (oldVnode.elm && newVnodeElm) {
            // 先把新的节点插入到老节点前面
            // 父节点.insertBefore(要插入的元素，在这个父节点的哪个节点插)
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        }
        // 再删除老节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}
```

# 参考

https://www.bilibili.com/video/BV1v5411H7gZ

https://zhuanlan.zhihu.com/p/108749463