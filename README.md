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
	
--------------------------------------------------
#### PS: 开发中零碎知识点记录：
##### state（参考：https://www.jianshu.com/p/c6257cbef1b1）
> * React中的state类型应为不可变类型（数字，字符串，布尔值，null， undefined）
> * 如果state类型是数组，则需注意：进行'增删改'等操作时应选用可以返回新数组的函数，比如：往数组中添加新元素，不要用push()，应该用contact()方法
> * state类型是普通对象（不包含字符串、数组），则可以使用ES6的Object.assgin函数和对象扩展语法   

--------------------------------------------------
##### SVG和Canvas  
> * 相似点：它们都是有效的图形工具，可用来快速创建在网页中显示的轻型图形；它们都使用 JavaScript 和 HTML；它们都遵守万维网联合会 (W3C) 标准。
> * 区别如下：

| SVG   |  canvas  |
| :-----: | :-----:  |
| 不依赖分辨率 | 依赖分辨率 |
| 通过构建XML元素树来绘制图形| 通过 JavaScript 来绘制图形(canvas提供了绘制图形的API) |
|  SVG DOM中的每个元素都是可用的，可以为某个元素附加 JavaScript 事件处理器 | 不支持事件处理器 |
| 在 SVG 中，每个被绘制的图形均被视为对象。<br/>如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形 | 在canvas中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。<br/>如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象  |
> * 在线SVG编辑器：https://www.zhangxinxu.com/sp/svg/#move_up

--------------------------------------------------

##### Canvas画布API中定义的图形属性/状态


| 属性       | 含义   |
| :-------:   | :-----  | 
| fillStyle  | 填充时候的颜色、渐变或图案等样式 |   
| font        | 绘制文本时候的CSS字体 | 
| globalAlpha | 绘制像素时候要添加的透明度 |
| globalCompositeOperation | 如何合并新的像素点和下面的像素点 |
| lineCap | 如何渲染线段的末端 |
| lineJoin | 如何渲染顶点 |
| lineWidth | 外框线的宽度 |
| miterLimit | 紧急斜接顶点的最大长度 |
| textAlign | 文本水平对齐方式 |
| textBaseline | 文本垂直对齐方式 |
| shadowBlur | 阴影的清晰或模糊程序 |
| shadowColor | 下拉阴影的颜色 |
| shadowOffsetX | 阴影的水平偏移量 |
| shadowOffsetY | 阴影的垂直偏移量 |
| strokeStyle | 勾勒线段时的颜色，渐变或图案样式 |

-------------------
##### Canvas中的状态管理==> save() 和 restore()
> * canvas.save()用来保存先前状态的   ``
    调用save()方法会将当前图形状态压入栈(stack)中
> * canvas.restore()用来恢复之前保存的状态   
    调用restore()方法会从栈中回复**最近一次**保存的状态
> * 堆==>先进先出；栈==>先进后出：      
![Stack](./src/images/stack.PNG "堆-栈")       

----

##### 弧度（rad）
> * 弧长等于半径的弧，其所对的圆心角为1弧度。(即两条射线从圆心向圆周射出，形成一个夹角和夹角正对的一段弧，当这段弧长正好等于圆的半径时，两条射线的夹角的弧度为1rad)
> * 一圆周的弧度：2π
> * 1° === π/180 rad

------

##### 奇-偶规则（Odd-even Rule）
> * 从任意点P作一条射线，若与该射线相交的多边形边数为奇数，则P点在该多边形内部；反之若为偶数，则说明P点在该多边形外部。如下图：    
![Odd-even Rule](./src/images/Odd-even-Rule.PNG "奇-偶规则")

---

##### 非零绕数原则（Non-Zero Winding Number）
> * S1中引出的射线L1，与S1的子路径的正方向相交，那么我们就给计数器+1，结果为+1，在里面。  
    S2中引出的射线L2，与两条子路径的正方向相交，计数器+2，结果为+2，在里面。  
    S3中引出的射线L3，与两条子路径相交，但是其中有一条的反方向，计数器+1-1，结果为0，外面。  
    即：非零在内，零在外   
![Non-Zero Winding Number](./src/images/Non-Zero-Winding-Number.PNG "非零绕数原则")

---
