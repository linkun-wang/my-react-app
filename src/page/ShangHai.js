import React from 'react';
import { Card } from 'antd';

class ShangHai extends React.Component {
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
                <Card hoverable title='"年前回上海来，对于久违了的上海人的第一个印象是白与胖"' bordered={false} style={{ width: 'auto' }}>

                </Card>
            </div>
        )
    }
}

export default ShangHai;
