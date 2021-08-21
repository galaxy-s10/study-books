# 代码分割的三种方式

webpack 中以下三种常见的代码分割方式:

- 入口起点：使用 `entry` 配置手动地分离代码。

  ```js
  entry: { app: "./index.js", app1: "./index1.js" }
  ```

- 动态导入：通过模块的内联函数调用来分离代码。

  ```js
  import("./a");
  ```

- 防止重复：使用 `splitChunks` 去重和分离 chunk。

# splitChunks

## 例子1

main.js是入口文件，./js/jq是一个93kb的文件

> main.js代码如下：

```js
import './js/jq'    //同步导入，默认会打包到bundle.js，不会代码抽离(除非手动设置了splitChunks，且chunks为async，这样同步代码就不会分离了，但设置了会将异步代码进行分离)
// import $ from './js/jq'     //也是同步导入
console.logI('main.js')
```

如果不做任何配置，且mode也不是*production*，则会将./js/jq里的代码全部都打包到bundle.js里面，即只会生成一个文件，即主bundle.js

## 例子2

main.js是入口文件，./js/jq是一个93kb的文件，./js/little是一个1kb的文件

> main.js代码如下：

```js
import('./js/jq')   //异步导入，默认都会进行代码抽离(除非手动设置了splitChunks，且chunks为initial，这样异步代码就不会分离了，但设置了会将同步代码进行分离)
import('./js/little')   //异步导入，默认都会进行代码抽离
console.logI('main.js')
```

如果不做任何配置，且mode也不是*production*，则会将./js/jq和./js/little里的代码从bundle.js里面分别抽离出来，即会生成三个文件，一个主bundle.js，其余两个分别是抽离后的./js/jq文件和./js/little文件。从结果看可知道，如果不做任何配置，只要是异步导入，不管导入的文件多大，都会分别抽离出来一个单独的文件！

## 例子3

main.js是入口文件，./js/jq是一个93kb的文件，./js/little是一个1kb的文件

> main.js代码如下：

```js
import './js/jq'             //同步导入，默认会打包到bundle.js，不会代码抽离
```

> 配置文件代码如下：

```js
optimization: {
    splitChunks: {	//对入口文件进行代码分离
      chunks: "initial",	//对同步代码进行分离
      //minSize: 30000,	//表示分离出的chunk必须大于等于minSize。如果设置了mode: 'production'，miniSize默认就是30000！即使不设置mode: 'production'，也不手动设置miniSize，它默认也还是30000！
    }
},
```

当配置了上述代码后，且mode也不是*production*，此时main.js同步引入了一个大文件，而配置里也对同步代码进行分离，打包生成的结果应该是会有两个文件，一个是主bundle.js，另一个是抽离出来的./js/jq文件，而实际结果并不是！实际结果是只会生成一个主bundle.js！为什么明明配置文件里对同步代码进行分离，结果却对不上？因为还差一个属性没设置，看例子4

## 例子4

main.js是入口文件，./js/jq是一个93kb的文件，./js/little是一个1kb的文件

> main.js代码如下：

```js
import './js/jq'             //同步导入，默认会打包到bundle.js，不会代码抽离
```

> 配置文件代码如下：

```js
optimization: {
    splitChunks: {	//对入口文件进行代码分离
      chunks: "initial",	//对同步代码进行分离
      //minSize: 30000,	//表示分离出的chunk必须大于等于minSize。如果设置了mode: 'production'，miniSize默认就是30000！即使不设置mode: 'production'，也不手动设置miniSize，它默认也还是30000！
      maxSize: 40000,
    }
},
```

当配置了上述代码后，且mode也不是*production*，实际结果就是生成两个文件，一个主bundle.js，另一个是抽离出来的./js/jq文件。

## 例子5

main.js是入口文件，./js/jq是一个93kb的文件，./js/little是一个1kb的文件

> main.js代码如下：

```js
import('./js/jq')	//异步导入
```

> 配置文件代码如下：

```js
optimization: {
    splitChunks: {	//对入口文件进行代码分离
      chunks: "async",	//对异步代码进行分离
      //minSize: 30000,	//表示分离出的chunk必须大于等于minSize。如果设置了mode: 'production'，miniSize默认就是30000！即使不设置mode: 'production'，也不手动设置miniSize，它默认也还是30000！
      //maxSize: 40000,	//默认就会将异步代码抽离，因此设不设置maxSize都没影响
    }
},
```

当配置了上述代码后，且mode也不是*production*，实际结果会生成三个文件，一个主bundle.js，其余两个分别是抽离后的./js/jq文件和./js/little文件。虽然没有设置maxSize，但webpack默认都会对动态导入（即异步导入）进行分离，所以实际还是会将异步导入的./js/jq文件和./js/little分别抽离出来。

## minSize和maxSize

minSize和maxSize都表示拆分出来的文件大小，并不是拆分前的文件大小！

比如./js/twenty_kb.js是20kb，./js/fifty_kb.js是50kb，./js/sixty_kb.js是60kb

> main.js代码如下：

```js
import fifty_kb from './js/fifty_kb'  *//同步导入*
import sixty_kb from './js/sixty_kb'  *//同步导入*
```

