import React from 'react';
import { Card, Table, message, notification } from 'antd';
import Util from '../common/util';
import { Map, Marker } from 'react-amap';

class AnYang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.mapParams = {
            amapKey: Util.constant.MAP_KEY,
            position: { longitude: 114.352482, latitude: 36.103442 },
            zoom: 6,
            plugins: ['Scale', //比例尺
                {
                    name: 'OverView', //鹰眼
                    options: {
                        isOpen: true
                    }
                }, {
                    name: 'ToolBar',
                    options: {
                        liteStyle: true, // 精简模式
                        ruler: true, // 标尺键盘是否可见
                        noIpLocate: true, // 定位失败后，是否开启IP定位
                        locate: true, // 是否显示定位按钮
                        autoPosition: false, // 是否在地图初始化完成后自动定位
                        position: 'RT' // 位置，可选：LT RT LB RB
                    },
                }]
        };
        this.markerPosition = this.mapParams.position;
        this.mapHeight = document.getElementById('root').clientHeight * 0.7 + 'px';
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const height = this.mapHeight;
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Card hoverable title='"天有玄鸟，降而生商"' bordered={false} style={{ width: 'auto' }}>
                    <div id="anyangMap" style={{width:'auto', height:`${height}`}}>
                        <Map amapkey={ this.mapParams.amapKey }
                             center={ this.mapParams.position }
                             zoom={ this.mapParams.zoom }
                             plugins={ this.mapParams.plugins }>
                            <Marker position={this.markerPosition}
                                    animation="AMAP_ANIMATION_BOUNCE">
                            </Marker>
                        </Map>
                    </div>
                </Card>
            </div>
        )
    }
}

export default AnYang;
