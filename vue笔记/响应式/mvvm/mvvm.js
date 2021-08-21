function Mvvm(options = {}) {
    this.$el = options.el
    this.$data = options.data
    // 数据劫持
    new Observe(options.data)
    // 数据代理
    for (let key in options.data) {
        Object.defineProperty(this, key, {
            enumerable: true,       // 可枚举
            configurable: true,     // 可配置
            get: function () {
                return options.data[key]
            },
            set: function (newVal) {
                options.data[key] = newVal
            }
        })
    }
    // 解析编译
    new Compile(options.el, this)
}


// 解析编译
class Compile {
    constructor(el, vm) {
        this.el = el
        this.vm = vm
        // 解析编译
        this.el = document.querySelector(el)
        // 在内存中创建一个文档碎片
        let fragment = document.createDocumentFragment();
        let child
        while (child = this.el.firstChild) {
            // appendChild具有移动性，移一个少一个
            fragment.appendChild(child)
        }
        // 在内存中编译解析
        this.compile(fragment, vm)
        // 将内存中的文档碎片替换到真实页面
        this.el.appendChild(fragment)
    }
    compile(node, vm) {
        node.childNodes.forEach(child => {
            // 判断是不是元素节点
            if (child.nodeType == 1) {
                // 递归遍历元素节点
                this.compile(child, vm)
                // 编译元素节点
                this.compileEle(child, vm)
            } else {
                // 编译文本节点
                this.compileText(child, vm)
            }
        })
    }
    // 编译文本
    compileText(node, vm) {
        // 首先保存原本的文本内容
        let text = node.textContent // 车：{{car.benz}}、{{car.bmw}}、{{car.adui}}
        let reg = /\{\{(.[^\}]*)\}\}/g
        // 如果匹配到有值了才{{}}这种格式就进行编译
        if (reg.test(text)) {
            // 遍历将原本文本节点的{{}}依次替换成对应的值
            let content = text.replace(/\{\{(.[^\}]*)\}\}/g, (...args) => {
                // 设置监听,这里利用闭包访问了原本的text
                new Watcher(vm, args[1], function () {
                    // 遍历将原本文本节点的{{}}依次替换成对应的值
                    let content = text.replace(/\{\{(.[^\}]*)\}\}/g, (...args) => {
                        return getval(vm, args[1])
                    })
                    node.textContent = content
                })
                return getval(vm, args[1])

            })
            node.textContent = content
        }
    }
    // 编译元素（v-model）
    compileEle(node, vm) {
        var attr = node.attributes;
        // attr是类数组，通过展开运算符让其可遍历
        [...attr].forEach(attr => {
            let { name, value } = attr
            if (name == 'v-model') {
                // 设置监听
                new Watcher(vm, value, function (newValue) {
                    node.value = newValue
                })
                // 双向绑定
                node.addEventListener('input', function (e) {
                    let newvalue = e.target.value
                    var arr = value.split('.')
                    arr.reduce((data, current, index) => {
                        if (index == arr.length - 1) {
                            data[current] = newvalue
                        }
                        return data[current]
                    }, vm)
                })
                // 给v-model属性设置监听后，此时元素的v-model的数据就和data关联了，可以把这个属性移除了
                node.removeAttribute('v-model')
            }
        })
    }
}

// 将{{car.benz}} {{car.bmw}}等转化为对应的值
function getval(vm, expr) {
    let val = vm;
    var arr = expr.split('.')
    arr.forEach(k => {
        val = val[k]
    })
    return val
}


// 数据劫持
class Observe {
    constructor(data) {
        this.observe(data)
    }
    observe(data) {
        // 遍历将每一个数据分别定义响应式，分别监听
        for (let key in data) {
            this.defineReactive(data, key, data[key])
        }

    }
    // 定义响应式
    defineReactive(obj, key, val) {
        if (typeof val == 'object') {
            this.observe(val)
        }
        var dep = new Dep();
        console.log(dep);
        Object.defineProperty(obj, key, {
            enumerable: true,       // 可枚举
            configurable: true,     // 可配置
            get: function () {
                // 只有new Watcher了，Dep.target才会有值（watcher实例），有值就将它插入观察者队列
                if (Dep.target) {
                    dep.addsub(Dep.target);
                }
                return val
            },
            set: function (newVal) {
                // 如果新值和旧值一样，则不发布更新
                if (newVal == val) {
                    return
                }
                val = newVal
                dep.notify();
            }
        })
    }

}

// 观察者
class Dep {
    constructor() {
        this.subs = []
    }
    addsub(sub) {
        this.subs.push(sub)
    }
    notify() {
        // 遍历观察者队列，全部更新
        this.subs.forEach(sub => sub.update())
    }
}

// 被观察者
class Watcher {
    constructor(vm, expr, fn) {
        this.vm = vm;
        this.expr = expr;
        this.fn = fn;
        this.oldValue = this.get()
    }
    get() {
        // 只要new Watcher了，就会调用这个方法，将这个watcher实例赋值给全局的Dep.target
        Dep.target = this;
        let oldValue = getval(this.vm, this.expr)
        this.update();
        Dep.target = null;
        // 如果获取的expr是值类型（字符串，数字...），则直接返回oldValue
        // 如果获取的expr是引用类型（数组，对象），则重新拷贝一份，返回给oldValue
        if (Object.prototype.toString.call(oldValue) == '[object Array]') {
            let old = [...oldValue]
            oldValue = old
        }
        return oldValue
    }
    update() {
        let newValue = getval(this.vm, this.expr)
        // 如果新旧值不一样，则将新值作为参数传给回调函数并执行
        if (newValue !== this.oldValue) {
            this.fn(newValue)
        }
    }
}