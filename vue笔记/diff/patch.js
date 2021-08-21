// patch 函数
// import vnode from './vnode'
// import createElement from './createElement'
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
    }
    console.log(oldVnode, newVnode)
    // 判断 oldVnode和newVnode 是不是同一个节点
    if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
        console.log('是同一个节点')
    } else {
        console.log('不是同一个节点，暴力删除旧的，插入新的')
        let newVnodeElm = createElement(newVnode)
        if (oldVnode.elm && newVnodeElm) {
            // 插入到老节点之前
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        }
        // 删除老节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}
