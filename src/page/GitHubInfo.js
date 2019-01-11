import React from 'react';
import { Card, Table, message, notification } from 'antd';
import Util from '../common/util';
import Ajax from '../common/ajax';
import { CopyToClipboard } from 'react-copy-to-clipboard';

let gitHubInfo = [], _this;

class StarsInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            gitHubInfo: []
        };
        this.columns = [
            { title: '项目名称', width: 160, dataIndex: 'name', key: 'name', defaultSortOrder: 'ascend', fixed: 'left',
                sorter: (a,b) => {
                    return a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0)
                },
                render: (text, row, index) => <a target="_Blank" href= {row.home}>{row.name}</a>
            },
            { title: '项目ID', dataIndex: 'id', key: 'id'},
            { title: '描述', dataIndex: 'desc', key: 'desc', width: 260 },
            { title: 'owner', dataIndex: 'owner', key: 'owner', width: 100 },
            { title: '创建时间', dataIndex: 'createDate', key: 'createDate', width: 180,
                sorter: (a,b) => (new Date(a.createDate)).getTime() - (new Date(b.createDate)).getTime()
            },
            { title: '最近更新时间', dataIndex: 'updateDate', key: 'updateDate', width: 180,
                sorter: (a,b) => (new Date(a.updateDate)).getTime() - (new Date(b.updateDate)).getTime()
            },
            { title: 'stars数量', dataIndex: 'stars', key: 'stars', width: 150,
                sorter: (a,b) => a.stars - b.stars
            },
            { title: 'fork数量', dataIndex: 'forks', key: 'forks', width: 150,
                sorter: (a,b) => a.forks - b.forks
            },
            { title: '默认分支', dataIndex: 'branch', key: 'branch', width: 150 },
            { title: '克隆', dataIndex: 'clone', key: 'clone', width: 160, fixed: 'right',
                render:(text, row, index) => {
                    return (
                        <div>
                            <CopyToClipboard onCopy={ this.onCopy } text={ row.clone }>
                                <a>clone</a>
                            </CopyToClipboard>
                        </div>
                    )
                }
            }
        ];
        this.pagination = {
            total: 0,
            pageSize: Util.constant.LIMIT,
            current: 1
        };
        _this = this;
    }

    componentDidMount() {
        this.fetchData(this.pagination);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.gitHubInfo.length) {
            return
        }
        this.fetchData(this.pagination);
    }

    onCopy = (value) => {
        message.success(value + "  已成功复制到剪贴板~~");
    };

    handleTableChange(pagination, filters, sorter) {
        if (this.pagination.pageSize !== pagination.pageSize || this.pagination.current !== pagination.current) {
            this.pagination.pageSize = pagination.pageSize;
            this.pagination.current = pagination.current;
            this.fetchData(this.pagination);
        }
    }

    fetchData(param) {
        this.setState({ loading: true });

        let issueUrl = Util.URL.get_issues;
        Ajax.get(issueUrl).then( resp => {
            console.log(resp);
        });

        let url = Util.URL.get_starred;
        Ajax.get(url, { per_page:param.pageSize,page:param.current }).then((resp) => {
            this.pagination.total = resp.total;
            if (resp.data.length) {
                gitHubInfo = [];
                resp.data.forEach((project,index)=>{
                    gitHubInfo.push({
                        key: index,
                        home: project.html_url,
                        name: project.name,
                        id: project.id,
                        desc: project.description,
                        owner: project.owner.login,
                        createDate: Util.formatTime(project.created_at),
                        updateDate: Util.formatTime(project.updated_at),
                        stars: project.stargazers_count,
                        forks: project.forks_count,
                        branch: project.default_branch,
                        clone: project.clone_url
                    });
                });
                this.setState({
                    loading: false,
                    gitHubInfo: gitHubInfo
                });
            }
        }).catch(error => {
            notification['error']({
                message: error.status,
                description: Util.formatErrorMsg(error),
            });
            this.setState({
                loading: false,
                gitHubInfo: []
            });
        });
    }

    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Card hoverable title="GitHub-linkun-wang收藏项目（异步）" bordered={false} style={{ width: 'auto' }}>
                    <Table
                        columns={this.columns}
                        dataSource={this.state.gitHubInfo}
                        loading={this.state.loading}
                        pagination={this.pagination}
                        onChange={this.handleTableChange.bind(this)}
                        scroll={{ x: 1650, y: 525 }} />
                </Card>
            </div>
        )
    }
}

export default StarsInfo;
