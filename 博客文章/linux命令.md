# df 命令（磁盘相关）

报告文件系统磁盘空间的使用情况

## -h 人类可读

--human-readable，用人类可读的格式（也就是常见的格式）显示出大小(例如:1K 234M 2G)

```bash
[root@VM-12-2-centos node]# df -h
文件系统        容量  已用  可用 已用% 挂载点
devtmpfs        1.9G     0  1.9G    0% /dev
tmpfs           1.9G     0  1.9G    0% /dev/shm
tmpfs           1.9G  508K  1.9G    1% /run
tmpfs           1.9G     0  1.9G    0% /sys/fs/cgroup
/dev/vda1        79G   48G   28G   64% /
tmpfs           374M     0  374M    0% /run/user/0
[root@VM-12-2-centos node]#
```

## -l 本地文件

--local，只显示本地文件系统使用状况

```bash
[root@VM-12-2-centos node]# df -l
文件系统          1K-块     已用     可用 已用% 挂载点
devtmpfs        1897644        0  1897644    0% /dev
tmpfs           1912952        0  1912952    0% /dev/shm
tmpfs           1912952      508  1912444    1% /run
tmpfs           1912952        0  1912952    0% /sys/fs/cgroup
/dev/vda1      82503044 50073552 28973988   64% /
tmpfs            382588        0   382588    0% /run/user/0
[root@VM-12-2-centos node]#
```

# du 命令（磁盘相关）

du(Disk Usage) - 报告磁盘空间使用情况

## --max-depth 指定深度

查看当前目录下的，所有文件和目录

```bash
[root@VM-12-2-centos node]# du --max-depth=1
864     ./billd-ui
8276    ./react18-blog-client
255912  ./vue3-blog-server
561524  ./nuxt-blog-client
28400   ./billd-live-server
8292    ./react17-webpack5-template
2820    ./vue3-blog-admin
2412    ./overview
4347136 ./backups
5328    ./netease-cloud-music
8228    ./vue3-webpack5-template
201420  ./netease-cloud-music-api
44      ./sh
232     ./multi-env-project
429600  ./next-blog-client
56      ./lang
972     ./billd-monorepo
5919556 .
[root@VM-12-2-centos node]#
```

## -h 人类可读

```bash
[root@VM-12-2-centos node]# du --max-depth=1 -h
864K    ./billd-ui
8.1M    ./react18-blog-client
250M    ./vue3-blog-server
549M    ./nuxt-blog-client
28M     ./billd-live-server
8.1M    ./react17-webpack5-template
2.8M    ./vue3-blog-admin
2.4M    ./overview
4.2G    ./backups
5.3M    ./netease-cloud-music
8.1M    ./vue3-webpack5-template
197M    ./netease-cloud-music-api
44K     ./sh
232K    ./multi-env-project
420M    ./next-blog-client
56K     ./lang
972K    ./billd-monorepo
5.7G    .
[root@VM-12-2-centos node]#
```

## -s 总和

--summarize， 对每个参数只显示总和。

```bash
[root@VM-12-2-centos node]# du -s
5919556 .
[root@VM-12-2-centos node]# du -s -h
5.7G    .
[root@VM-12-2-centos node]#
```

## -m 兆字节

--megabytes，输出以兆字节的块为计数单位的大小(就是 1,048,576 字节)。

```bash
[root@VM-12-2-centos node]# du -s -m
5781    .
[root@VM-12-2-centos node]# du -s -m -h
5.7G    .
[root@VM-12-2-centos node]#
```

# free 命令（内存相关）

## -h 人类可读

```bash
[root@VM-12-2-centos node]# free -h
              total        used        free      shared  buff/cache   available
Mem:          3.6Gi       2.8Gi       127Mi       1.0Mi       709Mi       548Mi
Swap:         4.0Gi       341Mi       3.7Gi
[root@VM-12-2-centos node]#
```

## -m 单位为 M

-m 显示内存的单位为 M

```bash
[root@VM-12-2-centos node]# free -m
              total        used        free      shared  buff/cache   available
Mem:           3736        2899         131           1         704         548
Swap:          4095         341        3754
[root@VM-12-2-centos node]#
```

## -k 单位为 KB

-k 显示内存的单位为 KB

```bash
[root@VM-12-2-centos node]# free -k
              total        used        free      shared  buff/cache   available
Mem:        3825904     2969488      130172        2040      726244      561092
Swap:       4194300      349972     3844328
[root@VM-12-2-centos node]#
```

## -s 轮训

-s<时间> 每隔指定时间执行一次命令，单位为 s

```bash
[root@VM-12-2-centos node]# free -h -s 1
              total        used        free      shared  buff/cache   available
Mem:          3.6Gi       2.8Gi       125Mi       1.0Mi       709Mi       546Mi
Swap:         4.0Gi       341Mi       3.7Gi

              total        used        free      shared  buff/cache   available
Mem:          3.6Gi       2.8Gi       127Mi       1.0Mi       709Mi       549Mi
Swap:         4.0Gi       341Mi       3.7Gi

              total        used        free      shared  buff/cache   available
Mem:          3.6Gi       2.8Gi       126Mi       1.0Mi       709Mi       548Mi
Swap:         4.0Gi       341Mi       3.7Gi

^C
[root@VM-12-2-centos node]#
```

## -c 打印次数

-c 重复打印几次后退出

