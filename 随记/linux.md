# free 命令

```bash
# 普通free
free
# 用mb显示
free -m
# 用byte显示
free -b
# 更友好的显示
free -h
#每隔一秒输出一次
free -s 1
#每隔一秒友好输出一次
free -hs 1
```



# ls命令

列出目标目录中所有的子目录和文件。

`-a`, `–all` 列出目录下的所有文件，包括以 `.` 开头的隐含文件。
`-A`同`-a`，但不列出“`.`”(表示当前目录)和“`..`”(表示当前目录的父目录)。

```bash
[root@VM-12-2-centos vue3-blog-server]# ls -a
.         CHANGELOG.md      .eslintignore  .gitignore        package.json     .prettierrc.js  tsconfig.json
..        .commitlintrc.js  .eslintrc.js   .husky            pm2.sh           README.md       .versionrc.js
build.sh  .editorconfig     .git           .lintstagedrc.js  .prettierignore  src             .vscode
[root@VM-12-2-centos vue3-blog-server]# ls -A
build.sh          .editorconfig  .git        .lintstagedrc.js  .prettierignore  src            .vscode
CHANGELOG.md      .eslintignore  .gitignore  package.json      .prettierrc.js   tsconfig.json
.commitlintrc.js  .eslintrc.js   .husky      pm2.sh            README.md        .versionrc.js
```



# grep命令

##  搜索一个文件，最普通模式

```bash
[root@VM-12-2-centos vue3-blog-server]# grep git /node/test.sh 
git
```

## 递归搜索一个目录下的所有文件

```bash
[root@VM-12-2-centos vue3-blog-server]# grep git /node/sh/
grep: /node/sh/: 是一个目录
[root@VM-12-2-centos vue3-blog-server]# grep -r git /node/sh/
/node/sh/frontend.sh:# Github: https://github.com/galaxy-s10
/node/sh/frontend_env.sh:# Github: https://github.com/galaxy-s10
/node/sh/node.sh:# Github: https://github.com/galaxy-s10
/node/sh/node.sh:        cp -r $(ls -A $WORKSPACE | grep -v .git | xargs) $PUBLICDIR/$JOBNAME/$ENV/
/node/sh/node.sh:        cp -r $(ls -A $WORKSPACE | grep -v .git | xargs) $PUBLICDIR/$JOBNAME/$ENV/
/node/sh/node.sh:        cp -r $(ls -A $WORKSPACE | grep -v .git | xargs) $PUBLICDIR/$JOBNAME/
/node/sh/node.sh:        cp -r $(ls -A $WORKSPACE | grep -v .git | xargs) $PUBLICDIR/$JOBNAME/
```

## 从一个标准输入搜索关键字，从管道搜索

```bash
[root@VM-12-2-centos vue3-blog-server]# ls -a
.         CHANGELOG.md      .eslintignore  .gitignore        package.json     .prettierrc.js  tsconfig.json
..        .commitlintrc.js  .eslintrc.js   .husky            pm2.sh           README.md       .versionrc.js
build.sh  .editorconfig     .git           .lintstagedrc.js  .prettierignore  src             .vscode
[root@VM-12-2-centos vue3-blog-server]# ls -a | grep .vscode
.vscode
```

## 搜索时忽略大小写，使用-i

```bash
[root@VM-12-2-centos vue3-blog-server]# ls -a
.         CHANGELOG.md      .eslintignore  .gitignore        package.json     .prettierrc.js  tsconfig.json
..        .commitlintrc.js  .eslintrc.js   .husky            pm2.sh           README.md       .versionrc.js
build.sh  .editorconfig     .git           .lintstagedrc.js  .prettierignore  src             .vscode
[root@VM-12-2-centos vue3-blog-server]# ls -a | grep -i readme.md
README.md
```

## 搜索时排除某些关键字，使用-v

```bash
[root@VM-12-2-centos vue3-blog-server]# ls -A
build.sh          .editorconfig  .git        .lintstagedrc.js  .prettierignore  src            .vscode
CHANGELOG.md      .eslintignore  .gitignore  package.json      .prettierrc.js   tsconfig.json
.commitlintrc.js  .eslintrc.js   .husky      pm2.sh            README.md        .versionrc.js
[root@VM-12-2-centos vue3-blog-server]# ls -A | grep -v .git
build.sh
CHANGELOG.md
.commitlintrc.js
.editorconfig
.eslintignore
.eslintrc.js
.husky
.lintstagedrc.js
package.json
pm2.sh
.prettierignore
.prettierrc.js
README.md
src
tsconfig.json
.versionrc.js
.vscode
```

