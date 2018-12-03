import React from 'react';
import { Card, Table, message, notification } from 'antd';
import Util  from '../commom/util';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const LIMIT = 7;
const TOKEN = 'c49181707b1716005152e834ccad11844bd2c8f6';
let gitHubInfo = [], link, total, _this;

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
            pageSize: LIMIT,
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

    getTotal = (link) => {
        let totalPages = 0;
        let str = link.split(',').find(s => s.indexOf('rel="last"') > -1);
        if(str) {
            totalPages = Util.getQueryString(str.split(';')[0].slice(1, -1), 'page');
        } else {
            str = link.split(',').find(s => s.indexOf('rel="prev"') > -1);
            if(str) {
                totalPages = Util.getQueryString(str.split(';')[0].slice(1, -1), 'page') * 1 + 1;
            }
        }
        return totalPages * LIMIT
    };

    fetchData(param) {
        this.setState({ loading: true });
        let url = `https://api.github.com/users/linkun-wang/starred?per_page=${param.pageSize}&page=${param.current}`;
        fetch(url).then( resp => {
            if (resp.status === 200) {
                link = resp.headers.get('link');
                total = this.getTotal(link);
                this.pagination.total = total;
                return resp.json()
            } else {
                return new Promise((resolve,reject) => {
                    reject({status:resp.status, message:resp.statusText});
                })
            }
        }).then((data) => {
            if (data.length) {
                gitHubInfo = [];
                data.forEach((project,index)=>{
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
                message: error.message,
                description: error.status === 403 ? 'API rate limit exceeded for 116.66.184.191. (But here\'s the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)' : Util.formatErrorMsg(error),
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
                        scroll={{ x: 1650, y: 585 }} />
                </Card>
            </div>
        )
    }
}

export default StarsInfo;
