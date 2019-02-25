import React from 'react';
import { Card } from 'antd';

const text = '--\<canvas>是可以用JS脚本绘制图像的HTML元素，它提供了一张固定大小的画布，并公开了一个或多个渲染上下文，可以用来绘制和处理要展示的内容';
const title =
    <div>
        <span>Canvas</span>
        <span style={{ fontSize:'smaller', color:'#c0c0c0' }}>{ text }</span>
    </div>;

class CanvasDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // 基础绘制矩形，圆形
        let canvas = document.getElementById('demo1');
        canvas.width = 0.073 * window.screen.availWidth;
        canvas.height = 0.135 * window.screen.availHeight;
        let c = canvas.getContext('2d');
        this.basicDraw(c);

        // 绘制简单多边形（三角形）
        canvas = document.getElementById('demo3');
        c = canvas.getContext('2d');
        this.drawSimplePolygon(c);

        // 绘制更多多边形
        canvas = document.getElementById('demo4');
        c = canvas.getContext('2d');
        this.drawPolygon(c);

        // 绘制嵌套带阴影图形
        canvas = document.getElementById('demo5');
        c = canvas.getContext('2d');
        this.drawShadowPolygon(c);
    }

    basicDraw(c) {
        c.fillStyle = '#f00';
        c.fillRect(0,0,100,100);
        let canvas = document.getElementById('demo2');
        canvas.width = 0.083 * window.screen.availWidth;
        canvas.height = 0.135 * window.screen.availHeight;
        c = canvas.getContext('2d');
        c.beginPath();
        /**
         * c.arc(x,y,r,sAngle,eAngle,counterclockwise);
         * x,y ==> 圆心坐标；r ==> 圆半径；
         * sAngle ==> 起始角，以弧度计（弧的圆形的三点钟位置是0°）
         * eAngle ==> 结束角，以弧度计
         * counterclockwise 可选。true逆时针 false顺时针
         */
        c.arc(60,50,50,0,2*Math.PI,true);
        c.fillStyle = '#00f';
        c.fill();
    }

    drawSimplePolygon(c) {
        c.beginPath();  // 开始一条新路径
        c.moveTo(5,0);  // 从(5,0)开始
        c.lineTo(100,95); // 到(100,95)绘制一条线段
        c.lineTo(5,95); // 再到(5,95)绘制一条线段
        c.closePath(); // 路径闭合
        c.fillStyle = '#fff';
        c.lineWidth = 3;
        c.strokeStyle = '#00f';
        c.fill(); // 填充三角形区域
        c.stroke(); // 绘制三角形的边
    }

    getPolygon(c,n,x,y,r,angle,counterclockwise) {
        angle = angle || 0;
        counterclockwise = counterclockwise || false;
        c.moveTo(x + r*Math.sin(angle), y - r*Math.cos(angle));
        let delta = 2*Math.PI/n; // 两个顶点之间的夹角的弧度值
        for (let i = 0; i < n; i++) {
            angle += counterclockwise ? -delta : delta;
            c.lineTo(x + r*Math.sin(angle), y - r*Math.cos(angle));
        }
        c.closePath();
    }

    drawPolygon(c) {
        c.beginPath();
        this.getPolygon(c,3,50,70,50);            //三角形
        this.getPolygon(c,4,150,60,50,Math.PI/4); //正方形
        this.getPolygon(c,5,255,55,50);           //五边形
        this.getPolygon(c,6,365,53,50,Math.PI/6); //六边形
        this.getPolygon(c,4,365,53,20,Math.PI/4,true); //六边形中的小正方形

        // 设置外观属性
        c.fillStyle = '#ccc';     // 浅灰色填充
        c.strokeStyle = '#008';   // 深蓝色外框
        c.lineWidth = 5;           // 外框宽度为5像素

        // 绘制多边形
        c.fill();   // 填充
        c.stroke(); // 勾勒边框
    }

    drawShadowPolygon(c) {
        // 父路径顺时针绘制，子路径逆时针绘制，canvas就会根据非零绕数原则，对内部的多边形不填充
        c.shadowColor = "#545454";
        c.shadowOffsetX = 5;
        c.shadowOffsetY = 5;
        c.shadowBlur = 2;

        c.arc(50, 50, 50, 0, Math.PI * 2 ,false);
        c.arc(50, 50, 40, 0, Math.PI * 2 ,true);
        c.fillStyle = "#00AAAA";
        c.fill();

        let canvas = document.getElementById('demo6');
        c = canvas.getContext('2d');
        c.beginPath();
        c.rect(30,0,160,110); // 顺时针绘制矩形外框
        this.drawRectInside(c,40,10,140,40);// 逆时针绘制里面的矩形
        this.drawTriangleInside(c,72,60,40,100,104,100);// 逆时针绘制里面的三角形
        c.arc(144, 80, 25, 0, Math.PI * 2, true);// 逆时针绘制里面右下角的圆
        c.closePath();

        c.fillStyle = "#058";
        c.shadowColor = "gray";
        c.shadowOffsetX = 5;
        c.shadowOffsetY = 5;
        c.shadowBlur = 5;
        c.fill();
    }

    drawRectInside(c, x, y, w, h) {
        // 注意：此处是子路径，不能使用beginPath()和closePath()
        c.moveTo(x,y); // 以左上角的点为开端
        c.lineTo(x,y+h); // 逆时针画线 ↓
        c.lineTo(x+w,y+h); // →
        c.lineTo(x+w,y); // ↑
        c.lineTo(x,y); // ←
    }

    drawTriangleInside(c, x1, y1, x2, y2, x3, y3) {
        // 逆时针画
        c.moveTo(x1, y1);
        c.lineTo(x2, y2);
        c.lineTo(x3, y3);
        c.lineTo(x1, y1);
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px', width:'100%', height:'100%' }}>
                <Card hoverable title={ title }
                      bordered={false} style={{ width:'100%', height:'100%' }}>
                    <Card.Grid style={{ textAlign:'center', width:'25%', overflow:'auto' }}>
                        <canvas id="demo1"></canvas>
                        <canvas id="demo2"></canvas>
                    </Card.Grid>
                    <Card.Grid style={{ textAlign:'center', width:'15%', overflow:'auto' }}>
                        <canvas id="demo3" width='100' height='100'></canvas>
                    </Card.Grid>
                    <Card.Grid style={{ textAlign:'center', width:'45%', overflow:'auto' }}>
                        <canvas id="demo4" width='500' height='100'></canvas>
                    </Card.Grid>
                    <Card.Grid style={{ textAlign:'left', width:'35%', overflow:'auto' }}>
                        <canvas id="demo5" width='110' height='110'></canvas>
                        <canvas id="demo6" width='200' height='120'></canvas>
                    </Card.Grid>
                </Card>
            </div>
        )
    }
}

export default CanvasDemo;
