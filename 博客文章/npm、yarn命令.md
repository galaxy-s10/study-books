# 查看 npm 全局安装过的包

```sh
npm list -g --depth=0
```

# 查看 yarn 全局安装过的包

```sh
yarn global list --depth=0
```

# yarn 装包

```sh
yarn add vue
yarn remove vue
yarn global remove vue
```

# npm 装包

```sh
npm i vue
npm uninstall vue
npm remove vue -g
```

# npm 和 yarn 缓存

npm:

```sh
# 查看缓存目录
npm config get cache
# 清除缓存
npm cache clean --force
# 设置缓存目录
npm config set cache "F:\ProgramFile\nodejs\node_module\node_cache"
# 验证缓存文件夹的内容, 删除不需要的, 并验证缓存索引和所有缓存数据的完整性
npm cache verify
```

yarn:

```sh
# 查看缓存目录
yarn cache dir
# 运行命令会清理缓存包，若未指定包名则会全部清理，指定则清理指定包。
yarn cache clean [<module_name...>]
# 设置缓存目录，注意要先清理包在重新配置目录，否则会使之前的缓存无法清除
yarn config set cache-folder
```

# 代理

```sh
# npm设置代理
npm config set proxy=http://127.0.0.1:8087
npm config set https-proxy http://127.0.0.1:8087
# npm取消代理
npm config delete proxy
npm config delete https-proxy
# yarn设置代理
yarn config set proxy=http://127.0.0.1:8087
yarn config set https-proxy http://127.0.0.1:8087
# yarn取消代理
yarn config delete proxy
yarn config delete https-proxy
```

# 镜像

```sh
# npm设置镜像
npm config set registry=http://registry.npmjs.org
# yarn设置镜像
npm config set registry=http://registry.npmjs.org
```

# .npmrc

```
# 将所有依赖提升到最外层
shamefully-hoist=true
# 设置淘宝镜像
registry=https://registry.npm.taobao.org/
# 设置@billd*包使用的镜像
@billd:registry=http://registry.hsslive.cn/
# https://sharp.pixelplumbing.com/install#chinese-mirror
sharp_libvips_binary_host=https://npmmirror.com/mirrors/sharp-libvips
sharp_binary_host=https://npmmirror.com/mirrors/sharp
```
