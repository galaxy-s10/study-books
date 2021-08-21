## animate封装

话不多说，直接上代码：

```js
/**
 * obj 必选，要操作的dom对象
 * json 必选，{},要操作属性，如果是opacity，范围还是0-1;
 * interval 必选，时间间隔
 * callback 可选，回调函数
 */
function animate(obj, json, interval, callback) {
    clearInterval(obj.timer);
    if (json.hasOwnProperty('opacity')) {
        json['opacity'] = json['opacity'] * 100
    }
    obj.timer = setInterval(function () {
        console.log('setInterval');
        var flag = true;
        for (var attr in json) {
            var now = 0;
            if (attr === 'opacity') {
                // 获取原本的opacity是个小数，直接parseInt结果是0,因此这里给它扩大100倍再parseInt
                now = parseInt(getStyle(obj, attr) * 100);
            }
            else {
                now = parseInt(getStyle(obj, attr));
            }
            // step是每次变化的步长,步长越大(即stepNum越小),动画总时长越短
            let stepNum = 6
            var step = (json[attr] - now) / stepNum
            // 计算step的时候，如果step是正零点几的时候让他等于1，如果step是负零点几的时候，让他等于0
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            var sum = now + step;
            if (attr == 'opacity') {
                //前面扩大了几倍，这里就要缩小几倍
                obj.style.opacity = sum / 100;
            } else {
                obj.style[attr] = sum + 'px';
            }
            if (now !== sum) {
                // 只要有一个没有运动到位就不会清除定时器
                flag = false;
            }
            // 不能加else,否则只要有一项完成了，就清除定时器了
            // else{
            //     flag = true
            // }

        }
        if (flag) {
            clearInterval(obj.timer);
            // 如果有传回调函数就调用回调函数
            callback && callback();
        }
    }, interval)
}

function getStyle(obj, name) {
    if (window.getComputedStyle) {
        // 非ie
        return window.getComputedStyle(obj, null)[name];
    }
    else {
        // ie
        return obj.currentStyle[name];
    }
}


```

