import React, { Component } from 'react';
import { Tooltip } from 'antd';
import Current from '../CurrentDate';

const current = <Current/>;

export default class SVGClock extends Component {
    constructor(props){
        super(props);
        this.state = {}
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
    }

    componentDidMount() {
        this.updateTime();
        this.intervalID = setInterval(()=>{
            this.updateTime()
        },1000);
    }

    componentWillUnmount() {
        if(this.intervalID){
            clearInterval(this.intervalID);
        }
    }

    render() {
        return (
            <div style={{overflow:'auto'}}>
                <Tooltip placement="top" title={ current }>
                    {/*viewBox是坐标系，width和height是指屏幕大小*/}
                    <svg id="clock" viewBox="0 0 100 100" width="150" height="150">
                        <defs> {/*定义下拉阴影的滤镜*/}
                            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
                                <feOffset in="blur" dx="-3" dy="1" result="shadow" lightingColor = "#adcd3c"/>
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
                </Tooltip>
            </div>
        )
    }
}

