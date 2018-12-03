import React from 'react';
import { Card, Table, message, notification } from 'antd';
import Util  from '../commom/util';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class LuoYang extends React.Component {
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
                <Card hoverable title='"欲知古今兴废事，请君只看洛阳城"' bordered={false} style={{ width: 'auto' }}>

                </Card>
            </div>
        )
    }
}

export default LuoYang;
