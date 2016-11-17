# gulp-angular
gulp+angular的简单开发模板，基于[generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular)，进行了一些简化，省略了测试代码部分，跟自己搭建的项目融合，
并且添加了`gulp.spritesmith`自动化sprite；使用`http-proxy-middleware`和`browser-sync`结合起来对后端服务进行代理，解决跨域问题。

#用法
`node server.js`启动后端服务<br/>
`gulp serve`启动前端app项目<br/>
`gulp serve:watch`启动前端app项目，监听文件变化并刷新浏览器<br/>
`gulp serve:dist`启动最终要部署的前端dist项目<br/>
`gulp build`压缩编译前端项目到dist目录<br/>

