class Vue {
    constructor(options) {
        this.$options = options
        this.$data = options.data()
        let elm = document.querySelector(options.el)
        this._template = elm
        this._parent = elm.parentNode;
        this.ast = getVNode(elm)
        observe(this.$data)
        // this.pet ===> this.$data.pet
        Object.keys(this.$data).forEach((key) => {
            this._proxy(this, key);
        });
        /**
         * 递归遍历data里面的每个数据，给每个数据都添加一个dep对象（即
         * 不管data里面的每个数据有没有在视图上，每个数据都会有一个dep对象）,而dep里
         * 面保存着subs数组，如果视图上有用到该data，就会插入到dep的subs数组里，
         * 举例：data:{pet: 'cat', info: { name: 'tom' }},此时，会给data里的每一
         * 个数据（pet，info，name）都添加dep对象,如果视图上有用到pet，pet的dep对象里
         * 面的subs就会保存一个pet，当pet被修改时会触发响应式的set，然后通知改pet的dep对象
         * 里的subs里面的每一个数据，从而进行刷新页面
         */
        this.mount()
    }
    _proxy(obj, key) {
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                return obj.$data[key]
            },
            set(newValue) {
                obj.$data[key] = newValue
            },
        })
    }

}

function defineReactive(obj, key, value) {
    observe(value)
    /**
     * 这里的value其实是一个闭包
     * 当调用defineReactive这个函数，将obj，key，value传给defineReactive时，
     * 传进来的这个value作为这个函数的局部变量，被保存到了外部，
     * 当obj.key触发get或者set时，都是操作的这个局部变量value，
     * 但是外部却不能访问这个函数（defineReactive）的value。
     */
    var value;
    // 同理，这里的dep同样也是闭包
    var dep = new Dep()
    dep.name = key
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
            dep.depend()
            return value
        },
        set(newValue) {
            if (newValue == value) return
            value = newValue
            observe(newValue)
            dep.notify()
        },
    })
}

let depid = 0;

class Dep {

    constructor() {
        this.id = depid++;
        this.subs = []; // 存储的是与 当前 Dep 关联的 watcher
        this.subids = new Set()
    }

    /** 添加一个 watcher */
    addSub(sub) {
        /**
         * 如果这个订阅者已经订阅了（即dep的subs已存在了直接），则不继续订阅，
         * 比如，视图里面多个地方使用了pet这个变量，但是只订阅一次；如
         * 果视图里没有用到任何data的数据，也会给data的数据创建dep，只是dep里面的subs为空。
         */
        if (!this.subids.has(depid)) {
            this.subids.add(depid);
            this.subs.push(sub);
        } else {
        }

    }
    /** 移除 */
    removeSub(sub) {
        for (let i = this.subs.length - 1; i >= 0; i--) {
            if (sub === this.subs[i]) {
                this.subs.splice(i, 1);
            }
        }
    }

    /** 将当前 Dep 与当前的 watcher ( 暂时渲染 watcher ) 关联*/
    depend() {
        // 就是将 当前的 dep 与当前的 watcher 互相关联
        if (Dep.target) {
            this.addSub(Dep.target); // 将 当前的 watcher 关联到 当前的 dep 上

            Dep.target.addDep(this); // 将当前的 dep 与 当前渲染 watcher 关联起来

        }
    }
    /** 触发与之关联的 watcher 的 update 方法, 起到更新的作用 */
    notify() {
        // 在真实的 Vue 中是依次触发 this.subs 中的 watcher 的 update 方法
        // 此时, deps 中已经关联到 我们需要使用的 那个 watcher 了

        let deps = this.subs.slice();

        deps.forEach(watcher => {
            watcher.update();
        });


    }

}


// 全局的容器存储渲染 Watcher
Dep.target = null;

let targetStack = [];

/** 将当前操作的 watcher 存储到 全局 watcher 中, 参数 target 就是当前 watcher */
function pushTarget(target) {
    targetStack.unshift(Dep.target); // vue 的源代码中使用的是 push
    Dep.target = target;
}

/** 将 当前 watcher 踢出 */
function popTarget() {
    Dep.target = targetStack.shift(); // 踢到最后就是 undefined
}



let watcherid = 0;
class Watcher {

    /**
     * 
     * @param {Object} vm JGVue 实例
     * @param {String|Function} expOrfn 如果是渲染 watcher, 传入的就是渲染函数, 如果是 计算 watcher 传入的就是路径表达式, 暂时只考虑 expOrFn 为函数的情况.
     */
    constructor(vm, expOrfn) {
        this.vm = vm;
        this.getter = expOrfn;

        this.id = watcherid++;

        this.deps = []; // 依赖项
        this.depIds = {}; // 是一个 Set 类型, 用于保证 依赖项的唯一性 ( 简化的代码暂时不实现这一块 )

        // 一开始需要渲染: 真实 vue 中: this.lazy ? undefined : this.get()
        this.get();
    }

