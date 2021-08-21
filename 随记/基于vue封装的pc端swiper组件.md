## 基于vue封装的pc端swiper组件

> 话不多说，直接上代码

## App.vue

```vue
<template>
  <div>
    <div class="container">
      <h2>Pc端轮播图</h2>
      <div v-if="imgList.length>0">
        <Swiper :delay="delay" :duration="duration" :mode="mode">
          <swiper-item v-for="(item,index) in imgList" :key="index">
            <img :src="item.img" alt height="300" />
          </swiper-item>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script>
// Pc端轮播图
import { Swiper, SwiperItem } from "./components/Swiper/index";
export default {
  name: "App",
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      imgList: [],
      mode: "vertical", // 轮播模式，默认：horizontal，可选：vertical
      delay: 1500, // 轮播间隔，默认1000
      duration: 400, // 动画时长，默认300
      moveRatio: 0.2, // 触控比率，默认0.3
    };
  },
  created() {},
  mounted() {
    fetch("/api/article/page?type=前端&nowpage=2&pagesize=5")
      .then((response) => response.json())
      .then((data) => {
        this.imgList = data.pagelist.rows;
      })
      .catch((e) => console.log("Oops, error", e));
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  margin: 100px auto 0;
  box-shadow: 0 0 4px 1px rgba(232, 237, 250, 0.5);
  border: 1px solid #ebebeb;
  border-radius: 3px;
  padding: 20px;
  box-sizing: border-box;
}
</style>

```

## components

### Swiper.vue

