# 开发环境

## 配置后台代理

在`vue.config.js`文件中配置服务器跨域代理,`target`是服务器`url`，设置为API后台的url

[后台服务参见这里](https://github.com/guowenshuai/apiproject)

```
target: 'http://127.0.0.1:38080',

```

## 配置websocket
在文件`src/views/WebSocket.vue`中，配置websocket服务器地址,默认如下

```
ws://127.0.0.1:38080/v1/ws/
```

## 运行
```
npm run serve
```


# 生成环境

## 编译
在项目根目录编译生成`dist`文件目录，将该目录挂载到`nginx root`目录即可
```
npm run build

```

## nginx配置
nginx需要配置范文后台API的路由代理,在文件`nginxConfig/default.conf`中
```
location /api/ {
    proxy_pass	http://10.10.11.133:38080/;
}
```

## 运行
运行一个nginx容器，将`dist`和`nginxConfig`挂载到nginx相关目录
```
docker run --name api-project-ui -d -v /home/gws/WebstormProjects/api-project-ui/dist:/data/ui -v /home/gws/WebstormProjects/api-project-ui/nginxConfig:/etc/nginx/conf.d/ -p 31080:80 nginx:1.14
```

启动后访问`31080`端口