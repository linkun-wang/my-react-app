### 使用说明

#### 使用
    # 前置条件：已安装Nodejs、npm
	npm install

#### 项目简介

自己练习react所建项目，组件主要采用蚂蚁金服antd以及其他github开源组件。

##### 1、项目目录说明

	├── README.md  
	├── node_modules/  # library root
	├── public/      # 公共文件夹（入口文件、图标、react项目自带说明文档）
	├── package.json
	└── src/       # 项目业务代码

##### 2、业务目录说明

    src
	├── css/    # 样式文件夹
	├── page/   # 页面具体业务逻辑
	├── index.css  
	├── index.js  # 入口文件 
	└── logo.svg 

##### 3、启动项目

        $ npm start   #如果需要自定义ip及端口，在package.json中设置即可："start": "set PORT=8666 && react-scripts start"


##### 4、项目打包
        $ npm run build
        
##### 5、项目部署至github-page(https://linkun-wang.github.io/my-app/)
        $ yarn run deploy

##### PS: 开发中遇到的坑：
###### state（参考：https://www.jianshu.com/p/c6257cbef1b1）
> * React中的state类型应为不可变类型（数字，字符串，布尔值，null， undefined）
> * 如果state类型是数组，则需注意：进行'增删改'等操作时应选用可以返回新数组的函数，比如：往数组中添加新元素，不要用push()，应该用contact()方法
> * state类型是普通对象（不包含字符串、数组），则可以使用ES6的Object.assgin函数和对象扩展语法   
###### SVG和canvas  
> * 相似点：它们都是有效的图形工具，可用来快速创建在网页中显示的轻型图形；它们都使用 JavaScript 和 HTML；它们都遵守万维网联合会 (W3C) 标准。
> * 区别如下：

| SVG   |  canvas  |
| :-----: | :-----:  |
| 不依赖分辨率 | 依赖分辨率 |
| 通过构建XML元素树来绘制图形| 通过 JavaScript 来绘制图形(canvas提供了绘制图形的API) |
|  SVG DOM中的每个元素都是可用的，可以为某个元素附加 JavaScript 事件处理器 | 不支持事件处理器 |
| 在 SVG 中，每个被绘制的图形均被视为对象。<br/>如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形 | 在canvas中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。<br/>如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象  |   
-------------------


