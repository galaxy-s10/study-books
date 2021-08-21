# react-transition-group 

```bash
npm instrall react-transition-group 
```

## CSSTransition

CSSTransition执行过程中，有三个状态：appear、enter、exit

它们有三种状态，需要定义对应的CSS样式： 

第一类，开始状态：对于的类是-appear、-enter、exit

第二类：执行动画：对应的类是-appear-active、-enter-active、-exit-active

第三类：执行结束：对应的类是-appear-done、-enter-done、-exit-done

```react
import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group';
import { Button } from 'antd';
import './CSSTransition.css'

export default class CSSTransitonDemo extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isShow: true
        }
    }
    onChangeClick() {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    render() {
        const { isShow } = this.state
        return (
            <div>
                <Button type="primary" onClick={() => this.onChangeClick()}>切换</Button>
                <div>
                    <CSSTransition
                        in={isShow}
                        classNames='avatar'
                        timeout={1000}
                        appear
                    // unmountOnExit={true}
                    >
                        <img src="http://xsili-dev.oss-cn-shenzhen.aliyuncs.com/vl/img/6ae2ad9f7c3d4bc2bc8edb21c1a4b6d1.jpg" width="50"></img>
                    </CSSTransition>
                </div>

            </div>
        )
    }
}
```

> 过渡动画顺序：
> 1，浏览器刷新，默认true，显示，首先添加avatar-apper，然后添加avatar-apper-acticve，显示动画结束后添加avatar-apper-done，同时，也添加avatar-enter-done
>
> 2，点击切换，为false，隐藏，首先添加avatar-exit，然后添加avatar-exit-active，最后隐藏动画结束后添加avatar-exit-done
>
> 3，再次点击切换，为true，显示，首先添加avatar-enter，然后添加avatar-enter-active，最后显示动画结束后添加avatar-enter-done

## SwitchTransition

## TransitionGroup