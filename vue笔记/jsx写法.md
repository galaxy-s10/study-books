# jsx

> vue使用render+jsx代替template！

## 使用jsx替换template

请将下面的template转换成render+jsx的形式：

```vue
// layoutCpt
<template>
  <div class="wrap">
    <slot></slot>
  </div>
</template>
```

请将下面的template转换成render+jsx的形式：

```vue
// layoutCpt
<template>
  <div class="wrap">
    <slot name="content"></slot>
  </div>
</template>
```

请将下面的template转换成render+jsx的形式：

```vue
// layoutCpt
<template>
  <div class="wrap">
    <slot>默认slot</slot>
  </div>
</template>
```

请将下面的template转换成render+jsx的形式：

```vue
// layoutCpt
<template>
  <div class="wrap">
    <slot name="content">默认content</slot>
  </div>
</template>
```

请将下面的template转换成render+jsx的形式：

```vue
// layoutCpt
<template>
  <div class="wrap">
    <slot name="content" v-bind="info">默认content</slot>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      info: {
        name: "hss",
        age: 22,
        sex: "man",
        hobby: ["code", "game"],
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

```



## 使用jsx替换slot

请将下面的template转换成render+jsx的形式：

```vue
<template>
  <div>
    <layout-cpt>
      我是layoutCpt组件
    </layout-cpt>
  </div>
</template>

<script>
import layoutCpt from "./components/layoutCpt.vue";
export default {
  components: {
    layoutCpt,
  },
  data() {
    return {};
  }
};
</script>
```

请将下面的template转换成render+jsx的形式：

```vue
<template>
  <div>
    <layout-cpt>
      <div slot="content">hello world!</div>
    </layout-cpt>
  </div>
</template>

<script>
import layoutCpt from "./components/layoutCpt.vue";
export default {
  components: {
    layoutCpt,
  },
  data() {
    return {};
  }
};
</script>
```

请将下面的template转换成render+jsx的形式：

```vue
<template>
  <div>
    <layout-cpt>
      <div slot="content" slot-scope="hhh">hello world!{{hhh}}</div>
    </layout-cpt>
  </div>
</template>

<script>
import layoutCpt from "./components/layoutCpt.vue";
export default {
  components: {
    layoutCpt,
  },
  data() {
    return {};
  }
};
</script>
```

## 综合性案例

### 案例1

```jsx
<slot name="node1" slot="node2" slot-scope="node2Val" :aaa="node2Val"></slot>
// 上述代码约等于
<template slot="node2" slot-scope="node2Val">
    <slot name="node1" :aaa="node2Val"></slot>
</template>
```

```jsx
<slot name="node1" slot="node2" slot-scope="node2Val" :aaa="node2Val">ddd</slot>
// 上述代码约等于
<template slot="node2" slot-scope="node2Val">
    <slot name="node1" :aaa="node2Val">ddd</slot>
</template>
```

```jsx
// layoutCpt
<template>
  <div>
    <hss-nav :list="navList">
      <!-- 实际效果是，如果调用了layoutCpt的node1插槽，就把内容渲染到hss-nav的node2上，
      如果没用调用node1，则约等于<template slot="node2"></template>,而又因为node1是属于layoutCpt的，
      只要定义了插槽就会显示，这里定义了node1插槽但是默认内容是空，所以在hss-nav的node2插槽上，就不会替换
      掉原本默认的node2内容；如果给node1默认值，<slot name="node1" :aaa="node2Val">ddd</slot>,因为只要
      是定义了插槽，就一定会显示，这里的node1是相对于layoutCpt的，所以定义了node1就一定会显示，它的默认
      内容是ddd，所以，调用layoutCpt时没有调用node1，也会显示这个默认的ddd，如果调用了node1,就会连同整个
      slot标签一起替换成调用时的内容 -->
      <!-- <slot name="node1" slot="node2" slot-scope="node2Val" :aaa="node2Val">
      </slot> -->

      <!-- template的slot-scope="node2Val"，是获取到hss-nav的node2插槽的props-->
      <template slot="node2" slot-scope="node2Val">
        <!-- 然后将获取到的hss-nav的node2插槽的props传给layoutCpt组件的node1插槽，这样在调用layoutCpt组件，并
        使用了node1插槽时，就可以通过slot-scope获取到layoutCpt的node1插槽props，即再layoutCpt就可以获取到hss-nav组件
        下面的node2插槽props！！！ -->
        <slot name="node1" :aaa="node2Val"></slot>
      </template>
    </hss-nav>
  </div>
</template>
```

