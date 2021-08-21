# blur

当一个元素失去焦点时会触发`blur`事件.

在IE中,几乎所有类型的元素都可以触发blur事件,但在基于gecko的浏览器中,大部分元素都不能触发blur事件.

```js
element.onblur = function() { alert("检测到onblur事件!"); };
```

# focus

当前元素获得键盘焦点时会触发`focus`事件.

在IE中,几乎所有类型的元素都会触发`focus`事件, 但在Gecko中,只有少数几种类型的元素会触发`focus`事件.

```js
element.onfocus = function(){}
```

# touchstart

当一个或多个触摸点与触控设备表面接触时触发`touchstart` 事件。

```html
<div id="target2" ontouchstart="startTouch(event)"> Touch me ... </div>
```

