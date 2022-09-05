console.log('IntersectionObserver实现');
// 获取所有img标签
const imgs = document.querySelectorAll('img');
//监听回调
const callback = (entries) => {
  entries.forEach((item) => {
    // 是否相交
    if (item.isIntersecting) {
      const ele = item.target;
      const imgSrc = ele.getAttribute('data-src');
      if (imgSrc) {
        ele.src = imgSrc;
        // 加载过清空路径，避免重复加载
        ele.removeAttribute('data-src');
      }
    }
  });
};
const imgObserver = new IntersectionObserver(callback);
imgs.forEach((item) => {
  imgObserver.observe(item);
});
