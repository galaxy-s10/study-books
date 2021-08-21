# 分支操作

- 新建分支

  > git branch 新分支名
  >
  > 如果当前是在master分支，执行git branch 新分支名，就是在master分支下新建分支；如果当前是在dev分支，执行git branch 新分支名，就是在dev分支下新建分支
  
- 切换分支

  > git checkout 分支名

- 重命名分支

  > git branch -m 旧分支名 新分支名

- 删除分支

  > git branch -d 分支名
  >
  > 删除远程分支: git push origin --delete [branchname]

- 查看远程分支

  > git branch -a

- 查看所有远程分支

  > git branch -r

- 创建并切换分支

  > git checkout -b 新分支名

- 创建并切换远程分支

  > git checkout -b 新分支名 远程分支名
  >
  > 如git checkout -b dev origin/develop

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
>  git checkout -b  new_branch_name  branch_name
>  这条指令本来是根据一个 branch_name 分支分出一个本地分支 new_branch_name，但是如果所根据的分支 branch_name 是一个远程分支名，那么本地的分支会自动的 track 远程分支。建议跟踪分支和被跟踪远程分支同名

```bash
git checkout -b develop origin/develop
```

在本地创建一个与 `dev-hss`同名分支跟踪远程分支。

```bash
git checkout --track origin/dev-hss
```

# 配置

显示当前的Git配置

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

# 参考

http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html