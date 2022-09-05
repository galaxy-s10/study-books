console.log('getBoundingClientRect实现');

// 懒加载
function lazy() {
  // 获取页面高度
  let windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  // 获取所有img标签
  var imgs = document.querySelectorAll('img');
  // 延迟加载图片
  for (let i = 0; i < imgs.length; i++) {
    // 获取每个img标签距离body的高度
    let top = imgs[i].getBoundingClientRect().top;
    /**
     * 如果图片相对屏幕的top值大于屏幕的高度，则代表没出现在屏幕
     */
    if (top > 0 && top <= windowHeight) {
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
