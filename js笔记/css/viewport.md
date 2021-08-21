# meta

## viewport

viewport 是指 web 页面上用户的可见区域。

viewport 的大小是和设备相关的，在移动端例如手机上，viewport 的大小是比 PC 端要小的，一般无论手机还是平板，默认的 viewport 大小都是 980px（不设置meta标签里的viewport，body的宽度默认就是980px） 。

CSS 中的 100% 就等于 device-width

默认移动端适配

```html
<!-- 设置了width=device-width，默认body宽度就是设备最理想的 viewport 宽度 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

![viewport](E:\js笔记\css\viewport.png)