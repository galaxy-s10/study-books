# 组件销毁后，所有的的副作用都不会继续触发？？？

# 错误案例

```react
import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [interValTimer, setInterValTimer] = useState(null);
  const initQueue = () => {
    const timer = setInterval(() => {
      console.log('123');
    }, 100);
    setInterValTimer(timer);
  };

  useEffect(() => {
    initQueue();
    return () => {
      // 因为这个useEffect的依赖数组是[],即只会在渲染的时候执行一次，执行的时候interValTimer是null
      console.log('组件销毁了', interValTimer); // 组件销毁了 null
      clearInterval(interValTimer); // 其实这样清除不了定时器
    };
  }, []);

  return (
    <div>
      <div>
        <Link to="/login">login</Link>
      </div>
      测试清除定时器副作用
    </div>
  );
};

export default memo(Home);

```

# 正确案例

```react
import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [interValTimer, setInterValTimer] = useState(null);
  const initQueue = () => {
    const timer = setInterval(() => {
      console.log('123');
    }, 100);
    setInterValTimer(timer);
    return timer;
  };

  useEffect(() => {
    const timer = initQueue();
    return () => {
      // 因为这个useEffect的依赖数组是[],即只会在渲染的时候执行一次，执行的时候interValTimer是null
      console.log('组件销毁了', timer); // 组件销毁了 3
      clearInterval(timer); // 这样可以清除定时器
    };
  }, []);

  return (
    <div>
      <div>
        <Link to="/login">login</Link>
      </div>
      测试清除定时器副作用
    </div>
  );
};

export default memo(Home);

```
