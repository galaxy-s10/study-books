#!/usr/bin/env bash
# @Author: hss
# @Email: 2274751790@qq.com
# @Github: https://github.com/galaxy-s10
# @Date: 2021-12-20 18:14:36
# 约定$1为任务名，$2为Jenkins工作区，$3为环境
JOBNAME=$1 # 注意：JOBNAME=$1，这个等号左右不能有空格！
WORKSPACE=$2
ENV=$3
PUBLICDIR=/node
# PUBLICDIR=/Users/huangshuisheng/Desktop/hss/study-notes/linux
echo $JOBNAME/$ENV

echo $WORKSPACE >/a.txt
# echo $HOME
# echo $(pwd) # 约等于：`pwd $1`
# echo $(pwd) # /Users/huangshuisheng/Desktop/hss/study-notes/linux
# echo $(pwd)/$1
if [ -d $PUBLICDIR/$JOBNAME/$ENV ]; then
    echo "$PUBLICDIR/$JOBNAME/目录已经存在,先删除它,然后再重新创建它"
    # rm -rf $(pwd)/$JOBNAME/$ENV/
    mkdir -p $PUBLICDIR/$JOBNAME/$ENV/
    cp -r $WORKSPACE/dist/* $PUBLICDIR/$JOBNAME/$ENV/
    # mkdir -p /ddd/xxx
    # cd /ddd/xxx
else
    echo "$PUBLICDIR/$JOBNAME/$ENV/目录还没有,创建它"
    mkdir -p $PUBLICDIR/$JOBNAME/$ENV/
    cp -r $WORKSPACE/dist/* $PUBLICDIR/$JOBNAME/$ENV/

    # mkdir -p /ddd/xxx

fi