```bash
[root@VM-12-2-centos node]# free -h -s 1 -c 3
              total        used        free      shared  buff/cache   available
Mem:          3.6Gi       2.8Gi       125Mi       1.0Mi       709Mi       546Mi
Swap:         4.0Gi       341Mi       3.7Gi

              total        used        free      shared  buff/cache   available
Mem:          3.6Gi       2.8Gi       123Mi       1.0Mi       709Mi       545Mi
Swap:         4.0Gi       341Mi       3.7Gi

              total        used        free      shared  buff/cache   available
Mem:          3.6Gi       2.8Gi       124Mi       1.0Mi       709Mi       545Mi
Swap:         4.0Gi       341Mi       3.7Gi
[root@VM-12-2-centos node]#
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

## -a

--all，不隐藏任何以. 开始的项目

```bash
[root@VM-12-2-centos billd-ui]# ls -a
.  ..  404.html  assets  component  index.html  logo.png  theme
[root@VM-12-2-centos billd-ui]#
```

## -A

--almost-all，列出除. 及.. 以外的任何项目

```bash
[root@VM-12-2-centos billd-ui]# ls -A
404.html  assets  component  index.html  logo.png  theme
[root@VM-12-2-centos billd-ui]#
```

## -l

使用较长格式列出信息

```bash
[root@VM-12-2-centos billd-ui]# ls -l
总用量 40
-rw-r--r-- 1 root root  2395 2月  23 13:06 404.html
drwxr-xr-x 5 root root  4096 2月  23 13:06 assets
drwxr-xr-x 5 root root  4096 2月  23 13:06 component
-rw-r--r-- 1 root root  5986 2月  23 13:06 index.html
-rw-r--r-- 1 root root 13178 2月  23 13:06 logo.png
drwxr-xr-x 2 root root  4096 2月  23 13:06 theme
[root@VM-12-2-centos billd-ui]#
```

## -h 人类可读

```bash
[root@VM-12-2-centos billd-ui]# ls -l -h
总用量 40K
-rw-r--r-- 1 root root 2.4K 2月  23 13:06 404.html
drwxr-xr-x 5 root root 4.0K 2月  23 13:06 assets
drwxr-xr-x 5 root root 4.0K 2月  23 13:06 component
-rw-r--r-- 1 root root 5.9K 2月  23 13:06 index.html
-rw-r--r-- 1 root root  13K 2月  23 13:06 logo.png
drwxr-xr-x 2 root root 4.0K 2月  23 13:06 theme
[root@VM-12-2-centos billd-ui]#
```

# ps 命令（进程相关）

ps （英文全拼：process status）命令用于显示当前进程的状态，类似于 windows 的任务管理器。

ps 有很多选项。在支持[SUS](https://zh.wikipedia.org/wiki/单一UNIX规范)和[POSIX](https://zh.wikipedia.org/wiki/POSIX)标准的[操作系统](https://zh.wikipedia.org/wiki/操作系统)上，ps 常以选项**-ef**运行，其中“-e”选择每一个（**e**very）进程，“-f”指定“完整”（**f**ull）输出格式。这些系统上的另一个常见选项是**-l**，它指定“长”（**l**ong）输出格式。

## -A 所有进程

显示所有进程。

```bash
[root@VM-12-2-centos node]# ps -A
    PID TTY          TIME CMD
      1 ?        00:00:06 systemd
      2 ?        00:00:00 kthreadd
      3 ?        00:00:00 rcu_gp
      4 ?        00:00:00 rcu_par_gp
```

## -e 所有进程

显示所有进程。约等于 `-A`

```bash
[root@VM-12-2-centos node]# ps -e
    PID TTY          TIME CMD
      1 ?        00:00:06 systemd
      2 ?        00:00:00 kthreadd
      3 ?        00:00:00 rcu_gp
