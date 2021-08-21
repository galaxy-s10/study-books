# 省略号

## 显示一行，省略号

```css
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
word-break: break-all;
```

##  显示两行，省略号

```css
text-overflow: -o-ellipsis-lastline;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
line-clamp: 2;
-webkit-box-orient: vertical;
```