> 配置文件：

```js
optimization: {
    splitChunks: {	//对入口文件进行代码分离
      chunks: "initial",	//对异步代码进行分离
      minSize: 30000,	
      //maxSize: 40000,
    }
},
```

如果不设置maxSize，则会将fifty_kb和sixty_kb都打包进bundle.js里，并不会将fifty_kb和sixty_kb从bundle.js中进行抽离！

如果设置了maxSize，如maxSize: 40000，再配合上面的minSize: 30000，则会将bundle.js里

## minChunks

- 它控制的是每个模块什么时候被抽离出去：当模块被**不同entry引用**的次数大于等于这个配置值时，才会被抽离出去。
- 它的默认值是1。也就是任何模块都会被抽离出去（入口模块其实也会被webpack引入一次）。

值得注意的是：设置minChunks是针对多入口的，因为如果只是单入口，不做任何配置的情况下，默认就是打包出一个bundle.js，然后会将这个bundle.js给引入到index.html里。即如果单入口，使用minChunks是没有用或者说没有意义的，因为：

1. webpack会对import的文件进行抽离，而es6中的import是编译时加载（或者静态加载）的，即如果只有一个入口文件，不管入口文件里面重复引入了多少次同一个模块，都是在这个入口文件编译时加载的，重复引入同一个模块不管多少次，都只会在进行一次编译时加载，因此，单入口设置这个minChunks没有意义
2. 如果是多入口，即会打包出多个bundle.js，多入口一般是配合HtmlWebpackPlugin来实现多页应用，这样每个入口文件都会打包成bundle.js，被引入到对应的一个页面中，这样的话，如果多个页面（即多个bundle.js）同时引入了同一个模块（模块a）的话，默认minChunks是1，即被引入一次就会被抽离，如果有三个入口文件，三个入口文件都引入同一个模块（模块a），那么，这个模块（模块a）就会被生成三次，三个入口文件引入自己生成的模块

# 重新记录

## filename

> 不建议全局设置filename，因为如果缓存组没有手动设置filename，默认缓存组会继承全局
> 的filename，这样在某些情况会显得很奇葩，比如：全局设置了chunks:'async'，filename:'[id]-asyncChunks.js'
> 而缓存组设置了一个chunks:'initial',且没有设置它的filename，那么最终打包会先匹配缓存组，然后匹配
> 到同步代码就抽离，然后设置filename，由于这个缓存组没有设置它的filename，因此会继承全局的filename，
> 因此就会把同步代码抽离后叫[id]-asyncChunks.js，虽然还是一样把代码抽离出来了，但是
> 抽离出来的文件和文件名"货不对板"，做不到见名知意，这样就很别扭了。因此如果设置设置了全局的filename，那
> 么最好就是每一个缓存组都设置自己的filename，这样就可以和全局的进行区分了

## cacheGroups

> 缓存组可以继承和/或覆盖来自 splitChunks.* 的任何选项
> 即如果匹配到缓存缓存组里的某一个，如vendor，vendor里的设置会对splitChunks的设置进行继承或覆盖
> 即vendor里没有设置chunks，vendor就会继承splitChunks的chunks，vendor设置了filename，会覆盖splitChunks的filename

### 优先级

> cacheGroups里定义的缓存组优先级比定义在splitChunks高，会先使用缓存组里的

```js
splitChunks: {
  chunks: 'all',
  minSize: 10 * 1024,
  maxSize: 10,   //不写maxSize默认就是0，这里为了测试使用一个比minSize小的值
  cacheGroups: {
    test: {
      chunks: 'all',
      filename: "[id]-test.js",
      maxSize: 20,
    },
  }
}
```

> 执行的时候会报警告：
>
> ```
> WARNING in SplitChunksPlugin
> Cache group test
> Configured minSize (19.5 KiB) is bigger than maxSize (20 bytes).
> This seem to be a invalid optimization.splitChunks configuration.
> 
> WARNING in SplitChunksPlugin
> Fallback cache group
> Configured minSize (19.5 KiB) is bigger than maxSize (10 bytes).
> This seem to be a invalid optimization.splitChunks configuration.
> 
> webpack 5.28.0 compiled with 2 warnings in 2193 ms
> ```
>
> 从警告可以看出，是先匹配splitChunks.cacheGroups里的test缓存组，报了个Cache group test警告，然后在匹配splitChunks全局的属性，再报Fallback cache group警告的！

如果缓存组里有设置*priority*，则优先匹配优先级高。这里并不是按照优先级从高到低的匹配，而是如果chunks匹配到多个缓存组，则使用优先级高的。至于是不是是不是先判断符不符合条件，符合条件了再判断优先级，这里不再研究了，反正最终结果就是如果chunks匹配到多个缓存组，则使用优先级高的！

