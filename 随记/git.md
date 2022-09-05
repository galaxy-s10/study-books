# git tag

## 列出标签

在 Git 中列出已有的标签非常简单，只需要输入 `git tag` （可带上可选的 `-l` 选项 `--list`）

```bash
git tag
```

## 提交标签

提交所有 tag

```bash
git push origin --tags
```

提交某个 tag

```bash
git push origin v0.0.1
```

## 重命名标签

```bash
git tag v0.0.1 v1.0.0
```

## 删除标签

要删除掉你本地仓库上的标签，可以使用命令 `git tag -d <tagname>`

```bash
git tag -d v0.0.1
```

注意上述命令并不会从任何远程仓库中移除这个标签，你必须用 `git push <remote> :refs/tags/<tagname>` 来更新你的远程仓库

```
git push origin :refs/tags/v0.0.1
```

上面这种操作的含义是，将冒号前面的空值推送到远程标签名，从而高效地删除它。

第二种更直观的删除远程标签的方式是：

```bash
git push origin --delete v0.0.1
```

## 检出标签

```bash
git checkout v0.0.1
```



# git branch

## 查看分支列表

```bash
git branch
```

## 新建分支

```bash
git branch hotfix-0819
```

## 在远程分支的基础上建立本地的分支

在远程分支的基础上建立 `develop` 的分支，并且让 `develop` 分支追踪`origin/develop`远程分支。

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

## 切换分支

```bash
git checkout master
```

## 重命名分支

```bash
git branch -m 旧分支名 新分支名
```

## 删除分支

删除本地分支：

```bash
git branch -d 分支名
```

> 如果报错：error: The branch '分支名' is not fully merged. If you are sure you want to delete it, run 'git branch -D 分支'，则：git branch -D 分支名

删除远程分支：

```bash
git push origin --delete [branchname]
```

## 查看所有分支

```bash
git branch -a
```

## 查看远程分支

```bash
git branch -r
```

## 创建并切换分支

```bash
git checkout -b 新分支名
```

## 创建并切换远程分支

> git checkout -b 新分支名 远程分支名
>
> 如 git checkout -b dev origin/develop

## 查看每一个分支的最后一次提交

```bash
git branch -v
```

## 查看本地分支和远程分支的跟踪关系

```bash
git branch -vv
```

## 查看点线图

```bash
git log --graph
```



# git remote

```bash
# 删除本地远程仓库地址
git remote rm origin
# 新增本地远程仓库地址
git remote add origin [url]
# 设置本地远程仓库地址
git remote set-url origin [url]
```



# git config

```bash
# 显示当前的Git配置
git config --list
# 查看当前用户（global）配置
git config --global --list
# 查看当前仓库配置信息
git config --local --list
# 设置邮箱
git config --global user.email '2274751790@qq.com'
# 设置用户名
git config --global user.name 'galaxy-s10'
```



# 参考

http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html
