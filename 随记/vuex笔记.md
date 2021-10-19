## modules

###  命名空间

​		默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的——这样使得多个模块能够对同一 mutation 或 action 作出响应。

> 注意：只要加了命名空间，访问模块内的state就得带上模块名！

​		如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import article from './modules/article'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 在这里加命名空间无效，加了也是白加
    // namespaced:true,
    modules: {
        app,
        article,
    },
    mutations: {
        editTitle(state, payload) {
            console.log('index-editTitle');
        },
    },

})

export default store
```



app.js

```js
const app = {
    state: {
    },
    mutations: {
        editTitle(state, payload) {
            console.log('app-EditTile');
        },
    },
    actions: {

    },

}

export default app
```



article.js

```js
const article = {
    state: {
    },
    mutations: {
        editTitle(state, payload) {
            console.log('article-editTitle');
        },
    },
    actions: {

    },

}

export default article
```

> app和article都使用了modules，但都没有使用命名空间namespaced:true，因此，调用它们的时候，index，app，article的editTitle都会执行

```js
this.$store.commit('editTitle')
```

结果：

> index-editTitle
> appEditTile
> article-editTitle

如果给article添加命名空间namespaced:true，那么article的editTitle就要通过 `this.$store.commit('article/editTitle')` 调用。



## ...mapState

​		如果要使用...mapState('article',['title'])，来访问article里面的title，article必须开启命名空间，否则只能通过 `this.$store.state.article.title` 访问

## ...mapMutations

​		开启命名空间后，即可使用...mapMutations('article',['editTitle'])，通过this.editTitle操作article里面的editTitle。...mapActions，...mapGetters同理