## 搜索时使用正则表达式，-E

```bash
[root@VM-12-2-centos vue3-blog-server]# ls -a
.         CHANGELOG.md      .eslintignore  .gitignore        package.json     .prettierrc.js  tsconfig.json
..        .commitlintrc.js  .eslintrc.js   .husky            pm2.sh           README.md       .versionrc.js
build.sh  .editorconfig     .git           .lintstagedrc.js  .prettierignore  src             .vscode
[root@VM-12-2-centos vue3-blog-server]# ls -a | grep -E '(eslint)\S+'
.eslintignore
.eslintrc.js
```



# ps命令

## linux 下获取占用内存资源最多的 10 个进程

```bash
ps -aux | sort -k4nr | head -10
```

## linux 下获取占用 CPU 资源最多的 10 个进程

```bash
ps aux|head -1;ps aux|grep -v PID|sort -rn -k +3|head
```

## linux 下获取占用内存资源最多的 10 个进程

```bash
ps aux|head -1;ps aux|grep -v PID|sort -rn -k +4|head
```

## 查看所有 node 进程

```bash
ps aux | grep node
```



# uname命令

## 显示计算机类型

```bash
[root@VM-12-2-centos vue3-blog-server]# uname -m
x86_64
```

## 显示计算机名

```bash
[root@VM-12-2-centos vue3-blog-server]# uname -n
VM-12-2-centos
```

## 显示操作系统名称

```bash
[root@VM-12-2-centos vue3-blog-server]# uname -s
Linux
```

## 显示操作系统发行编号

```bash
[root@VM-12-2-centos vue3-blog-server]# uname -r
4.18.0-305.3.1.el8.x86_64
```

# 系统相关

在linux系统的命令行中，~表示用户的家目录，超级用户为/root，普通用户为/home，比如我用root登录我的服务器，进去了是显示：[root@VM-12-2-centos ~]，当前的~就代表/root

## 查看系统版本

```bash
cat /etc/redhat-release
# 或者
cat /etc/os-release
```

## 查看系统是否有安装中文语言包

```bash
locale -a | grep zh
```

## 查看当前使用的系统语言

```bash
echo $LANG
```

## 设置语言

```bash
localectl set-locale LANG=zh_CN.utf8
```

## 查看系统默认shell

```bash
[root@VM-12-2-centos vue3-blog-server]# echo $SHELL
/bin/bash
```

## 查看所有shell

```bash
[root@VM-12-2-centos vue3-blog-server]# cat /etc/shells
/bin/sh
/bin/bash
/usr/bin/sh
/usr/bin/bash
```



## 重启系统

```bash
reboot
```



# 文件操作

## 查找文件

```bash
find / -name jenkins
```

## 删除文件

```bash
rm -rf a.txt
```

> - -f ：就是 force 的意思，忽略不存在的文件，不会出现警告信息；
>- -i ：互动模式，在删除前会询问使用者是否动作
> - -r ：递归删除啊！最常用在目录的删除了！这是非常危险的选项！！！
>

## 创建文件夹

```bash
mkdir -p /user/node/aaa/bbb/
```

> - -p ：帮助你直接将所需要的目录(包含上一级目录)递归创建起来！

## mv (移动文件与目录，或修改名称)

修改文件名称，将源文件名 source_file 改为目标文件名 dest_file

```bash
mv source_file(文件) dest_file(文件)
```

移动文件，将文件 source_file 移动到目标目录 dest_directory 中

```bash
mv source_file(文件) dest_directory(目录)	
```

目录名 dest_directory 已存在，将 source_directory 移动到目录名 dest_directory 中；

目录名 dest_directory 不存在则 source_directory 改名为目录名 dest_directory

```bash
mv source_directory(目录) dest_directory(目录)
```

## cp (复制文件或目录)

 .bashrc 复制到 /tmp 下，并命名为 bashrc

```bash
cp ~/.bashrc /tmp/bashrc
```



# 解压文件

```bashell
# 解压zip
unzip billd-react-6007.zip
# 压缩文件夹
tar cvf billd6006.tar billd6006
# 解压tar.gz
tar -zxvf aaaa.tar.gz
# 上传
rz
# 下载
sz xxx.zip
```



# 判断文件/目录是否存在

```bash
#!/usr/bin/env bash

Directory='/node/sh'
FileName='/node/test.sh'

# 判断目录是否存在
if [ ! -d "$Directory" ];then
echo "$Directory目录不存在"
else
echo "$Directory目录已存在"
fi


# 判断文件是否存在
if [ ! -f "$FileName" ];then
echo "$FileName文件不存在"
else
echo "$FileName文件已存在"
fi
```

