console.log('计算offsetTop实现');

// 懒加载
function lazy() {
  // 获取页面滚动条卷去的高度
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  // 获取页面高度
  let windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  // 获取所有img标签
  var imgs = document.querySelectorAll('img');

  for (let i = 0; i < imgs.length; i++) {
    // 获取每个img标签距离body的高度
    let imgOffsetTop = imgs[i].offsetTop;
    console.log(imgOffsetTop, scrollTop);
    /**
     * 1.如果img标签距离body的高度小于(页面高度+被卷去的高度)，则代表当前img标签在可视区域，则加载图片
     * 2.由于如果从最底部加载的话，最开头的图片一定符合上面的条件，
     * 因此要判断img标签距离body的高度有没有大于滚动的高度，大于滚动高度了才加载图片
     */
    if (imgOffsetTop < windowHeight + scrollTop && imgOffsetTop >= scrollTop) {
      const imgSrc = imgs[i].getAttribute('data-src');
      // 如果有data-src属性，将它的值赋给src
      if (imgSrc) {
        imgs[i].src = imgSrc;
        // 赋值后data-src就没用了，移除掉它
        imgs[i].removeAttribute('data-src');
      }
    }
  }
}

// 刚进首页不触发滚动事件，因此要先加载一次
lazy();

// 监听滚动事件
window.addEventListener('scroll', lazy);
