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
            enumerableS: true,
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
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerableS: true,
        get() {
            dep.addSub(function () {
            })
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
class Dep {
    constructor() {
        this.sub = []
    }
    addSub(v) {
        this.sub.push(v)
    }
    notify() {
        this.sub.forEach(item => {
            item()
            // item.update()
        })
    }
}

class Watcher {
    constructor(vm, expOrfn) {
        this.vm = vm
        this.expOrfn = expOrfn
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



var obj = {}


defineReactive(obj, 'a', 10)
defineReactive(obj, 'b', { age: 34, pets: { name: 'cat', hobby: 'fish' } })
defineReactive(obj, 'c', ['111', '222', { name: 123 }])
// var res = obj.c.push(123)