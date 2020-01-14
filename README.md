# bupt_shahe_yiban_lost&found_front-end

> lost&found web with vue + muse-ui

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at 0.0.0.0:8089
npm run dev

# build for production with minification,doc文件夹
# 部署时请将doc文件夹里的monitor中的static和index.html复制到doc目录下
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```
## Feature：
* 使用Muse-ui构建主要前端框架
* element-ui调用图片上传并获取返回信息
* Material Design作为主要设计语言
* 各屏幕尺寸dpi适配
* 前端内各组件按需加载(lazy load)
* gzip压缩

## TODO:
* tab栏在发布后、iPhone上的上下滚动错位问题
* 分类筛选时请求次数过多问题
* 部分浏览器上图床图片显示，改本地引入
* 发布者的联系方式（微信 qq 邮箱 手机等接口，以及相应的实现）
* 主要页面的滚动问题
* 管理面板
* 部分引入elementui
* 将上传图片组件独立出来到components中
* js改cdn引入
* 字体、图标等改为本地引入


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
