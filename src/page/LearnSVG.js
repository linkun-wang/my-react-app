import React from 'react';
import { Card, Table, message, notification, Tooltip, Row, Col } from 'antd';
import { Map, Marker } from 'react-amap';

const text = <span style={{fontFamily:'webfont'}}>是不是看着头晕，哈哈哈</span>;
const SVGNS = "http://www.w3.org/2000/svg";

class SVGDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    /**
     * 创建SVG元素，并在其中绘制饼图
     * @param data 用于绘制的数字类型数组
     * @param width SVG图形大小
     * @param height
     * @param cx 饼图圆心
     * @param cy
     * @param r 饼图半径
     * @param colors 颜色数组（用于图例展示）
     * @param labels 图例标签数组
     * @param lx 图例位置
     * @param ly
     */
    pieChart(data, width, height, cx, cy, r, colors, labels, lx, ly) {
        let chart = document.createElementNS(SVGNS,'svg:svg');
        // 创建SVG元素，设置基本属性
        chart.setAttribute('width',width);
        chart.setAttribute('height',height);

        // 计算总数据量
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total += data[i]
        }

        // 计算各区域弧度（一个区域成为一个楔xie）
        // PS:弧度==>两条射线从圆心向圆周射出，形出一个夹角和一段弧。当这段弧长正好等于半径时，这个夹角的角度为1弧度
        let angles = [];
        for (let i = 0 ; i < data.length; i++) {
            angles[i] = data[i]/total * Math.PI * 2
        }

        // 绘制饼状图每个区域（12点钟方向为0°，顺时针方向角度递增）
        let startangle = 0;
        for (let i = 0 ; i < data.length; i++) {
            let endangle = startangle + angles[i];

            // 计算楔和圆相交的两个点的坐标
            let x1 = cx + r*Math.sin(startangle);
            let y1 = cy - r*Math.cos(startangle);
            let x2 = cx + r*Math.sin(endangle);
            let y2 = cy - r*Math.cos(endangle);

            // 是否大于半圆
            let big = 0;
            if (endangle - startangle > Math.PI) big = 1;

            // 使用<svg:path>来描述楔
            let path = document.createElementNS(SVGNS,'path');

            // 路径详细信息
            let d = "M "+cx+","+cy+    // 从圆心开始
                    " L "+x1+","+y1+   // 画一条到(x1,y1)的线段
                    " A "+r+","+r+     // 再画一条半径为r的弧线
                    " 0 "+big+" 1 "+   // 弧线信息 0==>该弧线旋转方向为0；big==>该弧线是小角度弧还是大角度弧(是否大于180°)；1==>顺时针画弧
                    x2+","+y2+         // 当前弧线到(x2,y2)结束
                    " Z ";    // 当前path结束

            // 设置<svg:path>元素的属性
            path.setAttribute('d',d);    // 设置路径
            path.setAttribute('fill',colors[i]);  // 填充颜色
            path.setAttribute('stroke','#fff');   // 边框颜色
            path.setAttribute('stroke-width','2'); // 边框宽度
            chart.appendChild(path); // 加入到饼图中

            // 当前楔的结束就是下一个楔的开始
            startangle = endangle;

            // 绘制图例
            let icon = document.createElementNS(SVGNS,'rect');
            icon.setAttribute('x',lx);
            icon.setAttribute('y',ly+26*i);
            icon.setAttribute('width',14);
            icon.setAttribute('height',14);
            icon.setAttribute('fill',colors[i]);
            chart.appendChild(icon);

            //在小方块的右边添加标签
            let label=document.createElementNS(SVGNS,"text");
            label.setAttribute("x",lx+25);   //定位标签文本
            label.setAttribute("y",ly+25*i+15);
            label.setAttribute("font-family","sans-serif");
            label.setAttribute("font-size","12");
            label.appendChild(document.createTextNode(labels[i]));
            chart.appendChild(label);   //将文本添加到饼状图
        }
        let pieChart = document.getElementById('pieChart');
        pieChart.appendChild(chart);
    }

    updateTime() {
        let now = new Date();
        let second = now.getSeconds();
        let min = now.getMinutes();
        let hour = (now.getHours() % 12) + min / 60;
        let secondangle = second * 6; // 6°每秒
        let minangle = min * 6;        // 6°每分钟
        let hourangle = hour * 30;    // 30°每小时

        let minhand = document.getElementById('minutehand');
        let hourhand = document.getElementById('hourhand');
        let secondhand = document.getElementById('secondhand');
        let shadhand = document.getElementById("shadow");

        minhand.setAttribute('transform', 'rotate(' + minangle + ', 50, 50)');
        hourhand.setAttribute('transform', 'rotate(' + hourangle + ', 50, 50)');
        secondhand.setAttribute('transform', 'rotate(' + secondangle + ', 50, 50)');
        for (let i = shadhand.childElementCount - 1; i >= 0; i--) {
            let chr = shadhand.children[i];
            if (chr.tagName === 'feOffset') chr.setAttribute("dx", "-3");
        }
    }

    componentDidMount() {
        this.pieChart([10,20,20,50,2],"100%","100%",100,75,75,
            ['red','blue','gray','yellow','green'],
            ['个人花销','基本开销','房租','房贷','出行'],220,20);
        this.intervalID = setInterval(()=>{
            this.updateTime()
        },1000);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount () {
        if(this.intervalID){
            clearInterval(this.intervalID);
        }
    }

    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px', height:'100%' }}>
                <Card hoverable title='SVG(Scalable Vector Graphics)--可伸缩矢量图形' bordered={false} style={{ width: 'auto', height:'100%' }}>
                    <Row gutter={20}>
                        <Col span={6}>
                            <div style={{width:'auto', height:'auto'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width='100%' height='100%'>
                                    <defs>
                                        <linearGradient id="fade">
                                            <stop offset='0%' stopColor="#008"></stop>
                                            <stop offset='100%' stopColor="#ccf"></stop>
                                        </linearGradient>
                                    </defs>
                                    <Tooltip placement="top" title={text}>
                                        <rect id="shapeRect" x='10' y='10' width='90%' height='90%' stroke="black" strokeWidth='5' strokeLinejoin="round" strokeDasharray="10 3" fill="url(#fade)"></rect>
                                    </Tooltip>
                                </svg>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div id="pieChart" style={{width:'100%', height:'100%'}}></div>
                        </Col>
                        <Col span={8}>
                            <div>
                                {/*viewBox是坐标系，width和height是指屏幕大小*/}
                                <svg id="clock" viewBox="0 0 100 100" width="150" height="150">
                                    <defs> {/*定义下拉阴影的滤镜*/}
                                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
                                            <feOffset in="blur" dx="-1" dy="1" result="shadow" lightingColor = "#adcd3c"/>
                                            <feMerge>
                                                <feMergeNode in="SourceGraphic"/>
                                                <feMergeNode in="shadow" />
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <circle id="face" cx="50" cy="50" r="45" /> {/*钟面*/}
                                    <g id="ticks">                              {/*12小时的刻度*/}
                                        <line x1="50.00" y1="5.000" x2="50.00" y2="10.00" />
                                        <line x1="72.50" y1="11.03" x2="70.00" y2="15.36" />
                                        <line x1="88.97" y1="27.50" x2="84.64" y2="30.00" />
                                        <line x1="95.00" y1="50.00" x2="90.00" y2="50.00" />
                                        <line x1="88.97" y1="72.50" x2="84.64" y2="70.00" />
                                        <line x1="72.50" y1="88.90" x2="70.00" y2="84.64" />
                                        <line x1="50.00" y1="95.00" x2="50.00" y2="90.00" />
                                        <line x1="27.50" y1="88.90" x2="30.00" y2="84.64" />
                                        <line x1="11.03" y1="72.50" x2="15.36" y2="70.00" />
                                        <line x1="5.000" y1="50.00" x2="10.00" y2="50.00" />
                                        <line x1="11.03" y1="27.50" x2="15.36" y2="30.00" />
                                        <line x1="27.50" y1="11.00" x2="30.00" y2="15.36" />
                                    </g>
                                    <g id="numbers">  {/*标记刻度值*/}
                                        <text x="50" y="23">12</text>
                                        <text x="85" y="55">3</text>
                                        <text x="50" y="88">6</text>
                                        <text x="15" y="55">9</text>
                                    </g>
                                    {/*初始绘制成竖直的指针，之后通过JS代码来做旋转*/}
                                    <g id="hands" filter="url(#shadow)"> {/*给指针添加阴影*/}
                                        <line id="hourhand" strokeWidth="2" x1="50" y1="50" x2="50" y2="24" />
                                        <line id="minutehand" strokeWidth="1.5" x1="50" y1="50" x2="50" y2="20" />
                                        <line id="secondhand" strokeWidth="1" x1="50" y1="50" x2="50" y2="16" />
                                    </g>
                                </svg>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default SVGDemo;
