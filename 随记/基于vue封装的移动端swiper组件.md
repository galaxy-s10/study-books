## 基于vue封装的移动端swiper组件

> 直接上代码！

## App.vue

```vue
<template>
  <div>
    <div class="container">
      <h2>移动端轮播图</h2>
      <div v-if="imgList.length>0">
        <Swiper :delay="delay" :duration="duration" :moveRatio="moveRatio">
          <swiper-item v-for="(item,index) in imgList" :key="index">
            <img :src="item.img" alt height="200" />
          </swiper-item>
        </Swiper>
      </div>
    </div>

  </div>
</template>

<script>
// 移动端轮播图
import { Swiper, SwiperItem } from "./components/SwiperApp/index";


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

## Swiper.vue

```vue
<template>
  <div>
    <div class="carousel" ref="carousel">
      <div
        class="panels"
        ref="panels"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
        <slot></slot>
      </div>
      <!-- <div class="arrow">
        <i class="left-arrow"></i>
        <i class="right-arrow"></i>
      </div>-->
      <ul class="poins" ref="poins" v-if="allcount !=null">
        <li v-for="(item,index) in allcount" :key="index" :class="{active: index == currentIndex}">
          <div></div>
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
    // 触控比率
    moveRatio: {
      type: Number,
      default: 0.3,
    },
  },
  data() {
    return {
      allcount: null,
      animation: null,
      swiperWidth: null,
      currentIndex: 0,
      startX: 0,
      scrolling: false,
    };
  },

  created() {},
  mounted() {
    var panels = this.$refs.panels;
    this.swiperWidth = panels.offsetWidth;
    var poins = this.$refs.poins;
    this.allcount = panels.childNodes.length;
    panels.style.transform = `translate3d(-${this.swiperWidth}px, 0, 0)`;
    // panels.firstChild.classList.add("active");
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
    touchStart: function (e) {
      // 停止定时器
      clearInterval(this.timer);

      // 保存开始滚动的位置
      this.startX = e.touches[0].pageX;
    },

    touchMove: function (e) {
      // 1.计算出用户拖动的距离
      let currentX = e.touches[0].pageX;
      // 移动的距离
      this.moveDistance = currentX - this.startX;
      let currentPosition = -(this.currentIndex + 1) * this.swiperWidth;
      let position = this.moveDistance + currentPosition;
      // 2.设置当前的位置
      this.$panels.style.transform = `translate3d(${position}px, 0, 0)`;
    },

    touchEnd: function (e) {
      let lastDistance = Math.abs(this.moveDistance);
      if (lastDistance == 0) {
        return;
      } else if (
        this.moveDistance > 0 &&
        lastDistance > this.swiperWidth * this.moveRatio
      ) {
        // 右边移动超过this.moveRatio
        // console.log("右边移动超过this.moveRatio");
        this.pre();
      } else if (
        this.moveDistance < 0 &&
        lastDistance > this.swiperWidth * this.moveRatio
      ) {
        // 左边移动超过this.moveRatio
        // console.log("左边移动超过this.moveRatio");
        this.next();
      } else {
        if (this.moveDistance > 0) {
          // console.log("右边移动不超过0.3");
          if (this.currentIndex + 1 == this.allcount) {
            let position = -this.swiperWidth * (this.currentIndex + 1);
            this.animate(position);
          } else {
            this.currentIndex++;
            this.pre();
          }
        } else {
          // console.log("左边移动不超过0.3");
          this.currentIndex--;
          this.next();
        }
      }
      this.loopStart();
    },
    // init
    init() {
      this.timer = null;
      this.$root = this.$refs.carousel;
      this.$panels = this.$root.querySelector(".panels");
      this.$panelsItem = this.$root.querySelectorAll(".panels div");
      // this.$poins = this.$root.querySelectorAll(".poins li");
      // 3.如果大于1个, 那么在前后分别添加一个slide
      if (this.allcount > 1) {
        let cloneFirst = this.$panelsItem[0].cloneNode(true);
        let cloneLast = this.$panelsItem[this.allcount - 1].cloneNode(true);
        this.$panels.insertBefore(cloneLast, this.$panelsItem[0]);
        this.$panels.appendChild(cloneFirst);
      }
      const css = ($node, newStyle) => Object.assign($node.style, newStyle);
      this.loopStart();
      // this.bindEvent();
    },
    // 绑定事件
    bindEvent() {
      this.$next.onclick = this.next.bind(this);
      this.$pre.onclick = this.pre.bind(this);
      // 循环轮播
      this.$root.onmouseover = () => clearInterval(this.timer);
      this.$root.onmouseleave = () => this.loopStart();
    },
    // 下一个
    next() {
      this.scrolling = true;
      let currentIndex = this.currentIndex;
      let nextIndex = (this.currentIndex + 1) % this.$panelsItem.length;
      this.currentIndex = nextIndex;
      if (currentIndex <= this.allcount) {
        let position = -this.swiperWidth * (currentIndex + 1 + 1);
        this.animate(position);
      }
      if (currentIndex + 1 == this.allcount) {
        setTimeout(() => {
          let position = -this.swiperWidth;
          this.$panels.style.transform = `translate3d(${position}px, 0, 0)`;
        }, this.duration);
      }
      setTimeout(() => {
        this.scrolling = false;
      }, this.duration);
    },
    // 上一个
    pre() {
      this.scrolling = true;
      let currentIndex = this.currentIndex;
      let preIndex =
        (this.currentIndex - 1 + this.$panelsItem.length) %
        this.$panelsItem.length;
      this.currentIndex = preIndex;

      // pre = 3
      if (preIndex == this.allcount - 1) {
        this.animate(0);
        setTimeout(() => {
          let position = -this.swiperWidth * this.allcount + 1;
          this.$panels.style.transform = `translate3d(${position}px, 0, 0)`;
        }, this.duration);
      } else {
        // pre =012
        let position = -this.swiperWidth * (preIndex + 1);
        this.animate(position);
      }
      setTimeout(() => {
        this.scrolling = false;
      }, this.duration);
    },
    // 动画
    animate(position) {
      this.$panels.style.transition = `transform ${this.duration}ms ease 0s`;
      this.$panels.style.transform = `translate3d(${position}px, 0, 0)`;
      setTimeout(() => {
        this.$panels.style.transition = `all 0ms ease 0s`;
      }, 100);
    },
    // 开始轮播
    loopStart() {
      this.timer = setInterval(() => {
        this.$panels.style.transform = `translate3d(-${this.swiperWidth}px, 0, 0)`;
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
  overflow: hidden;
  z-index: 30;
}
.carousel .panels {
  display: flex;
  width: 100%;
  height: 100%;
}
.carousel .panels .active {
  z-index: 10;
}
.carousel .poins {
  position: absolute;
  margin: 0;
  padding: 0;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  z-index: 999;
}
.carousel .poins li {
  display: inline-block;
  list-style: none;
  padding: 0 5px;
  z-index: 99;
}
.carousel .poins li div {
  display: block;
  opacity: 0.1;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(10, 10, 10);
  transition: 0.3s;
}
.carousel .poins li.active div {
  opacity: 0.5;
}
</style>
```

## SwiperItem.vue

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
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 10;
}
.panels-item img {
  width: 100%;
}
</style>
```