```vue
<template>
  <div>
    <div class="carousel" ref="carousel">
      <div class="panels" ref="panels">
        <slot></slot>
      </div>
      <div class="arrow">
        <i class="left-arrow"></i>
        <i class="right-arrow"></i>
      </div>
      <ul class="poins" ref="poins" v-if="allcount !=null">
        <li v-for="(item,index) in allcount" :key="index">
          <button></button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SwiperItem from "./SwiperItem";
export default {
  name: "Swiper",
  components: {
    SwiperItem,
  },
  props: {
    // 轮播间隔
    delay: {
      type: Number,
      default: 2000,
    },
    // 动画时长
    duration: {
      type: Number,
      default: 300,
    },
    // 轮播模式
    mode: {
      type: String,
      default: "horizontal",
    },
  },
  data() {
    return {
      allcount: null,
      animation: null,
    };
  },
  created() {},
  mounted() {
    var panels = this.$refs.panels;
    var poins = this.$refs.poins;
    this.allcount = panels.childNodes.length;
    panels.firstChild.classList.add("active");
    // 在刚页面加载完成的时候，this.$refs.poins是没有子元素的，
    // 因为allcount是页面加载完成后才获取的，有allcount后，才会开始进行v-for渲染dom元素，
    // 因此获取到allcount后，要等到dom更新完成了才能获取firstChild
    this.$nextTick(() => {
      // DOM更新了才执行
      this.$refs.poins.firstChild.classList.add("active");
      this.init();
    });
  },
  methods: {
    // init
    init() {
      this.timer = null;
      this.$root = this.$refs.carousel;
      this.$panels = this.$root.querySelectorAll(".panels div");
      this.$next = this.$root.querySelector(".arrow .right-arrow");
      this.$pre = this.$root.querySelector(".arrow .left-arrow");
      this.$poins = this.$root.querySelectorAll(".poins li");
      const css = ($node, newStyle) => Object.assign($node.style, newStyle);
      let that = this;
      const animation = {
        // 垂直轮播
        vertical($from, $to, direction) {
          // 首先清空原本的style样式，然后再自定义样式，因为如果不先清空style，
          // 会导致第二轮轮播的时候，之前设置的setTimeout的样式先执行css()，这时候就会出问题，
          // 所以应该在每次轮播时，先清空之前的style，再重新设置css()和setTimeout
          $from.style = "";
          $to.style = "";
          css($from, {
            transform: `translateY(0)`,
            zIndex: 10,
          });
          css($to, {
            transform: `translateY(${direction === "pre" ? "-" : ""}100%)`,
            zIndex: 10,
          });
          setTimeout(() => {
            css($from, {
              transform: `translateY(${direction === "next" ? "-" : ""}100%)`,
              transition: that.duration + "ms",
            });
          }, 0);
          setTimeout(
            () =>
              css($to, {
                transform: `translateY(0)`,
                transition: that.duration + "ms",
              }),
            0
          );
        },
        // 水平轮播
        horizontal($from, $to, direction) {
          $from.style = "";
          $to.style = "";
          css($from, {
            transform: `translateX(0)`,
            zIndex: 10,
          });
          css($to, {
            transform: `translateX(${direction === "pre" ? "-" : ""}100%)`,
            zIndex: 10,
          });
          setTimeout(
            () =>
              css($from, {
                transform: `translateX(${direction === "next" ? "-" : ""}100%)`,
                transition: that.duration + "ms",
              }),
            0
          );
          setTimeout(
            () =>
              css($to, {
                transform: `translateX(0)`,
                transition: that.duration + "ms",
              }),
            0
          );
        },
      };
      this.animation = animation;
      this.loopStart();
      this.bindEvent();
    },
    // 绑定事件
    bindEvent() {
      this.$next.onclick = this.next.bind(this);
      this.$pre.onclick = this.pre.bind(this);
      this.$poins.forEach(($poin) => ($poin.onclick = this.goPage.bind(this)));
      // 循环轮播
      this.$root.onmouseover = () => clearInterval(this.timer);
      this.$root.onmouseleave = () => this.loopStart();
    },
    // 下一个
    next() {
      let fromIndex = this.getIndex();
      let toIndex = (fromIndex + 1) % this.$panels.length;
      this.setActive(toIndex);
      this.animation[this.mode](
        this.$panels[fromIndex],
        this.$panels[toIndex],
        "next"
      );
    },
    // 上一个
    pre() {
      let fromIndex = this.getIndex();
      let toIndex = (fromIndex - 1 + this.$panels.length) % this.$panels.length;
      this.setActive(toIndex);
      this.animation[this.mode](
        this.$panels[fromIndex],
        this.$panels[toIndex],
        "pre"
      );
    },
    // 指定轮播图
    goPage(e) {
      // 判断点击的dom对象是不是li,如果是li则直接返回target
      // 如果点击的是li下面的button,则返回button的父节点，即li
      const $clickNode =
        e.target.nodeName === "BUTTON" ? e.target.parentNode : e.target;
      // 查找当前点击的节点在poins的下标
      let toIndex = [...this.$poins].indexOf($clickNode);
      let fromIndex = this.getIndex();
      if (toIndex === fromIndex) return;
      if (fromIndex > toIndex) {
        this.animation[this.mode](
          this.$panels[fromIndex],
          this.$panels[toIndex],
          "pre"
        );
      } else {
        this.animation[this.mode](
          this.$panels[fromIndex],
          this.$panels[toIndex],
          "next"
        );
      }
      this.setActive(toIndex);
    },
    // 获取当前轮播图
    getIndex() {
      return [...this.$poins].indexOf(
        this.$root.querySelector(".poins li.active")
      );
    },
    // 设置当前轮播图
    setActive(index) {
      this.$poins.forEach(($poin) => $poin.classList.remove("active"));
      this.$poins[index].classList.add("active");
      this.$panels.forEach(($panel) => $panel.classList.remove("active"));
      this.$panels[index].classList.add("active");
    },
    // 开始轮播
    loopStart() {
      this.timer = setInterval(() => {
        this.next();
      }, this.delay);
    },
  },
};
</script>

<style scoped>
.carousel {
  position: relative;
  text-align: center;
  height: 300px;
  overflow: hidden;
  z-index: 30;
}
.carousel:hover .arrow i:nth-child(1) {
  left: 15px;
  opacity: 1;
}
.carousel:hover .arrow i:nth-child(2) {
  right: 15px;
  opacity: 1;
}
.carousel .panels:hover {
  cursor: pointer;
}
.carousel .panels .active {
  z-index: 10;
}
.carousel .arrow i {
  position: absolute;
  cursor: pointer;
  top: 50%;
  width: 36px;
  height: 36px;
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: rgba(10, 10, 10, 0.3);
  opacity: 0;
  transition: 0.3s;
  z-index: 30;
}
.carousel .arrow i:hover {
  background-color: rgba(20, 20, 20, 0.5);
}
.carousel .arrow .left-arrow {
  left: -20px;
}
.carousel .arrow .right-arrow {
  right: -20px;
}
.carousel .poins {
  position: absolute;
  margin: 0;
  padding: 0;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.carousel .poins li {
  display: inline-block;
  list-style: none;
  cursor: pointer;
  padding: 5px;
  z-index: 99;
}
.carousel .poins li button {
  cursor: pointer;
  opacity: 0.1;
  width: 30px;
  height: 3px;
  border: 0;
  outline: none;
  background-color: rgba(10, 10, 10);
  transition: 0.3s;
}
.carousel .poins li.active button {
  opacity: 0.5;
}
</style>

```

### SwiperItem.vue

```vue
<template>
  <div class="panels-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SwiperItem",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>
.panels-item {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.panels-item img {
  width: 100%;
  height: 100%;
}
</style>
```

### index.js

```js
import Swiper from './Swiper'
import SwiperItem from './SwiperItem'

export {
  Swiper, SwiperItem
}
```