```

## -f 全格式

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

由于历史原因，大多数源自 BSD 的系统无法接受 SUS 和 POSIX 的标准选项（例如，“e”或“-e”选项将显示[环境变量](https://zh.wikipedia.org/wiki/环境变量)）。在这样的系统中，ps 常使用辅助非标准选项**aux**，其中“a”列出了一个[终端](https://zh.wikipedia.org/wiki/終端)上的所有进程，包括其他用户运行的，“x”列出所有没有控制终端的进程，“u”添加了一列显示每个进程的控制用户。需要注意的是，为了最大的兼容性，使用此语法时“aux”前没有“-”。此外，在 aux 之后添加“ww”可以显示进程的完整信息，包括所有的参数，例如“ps auxww”。

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

# head 命令（查看开头）

命令格式：

```bash
head [参数] [文件]
```

**参数：**

- -q 隐藏文件名
- -v 显示文件名
- -c<数目> 显示的字节数。
- -n<行数> 显示的行数。

```bash
➜  study-books git:(master) ✗ cat ./demo.js
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
console.log(6);
console.log(7);
console.log(8);
console.log(9);
console.log(10);
console.log(11);
➜  study-books git:(master) ✗
```

## -n 行数

显示 demo.js 文件的开头 2 行

```bash
➜  study-books git:(master) ✗ head -n 2 ./demo.js
console.log(1);
console.log(2);
➜  study-books git:(master) ✗
```

显示 demo.js 文件的开头 10 行

```bash
➜  study-books git:(master) ✗ head -n 10 ./demo.js
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
console.log(6);
console.log(7);
console.log(8);
console.log(9);
console.log(10);
➜  study-books git:(master) ✗
```

不带参数的话，默认-n 10

```bash
➜  study-books git:(master) ✗ head ./demo.js
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
console.log(6);
console.log(7);
console.log(8);
console.log(9);
console.log(10);
➜  study-books git:(master) ✗
```

## -c 字节数

显示 demo.js 前 5 个字节:

```bash
➜  study-books git:(master) ✗ head -c 5 ./demo.js
conso%
➜  study-books git:(master) ✗
```

# sort 命令（排序相关）

```bash
➜  study-books git:(master) ✗ cat demo.txt
1 13
3 15
2 11
31 18
5 16
4 12%
➜  study-books git:(master) ✗
```

## -n 依照数值的大小排序

--numeric-sort，依照数值的大小排序。

```bash
➜  study-books git:(master) ✗ sort ./demo.txt -n
1 13
2 11
3 15
4 12
5 16
31 18
➜  study-books git:(master) ✗
```

## -k 按指定的列进行排序

--key=位置 1[,位置 2]，按指定的列进行排序。

可以理解为默认用空格当做分隔符

```bash
➜  study-books git:(master) ✗ sort ./demo.txt -n -k 2
2 11
4 12
1 13
3 15
5 16
31 18
➜  study-books git:(master) ✗
```

## -t 指定分隔符

--field-separator=分隔符，使用指定的分隔符代替非空格到空格的转换

```bash
➜  study-books git:(master) ✗ cat ./demo.txt
4=ds;2=rw; 3=sdga; 9=gdh
3=gds;6=gdfg; 4=fjf; 3=tte
2=hfgh;4=iukl; 2=bcvn; 7=gfjf%
➜  study-books git:(master) ✗
```

不使用`-t`

```bash
➜  study-books git:(master) ✗ sort ./demo.txt -k 1
2=hfgh;4=iukl; 2=bcvn; 7=gfjf
3=gds;6=gdfg; 4=fjf; 3=tte
4=ds;2=rw; 3=sdga; 9=gdh
➜  study-books git:(master) ✗ sort ./demo.txt -k 2
2=hfgh;4=iukl; 2=bcvn; 7=gfjf
4=ds;2=rw; 3=sdga; 9=gdh
3=gds;6=gdfg; 4=fjf; 3=tte
➜  study-books git:(master) ✗
```

使用`-t`

```bash
➜  study-books git:(master) ✗ sort ./demo.txt -k 1 -t ";"
2=hfgh;4=iukl; 2=bcvn; 7=gfjf
3=gds;6=gdfg; 4=fjf; 3=tte
4=ds;2=rw; 3=sdga; 9=gdh
➜  study-books git:(master) ✗ sort ./demo.txt -k 2 -t ";"
4=ds;2=rw; 3=sdga; 9=gdh
2=hfgh;4=iukl; 2=bcvn; 7=gfjf
3=gds;6=gdfg; 4=fjf; 3=tte
➜  study-books git:(master) ✗
```

## -r 倒序

--reverse，以相反的顺序来排序。

```bash
➜  study-books git:(master) ✗ sort ./demo.txt -n -r
31 18
5 16
4 12
3 15
2 11
1 13
➜  study-books git:(master) ✗
```

# uname 命令（系统信息）

## -a 输出所有信息

```bash
[root@VM-12-2-centos log]# uname -a
Linux VM-12-2-centos 4.18.0-305.3.1.el8.x86_64 #1 SMP Tue Jun 1 16:14:33 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
[root@VM-12-2-centos log]#
```

## -m 计算机类型

--machine，输出主机的硬件架构名称

```bash
[root@VM-12-2-centos vue3-blog-server]# uname -m
x86_64
```

## -n 计算机名

--nodename，输出网络节点上的主机名

```bash
[root@VM-12-2-centos vue3-blog-server]# uname -n
VM-12-2-centos
```

## -s 内核名称

--kernel-name，输出内核名称

```bash
[root@VM-12-2-centos vue3-blog-server]# uname -s
Linux
```

## -r 内核发行号

--kernel-release，输出内核发行号

```bash
[root@VM-12-2-centos vue3-blog-server]# uname -r
4.18.0-305.3.1.el8.x86_64
```

# find 命令（查找目录/文件）

```bash
find 路径 -命令参数 [输出形式]
```

## -maxdepth 最大深度

```bash
[root@VM-12-2-centos node]# find -maxdepth 1
.
./billd-ui
./react18-blog-client
./vue3-blog-server
./nuxt-blog-client
./billd-live-server
./react17-webpack5-template
./vue3-blog-admin
./overview
./backups
./netease-cloud-music
./vue3-webpack5-template
./netease-cloud-music-api
./sh
./index.html
./fddm_2.mp4
./multi-env-project
./next-blog-client
./lang
./billd-monorepo
[root@VM-12-2-centos node]#
```

## -name 按照文件名查找

按照文件名查找文件。

```bash
[root@VM-12-2-centos node]# find -maxdepth 1 -name billd-ui
./billd-ui
[root@VM-12-2-centos node]#
[root@VM-12-2-centos node]# find -maxdepth 1 -name billd
[root@VM-12-2-centos node]#
```

正则（shell 里面的`*`可以代表一切字符）：

```bash
[root@VM-12-2-centos node]# find -maxdepth 1 -name "*billd*"
./billd-ui
./billd-live-server
./billd-monorepo
[root@VM-12-2-centos node]#
```

# systemctl（系统管理）

`systemctl`是 Systemd 的主命令，用于管理系统。

```bash
# 启动
systemctl start httpd.service
# 重启
systemctl restart httpd.service
# 停止
systemctl stop httpd.service
# 重载
systemctl reload httpd.service
# 状态
systemctl status httpd.service
```

## list-unit-files 已安装

查看所有已安装服务

```bash
systemctl list-unit-files
```

## list-units 已激活

输出已激活单元

```bash
systemctl list-units
```

## status 运行状态

输出 jenkins 运行状态

```bash
[root@VM-12-2-centos nginx]# systemctl status jenkins.service
● jenkins.service - Jenkins Continuous Integration Server
   Loaded: loaded (/usr/lib/systemd/system/jenkins.service; disabled; vendor preset: disabled)
   Active: active (running) since Thu 2023-03-23 19:13:49 CST; 2 days ago
 Main PID: 5067 (java)
    Tasks: 51 (limit: 23720)
   Memory: 383.8M
   CGroup: /system.slice/jenkins.service
           └─5067 /usr/bin/java -Djava.awt.headless=true -Xms64m -Xmx256m -XX:PermSize=128M -XX:MaxNewSize=256m -XX:MaxPermSize=256m -jar /usr/share/java/jenkins.war --webroot=/var/cache/jenkins/war --httpPort=8080

