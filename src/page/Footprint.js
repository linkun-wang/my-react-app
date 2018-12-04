import React from 'react';
import { Card, Steps, Icon, Button, message } from 'antd';
import { Map, Marker } from 'react-amap';
import Util from '../common/util';

const Step = Steps.Step;
const MyIcon = Icon.createFromIconfontCN({ // 调用在iconfont.cn上自行管理的图标
    scriptUrl:'//at.alicdn.com/t/font_949804_spfiq1ab0lh.js'
});
const steps = [
    {
        title:'安阳', icon:'icon-shang',
        desc:'"天有玄鸟，降而生商"',
        position: { longitude: 114.352482, latitude: 36.103442 }
    },{
        title:'洛阳', icon:'icon-datang',
        desc:'"欲知古今兴废事，请君只看洛阳城"',
        position: { longitude: 112.434468, latitude: 34.663041 }
    },{
        title:'上海', icon:'icon-shanghai3',
        desc:'"年前回上海来，对于久违了的上海人的第一个印象是白与胖"',
        position: { longitude: 121.473658, latitude: 31.230378 }
    },{
        title:'杭州', icon:'icon-hangzhou',
        desc:'"江南忆，最忆是杭城"',
        position: { longitude: 120.152422, latitude: 30.284945 }
    }
];

class Footprint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            center: steps[0].position
        };
        this.mapParams = {
            amapKey: Util.constant.MAP_KEY,
            position: steps[this.state.current].position,
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
    }

    next() {
        const current = this.state.current + 1;
        const center = steps[current].position;
        this.setState({ current, center });
    }

    prev() {
        const current = this.state.current - 1;
        const center = steps[current].position;
        this.setState({ current, center });
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const { current, center } = this.state;
        return (
            <div style={{ background: '#ffffff', padding: '30px' }}>
                <Steps current={ current }>
                    {steps.map(item => <Step key={item.title} title={item.title} description={item.desc} icon={<MyIcon type={item.icon} />}/>)}
                </Steps>
                <div className="steps-content">
                    <Map amapkey={ this.mapParams.amapKey }
                         center={ center }
                         zoom={ this.mapParams.zoom }
                         plugins={ this.mapParams.plugins }>
                        <Marker position={ center }
                                animation="AMAP_ANIMATION_BOUNCE">
                        </Marker>
                    </Map>
                </div>
                <div className="steps-action">
                    {
                        current < steps.length - 1
                        && <Button type="primary" onClick={() => this.next()}>下一站</Button>
                    }
                    {
                        current === steps.length - 1
                        && <Button type="primary" icon="environment" onClick={() => message.success(`现在是${steps[this.state.current].title}站，我们将会在此停留一段时间~~`)}>Present</Button>
                    }
                    {
                        current > 0
                        && (<Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>上一站</Button>)
                    }
                </div>
            </div>
        )
    }
}

export default Footprint;
