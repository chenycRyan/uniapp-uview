## 参考基于 uniapp+uview 搭建的一套开箱即用的项目基本框架，可直接用于开发

### 功能说明

#### 首页自定义骨架屏（css 方式）

#### 包括热更新、强制更新、非强制更新，手动检查更新

#### 可配置登录方式，通过 config.js 或后端拿数据配置登录方式

#### 首次进入增加引导页

#### 对 uni.request 的二次封装（请求拦截、响应拦截、token 鉴权）；

#### 小程序页面分包搭建；

#### 补充路由封装跳转，补充 vuex 模块化导入，补充页面信息获取，补充 colorui

### 工程目录

```XML
|- XXX项目
    |- components      // 组件存放目录
      |- common        // 可复用组件

    |- apis            // 环境变量配置
      |- api           // 存放请求接口
      |- index.js      // 所有js文件后做的一统一暴露

    |- http            // http请求封装
      |- config.js     // url基本配置
      |- request.js    // 对uni.request的二次封装

    |- nativeplugins   // 存放本地原生插件

    |- pages           // 存放整个 uni-app 项目的所有的页面
        |- login
        |- home

    |- static          // 存放静态资源
            |- icon    // iconfont字体图标
        |- images      // 图片资源

    |- utils           // 工具存放目录
        |- global.js   // 全局常量、方法封装模块
        |- rem.js      // rem适配方法封装
        |- request.js  // 公共请求工具
        |- app-update-check.js  // app升级相关方法
        |- util.js     // 各类工具函数封装

    |- styles          // 存放css文件
        |- base64-pic-store.scss

    |- subpages        // 存放小程序分包页面
        |- unpackage   // 存放uni-app 项目打包输出的文件，存有各个平台的打包文件
    |- utils           // 工具类函数封装
    |- APP.vue         // 根页面
    |- main.js         // 入口文件
    |- manifest.json   // 应用的配置文件，用于指定应用的名称、图标、权限等
    |- pages.json      // 对 uni-app 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar等
    |- uni.scss        // 预置了一些常用样式变量，方便整体控制应用的风格，比如按钮颜色、边框风格
```