3月 24 19:18:11 VM-12-2-centos jenkins[5067]: 2023-03-24 11:18:11.748+0000 [id=4468]        INFO        h.m.DownloadService$Downloadable#load: Obtained the updated data file for hudson.plugins.gradle.GradleInstaller
3月 24 19:18:12 VM-12-2-centos jenkins[5067]: 2023-03-24 11:18:12.737+0000 [id=4468]        INFO        h.m.DownloadService$Downloadable#load: Obtained the updated data file for hudson.tasks.Ant.AntInstaller
3月 24 19:18:49 VM-12-2-centos jenkins[5067]: 2023-03-24 11:18:49.055+0000 [id=4468]        INFO        h.m.DownloadService$Downloadable#load: Obtained the updated data file for hudson.tools.JDKInstaller
3月 24 19:18:49 VM-12-2-centos jenkins[5067]: 2023-03-24 11:18:49.056+0000 [id=4468]        INFO        hudson.util.Retrier#start: Performed the action check updates server successfully at the attempt #1
3月 25 19:13:50 VM-12-2-centos jenkins[5067]: 2023-03-25 11:13:50.784+0000 [id=4678]        INFO        h.m.DownloadService$Downloadable#load: Obtained the updated data file for hudson.tasks.Maven.MavenInstaller
3月 25 19:13:51 VM-12-2-centos jenkins[5067]: 2023-03-25 11:13:51.528+0000 [id=4678]        WARNING        h.m.DownloadService$Downloadable#updateNow: No tool installer metadata found for jenkins.plugins.nodejs.tools.MirrorNodeJSInstaller
3月 25 19:13:52 VM-12-2-centos jenkins[5067]: 2023-03-25 11:13:52.763+0000 [id=4678]        INFO        h.m.DownloadService$Downloadable#load: Obtained the updated data file for hudson.plugins.nodejs.tools.NodeJSInstaller
3月 25 19:13:54 VM-12-2-centos jenkins[5067]: 2023-03-25 11:13:54.319+0000 [id=4678]        INFO        h.m.DownloadService$Downloadable#load: Obtained the updated data file for hudson.plugins.gradle.GradleInstaller
3月 25 19:13:55 VM-12-2-centos jenkins[5067]: 2023-03-25 11:13:55.264+0000 [id=4678]        INFO        h.m.DownloadService$Downloadable#load: Obtained the updated data file for hudson.tasks.Ant.AntInstaller
3月 25 19:14:04 VM-12-2-centos jenkins[5067]: 2023-03-25 11:14:04.945+0000 [id=4678]        INFO        h.m.DownloadService$Downloadable#load: Obtained the updated data file for hudson.tools.JDKInstaller
[root@VM-12-2-centos nginx]#
```

## is-enabled 是否开机自启

```bash
[root@VM-12-2-centos nginx]# systemctl is-enabled jenkins.service
disabled
[root@VM-12-2-centos nginx]# systemctl is-enabled mysqld.service
enabled
[root@VM-12-2-centos nginx]#
```

## is-active 是否运行

```bash
[root@VM-12-2-centos nginx]# systemctl is-active jenkins.service
active
[root@VM-12-2-centos nginx]# systemctl is-active mysqld.service
active
[root@VM-12-2-centos nginx]#
```

## enable 开机自启

```bash
systemctl enable mysqld.service
```

## disable 关闭开机自启

```bash
systemctl disable mysqld.service
```

## kill 杀死进程

杀死一个服务的所有子进程

```bash
[root@VM-12-2-centos nginx]# systemctl kill jenkins.service
```

## daemon-reload

daemon-reload 是一个很容易被误用的子命令，主要是因为它名字中包含的 daemon 一词很容易让它和 reload 子命令混淆。
我们在前文简略的介绍了 reload 子命令，它的作用是重新加载某个服务程序的配置文件。这里的程序指的是服务类型 unit 的配置中指定的程序，也就是我们常说的 daemon(提供某种服务的应用程序)。比如服务类型的 unit prometheus.service，提供服务的 daemon 程序在我的机器上是 /usr/local/share/prometheus/prometheus，所以 reload 子命令重新加载的是 prometheus 的配置文件。

如果把 daemon-reload 子命令中的 daemon 理解为 systemd 程序，就可以把这个命令解释为重新加载 systemd 程序的配置文件。而所有的 unit 配置文件都是作为 systemd 程序的配置文件存在的。这样得出的结论就是：

- 新添加 unit 配置文件时需要执行 daemon-reload 子命令
- 有 unit 的配置文件发生变化时也需要执行 daemon-reload 子命令

daemon-reload 命令会做很多的事情，其中之一是重新生成依赖树(也就是 unit 之间的依赖关系)，所以当你修改了 unit 配置文件中的依赖关系后如果不执行 daemon-reload 命令是不会生效的。

```bash
[root@VM-12-2-centos nginx]# systemctl daemon-reload
[root@VM-12-2-centos nginx]#
```

## --failed 运行失败

输出运行失败的单元

```bash
[root@VM-12-2-centos nginx]# systemctl --failed
  UNIT                 LOAD   ACTIVE SUB    DESCRIPTION
