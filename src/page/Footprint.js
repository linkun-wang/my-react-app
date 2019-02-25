import React from 'react';
import { Card, Steps, Icon, Button, message } from 'antd';
import { Map, Marker, Polyline } from 'react-amap';
import Util from '../common/util';
import Typed from 'typed.js';

const Step = Steps.Step;
const MyIcon = Icon.createFromIconfontCN({ // 调用在iconfont.cn上自行管理的图标
    scriptUrl:'//at.alicdn.com/t/font_949804_spfiq1ab0lh.js'
});
const steps = [
    {
        title:'安阳', icon:'icon-shang',
        info:'【东经114，北纬36】',
        desc:'"天命玄鸟，降而生商"',
        position: { longitude: 114.352482, latitude: 36.103442 }
    },{
        title:'洛阳', icon:'icon-datang',
        info:'【东经112，北纬34】',
        desc:'"欲知古今兴废事，请君只看洛阳城"',
        position: { longitude: 112.434468, latitude: 34.663041 }
    },{
        title:'上海', icon:'icon-shanghai3',
        info:'【东经121，北纬31】',
        desc:'"年前回上海来，\n对于久违了的上海人的第一个印象是^300\n白与胖"',
        position: { longitude: 121.473658, latitude: 31.230378 }
    },{
        title:'杭州', icon:'icon-hangzhou',
        info:'【东经120，北纬30】',
        desc:'江\n南\n忆\n,\n最\n忆\n是\n杭\n州',
        position: { longitude: 120.152422, latitude: 30.284945 }
    }
];

class Footprint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            center: steps[0].position,
            path: [steps[0].position]
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
        this.amapEvents = {
            created: (ins) => {
                this.mapInstance = ins
            }
        };
        this.options = {
            strings: [steps[0].desc],
            typeSpeed: 120,
            backSpeed: 120
        };
        this.infoPosition = 'typer-div';
    }

    next() {
        if (this.mapInstance && this.mapInstance.getZoom() !== this.mapParams.zoom) {
            this.mapInstance.setZoom(this.mapParams.zoom)
        }
        const current = this.state.current + 1;
        this.infoPosition = current === 3 ? 'typer-div left70':'typer-div';
        const center = steps[current].position;
        let path = this.state.path.concat([center]); // 此处不能用push方法，push方法只是修改数据状态，并不会返回一个新的数组
        this.setState({ current, center, path },(()=>{
            this.typed.destroy();
            this.options.strings = [steps[this.state.current].desc];
            this.typed = new Typed(this.el, this.options);
        }));
    }

    prev() {
        if (this.mapInstance && this.mapInstance.getZoom() !== this.mapParams.zoom) {
            this.mapInstance.setZoom(this.mapParams.zoom)
        }
        const current = this.state.current - 1;
        this.infoPosition = current === 3 ? 'typer-div left70':'typer-div';
        const center = steps[current].position;
        let path = this.state.path.slice(0,this.state.current);
        this.setState({ current, center, path },(()=>{
            this.typed.destroy();
            this.options.strings = [steps[this.state.current].desc];
            this.typed = new Typed(this.el, this.options);
        }));
    }

    componentDidMount() {
        this.typed = new Typed(this.el, this.options);
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.typed.destroy();
    }

    render() {
        const { current, center, path } = this.state;
        return (
            <div style={{ background: '#ffffff', padding: '30px', height:'100%' }}>
                <Steps current={ current }>
                    {steps.map(item => <Step key={item.title} title={item.title} description={item.info} icon={<MyIcon type={item.icon} />}/>)}
                </Steps>
                <div className="steps-content">
                    <Map amapkey={ this.mapParams.amapKey }
                         center={ center }
                         zoom={ this.mapParams.zoom }
                         plugins={ this.mapParams.plugins }
                         events={ this.amapEvents }>
                        <Marker position={ center }
                                animation="AMAP_ANIMATION_BOUNCE">
                        </Marker>
                        <Polyline path={ path } showDir="true"/>
                    </Map>
                    <div className={ this.infoPosition } >
                        <span style={{ whiteSpace: 'pre' }} ref={(el) => { this.el = el; }}/>
                    </div>
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
