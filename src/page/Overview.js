import React from 'react';
import { Card, Col, Row } from 'antd';
import leon from '../images/leon.png';
import Totoro from '../images/Totoro.gif';
import cry from '../images/cry.gif';

const { Meta } = Card;

class Overview extends React.Component {
    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={5}>
                        <Card hoverable style={{ width: 240 }}
                            cover={<img alt="example" src={ leon } />}>
                            <Meta title="Leon" description="This guy is handsomer than me !!-_-"/>
                        </Card>
                    </Col>
                    <Col span={5}>
                        <Card hoverable style={{ width: 240 }}
                              cover={<img alt="example" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544088162&di=27eb35c2726d7210e0efb0b7e9b891ee&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e0fe58cf3757a801219c77534998.jpg" />}>
                            <Meta title="Travel" description="行者无疆"/>
                        </Card>
                    </Col>
                    <Col span={5}>
                        <Card hoverable style={{ width: 240 }}
                              cover={<img alt="example" src="http://5b0988e595225.cdn.sohucs.com/images/20171210/03c452974e944ce79957a109686cf00c.jpeg" />}>
                            <Meta title="I have a dream" description="我想拥有一座房子，面朝大海，春暖花开"/>
                        </Card>
                    </Col>
                    <Col span={5}>
                        <Card hoverable style={{ width: 240 }}
                              cover={<img alt="example" src={ Totoro } />}>
                            <Meta title="Totoro" description="胖胖的龙猫 放点孜然更好"/>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card hoverable style={{ width: 240 }}
                              cover={<img alt="example" src={ cry } />}>
                            <Meta title="Crying" description="HAHAHAHA"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Overview;
