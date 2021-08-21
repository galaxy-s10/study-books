/**
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

/**
 * 虚拟dom对象:
 * sel:选择器
 * data:数据
 * children:子虚拟dom
 * text:文本
 * elm:真实dom对象
 */
function vnode(sel, data, children, text, elm) {
    return { sel, data, children, text, elm }
}