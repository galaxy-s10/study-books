# df 命令（磁盘相关）

```bash
# 查看磁盘剩余空间
df -hl
# 查看每个根路径的分区大小
df -h
```

# du 命令（磁盘相关）

**du** 的英文原义为 **disk usage**

```bash
# 显示xxx文件所占空间
du xxx
# 返回当前目录的大小
du -sh
# 返回xxx目录的大小
du -sh xxx
# 返回xxx文件夹总M数
du -sm xxx
# 查看xxx文件夹下的所有文件大小（包含子文件夹）
du -h xxx
```

# free 命令（内存相关）

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

# ls 命令（文件相关）

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

# grep 命令（查找相关）

## 搜索一个文件，最普通模式

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

# ps 命令（进程相关）

ps （英文全拼：process status）命令用于显示当前进程的状态，类似于 windows 的任务管理器。

ps有很多选项。在支持[SUS](https://zh.wikipedia.org/wiki/单一UNIX规范)和[POSIX](https://zh.wikipedia.org/wiki/POSIX)标准的[操作系统](https://zh.wikipedia.org/wiki/操作系统)上，ps常以选项**-ef**运行，其中“-e”选择每一个（**e**very）进程，“-f”指定“完整”（**f**ull）输出格式。这些系统上的另一个常见选项是**-l**，它指定“长”（**l**ong）输出格式。

## -A

显示所有进程。

```bash
[root@VM-12-2-centos node]# ps -A
    PID TTY          TIME CMD
      1 ?        00:00:06 systemd
      2 ?        00:00:00 kthreadd
      3 ?        00:00:00 rcu_gp
      4 ?        00:00:00 rcu_par_gp
```

## -e

显示所有进程。约等于 `-A`

```bash
[root@VM-12-2-centos node]# ps -e
    PID TTY          TIME CMD
      1 ?        00:00:06 systemd
      2 ?        00:00:00 kthreadd
      3 ?        00:00:00 rcu_gp
```

## -f

全格式。

```bash
[root@VM-12-2-centos node]# ps -f
UID          PID    PPID  C STIME TTY          TIME CMD
root      127494  127262  0 23:26 pts/9    00:00:00 /bin/bash --init-file /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/out/vs/workbench/contrib/terminal/browser/media/shellIntegration-bash.sh
root      128996  127494  0 23:36 pts/9    00:00:00 ps -f
[root@VM-12-2-centos node]# 
```

## -ef

```bash
[root@VM-12-2-centos node]# ps -ef
UID          PID    PPID  C STIME TTY          TIME CMD
root           1       0  0 3月23 ?       00:00:06 /usr/lib/systemd/systemd --switched-root --system --deserialize 18
root           2       0  0 3月23 ?       00:00:00 [kthreadd]
root           3       2  0 3月23 ?       00:00:00 [rcu_gp]
root           4       2  0 3月23 ?       00:00:00 [rcu_par_gp]
root           6       2  0 3月23 ?       00:00:00 [kworker/0:0H-events_highpri]
root           9       2  0 3月23 ?       00:00:00 [mm_percpu_wq]
root          10       2  0 3月23 ?       00:00:01 [ksoftirqd/0]
```

## aux

由于历史原因，大多数源自BSD的系统无法接受SUS和POSIX的标准选项（例如，“e”或“-e”选项将显示[环境变量](https://zh.wikipedia.org/wiki/环境变量)）。在这样的系统中，ps常使用辅助非标准选项**aux**，其中“a”列出了一个[终端](https://zh.wikipedia.org/wiki/終端)上的所有进程，包括其他用户运行的，“x”列出所有没有控制终端的进程，“u”添加了一列显示每个进程的控制用户。需要注意的是，为了最大的兼容性，使用此语法时“aux”前没有“-”。此外，在aux之后添加“ww”可以显示进程的完整信息，包括所有的参数，例如“ps auxww”。

```bash
[root@VM-12-2-centos node]# ps aux
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.2 250500 10764 ?        Ss   3月23   0:06 /usr/lib/systemd/systemd --switched-root --system --deserialize 18
root           2  0.0  0.0      0     0 ?        S    3月23   0:00 [kthreadd]
root           3  0.0  0.0      0     0 ?        I<   3月23   0:00 [rcu_gp]
root           4  0.0  0.0      0     0 ?        I<   3月23   0:00 [rcu_par_gp]
root           6  0.0  0.0      0     0 ?        I<   3月23   0:00 [kworker/0:0H-events_highpri]
root           9  0.0  0.0      0     0 ?        I<   3月23   0:00 [mm_percpu_wq]
```



# sort命令（排序相关）



#### 获取占用内存资源最多的 10 个进程

```bash
ps -aux | sort -k4nr | head -10
```

#### 获取占用 CPU 资源最多的 10 个进程

```bash
ps aux|head -1;ps aux|grep -v PID|sort -rn -k +3|head
```

#### 获取占用内存资源最多的 10 个进程

```bash
ps aux|head -1;ps aux|grep -v PID|sort -rn -k +4|head
```

## 查看所有 node 进程

```bash
ps -ef | grep node
```

## 查看某个进程 id

```bash
ps -ef | grep 进程id
```

# uname 命令（系统相关）

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

在 linux 系统的命令行中，~表示用户的家目录，超级用户为/root，普通用户为/home，比如我用 root 登录我的服务器，进去了是显示：[root@VM-12-2-centos ~]，当前的~就代表/root

## 查看系统版本

```bash
cat /etc/redhat-release
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

## 查看系统默认 shell

```bash
[root@VM-12-2-centos vue3-blog-server]# echo $SHELL
/bin/bash
```

## 查看所有 shell

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
> - -i ：互动模式，在删除前会询问使用者是否动作
> - -r ：递归删除啊！最常用在目录的删除了！这是非常危险的选项！！！

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

## 解压文件

```bash
# 解压zip
unzip billd-react-6007.zip
# 压缩文件夹
tar cvf billd6006.tar billd6006
# 解压tar.gz
tar -zxvf aaaa.tar.gz
```

## 上传/下载

```bash
# 本地上传文件到服务器
rz
# 从服务器下载文件
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

# 判断是否安装 pm2

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

# 软连接

```sh
# 建立软连接
ln -s /qshell_t/qshell /usr/local/bin/qshell
# 删除软连接
rm -rf /usr/local/bin/qshell
```

# 开启 swap

```sh
# 新建一个专门的文件用于swap分区（4g）
dd if=/dev/zero of=/swap bs=1024 count=4194304
# 通过mkswap命令将上面新建出的文件做成swap分区
mkswap /swap
# 挂载swap文件
swapon /swap
# 取消挂载swap
swapoff /swap
# 开机自动挂载swap分区
编辑：/etc/fstab，末尾加上/swap swap swap defaults 0 0
```

# 查看日志

日志储存位置：/var/log/

```sh
/var/log/message ---------------------------------------系统启动后的信息和错误日志

/var/log/secure ------------------------------------------与安全相关的日志信息

/var/log/maillog ------------------------------------------与邮件相关的日志信息

/var/log/cron ----------------------------------------------与定时任务相关的日志信息

/var/log/spooler ------------------------------------------与UUCP和news设备相关的日志信息

/var/log/boot.log -----------------------------------------守护进程启动和停止相关的日志消息

/var/log/wtmp ---------------------------------------------永久记录每个用户登录、注销及系统的启动、停机的事件

/var/run/utmp ---------------------------------------------记录当前正在登录系统的用户信息

/var/log/btmp ----------------------------------------------记录失败的登录尝试信息
```

通过：`cat messages | grep oom` 命令，可以查看系统的内存溢出记录。

# 查看端口占用

https://www.runoob.com/w3cnote/linux-check-port-usage.html

```bash
# 查看端口占用
lsof -i:8080
# 杀进程
kill -9 PID
```
