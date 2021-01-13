import React from 'react';
import { Card } from 'antd';

class HangZhou extends React.Component {
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
                <Card hoverable title='"江南忆，最忆是杭城"' bordered={false} style={{ width: 'auto' }}>

                </Card>
            </div>
        )
    }
}

export default HangZhou;