### 案例2

将下面的template转换成render+jsx

```vue
// layoutCpt.vue
<template>
  <div>
    <hss-nav :list="navList">
      <!-- 实际效果是，如果调用了layoutCpt的node1插槽，就把内容渲染到hss-nav的node2上，
      如果没用调用node1，则约等于<template slot="node2"></template>,而又因为node1是属于layoutCpt的，
      只要定义了插槽就会显示，这里定义了node1插槽但是默认内容是空，所以在hss-nav的node2插槽上，就不会替换
      掉原本默认的node2内容；如果给node1默认值，<slot name="node1" :aaa="node2Val">ddd</slot>,因为只要
      是定义了插槽，就一定会显示，这里的node1是相对于layoutCpt的，所以定义了node1就一定会显示，它的默认
      内容是ddd，所以，调用layoutCpt时没有调用node1，也会显示这个默认的ddd，如果调用了node1,就会连同整个
      slot标签一起替换成调用时的内容 -->
      <!-- <slot name="node1" slot="node2" slot-scope="node2Val" :aaa="node2Val">
      </slot> -->

      <!-- template的slot-scope="node2Val"，是获取到hss-nav的node2插槽的props-->
      <template slot="node2" slot-scope="node2Val">
        <!-- 然后将获取到的hss-nav的node2插槽的props传给layoutCpt组件的node1插槽，这样在调用layoutCpt组件，并
        使用了node1插槽时，就可以通过slot-scope获取到layoutCpt的node1插槽props，即再layoutCpt就可以获取到hss-nav组件
        下面的node2插槽props！！！ -->
        <slot name="node1" :aaa="node2Val"></slot>
      </template>
    </hss-nav>
  </div>
</template>
```

实现入下：

```jsx
render() {
    return (
      <div>
          <hss-nav
            list={this.navList}
            scopedSlots={{
              node2: (props) => {
                console.log("使用了content", props);
                console.log(this.$slots);
                return (
                  <a-vue-fragment>{this.$scopedSlots.node1({aaa:props})}</a-vue-fragment>
                )
              },
            }}
          >
          </hss-nav>
      </div>
    );
}
```

```jsx
  render() {
    return (
      <div>
        <hss-nav
          list={this.navList}
          // scopedSlots={{
          //   node2: (props) => {
          //     console.log("使用了content", props);
          //     console.log(this.$slots);
          //     return (
          //       <a-vue-fragment>{this.$scopedSlots.node1({aaa:props})}</a-vue-fragment>
          //     )
          //   },
          // }}
        >
          <slot name="node2">
            这样写的意思是在layoutCpt组件内部定义了一个叫node2的具名插槽，但是这个node2插槽是写在hss-nav组件里面的，
            这样写其实是有问题的，因为这个node2插槽是定义在hss-nav里面的，如果hss-nav这个组件没有定义slot，这个node2组件
            就相当于没用了，因为即使别人调用layoutCpt组件时，使用了node2插槽，但是这个插槽写在了里面，其实是写在了slot="default"里，
            如果hss-nav组件里面没有写这个slot标签（默认即slot="default"）,这个layoutCpt的node2插槽内容在hss-nav里面找不到位置放，
            就不会渲染！
          </slot>
          <div slot="node2" slot-scoped="sss">
            这样的意思是使用hss-nav里面的node2插槽，但是拿不到slot-scoped！
          </div>
        </hss-nav>
        <div slot="node11" slot-scope="ssg">
          这样的意思是使用layoutCpt里面的node1插槽
        </div>
        <slot name="qqq">这样写不生效，jsx不认slot组件(slot其实就是vue的一个内置组件)，会渲染成一个slot标签</slot>


        下面的括号this.$slots.qqq就生效了约等于template里的slot name="qqq",缺点是不能定义默认的qqq内容，但是jsx可
        以灵活的曲线救国，因为现在的需求是想要如果调用了qqq插槽就使用qqq插槽，如果没有调用，就给显示qqq插槽默认内容
        {this.$slots.qqq}
        {this.$slots.bbb || <div>我是bbb默认的内容</div>}
      </div>
    );
  },
```

