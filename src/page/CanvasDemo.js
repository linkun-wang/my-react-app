import React from 'react';
import { Card, Table, message, notification } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const gridStyle = {
    width: '25%',
    textAlign: 'center'
};
class CanvasDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        let canvas = document.getElementById('demo1');
        let c = canvas.getContext('2d');
        c.fillStyle = '#f00';
        c.fillRect(0,0,100,100);

        canvas = document.getElementById('demo2');
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

        canvas = document.getElementById('demo3');
        c = canvas.getContext('2d');
        c.beginPath();
        c.moveTo(5,0);
        c.lineTo(100,95);
        c.lineTo(5,95);
        c.closePath();
        c.fillStyle = '#fff';
        c.lineWidth = 3;
        c.strokeStyle = '#00f';
        c.fill();
        c.stroke();
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px', height:'100%' }}>
                <Card hoverable title='Canvas--<canvas>是可以用JS脚本绘制图像的HTML元素，它提供了一张固定大小的画布，并公开了一个或多个渲染上下文，可以用来绘制和处理要展示的内容。'
                      bordered={false} style={{ width:'auto', height:'100%' }}>
                    <Card.Grid style={gridStyle}>
                        <canvas id="demo1" width='100%' height='100%'></canvas>
                        <canvas id="demo2" width='120' height='100'></canvas>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                        <canvas id="demo3" width='150' height='100%'></canvas>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                </Card>
            </div>
        )
    }
}

export default CanvasDemo;