# 判断是否安装pm2/pnpm/yarn等

```bash
#!/usr/bin/env bash

AppName='pm2'

if ! type $AppName >/dev/null 2>&1; then
  echo $AppName未安装 
else
  echo $AppName已安装
fi
```





# systemctl

```bash
# 列出所有可用单元 
systemctl list-unit-files

# 列出所有运行中单元 
systemctl list-units

# 列出所有失败单元 
systemctl --failed

# 检查某个单元（如 crond.service）是否启用 
systemctl is-enabledcrond.service 

# 列出所有服务 
systemctl list-unit-files –type=service

# Linux中如何启动、重启、停止、重载服务以及检查服务（如 httpd.service）状态 
systemctl start httpd.service
systemctl restart httpd.service
systemctl stop httpd.service
systemctl reload httpd.service
systemctl status httpd.service

# 查看服务是否运行
systemctl is-active mysqld.service

# 开机自启
systemctl enable mysqld.service

# 关闭开机自启
systemctl disable mysqld.service

# 屏蔽服务 
systemctl mask ntpdate.service

# 取消屏蔽服务 
systemctl unmask ntpdate.service

# 查看服务是否开机启动：
systemctl is-enabled mysqld.service

# 使用systemctl命令杀死服务 
systemctl killcrond 
```

# rpm

## help

```bash
rpm --help
```

## 查看已安装的mysql

```bash
[root@VM-12-2-centos vue3-blog-server]# rpm -qa | grep -i mysql
mysql-8.0.26-1.module_el8.4.0+915+de215114.x86_64
mysql80-community-release-el8-2.noarch
mysql-errmsg-8.0.26-1.module_el8.4.0+915+de215114.x86_64
mysql-common-8.0.26-1.module_el8.4.0+915+de215114.x86_64
mysql-server-8.0.26-1.module_el8.4.0+915+de215114.x86_64
```

## 卸载已安装的mysql

rpm -e [--nodeps] 包名

```bash
[root@VM-12-2-centos vue3-blog-server]# rpm -e mysql
mysql                      mysql-common               mysql-server               
mysql80-community-release  mysql-errmsg 
```



# yum

## help

```bash
# 查看帮助
rpm --help
# 查看yum版本
yum --version
# 或者
yum info yum
# 查看是否安装了unzip
yum info unzip
# 查看是否安装了lrzsz
yum info lrzsz
# 列出所有已安装的软件包
yum list installed
```

## 安装mysql

yum -y install与yum install有什么不同？如果使用`yum install xxxx`，会找到安装包之后，询问你`Is this OK[y/d/N]`，需要你手动进行选择。但是如果加上参数`-y`，就会自动选择`y`，不需要你再手动选择！同理，删除也是

```bash
yum install -y mysql-community-server
```

## 查看已安装的mysql

```bash
[root@VM-12-2-centos vue3-blog-server]# yum list installed | grep -i mysql
Repository epel is listed more than once in the configuration
mysql.x86_64                          8.0.26-1.module_el8.4.0+915+de215114              @AppStream
mysql-common.x86_64                   8.0.26-1.module_el8.4.0+915+de215114              @AppStream
mysql-errmsg.x86_64                   8.0.26-1.module_el8.4.0+915+de215114              @AppStream
mysql-server.x86_64                   8.0.26-1.module_el8.4.0+915+de215114              @AppStream
mysql80-community-release.noarch      el8-2 
```

## 卸载已安装的mysql

```bash
[root@VM-12-2-centos vue3-blog-server]# yum remove mysql
mysql80-community-release.noarch  mysql-errmsg.x86_64               mysql.x86_64
mysql-common.x86_64               mysql-server.x86_64 
```



# 清除 buff/cache

https://linux265.com/news/3818.html

```bash
# 清除pagecache。
echo 1 > /proc/sys/vm/drop_caches
# 清除回收slab分配器中的对象（包括目录项缓存和inode缓存）。slab分配器是内核中管理内存的一种机制，其中很多缓存数据实现都是用的pagecache。
echo 2 > /proc/sys/vm/drop_caches
# 清除pagecache和slab分配器中的缓存对象。
echo 3 > /proc/sys/vm/drop_caches
# sync指令是为了防止内容丢失,Linux sync命令用于数据同步,sync命令是在关闭Linux系统时使用的。
sync;echo 3 > /proc/sys/vm/drop_caches
```



# 查看端口占用

https://www.runoob.com/w3cnote/linux-check-port-usage.html

```bashell
# 查看端口占用
lsof -i:8080
# 杀进程
kill -9 PID
```