### 案例3

将下面代码的template转成render+jsx：

```vue
<template>
  <div>
    <div class="slot2-wrap">
      <slot name="node" treeNode="treeNode" nodeIcon="nodeIconStyle">
        <i>sfs</i>
        <div class="xxx">3245</div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {},
};
</script>
```

实现：

```jsx
<script>
export default {
  components: {},
  data() {
    return {};
  },
  render() {
    return (
      <div>
        <div class="slot2-wrap">
          {this.$scopedSlots.node ? (
            this.$scopedSlots.node({
              treeNode: "treeNode",
              nodeIcon: "nodeIcon",
            })
          ) : (
            <div>
              <i>sfs</i>
              <div class="xxx">3245</div>
            </div>
          )}
        </div>
      </div>
    );
  },
  computed: {},
  created() {},
  methods: {},
};
</script>
```

将下面代码的template转成render+jsx：

```vue
<template>
  <div>
    <div class="sgs">
      <hssslot>
        <div slot="node" slot-scope="xxx">xxx{{ xxx }}</div>
      </hssslot>
    </div>
  </div>
</template>

<script>
import hssslot from "./components/slot2.vue";

export default {
  components: {
    hssslot,
  },

  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
};
</script>

```

实现：

```jsx
<script>
import hssslot from "./components/slot2.vue";

export default {
  components: {
    hssslot,
  },
  data() {
    return {
      obj:{a:2}
    };
  },
  render() {
    return (
      <div class="sgs">
        <hssslot
          scopedSlots={{
            node: (props) => {
              console.log("使用nodenode插槽", props);
              return (
                // 注意：如果只写{props}会显示undefined,如果需要显示对象，就要将其转换为字符串！
                <div>
                  <div>xxx{JSON.stringify(props)}</div>
                </div>
              );
            },
          }}
        ></hssslot>
      </div>
    );
  },
  computed: {},
  created() {},
  mounted() {},
};
</script>

```

待更新！

# 遇到的奇怪问题

1，同一个modal组件（用jsx编写的），在通过.vue文件里面引入和通过.jsx文件引入，会有一些不同。应该和渲染方式有关，vue文件引入的时候，遇到超长文本会自动换行，但按道理是不会换行的。在jsx引入就正常，遇到超长文本不不会换行。

# 插槽

## 具名插槽

> this.$slots

- **类型**：`{ [name: string]: ?Array<VNode> }`
- **只读**
- **响应性**：否