    /** 计算, 触发 getter */
    get() {
        console.log('-----------我是Watcher类的get方法，我会调用执行watcher的getter方法', this);
        pushTarget(this);
        this.getter.call(this.vm, this.vm); // 上下文的问题就解决了

        popTarget();
    }

    /**
     * 执行, 并判断是懒加载, 还是同步执行, 还是异步执行: 
     * 我们现在只考虑 异步执行 ( 简化的是 同步执行 )
     */
    run() {
        this.get();
        // 在真正的 vue 中是调用 queueWatcher, 来触发 nextTick 进行异步的执行
    }

    /** 对外公开的函数, 用于在 属性发生变化时触发的接口 */
    update() {
        this.run();
    }

    /** 清空依赖队列 */
    cleanupDep() {

    }

    /** 将 当前的 dep 与 当前的 watcher 关联 */
    addDep(dep) {
        this.deps.push(dep);
    }
}

// 重新封装Object.defineProperty，默认可删，可写，可枚举
function def(obj, key, value, config) {
    config = config || {}
    Object.defineProperty(obj, key, {
        // 该属性对应的值，默认：undefined
        value,
        // 该属性是否可枚举，默认：fasle，即默认不可枚举
        enumerable: config.enumerable == undefined ? true : config.enumerable,
        // 该属性是否可写，默认：false，即默认不可写
        writable: config.writable == undefined ? true : config.writable,
        // 该属性是否可配置，默认：false，即不可配置（不能删除）
        configurable: config.configurable == undefined ? true : config.configurable,
    })
}
var arrayMethodsObject = Object.create(Array.prototype)
var vueArrayMethods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

vueArrayMethods.forEach(key => {
    const _arrayMethods = Array.prototype[key]
    def(arrayMethodsObject, key, function () {
        // apply的第二个参数可以是一个数组或者类数组对象
        let result = _arrayMethods.apply(this, arguments)
        let newArr
        /**
         * pop（删除栈顶，即数组最后一个元素），
         * shift（删除栈底，即数组第一个元素），
         * sort，reverse都不会添加新项，不必特殊处理
         * 但push，unshift，都会添加新项，splice也可能会添加新项，
         * 因此需要特殊处理
         */
        switch (key) {
            case 'push':
            case 'unshift':
                newArr = arguments;
                break;
            case 'splice':
                newArr = arguments.slice(2)
                break;
            default:
                break;
        }
        newArr && this.__ob__.observeArray(newArr)
        // 将函数的返回值返回
        return result
    }, { enumerable: false })
})

class Observer {
    constructor(value) {
        // 使用Object.defineProperty定义__ob__，使其不能被枚举
        def(value, '__ob__', this, { enumerable: false })
        // value.__ob__ = this  //会有死循环问题，不能让它遍历自己
        if (Array.isArray(value)) {
            /**
             * 将数组的原型重写，重写成自己定义的原型，
             * 这个原型（arrayMethodsObject）拥有七个重写后的原数组方法。
            */
            value.__proto__ = arrayMethodsObject
            this.observeArray(value)
        } else {
            this.walk(value)
        }

    }
    walk(value) {
        for (let key in value) {
            defineReactive(value, key, value[key])
        }
    }
    // 数组特殊处理
    observeArray(arr) {
        for (let i = 0; i < arr.length; i++) {
            observe(arr[i])
        }
    }
}

function observe(value) {
    if (typeof value != 'object') return
    var ob
    if (typeof value.__ob__ != 'undefined') {
        ob = value.__ob__;
    } else {
        ob = new Observer(value)
    }
    return ob
}

Vue.prototype.mount = function () {
    // 需要提供一个 render 方法: 生成 虚拟 DOM
    console.log('Vue.prototype.mount,创建render函数，调用mountComponent');
    this.render = this.createRenderFn() // 带有缓存 ( Vue 本身是可以带有 render 成员 )，函数柯里化。
    this.mountComponent();
}
Vue.prototype.mountComponent = function () {
    // 执行 mountComponent() 函数 
    console.log('Vue.prototype.mountComponent ，调用mountComponent');
    let mount = () => { // 这里是一个函数, 函数的 this 默认是全局对象 "函数调用模式"
        console.log('调用mount,执行update');
        // 执行render函数即this.render(),返回一个vnode，这里即更新vnode
        this.update(this.render())
    }
    console.log('定义mount');
    console.log(mount);
    // 这个 Watcher 就是全局的 Watcher, 在任何一个位置都可以访问他了 ( 简化的写法 )
    new Watcher(this, mount); // 相当于这里调用了 mount
}

