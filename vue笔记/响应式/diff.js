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