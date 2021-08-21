// 将虚拟dom创建为真实dom
function createElement(vnode) {
    console.log(vnode);
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
