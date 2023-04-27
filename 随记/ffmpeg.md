# 命令

## mov 转换为 mp4

```bash
ffmpeg -i /Users/huangshuisheng/Desktop/aaa.mov -vcodec h264 -acodec mp2 /Users/huangshuisheng/Desktop/aaa.mp4
```

> 实测 aaa.mov 源文件为 487m，转成 aaa.mp4 后，大小为 30m。但是转换后音频丢失了

## 提取音频

```bash
ffmpeg -i /Users/huangshuisheng/Desktop/aaa.mov -acodec aac -vn /Users/huangshuisheng/Desktop/aaa.aac
```

## 音视频文件合并

```bash
ffmpeg -i /Users/huangshuisheng/Desktop/aaa.mp4 -i /Users/huangshuisheng/Desktop/aaa.aac -c:v copy -c:a aac -strict experimental -map 0:v:0 -map 1:a:0 /Users/huangshuisheng/Desktop/bbb.mp4
```

## 修改帧率

修改为 20 帧

```bash
ffmpeg -i /Users/huangshuisheng/Desktop/aaa.mp4 -r 20 /Users/huangshuisheng/Desktop/bbb.mp4
```

## 修改分辨率

修改为 1920\*1080

```bash
ffmpeg -i /Users/huangshuisheng/Desktop/aaa.mp4 -vf scale=1920:1080 /Users/huangshuisheng/Desktop/bbb.mp4 -hide_banner
```
