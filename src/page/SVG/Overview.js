import React from 'react';
import { Card, Table, message, notification, Tooltip, Row, Col } from 'antd';
import { Map, Marker } from 'react-amap';
import SVGClock from './SVGClock';
import SVGPieChart from './SVGPieChart';

const rectTip = <span style={{fontFamily:'webfont'}}>是不是看着头晕，哈哈哈</span>;

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
                                    <Tooltip placement="top" title={ rectTip }>
                                        <rect id="shapeRect" x='10' y='10' width='90%' height='90%' stroke="black" strokeWidth='5' strokeLinejoin="round" strokeDasharray="10 3" fill="url(#fade)"></rect>
                                    </Tooltip>
                                </svg>
                            </div>
                        </Col>
                        <Col span={8}>
                            <SVGPieChart/>
                        </Col>
                        <Col span={8}>
                            <SVGClock/>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default SVGDemo;
