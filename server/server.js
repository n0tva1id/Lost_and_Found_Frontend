//引入express中间件
var express = require('express');
var app = express();
var proxyMiddleware = require('http-proxy-middleware')
var proxyPath = 'http://[2001:da8:215:8f01:4567:218a:385f:b732]:4000'
const proxyOption = {target: proxyPath,changeOrigin: true,pathRewrite: {
    '^/api': ''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
  }}
//指定启动服务器到哪个文件夹，我这边指的是dist文件夹
app.use('/api', proxyMiddleware(proxyOption))
app.use(express.static('../doc'));


//监听端口为3000
app.listen(3000, function () {
  console.log(' app listening at http://[::]:3000');
});