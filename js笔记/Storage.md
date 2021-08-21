# localStorage

localStorage 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去除。

```js
<script>
    localStorage.setItem('name', '张三')
    localStorage.age = 18
    localStorage['sex'] = '男'
    localStorage.obj = JSON.stringify({ name: '小明' })
    console.log(localStorage.name)  //张三
    console.log(localStorage.getItem('age'));   //18
    console.log(localStorage['sex'])        //男
    console.log(JSON.parse(localStorage.obj))   //{name: "小明"}
    localStorage.removeItem('age')
    console.log(localStorage.age);  //undefined
    console.log(localStorage.key(0));   //obj
    console.log(localStorage.key(1));   //name
    console.log(localStorage.key(2));   //sex
    // window.localStorage.clear()
    // console.log(localStorage);   //Storage {length: 0}
</script>
```



# sessionStorage

sessionStorage 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。

方法和localStorage基本相同