可以通过 [`this.$slots`](https://cn.vuejs.org/v2/api/#vm-slots) 访问静态插槽的内容，每个插槽都是一个 VNode 数组：

所以，this.$slots拿到的是VNode数组

```jsx
<div>
    {this.$slots.default}
    {/* this.$slots.abc是一个VNode数组，如果父组件没用使用这个abc插槽，就会使用默认的abc插槽内容 */}
    {this.$slots.abc || <div>abc具名插槽默认值</div>}
    {this.$slots.nba || <div>nba具名插槽默认值</div>}
    {this.$slots.cba || <div>cba具名插槽默认值</div>}
</div>
```



## 作用域插槽

> this.$scopedSlots

- **类型**：`{ [name: string]: props => Array<VNode> | undefined }`

- **只读**

- **详细**：

  用来访问[作用域插槽](https://cn.vuejs.org/v2/guide/components-slots.html#作用域插槽)。对于包括 `默认 slot` 在内的每一个插槽，该对象都包含一个返回相应 VNode数组或者undefined的函数。

从this.$scopedSlots的类型看，它是一个对象，这个对象的键名是字符串，值是一个函数，而且这个函数返回VNode数组或者undefined

即this.$scopedSlots.xxx，xxx是一个函数，调用这个函数，会返回VNode数组或者undefined。

1. 如果父组件调用该组件的时候，使用了xxx插槽，那么该组件里面调用this.$scopedSlots.xxx就会得到一个VNode函数；
2. 如果父组件调用该组件的时候，没有使用了xxx插槽，那么该组件里面调用this.$scopedSlots.xxx就会得到undefined。

```jsx
<div>
    {this.$scopedSlots}
    {this.$scopedSlots}
    {this.$scopedSlots}
</div>
```

## 补充

### slot自从2.6.0后就废弃了！

```jsx
// 下面的slot是具名插槽,因为他在layout-cpt组件内部
<template>
	<div>
    <layout-cpt>
      <div class="hss-aside" slot="customAside">aside</div>
    </layout-cpt>
  </div>
</template>

// 下面的写法，slot就是一个自定义属性而已，因为它外层没有组件
<template>
	<div>
    <div class="hss-aside" slot="customAside">aside</div>
  </div>
</template>
```



```jsx
// 'v-slot' directive must be owned by a custom element
// v-slot指令必须在自定义元素上使用，即只能在组件上使用v-slot
<div class="hss-aside" v-slot="customAside">aside</div>
```

​	

```jsx
// slot-scoped需要用在组件内部，在非组件内部使用slot上使用不生效，而且会导致这个customAside插槽不渲染
<div style="display: flex">
  <div class="hss-article">article</div> 
  <slot class="hss-aside" name="customAside" slot-scope="info">aside{{info}}</slot>
</div>
```



### slot-scoped



# 样式

## class

## style

# 指令

# 事件

```jsx
<div
  // 如果未定义maskClosable或者设置maskClosable为true，点击遮罩都是会关闭modal
  vOn:click_self={this.maskClose} //vue官方jsx事件写法,事件修饰符用_连接，但不能用:，会报错
  // vOn:click={this.maskClose}
  // vOn:click:self={this.maskClose} //vue官方jsx事件写法,事件修饰符用_连接，但不能用:，会报错
  // on-click:self={this.maskClose} //约等于原生的事件,事件会生效，但添加修饰符不管用！
  // on-click_self={this.maskClose} //？？？沙雕写法直接不认
  // onClick:self={this.maskClose}   //约等于原生的事件,事件会生效，但添加修饰符不管用！
  // onClick_self={this.maskClose}   //？？？沙雕写法直接不认
  // on-click={(e) => this.maskClose(e)}  //判断e.target===e.currentTarget可实现部分需求，如：冒泡
>
  click
</div>
```

# 补充

```jsx
{/* 会渲染字符串3221 */}
{123 && '324' && 3221}
{/* 会渲染字符串0 */}
{this.treeNode.children.length && <i class="h3yun_All right-o"></i>}
{/* 会渲染i标签 */}
{!!this.treeNode.children.length && <i class="h3yun_All right-o"></i>}
{/* 会渲染i标签 */}
{this.treeNode.children.length ? <i class="h3yun_All right-o"></i>:''}
```



# 持续更新！

# 参考

https://github.com/vuejs/jsx

https://github.com/vuejs/babel-plugin-transform-vue-jsx

https://github.com/Thunberg087/vue-fragment

https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md