● mcelog.service       loaded failed failed Machine Check Exception Logging Daemon
● pm2-root.service     loaded failed failed PM2 process manager
● redis.service        loaded failed failed Redis persistent key-value database
● wondershaper.service loaded failed failed Bandwidth shaper/Network rate limiter

LOAD   = Reflects whether the unit definition was properly loaded.
ACTIVE = The high-level unit activation state, i.e. generalization of SUB.
SUB    = The low-level unit activation state, values depend on unit type.

4 loaded units listed. Pass --all to see loaded but inactive units, too.
To show all installed unit files use 'systemctl list-unit-files'.
[root@VM-12-2-centos nginx]#
```

# rpm 命令

rpm 是一个功能十分强大的软件包管理系统，它使得在 Linux 下安装、升级和删除软件包的工作变得容易，并且具有查询、验证软件包的功能。

## --version 版本

```bash
[root@VM-12-2-centos node]# rpm --version
RPM version 4.14.3
[root@VM-12-2-centos node]#
```

## --help 帮助

```bash
rpm --help
```

## -i 安装

--install

```bash
# 安装包
rpm -i ipchains-1.3.6-1.i386.rpm
# 或者
rpm --install ipchains-1.3.6-1.i386.rpm
# 在线安装
rpm -i ftp://ftp.xxx.xxx
# 或者
rpm --install ftp://ftp.xxx.xxx
```

## -q 查询

--query

```bash
[root@VM-12-2-centos node]# rpm -q mysql
mysql-8.0.26-1.module_el8.4.0+915+de215114.x86_64
[root@VM-12-2-centos node]# rpm --query mysql
mysql-8.0.26-1.module_el8.4.0+915+de215114.x86_64
[root@VM-12-2-centos node]#
```

### -a 所有

--all

```bash
[root@VM-12-2-centos node]# rpm -q -a
libepoxy-1.5.8-1.el8.x86_64
pciutils-libs-3.7.0-1.el8.x86_64
langpacks-zh_CN-1.0-12.el8.noarch
python3-bind-9.11.26-4.el8_4.noarch
sssd-common-pac-2.4.0-9.el8.x86_64
ncurses-base-6.1-7.20180224.el8.noarch
java-11-openjdk-headless-11.0.13.0.8-4.el8_5.x86_64
libicu-60.3-2.el8_1.x86_64
[root@VM-12-2-centos node]#
```

## -e 删除

--erase

```bash
# 移除安装包
rpm -e httpd
```

# yum 命令

yum 命令：用于添加/删除/更新 RPM 包,自动解决包的依赖问题以及系统更新升级

## --version 版本

```bash
[root@VM-12-2-centos node]# yum --version
4.4.2
  已安装： dnf-0:4.4.2-11.el8.noarch 在 2021年06月18日 星期五 03时28分18秒
  构建    ：CentOS Buildsys <bugs@centos.org> 在 2021年03月11日 星期四 19时39分23秒
[root@VM-12-2-centos node]#
```

## --help 帮助

```bash
yum --help
```

## install 安装

```bash
# 安装php5.3及其相关依赖包
yum install php53
```

## info 信息

可安装和可更新的 RPM 包信息

```bash
[root@VM-12-2-centos node]# yum info mysql | head -n 20
Repository AppStream is listed more than once in the configuration
Repository extras is listed more than once in the configuration
Repository PowerTools is listed more than once in the configuration
Repository centosplus is listed more than once in the configuration
Repository base is listed more than once in the configuration
Repository extras is listed more than once in the configuration
Repository centosplus is listed more than once in the configuration
Repository PowerTools is listed more than once in the configuration
Repository AppStream is listed more than once in the configuration
Repository epel is listed more than once in the configuration
上次元数据过期检查：0:14:11 前，执行于 2023年03月26日 星期日 15时39分34秒。
已安装的软件包
名称         : mysql
版本         : 8.0.26
发布         : 1.module_el8.4.0+915+de215114
架构         : x86_64
大小         : 63 M
源           : mysql-8.0.26-1.module_el8.4.0+915+de215114.src.rpm
仓库         : @System
来自仓库     : AppStream
概况         : MySQL client programs and shared libraries
URL          : http://www.mysql.com
协议         : GPLv2 with exceptions and LGPLv2 and BSD
描述         : MySQL is a multi-user, multi-threaded SQL database server. MySQL is a
             : client/server implementation consisting of a server daemon (mysqld)
             : and many different client programs and libraries. The base package
             : contains the standard MySQL client programs and generic MySQL files.

[root@VM-12-2-centos node]#
```

### installed 已安装包的信息

已安装包的信息(-qa 参数相似)

```bash
[root@VM-12-2-centos node]# yum info installed | head -n 40
Repository AppStream is listed more than once in the configuration
Repository extras is listed more than once in the configuration
Repository PowerTools is listed more than once in the configuration
Repository centosplus is listed more than once in the configuration
Repository base is listed more than once in the configuration
Repository extras is listed more than once in the configuration
Repository centosplus is listed more than once in the configuration
Repository PowerTools is listed more than once in the configuration
Repository AppStream is listed more than once in the configuration
Repository epel is listed more than once in the configuration
已安装的软件包
名称         : NetworkManager
时期         : 1
版本         : 1.30.0
发布         : 7.el8
架构         : x86_64
大小         : 6.9 M
源           : NetworkManager-1.30.0-7.el8.src.rpm
仓库         : @System
来自仓库     : BaseOS
概况         : Network connection manager and user applications
URL          : https://networkmanager.dev/
协议         : GPLv2+ and LGPLv2+
描述         : NetworkManager is a system service that manages network interfaces and
             : connections based on user or automatic configuration. It supports
             : Ethernet, Bridge, Bond, VLAN, Team, InfiniBand, Wi-Fi, mobile broadband
             : (WWAN), PPPoE and other devices, and supports a variety of different VPN
             : services.

