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

-------------------


