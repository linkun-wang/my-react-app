import React from 'react';
import { Card, Table, message, notification } from 'antd';
import Util from '../common/util';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
