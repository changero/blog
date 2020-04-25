---
title: 常用的docker镜像
date: 2020-04-11
categories:
  - docker
---

## jellyfin

> docker run -d -p 8096:8096 -v /opt/jellyfin/config:/config -v /videos/:/videos/ jellyfin/jellyfin

## kodexplorer

> docker run -d -p 8081:80 -v /data:/data baiyuetribe/kodexplorer

## portainer

> docker run --restart always --name portainer -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -d portainer/portainer

## 临时邮箱

> docker run --name mail -p 25:25 -p 3000:3000  -d rockmaity/forsaken-mail

## docker-pan

> docker run --name=pan -v /opt/data:/var/www/html/system/data/default_home_folder  -dti -p 8082:80 -p 6800:6800 jaegerdocker/pan

## 人人影视

> docker run -d --name rrshare -p 3001:3001 -v /videos:/opt/work/store oldiy/rrshare64:latest

> docker run -d -p 3001:3001 -v /opt/rrdata:/opt/work/store --name rrys baiyuetribe/rrshare

## h5ai

> docker run -d -p 10010:80 -v /videos/:/h5ai --name h5ai ilemonrain/h5ai:full
    
## syncthing
>docker run -it  -p 8384:8384 -p 22000:22000 -v /storage/conf/syncthing:/var/syncthing/config -v /storage/data/syncthing:/var/syncthing syncthing/syncthing:latest

## aria2
    docker run -d --name aria2 -p 5003:80 -v /opt/data/aria2:/data -v /opt/data/aria2:/conf -e PUID=1000 -e PGID=1000 -e EXTERNAL_PORT=5003 -e USER_NAME=bianqu -e PASSWORD=123123 sanjusss/aria2-ariang-docker
    
    docker run -d --name aria2 -p 5003:80 -v /opt/data/aria2:/data sanjusss/aria2-ariang-docker
    
    用户名、密码默认admin

## gitlab 

> docker run -d -p 443:443 -p 80:80 -p 22222:22 --name gitlab -v /gitlab/config:/etc/gitlab -v /gitlab/logs:/var/log/gitlab -v /gitlab/data:/var/opt/gitlab gitlab/gitlab-ce