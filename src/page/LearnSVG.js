import React from 'react';
import { Card, Table, message, notification, Tooltip } from 'antd';
import Util from '../common/util';
import { Map, Marker } from 'react-amap';

const text = <span style={{fontFamily:'webfont'}}>是不是看着头晕，哈哈哈</span>;

class SVGDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Card hoverable title='SVG(Scalable Vector Graphics)--可伸缩矢量图形' bordered={false} style={{ width: 'auto' }}>
                    <div style={{width:'auto', height:700}}>
                        何为矢量---既有大小又有方向的量，也称为‘向量’。矢量图可以无限放大永不变形。
                        <svg xmlns="http://www.w3.org/2000/svg" width='100%' height='100%'>
                            <defs>
                                <linearGradient id="fade">
                                    <stop offset='0%' stopColor="#008"></stop>
                                    <stop offset='100%' stopColor="#ccf"></stop>
                                </linearGradient>
                            </defs>
                            <Tooltip placement="top" title={text}>
                                <rect id="shapeRect" x='10' y='10' width='20%' height='20%' stroke="black" strokeWidth='5' strokeLinejoin="round" strokeDasharray="10 3" fill="url(#fade)"></rect>
                            </Tooltip>
                        </svg>
                    </div>
                </Card>
            </div>
        )
    }
}

export default SVGDemo;
