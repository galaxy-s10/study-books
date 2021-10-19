# 分支操作

- 新建分支

  > git branch 新分支名
  >
  > 如果当前是在 master 分支，执行 git branch 新分支名，就是在 master 分支下新建分支；如果当前是在 dev 分支，执行 git branch 新分支名，就是在 dev 分支下新建分支

- 切换分支

  > git checkout 分支名

- 重命名分支

  > git branch -m 旧分支名 新分支名

- 删除分支

  > git branch -d 分支名，如果报错：error: The branch '分支名' is not fully merged.
  > If you are sure you want to delete it, run 'git branch -D 分支'，则：git branch -D 分支名
  >
  > 删除远程分支: git push origin --delete [branchname]

- 查看所有分支

  > git branch -a

- 查看远程分支

  > git branch -r

- 创建并切换分支

  > git checkout -b 新分支名

- 查看分支列表

  > git branch -l

- 创建并切换远程分支

  > git checkout -b 新分支名 远程分支名
  >
  > 如 git checkout -b dev origin/develop

- 查看每一个分支的最后一次提交

  > git branch -v

- 查看本地分支和远程分支的跟踪关系

  > git branch -vv

- 查看点线图

  > git log --graph

## 跟踪远程分支

克隆时自动将创建好的`master`分支追踪`origin/master`分支

```bash
git clone 服务器地址
```

在远程分支的基础上建立`develop`分支，并且让`develop`分支追踪`origin/develop`远程分支。

> 如果想新建一个本地分支不同名字，同时跟踪一个远程分支可以利用：
> git checkout -b new_branch_name branch_name
> 这条指令本来是根据一个 branch_name 分支分出一个本地分支 new_branch_name，但是如果所根据的分支 branch_name 是一个远程分支名，那么本地的分支会自动的 track 远程分支。建议跟踪分支和被跟踪远程分支同名

```bash
git checkout -b develop origin/develop
```

在本地创建一个与 `dev-hss`同名分支跟踪远程分支。

```bash
git checkout --track origin/dev-hss
```

## fetch

不管当前在哪个分支，都可以拉取远程所有分支到本地，但是注意

```bash
git fetch
```



# 配置

显示当前的 Git 配置

```bash
git config --list
```

查看当前用户（global）配置

```bash
git config --global --list
```

查看当前仓库配置信息

```bash
git config --local --list
```

设置邮箱

```bash
git config --global user.email '2274751790@qq.com'
```

设置用户名

```bash
git config --global user.name 'galaxy-s10'
```

## 实战

同一个feat1分支下，开发者a和开发者b，一开始一共两个文件，feat1.js和a.js

开发者a在feat1里面，删除了a.js，然后再feat1.js里面新增了一句console.log("feat1桌面删除了a.js");，然后commit了feat1删除了a，再然后push到了远程仓库

此时的开发者b不知道，自己做自己的，没有更改源文件，只是新增了一个feat11.js文件，里面写了一句console.log("feat11.js");，然后commit了add feat11，再然后push到了远程仓库，很显然，遭到了reject，然后就执行了：git pull，因为此时开发者a是先提交了，开发者b再提交的，即开发者b的add feat11前面肯定要有开发者a的feat1删除了a，此时的操作就是把开发者a的改动放到开发者b里面，因为那会a把a.js删了，因此，现在开发者b里面肯定不能有a.js了，因此就把a.js给删了，然后a还在feat1.js上面新增了一行代码，由于b没有更改过feat1.js，因此就直接把a的那一行代码也放到了feat1.js里面。最后的话就是feat11，这个文件不动，依旧在。然后此时b的add feat11后面还会多一个merge feat删除了a的commit。这种其实是属于没有冲突的。



# 参考

http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html