// 这里是生成 render 函数, 目的是缓存 抽象语法树 ( 我们使用 虚拟 DOM 来模拟 )
Vue.prototype.createRenderFn = function () {
    let ast = getVNode(this._template);
    console.log('创建渲染函数');
    console.log('ast', ast);
    // Vue: 将 AST + data => VNode
    // 我们: 带有坑的 VNode + data => 含有数据的 VNode
    return function () {
        // 将 带有 坑的 VNode 转换为 带数据的 VNode
        let _tmp = combine(ast, this.$data);
        console.log('将 带有 坑的 VNode 转换为 带数据的 VNode', _tmp);
        return _tmp;
    }
}

// 将虚拟 DOM 渲染到页面中: diff 算法就在里
Vue.prototype.update = function (vnode) {
    console.log('调用update');
    // 简化, 直接生成 HTML DOM replaceChild 到页面中
    // 父元素.replaceChild( 新元素, 旧元素 )
    let realDOM = parseVNode(vnode);
    console.log(realDOM);
    // debugger;
    // let _ = 0;

    this._parent.replaceChild(realDOM, document.querySelector(this.$options.el));
    // 这个算法是不负责任的: 
    // 每次会将页面中的 DOM 全部替换
}


class VNode {
    constructor(tag, data, value, type) {
        this.tag = tag && tag.toLowerCase();
        this.data = data;
        this.value = value;
        this.type = type;
        this.children = [];
    }

    appendChild(vnode) {
        this.children.push(vnode);
    }
}



/** 由 HTML DOM -> VNode: 将这个函数当做 compiler 函数 */
function getVNode(node) {
    let nodeType = node.nodeType;
    let _vnode = null;
    if (nodeType === 1) {
        // 元素
        let nodeName = node.nodeName;
        let attrs = node.attributes;
        let _attrObj = {};
        for (let i = 0; i < attrs.length; i++) { // attrs[ i ] 属性节点 ( nodeType == 2 )
            _attrObj[attrs[i].nodeName] = attrs[i].nodeValue;
        }
        _vnode = new VNode(nodeName, _attrObj, undefined, nodeType);

        // 考虑 node 的子元素
        let childNodes = node.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            _vnode.appendChild(getVNode(childNodes[i])); // 递归
        }

    } else if (nodeType === 3) {

        _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType);
    }
    return _vnode;
}

/** 将虚拟 DOM 转换成真正的 DOM */
function parseVNode(vnode) {
    // 创建 真实的 DOM
    let type = vnode.type;
    let _node = null;
    if (type === 3) {
        return document.createTextNode(vnode.value); // 创建文本节点
    } else if (type === 1) {

        _node = document.createElement(vnode.tag);

        // 属性
        let data = vnode.data; // 现在这个 data 是键值对
        Object.keys(data).forEach((key) => {
            let attrName = key;
            let attrValue = data[key];
            _node.setAttribute(attrName, attrValue);
        });

        // 子元素
        let children = vnode.children;
        children.forEach(subvnode => {
            _node.appendChild(parseVNode(subvnode)); // 递归转换子元素 ( 虚拟 DOM )
        });
        return _node;
    }

}


let rkuohao = /\{\{(.+?)\}\}/g;
/** 根据路径 访问对象成员 */
function getValueByPath(obj, path) {
    let paths = path.split('.'); // [ xxx, yyy, zzz ]
    let res = obj;
    let prop;
    while (prop = paths.shift()) {
        res = res[prop];
    }
    return res;
}


/** 将 带有 坑的 Vnode 与数据 data 结合, 得到 填充数据的 VNode: 模拟 AST -> VNode */
function combine(vnode, data) {
    let _type = vnode.type;
    let _data = vnode.data;
    let _value = vnode.value;
    let _tag = vnode.tag;
    let _children = vnode.children;


    let _vnode = null;

    if (_type === 3) { // 文本节点 
        // 对文本处理
        _value = _value.replace(rkuohao, function (_, g) {
            return getValueByPath(data, g.trim()); // 除了 get 读取器
        });

        _vnode = new VNode(_tag, _data, _value, _type)

    } else if (_type === 1) { // 元素节点
        _vnode = new VNode(_tag, _data, _value, _type);
        _children.forEach(_subvnode => _vnode.appendChild(combine(_subvnode, data)));
    }

    return _vnode;
}
