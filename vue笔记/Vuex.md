# Vuex

## 核心

> state
>
> mutation
>
> action
>
> getter，模块内的getters不能和全局的getters重复，否则报错[vuex] duplicate getter key: getter1
>
> module

# 注意!!!

> ​	在全局或者同一个模块里，mutation和action最好不要有重复的方法名，否则使用mapMutations和mapAction辅助函数时，如果mutation和action的方法名一样，写在后面的会覆盖前面的，因此mutation最好不要和action存在重复的方法！

下面的代码当执行：this.add(10)时，由于...mapMutations在...mapActions的后面，因此，会执行mutation，而不会执行action！

```vue
<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  methods: 
    ...mapActions([
      "add", // 将 `this.add()` 映射为 `this.$store.dispatch('add')`
      "asyncAdd", // 将 `this.asyncAdd()` 映射为 `this.$store.dispatch('asyncAdd')`
      "foo/asyncAdd", // 将 `this['foo/asyncAdd']()` 映射为 `this.$store.dispatch('foo/asyncAdd')`
      "foo/add" // 将 `this['foo/asyncAdd']()` 映射为 `this.$store.dispatch('foo/asyncAdd')`
      // `mapActions` 也支持载荷：
      // "asyncAdd" // 将 `this.asyncAdd(amount)` 映射为 `this.$store.dispatch('asyncAdd', amount)`
    ]),
     ...mapMutations([
      "add", // 将 `this.add()` 映射为 `this.$store.commit('add')`
      "foo/add" // 将 `this['foo/add']()` 映射为 `this.$store.commit('foo/add')`
      // `mapMutations` 也支持载荷：
      // "add" // 将 `this.add(amount)` 映射为 `this.$store.commit('add', amount)`
    ]),
  }
};
</script>
```

# 辅助函数

## mapState 辅助函数

```vue
<template>
  <div>
    <h1>我是bar</h1>
    <!-- 全局的count:888 -->
    <h2>全局的count:{{count}}</h2>
    <!-- 全局的count:888 -->
    <h2>全局的count:{{count11}}</h2>
    <!-- foo的count:999 -->
    <h2>foo的count:{{count1}}</h2>
    <!-- fooaaa:100 -->
    <h2>fooaaa:{{aaa}}</h2>
    <!-- fooaaa:200 -->
    <h2>foobbb:{{bbb}}</h2>
    <!-- msg:我是msg -->
    <h2>msg:{{msg}}</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      msg: "我是msg"
    };
  },
  computed: {
    ...mapState([
      "count" // 映射 this.count 为 store.state.count
    ]),
    ...mapState({
      count11: "count", // 传字符串参数 'count' 等同于 `state => state.count
      count1: state => state.foo.count,
      aaa: state => {
        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        // 这里用了箭头函数，访问不了this
        // console.log(this); //undefined
        return state.foo.fooaaa;
      },
      bbb(state) {
        return state.foo.foobbb;
      }
    }),
    barmsg() {
      return this.msg;
    }
  }
};
</script>

```

## mapGetters 辅助函数

```vue
<template>
  <div>
    <!-- getter1:我是全局的getter1 -->
    <h2>getter1:{{getter111}}</h2>
    <!-- foogetter1:999 -->
    <h2>foogetter1:{{foogetter1}}</h2>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      msg: "我是msg"
    };
  },
  computed: {
    ...mapGetters({
      getter111:'getter1' //把 `this.getter111` 映射为 `this.$store.getters.getter1`
    }),
    ...mapGetters([
      'foogetter1'
    ]),
    barmsg() {
      return this.msg;
    }
  }
};
</script>

```

## mapMutations 辅助函数

```vue
<template>
  <div id="app">
    <router-link to="/foo">foo</router-link>
    <br />
    <router-link to="/bar">bar</router-link>
    <br />
    <button @click="mutationBtn">mutation+10</button>
    <button @click="add(10)">add(10)</button>
    <button @click="add1(10)">add1(10)</button>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapMutations({
      add1: "add", // 将 `this.add1()` 映射为 `this.$store.commit('add')`
    }),
    ...mapMutations([
      "add", // 将 `this.add()` 映射为 `this.$store.commit('add')`
      "foo/add" // 将 `this['foo/add']()` 映射为 `this.$store.commit('foo/add')`
      // `mapMutations` 也支持载荷：
      // "add" // 将 `this.add(amount)` 映射为 `this.$store.commit('add', amount)`
    ]),
    mutationBtn() {
      this.add(10);
      //this["foo/add"](10);
    }
  }
};
</script>

```

## mapActions 辅助函数

```vue
<template>
  <div id="app">
    <router-link to="/foo">foo</router-link>
    <br />
    <router-link to="/bar">bar</router-link>
    <br />
    <button @click="actionBtn">action+100</button>
    <button @click="add2(100)">add2(100)</button>
    <button @click="asyncAdd(100)">asyncAdd(100)</button>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions({
      add2: "asyncAdd" // 将 `this.add2()` 映射为 `this.$store.dispatch('asyncAdd')`
    }),
    ...mapActions([
      "asyncAdd" // 将 `this.asyncAdd()` 映射为 `this.$store.dispatch('asyncAdd')`
      // `mapActions` 也支持载荷：
      // "asyncAdd" // 将 `this.asyncAdd(amount)` 映射为 `this.$store.dispatch('asyncAdd', amount)`
    ]),
    actionBtn() {
      this.add2(100);
      // this.$store.dispatch("asyncAdd", 100);
    }
  }
};
</script>

```

## modules命名空间

```js
import mutations from 'store/foo/mutations.js'
import actions from 'store/foo/actions.js'
import getters from 'store/foo/getters.js'

const foo = {
    // 使用命名空间
    namespaced: true,
    state: {
        count: 999,
        fooaaa: 100,
        foobbb: 200,
        fooccc: 300,
    },
    getters,
    // 同步
    mutations,
    // 异步
    actions
}

export default foo;
```



> 默认不开启命名空间，当调用模块里面的mutation或action时（模块内的getters不能和全局的getters重复），如果全局里面也有这个mutation或action，会都执行。
>
> ​	使用了命名空间后，mutation和action的操作要带上模块名，不带模块名默认执行的是全局的mutation或action。

```js
//访问全局的add
this.$store.commit('add', amount)
//访问foo模块的add
this.$store.commit('foo/add', amount)
```



### 在全局命名空间内分发 action 或提交 mutation

> 将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。

```js
modules: {
  foo: {
    namespaced: true,

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
      
        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

### 在带命名空间的模块注册全局 action

> 若需要在带命名空间的模块注册全局 action，你可添加 `root: true`，并将这个 action 的定义放在函数 `handler` 中。

```js
modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
```

