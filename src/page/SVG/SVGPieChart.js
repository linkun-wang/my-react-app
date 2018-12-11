import React, { Component } from 'react';

const SVGNS = "http://www.w3.org/2000/svg";

export default class SVGPieChart extends Component {
    constructor(props){
        super(props);
        this.state = {}
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

    componentDidMount() {
        this.pieChart([10,20,20,50,2],"100%","100%",100,75,75,
            ['red','blue','gray','yellow','green'],
            ['个人花销','基本开销','房租','房贷','出行'],220,20);
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div id="pieChart" style={{width:'100%', height:'100%'}}></div>
        )
    }
}