名称         : NetworkManager-libnm
时期         : 1
版本         : 1.30.0
发布         : 7.el8
架构         : x86_64
大小         : 8.8 M
源           : NetworkManager-1.30.0-7.el8.src.rpm
仓库         : @System
来自仓库     : BaseOS
概况         : Libraries for adding NetworkManager support to applications.
URL          : https://networkmanager.dev/
协议         : LGPLv2+
描述         : This package contains the libraries that make it easier to use some
             : NetworkManager functionality from applications.

名称         : NetworkManager-team
时期         : 1
版本         : 1.30.0
发布         : 7.el8
架构         : x86_64
大小         : 48 k
[root@VM-12-2-centos node]#
```

## search 搜索包

```bash
[root@VM-12-2-centos node]# yum search jenkins
Repository AppStream is listed more than once in the configuration
Repository extras is listed more than once in the configuration
Repository PowerTools is listed more than once in the configuration
Repository centosplus is listed more than once in the configuration
Repository base is listed more than once in the configuration
Repository extras is listed more than once in the configuration
Repository centosplus is listed more than once in the configuration
Repository PowerTools is listed more than once in the configuration
Repository AppStream is listed more than once in the configuration
Repository epel is listed more than once in the configuration
上次元数据过期检查：0:00:29 前，执行于 2023年03月26日 星期日 15时39分34秒。
============================================================================================================= 名称 和 概况 匹配：jenkins =============================================================================================================
jenkins.noarch : Jenkins Automation Server
python3-jenkins.noarch : Python bindings for the remote Jenkins API
[root@VM-12-2-centos node]#
```

## list 可安装和可更新的 RPM 包

```bash
# 可安装和可更新的RPM包
yum list
# 已安装包
yum list installed
# 已安装且不在资源库的包
yum list extras
```

## remove 卸载包

```bash
# 删除php53
yum remove php53
```

## deplist 列出包的依赖

```bash
[root@VM-12-2-centos node]# yum deplist mysql | head -n 20
Repository AppStream is listed more than once in the configuration
Repository extras is listed more than once in the configuration
Repository PowerTools is listed more than once in the configuration
Repository centosplus is listed more than once in the configuration
Repository base is listed more than once in the configuration
Repository extras is listed more than once in the configuration
Repository centosplus is listed more than once in the configuration
Repository PowerTools is listed more than once in the configuration
Repository AppStream is listed more than once in the configuration
Repository epel is listed more than once in the configuration
上次元数据过期检查：0:13:33 前，执行于 2023年03月26日 星期日 15时39分34秒。
package: mysql-8.0.26-1.module_el8.4.0+915+de215114.x86_64
  dependency: bash
   provider: bash-4.4.20-2.el8.x86_64
  dependency: coreutils
   provider: coreutils-8.30-12.el8.x86_64
  dependency: grep
   provider: grep-3.1-6.el8.x86_64
  dependency: libc.so.6(GLIBC_2.28)(64bit)
   provider: glibc-2.28-164.el8.x86_64
  dependency: libcrypto.so.1.1()(64bit)
   provider: openssl-libs-1:1.1.1k-5.el8_5.x86_64
  dependency: libcrypto.so.1.1(OPENSSL_1_1_0)(64bit)
   provider: openssl-libs-1:1.1.1k-5.el8_5.x86_64
  dependency: libcrypto.so.1.1(OPENSSL_1_1_1)(64bit)
   provider: openssl-libs-1:1.1.1k-5.el8_5.x86_64
  dependency: libdl.so.2()(64bit)
   provider: glibc-2.28-164.el8.x86_64
  dependency: libdl.so.2(GLIBC_2.2.5)(64bit)
   provider: glibc-2.28-164.el8.x86_64
  dependency: libedit.so.0()(64bit)
[root@VM-12-2-centos node]#
```

## clean 清除

```bash
# 清除缓存目录下的软件包
yum clean packages
# 清除缓存目录下的 headers
yum clean headers
# 清除缓存目录下旧的 headers
yum clean oldheaders
# 清除所有
yum clean
# 清除所有
yum clean all
```

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

# 文件操作

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

# grep 命令（过滤相关）

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

# shell 相关

## 判断文件/目录是否存在

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

## 判断是否安装 pm2

```bash
#!/usr/bin/env bash

AppName='pm2'

if ! type $AppName >/dev/null 2>&1; then
  echo $AppName未安装
else
  echo $AppName已安装
fi
```

# 日志相关

日志储存位置：/var/log/

```bash
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

查看系统内存溢出记录

```bash
cat messages | grep oom
# 或者直接进入messages路径查看和过滤
cat /var/log/messages | grep oom
```

测试

