class Vue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        this.$options = options
        // 将所有数据转换为响应式
        observe(this.$data)
        // 代理
        for (let k in this.$data) {
            this.proxy(this, k)
        }
    }
    // 代理，this.name ---> this.$data.name
    proxy(obj, key) {
        Object.defineProperty(obj, key, {
            get() {
                return obj.$data[key]
            },
            set(newValue) {
                obj.$data[key] = newValue
            }
        })
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

// 监听对象属性Observer类
class Observer {
    constructor(value) {
        // 每一个Observer实例都有一个dep
        this.dep = new Dep()
        // 使用Object.defineProperty定义__ob__，使__ob__不能被枚举，避免循环引用
        def(value, '__ob__', this, { enumerable: false })
        // 如果是数组则需要特殊处理（不对数组[下标]进行响应式，重写七个数组方法）
        if (Array.isArray(value)) {
            value.__proto__ = arrayMethodsObject
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }
    walk(obj) {
        for (let k in obj) {
            defineReactive(obj, k, obj[k])
        }
    }
    observeArray(arr) {
        // vue不会对数组[下标]进行响应式化，因此只需要对数组里面的引用值做响应式化
        for (let i = 0; i < arr.length; i++) {
            observe(arr[i])
        }
    }
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
        let result = _arrayMethods.apply(this, arguments)
        let newArr
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
        // 将数组重新定义响应式
        newArr && this.__ob__.observeArray(newArr)
        // 将函数的返回值返回
        return result
    }, { enumerable: false })
})

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


// 给属性定义响应式
function defineReactive(obj, key, value) {
    // 这里的value和dep都是闭包
    var childOb = observe(value)
    console.log(childOb)
    var dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('get', value, Dep.target)
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                }
            }
            return value
        },
        set: function (newValue) {
            console.log('set', newValue)
            if (newValue === value) return
            observe(newValue)
            value = newValue
            dep.notify()
        }
    })
}



var watcherid = 0
class Watcher {
    constructor(target, expression, callback) {
        this.id = watcherid++
        this.target = target
        this.getter = parsePath(expression)
        console.log(this.getter)
        this.callback = callback
        this.value = this.get()
        console.log('Watcher构造器')
    }
    get() {
        console.log('Watcher get')
        // 进入依赖收集阶段。让全局的Dep.target设置为Watcher本身，那么就是进入依赖收集阶段
        Dep.target = this;
        const obj = this.target;
        var value;

        // 只要能找，就一直找
        try {
            value = this.getter(obj);
        } finally {
            Dep.target = null;
        }

        return value;
    }
    run() {
        this.getAndInvoke(this.callback);
    }
    getAndInvoke(cb) {
        const value = this.get();

        if (value !== this.value || typeof value == 'object') {
            const oldValue = this.value;
            this.value = value;
            cb.call(this.target, value, oldValue);
        }
    }
}
function parsePath(str) {
    var segments = str.split('.');

    return (obj) => {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return;
            obj = obj[segments[i]]
        }
        return obj;
    };
}

var depid = 0
class Dep {
    constructor() {
        console.log('Dep构造器')
        this.id = depid++
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    depend(v) {
        console.log('depend')
        if (Dep.target) {
            console.log(Dep.target)
            this.addSub(Dep.target)
        }
    }
    notify() {
        console.log('notify')
        this.subs.forEach(sub => sub.update())
    }
}