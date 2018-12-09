import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Table, message, notification, Tooltip, Row, Col } from 'antd';
import Util from '../common/util';
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
     * 创建一个<svg>元素，并在其中绘制一个饼图
     * @param data 用于绘制的数字类型的数组，数组每一项都表示饼状图的一个楔(xie)
     * @param width SVG图形大小
     * @param height
     * @param cx 饼状图圆心
     * @param cy
     * @param r 饼状图半径
     * @param colors 颜色数组
     * @param labels 图例标签数组
     * @param lx 图例位置
     * @param ly
     */
    pieChart(data, width, height, cx, cy, r, colors, labels, lx, ly) {
        let chart = document.createElementNS(SVGNS,'svg:svg');
        // 创建svg元素，设置基本属性 宽高和坐标
        chart.setAttribute('width',width);
        chart.setAttribute('height',height);
        // chart.setAttribute('viewBox','0 0 '+ width + ' '+ height);

        // 累加data的值==>计算饼图各区域大小
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total += data[i];
        }

        // 计算各区域弧度
        let angles = [];
        for (let i = 0; i < data.length; i++) {
            angles[i] = data[i]/total*Math.PI*2;//弧度==>两条射线从圆心向圆周射出，形成一个夹角和夹角正对的一段弧。当这段弧长正好等于圆的半径时，两条射线的夹角大小为1弧度
        }

        //遍历病状图的每个分片
        let starttangle = 0;
        for(let i=0;i<data.length;i++){
            //这里表示楔的结束为止
            let endangle=starttangle+angles[i];

            //计算出楔和园橡胶的两个点
            //这些计算公式都是以12点钟方向为0°
            //顺时针方向角度递增
            let x1=cx+r*Math.sin(starttangle);
            let y1=cy-r*Math.cos(starttangle);
            let x2=cx+r*Math.sin(endangle);
            let y2=cy-r*Math.cos(endangle);

            //这个标记表示角度大于半圆
            //此标记在绘制SBG弧形组件的时候需要
            let big=0;
            if(endangle-starttangle>Math.PI) big=1;

            //使用<svg:path>元素来描述楔
            //要注意的是，使用ctreateElementNS()来创建该元素
            let path=document.createElementNS(SVGNS,"path");

            //下面的字符串包含路径的详细信息
            let d="M "+cx+","+cy+ //从圆心开始
                " L "+x1+","+y1+   //画一条到(x1,y1)的线段
                " A "+r+","+r+     //再画一条半径为r的弧
                " 0 "+big+" 1 "+    // 弧的详细信息
                x2+","+y2+    //弧到(x2,y2)结束
                " Z";   //d当前路径到(cx,cy)结束

            //设置<svg:path>元素的属性
            path.setAttribute("d",d);   //设置路径
            path.setAttribute("fill",colors[i]); //设置楔的颜色
            path.setAttribute("stroke","#ffffff");  //楔的外边框为黑色
            path.setAttribute("stroke-width","2"); //两个单位
            chart.appendChild(path); //将楔加入到饼状图中

            //当前楔的结束就是下一个楔的开始
            starttangle=endangle;

            //绘制小方块表示图例
            let icon=document.createElementNS(SVGNS,"rect");
            icon.setAttribute("x",lx);  //定位小方块
            icon.setAttribute("y",ly+30*i);
            icon.setAttribute("width",20);
            icon.setAttribute("height",20);
            icon.setAttribute("fill",colors[i]); //填充小方块颜色和对应楔的颜色也相同
            icon.setAttribute("stroke","#ffffff");  //子外边框颜色也相同
            icon.setAttribute("stroke-width","2");
            chart.appendChild(icon);

            //在小方块的右边添加标签
            let label=document.createElementNS(SVGNS,"text");
            label.setAttribute("x",lx+30); //定位标签文本
            label.setAttribute("y",ly+30*i+18);
            label.setAttribute("font-family","sans-serif");
            label.setAttribute("font-size","14");
            label.appendChild(document.createTextNode(labels[i]));
            chart.appendChild(label); //将文本添加到饼状图
        }
        let pieChart = document.getElementById('pieChart');
        pieChart.appendChild(chart);
    }

    componentDidMount() {
        this.pieChart([10,20,20,50],"100%","100%",100,75,75,
            ['red','blue','gray','yellow'],
            ['个人花销','基本开销','房租','房贷'],190,20);
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px', height: '100%' }}>
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
                        <Col span={10}>
                            <div id="pieChart" style={{width:'100%', height:'100%'}}></div>
                        </Col>
                        <Col span={8}>
                            <div>Next SVG making...</div>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default SVGDemo;