```bash
[root@VM-12-2-centos log]# cat messages | grep oom
Sep  7 14:18:32 VM-12-2-centos kernel: systemd invoked oom-killer: gfp_mask=0x6200ca(GFP_HIGHUSER_MOVABLE), order=0, oom_score_adj=0
Sep  7 14:18:32 VM-12-2-centos kernel: oom_kill_process.cold.32+0xb/0x10
Sep  7 14:18:32 VM-12-2-centos kernel: [  pid  ]   uid  tgid total_vm      rss pgtables_bytes swapents oom_score_adj name
Sep  7 14:18:32 VM-12-2-centos kernel: oom-kill:constraint=CONSTRAINT_NONE,nodemask=(null),cpuset=/,mems_allowed=0,global_oom,task_memcg=/system.slice/pm2-root.service,task=node,pid=2092,uid=0
Sep  7 14:18:32 VM-12-2-centos kernel: Out of memory: Killed process 2092 (node) total-vm:2546008kB, anon-rss:1665620kB, file-rss:936kB, shmem-rss:0kB, UID:0 pgtables:38108kB oom_score_adj:0
Sep  7 14:18:32 VM-12-2-centos kernel: oom_reaper: reaped process 2092 (node), now anon-rss:0kB, file-rss:0kB, shmem-rss:0kB
Sep 23 02:21:30 VM-12-2-centos kernel: process reaper invoked oom-killer: gfp_mask=0x6200ca(GFP_HIGHUSER_MOVABLE), order=0, oom_score_adj=0
Sep 23 02:21:31 VM-12-2-centos kernel: oom_kill_process.cold.32+0xb/0x10
Sep 23 02:21:31 VM-12-2-centos kernel: [  pid  ]   uid  tgid total_vm      rss pgtables_bytes swapents oom_score_adj name
Sep 23 02:21:31 VM-12-2-centos kernel: oom-kill:constraint=CONSTRAINT_NONE,nodemask=(null),cpuset=/,mems_allowed=0,global_oom,task_memcg=/system.slice/jenkins.service,task=webpack,pid=633552,uid=988
Sep 23 02:21:31 VM-12-2-centos kernel: Out of memory: Killed process 633552 (webpack) total-vm:33724164kB, anon-rss:1472004kB, file-rss:1964kB, shmem-rss:0kB, UID:988 pgtables:17136kB oom_score_adj:0
Sep 23 02:21:31 VM-12-2-centos kernel: oom_reaper: reaped process 633552 (webpack), now anon-rss:0kB, file-rss:0kB, shmem-rss:0kB
Jan 29 01:35:37 VM-12-2-centos kernel: npm invoked oom-killer: gfp_mask=0x6200ca(GFP_HIGHUSER_MOVABLE), order=0, oom_score_adj=0
Jan 29 01:35:38 VM-12-2-centos kernel: oom_kill_process.cold.32+0xb/0x10
Jan 29 01:35:38 VM-12-2-centos kernel: [  pid  ]   uid  tgid total_vm      rss pgtables_bytes swapents oom_score_adj name
Jan 29 01:35:38 VM-12-2-centos kernel: oom-kill:constraint=CONSTRAINT_NONE,nodemask=(null),cpuset=/,mems_allowed=0,global_oom,task_memcg=/user.slice/user-0.slice/session-1.scope,task=node,pid=11948,uid=0
Jan 29 01:35:38 VM-12-2-centos kernel: Out of memory: Killed process 11948 (node) total-vm:6996560kB, anon-rss:2481908kB, file-rss:56kB, shmem-rss:0kB, UID:0 pgtables:18752kB oom_score_adj:0
Jan 29 01:35:38 VM-12-2-centos kernel: oom_reaper: reaped process 11948 (node), now anon-rss:0kB, file-rss:0kB, shmem-rss:0kB
[root@VM-12-2-centos log]#
```

# 系统相关

## 重启系统

```bash
reboot
```

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

# 实用命令

## 端口占用

```bash
[root@VM-12-2-centos nginx]# lsof -i:3200
COMMAND     PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node\x20/ 11185 root   35u  IPv6 541214      0t0  TCP *:tick-port (LISTEN)
[root@VM-12-2-centos nginx]#
```

## 查找某个进程

```bash
ps aux | grep 进程id
[root@VM-12-2-centos nginx]# ps aux | grep 11185
root       11185  0.2  4.8 11562004 184556 ?     Ssl  3月23   8:47 node /node/vue3-blog-server/prod/dist/index.js
root      149259  0.0  0.0  15456  1192 pts/28   S+   03:39   0:00 grep --color=auto 11185
[root@VM-12-2-centos nginx]#
```

## 杀死进程

```bash
kill -9 PID
```

## 获取占用 cpu 最多的进程

获取占用 cpu 最多的 5 个进程

```bash
ps aux | sort -k 3 -r | head -n 6
```

测试

```bash
[root@VM-12-2-centos nginx]# ps aux | sort -k 3 -r | head -n 6
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root      137541  0.8  2.0 908256 78820 ?        Sl   02:02   0:01 /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/node /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/out/bootstrap-fork --type=extensionHost --transformURIs --useHostProxy=false
root       14130  0.6  2.5 934308 99232 ?        Ssl  3月23  21:17 node /node/billd-live-server/prod/dist/index.js
root      134542  0.4  2.7 961044 107012 ?       Sl   01:50   0:03 /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/node /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/out/server-main.js --start-server --host=127.0.0.1 --accept-server-license-terms --enable-remote-auto-shutdown --port=0 --telemetry-level all --connection-token-file /root/.vscode-server/.ee2b180d582a7f601fa6ecfdad8d9fd269ab1884.token
root       11185  0.2  5.3 11563028 202776 ?     Ssl  3月23   8:33 node /node/vue3-blog-server/prod/dist/index.js
root        7945  0.2 11.9 1333012 456820 ?      Sl   3月23   8:16 node /node/nuxt-blog-client/node_modules/nuxt/bin/nuxt.js
sort: 冲洗流失败(fflush): 标准输出: 断开的管道
sort: 写入错误
[root@VM-12-2-centos nginx]#
```

