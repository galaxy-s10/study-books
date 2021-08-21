# Vue图片路径问题

放置在 `public` 目录下或通过绝对路径被引用。这类资源将会直接被拷贝，而不会经过 webpack 的处理

```vue
<template>
  <div id="app">
   	<!-- 代表public里面的dom.jpg图片,最终会打包在根目录 -->
    <img src="/dom.jpg" width="100" height="100" alt />
    <!-- 代表public里面的dom.jpg图片,最终会打包在根目录下的img文件夹 -->
    <img src="/img/543.jpg" width="100" height="100" alt />
      
    <!-- 代表相对路径里assets里面的dom.jpg图片 -->
    <img src="./assets/dom.jpg" width="100" height="100" alt />
    <img :src="dom" width="100" height="100" alt />
      
    <!-- 代表public里面的dom.jpg图片 -->
    <img :src="`${srcc}dom.jpg`" width="100" height="100" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // src: require("./assets/dom.jpg"),
      // src: require("../public/dom.jpg"),
      srcc: "/",
      dom: require("../public/dom.jpg")
    };
  }
};
</script>

```

# publicPath

配置文件中的publicPath，默认值:/，如果打包后直接访问，会报路径错误，需要改成publicPath:'./'才可直接访问，如果上传服务器后，可加可不加

# @click绑定的事件加不加括号区别

**加与不加括号的区别在于事件对象参数 event 的处理。不加括号时，函数第一个参数为 event，加了括号后，需要手动传入 $event 才能获得事件对象**

**不管加不加括号，都可以在事件里直接访问event**

加括号：

```vue
<template>
  <div @click="itemClick(1,$event)">
  </div>
</template>

<script>
export default {
  methods: {
    itemClick(a, b) {
      console.log(a, b); //1,MouseEvent
      console.log(event === b); //true
    }
  }
};
</script>
```

不加括号：

```
<template>
  <div @click="itemClick">
  </div>
</template>

<script>
export default {
  methods: {
    itemClick(a, b) {
      console.log(a, b); //MouseEvent,undefined
      console.log(event === a); //true
    }
  }
};
</script>
```