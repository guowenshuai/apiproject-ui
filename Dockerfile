FROM nginx:1.14

MAINTAINER wenshuai.guo

COPY dist /data/ui/
COPY nginxConfig/default.conf /etc/nginx/conf.d/default.conf
