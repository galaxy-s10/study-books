#!/usr/bin/env bash
# @Author: hss
# @Email: 2274751790@qq.com
# @Github: https://github.com/galaxy-s10
# @Date: 2021-12-20 18:14:36
# 约定$1为任务名，$2为环境，$3为
JOBNAME=$1 # 注意：JOBNAME=$1，这个等号左右不能有空格！
ENV=$2
echo $JOBNAME/$ENV

# echo $HOME
# echo $(pwd) # 约等于：`pwd $1`
# echo $(pwd) # /Users/huangshuisheng/Desktop/hss/study-notes/linux
# echo $(pwd)/$1
if [ -d $(pwd)/$JOBNAME/$ENV ]; then
    echo "$(pwd)/$1/目录已经存在,先删除它,然后再重新创建它"
    rm -rf $(pwd)/$JOBNAME/$ENV/
    mkdir -p $(pwd)/$JOBNAME/$ENV/
else
    echo "$(pwd)/$JOBNAME/$ENV/目录还没有,创建它"
    mkdir -p $(pwd)/$JOBNAME/$ENV/
fi