```js
splitChunks: {
  chunks: 'all',
  minSize: 10 * 1024,
  maxSize: 10,   //不写maxSize默认就是0，这里为了测试使用一个比minSize小的值
  // filename: "[id]-splitChunks.js", //默认[name]-bundle.js
  cacheGroups: {
    test: {
      chunks: 'all',
      filename: "[id]-test.js",
      maxSize: 20,
      minChunks: 999, //至少被共享了多少次，这里为了测试写一个999，一般项目都不会被共享那么多次
      priority: -10
    },
    test2: {
      chunks: 'all',
      filename: "[id]-test2.js",
      maxSize: 20,
      priority: -20
    },
  }
}
```

> 执行的时候会报警告：
>
> ```
> WARNING in SplitChunksPlugin
> Cache group test2
> Configured minSize (19.5 KiB) is bigger than maxSize (20 bytes).
> This seem to be a invalid optimization.splitChunks configuration.
> 
> WARNING in SplitChunksPlugin
> Fallback cache group
> Configured minSize (19.5 KiB) is bigger than maxSize (10 bytes).
> This seem to be a invalid optimization.splitChunks configuration.
> 
> webpack 5.28.0 compiled with 2 warnings in 1687 ms
> ```
>
> 从警告可以看出，是先匹配到了缓存组里的test2，然后再匹配到全局splitChunks的。至于有没有匹配test，有两种可能，
>
> 如果是先判断条件，再判断优先级的话，那么就不会匹配到test，因为test条件不符合，直接就不会匹配它了，那么肯定就不会报警告了
>
> 如果是先判断优先级，再判断条件的话，那么就会匹配到test，因为test优先级最高，匹配到test后再判断条件，不符合条件，所以就不会执行，也不会报错了。
>
> 这里并不可以看出来有没有匹配到test，因为都没有报错，都有可能。但可以总结：**如果chunks符合多个缓存组条件时，优先使用优先级高的缓存组！**

### 规则

1. cacheGroups里定义的缓存组优先级比定义在splitChunks高，会先使用缓存组里的
2. 如果缓存组有多个对象，且都没有设置设置优先级，则按照顺序从上往下进行匹配，匹配到哪个符合条件就使用哪个
3. 如果缓存组里有设置*priority*，如果chunks同时匹配到多个缓存组，则使用优先级高的。

# 没有关联的代码不会打包进bundle

## 案例1

main.js

```js
var aaa = 'aaaaaaaaaaa'
```

最终打包并不会将aaa这个变量打包进bundle.js，因为这个变量是孤儿变量。和谁都没有关联！

## 案例2

lib/untils

```js
// es6导出
console.log('引入了untils.js')
var aaa = 123
var bbb = 234
export var name = 'tom'
export var sum = function (x, y) {
    console.log('我是sum', aaa)
    return x + y
}
function add(x, y) {
    console.log('我是add')
    return x + y
}
```

main.js

```js
import { sum } from './lib/utils.js'
console.log(sum, 999)
```

打包结果：只会将utils里的和sum有关的代码打包出来，其余东西不会打包，比如utils里定义但和导出的sum没有关联的bbb和add，还有虽然导出了但没有被引入的sum。最终打包结果就是只会将用到的sum打包到bundle里

## 案例3

lib/untils

```js
// es6导出
console.log('引入了untils.js')
var aaa = 123
var bbb = 234
export var name = 'tom'
export var sum = function (x, y) {
    console.log('我是sum', aaa)
    return x + y
}
function add(x, y) {
    console.log('我是add')
    return x + y
}
```

main.js

```js
import { sum } from './lib/utils.js'
```

打包结果：什么都没有，因为引入了sum，但是并没有使用它！

## 案例4

```js
output: {
  filename: '[name]-bundle.js', //入口文件打包生成后的文件的文件名
  chunkFilename: "[name]-[hash:6]-bundle-chunk.js", //入口文件中，符合条件的代码，被抽离出来后生成的文件的文件名
  path: path.resolve(__dirname, '../dist'),
  assetModuleFilename: "assets/[name]-[hash:6].[ext]", //静态资源生成目录（不管什么资源默认都统一生成到这里,除非单独设置了generator）
 // publicPath: "/abc" //output的publicPath建议与devServer的publicPath一致
},
splitChunks: {
  chunks: 'all',
  minSize: 10 * 1024,
  maxSize: 10,   //不写maxSize默认就是0，这里为了测试使用一个比minSize小的值
  filename: "[id]-splitChunks.js", //默认[name]-bundle.js
  cacheGroups: {
    // 这里动态代码会匹配到这里，会使用[id]-test.js作为文件名
    // 注释了test缓存组后，动态代码就会使用output.chunkFilename或output.filename
    // test: {  
    //   chunks: 'all',
    //   filename: "[id]-test.js",
    //   priority: -30
    // },
  }
}
```

main.js

```js
import('./js/jq').then(res=>{
    console.log('加载jq')
})
```

如果是动态导入，默认是一定会将它单独打包成一个独立文件的，即最后会将这个独立文件采用output的chunkFilename作为文件名，如果没有设置chunkFilename，就使用output的filename作为文件名。但是如果设置了缓存组，且符合缓存组的条件，就会根据缓存组的filename作为文件名！

但如果没有设置缓存组，就直接会使用output的chunkFilename/filename，并不会使用splitChunks.filename！！！



