# React

### 父子组件传值

#### 写法一：bind绑定this

```jsx
class XiaojiejieItem extends Component {
    render() {
        return (
            <li onClick={this.delItem.bind(this)}>{this.props.list}</li>
        );
    }
    delItem() {
        console.log(this.props.index)
    }
}
```

#### 写法二：构造函数

```jsx
class XiaojiejieItem extends Component {
    constructor(props){
        super(props)
    	this.delItem = this.delItem.bind(this)

    }
    render() {
        return (
            <li onClick={this.delItem}>{this.props.list}</li>
        );
    }
    delItem(){
        console.log(this.props.index)
    }
}

```

#### 写法三：箭头函数

```jsx
class XiaojiejieItem extends Component {
    render() {
        return (
            <li onClick={this.delItem}>{this.props.list}</li>
        );
    }
    delItem = () => {
        console.log(this.props.index)
    }
}
```



### onClick点击事件传参

#### 写法一：bind绑定

```jsx
{this.state.list.map((item, index) => {
    return (
        <li key={index} onClick={this.delItem.bind(this, index)}>
            {item}
        </li>
    )
})}

delItem(e,index) {
	console.log(e,index)
}
```



#### 写法二：箭头函数

```jsx
{this.state.list.map((item, index) => {
    return (
        <li key={index} onClick={() => { this.delItem(index) }}>
            {item}
        </li>
    )
})}

delItem(index) {
	console.log(index)
}
```