## 获取占用内存最多的进程

获取占用内存最多的 5 个进程

```bash
ps aux | sort -k 4 -r | head -n 6
```

测试

```bash
[root@VM-12-2-centos nginx]# ps aux | sort -k 4 -r | head -n 6
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root       11185  0.2  5.3 11563028 202780 ?     Ssl  3月23   8:33 node /node/vue3-blog-server/prod/dist/index.js
root      134542  0.4  2.7 961044 107012 ?       Sl   01:50   0:03 /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/node /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/out/server-main.js --start-server --host=127.0.0.1 --accept-server-license-terms --enable-remote-auto-shutdown --port=0 --telemetry-level all --connection-token-file /root/.vscode-server/.ee2b180d582a7f601fa6ecfdad8d9fd269ab1884.token
root       14130  0.6  2.5 934308 98668 ?        Ssl  3月23  21:17 node /node/billd-live-server/prod/dist/index.js
root        4273  0.0  2.5 11464256 97556 ?      Sl   3月23   0:03 node /node/next-blog-client/node_modules/.bin/../next/dist/bin/next start -p 4000
root        4180  0.1  2.4 11673660 92428 ?      Ssl  3月23   5:14 Verdaccio
sort: 写入失败: 标准输出: 断开的管道
sort: 写入错误
[root@VM-12-2-centos nginx]#
```

## 获取所有 node 进程

```bash
ps aux | grep node
```

测试

```bash
[root@VM-12-2-centos nginx]# ps aux | grep node
root        4190  0.0  0.8 903952 33348 ?        Ssl  3月23   0:00 node ./node_modules/.bin/nodemon /node/netease-cloud-music-api/app.js
root        4255  0.0  1.7 940700 67468 ?        Sl   3月23   0:01 /root/.nvm/versions/node/v16.19.1/bin/node /node/netease-cloud-music-api/app.js
root        4273  0.0  2.5 11464256 97556 ?      Sl   3月23   0:03 node /node/next-blog-client/node_modules/.bin/../next/dist/bin/next start -p 4000
root        7945  0.2 11.9 1333012 456320 ?      Sl   3月23   8:16 node /node/nuxt-blog-client/node_modules/nuxt/bin/nuxt.js
root        7952  0.2 10.7 1286524 410396 ?      Sl   3月23   8:03 node /node/nuxt-blog-client/node_modules/nuxt/bin/nuxt.js
root       11185  0.2  5.3 11563028 202792 ?     Ssl  3月23   8:34 node /node/vue3-blog-server/prod/dist/index.js
root       12658  0.1  2.3 11195420 91216 ?      Ssl  3月23   5:02 node /node/vue3-blog-server/beta/dist/index.js
root       14130  0.6  2.5 934308 99116 ?        Ssl  3月23  21:17 node /node/billd-live-server/prod/dist/index.js
root       14143  0.2  0.3  45016 11736 ?        S    3月23   8:15 ffmpeg -stream_loop -1 -re -i /node/fddm_2.mp4 -c copy -f flv rtmp://localhost/live/fddm_2
root      134542  0.4  2.8 961044 107148 ?       Rl   01:50   0:03 /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/node /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/out/server-main.js --start-server --host=127.0.0.1 --accept-server-license-terms --enable-remote-auto-shutdown --port=0 --telemetry-level all --connection-token-file /root/.vscode-server/.ee2b180d582a7f601fa6ecfdad8d9fd269ab1884.token
root      134579  0.1  1.5 719104 59688 ?        Sl   01:50   0:01 /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/node /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/out/bootstrap-fork --type=ptyHost --logsPath /root/.vscode-server/data/logs/20230326T015043
root      137541  0.5  2.0 908256 78988 ?        Sl   02:02   0:01 /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/node /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/out/bootstrap-fork --type=extensionHost --transformURIs --useHostProxy=false
root      137552  0.0  1.1 717752 42216 ?        Sl   02:02   0:00 /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/node /root/.vscode-server/bin/ee2b180d582a7f601fa6ecfdad8d9fd269ab1884/out/bootstrap-fork --type=fileWatcher
root      138121  0.0  0.0  15456  1116 pts/11   S+   02:05   0:00 grep --color=auto node
[root@VM-12-2-centos nginx]#
```

## 查找 rpm 安装的 mysql

```bash
[root@VM-12-2-centos node]# rpm -q -a | grep -i mysql
mysql-8.0.26-1.module_el8.4.0+915+de215114.x86_64
mysql80-community-release-el8-2.noarch
mysql-errmsg-8.0.26-1.module_el8.4.0+915+de215114.x86_64
mysql-common-8.0.26-1.module_el8.4.0+915+de215114.x86_64
mysql-server-8.0.26-1.module_el8.4.0+915+de215114.x86_64
[root@VM-12-2-centos node]#
```

## 查找 jenkins 相关文件

-maxdepth 应该设置越小，查找越快

```bash
[root@VM-12-2-centos /]# find / -maxdepth 3 -name jenkins
/etc/sysconfig/jenkins
/etc/logrotate.d/jenkins
/var/log/jenkins
/var/lib/jenkins
/var/cache/jenkins
/usr/bin/jenkins
/usr/share/jenkins
[root@VM-12-2-centos /]#
```

## 清除 buff/cache

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

## 软连接

```bash
# 建立软连接
ln -s /qshell_t/qshell /usr/local/bin/qshell
# 删除软连接
rm -rf /usr/local/bin/qshell
```

## 开启 swap

```bash
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

# 参考

https://linux.liuxfe.com

http://linux.51yip.com
