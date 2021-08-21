# 路由跳转方式

## 声明式跳转

声明式跳转就是在router-link标签上添加

to="{name:'home',params{id:1,age:18}}"，类似于post

或 to="{path:'/home',query{id:1,age:18}}"，类似于get，/home?id=1&age=18

## 编程式跳转

$router : 是路由操作对象，只写对象 

```js
// this.$router.push("/home");
// this.$router.push({ path: "/home" });
// this.$router.push({ name: "ihome" });
this.$router.push({ name: "ihome", query: { age: 18, name: "张三" } });
// this.$router.push({ path: "/home", query: { age: 19, name: "李四" } });
```

$route : 路由信息对象，只读对象

```js
console.log(this.$route.query);
console.log(this.$route.params);
```

# 传参方式

## 字符串形式

```js
this.$router.push("/show")
```

## 对象形式

```js
this.$router.push({ path: "/show" })
```

## 命名路由

```js
this.$router.push({ name: "ishow", params: { showid:999,showtitle:'title' }})
```

## 带查询参数

/show?showid=999&showtitle=title

```js
this.$router.push({ path:'/show',query:{showid:999,showtitle:'title'} })
```

**注意：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 `name` 或手写完整的带有参数的 `path`：**

```js
this.$router.push({ path:`/show/999/title` })
this.$router.push({ name: "ishow", params: { showid:999,showtitle:'title' }})

// 这里的params不生效，只会匹配/show
this.$router.push({ path:'/show',params:{showid:999,showtitle:'title'} })
```

## 区别

使用query的话，地址栏一定会带上参数，?showid=999&showtitle=title&aaa=aaa

使用params的话，相当于设置router的参数：/show/999/title

值得注意的是，使用params传参只能使用name进行引入，如路由是/home/:id/:title这种形式的，要使用{name:'home',params{id:1,title:18}}

# 案例：

## 路由


```js
import VueRouter from 'vue-router'
import Vue from 'vue';

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/about',
            name: 'iabout',
            component: () => import('@/components/about'),
        },
        {
            path: '/home',
            name: 'ihome',
            component: () => import('@/components/home'),
        },
        {
            //path: '/show',
            path: '/show/:showid/:showtitle',
            name: 'ishow',
            component: () => import('@/components/show'),
        }
    ]
})
export default router
```

## 跳转


```vue
<!-- 可以匹配path: '/show/:showid/:showtitle'，用params获取参数。 -->
<!-- 匹配不了path: '/show' -->
<router-link :to="{path:'/show/999/title'}">aaa</router-link>

<!-- 可以匹配path: '/show/:showid/:showtitle'，用params获取参数 -->
<!-- 当匹配path: '/show'时，跳转的时候可以匹配，但是刷新就没了。 -->
<router-link :to="{name:'ishow',params:{showid:999,showtitle:'title'}}">aaa</router-link>

<!-- 可以匹配path: '/show'，用params获取参数 -->
<!-- 当匹配path: '/show/:showid/:showtitle'时，跳转的时候可以匹配，但是刷新就没了。 -->
<router-link :to="{name:'ishow',query:{showid:999,showtitle:'title'}}">aaa</router-link>

<!-- 可以匹配path: '/show'，但获取不了参数 -->
<!-- 不可以匹配path: '/show/:showid/:showtitle' -->
<router-link :to="{path:'/show',params:{showid:999,showtitle:'title'}}">aaa</router-link>

<!-- 可以匹配path: '/show'，可通过query获取参数，刷新可还在 -->
<!-- 不可以匹配path: '/show/:showid/:showtitle' -->
<router-link :to="{path:'/show',query:{showid:999,showtitle:'title'}}">aaa</router-link>
```

