import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import logo from './logo.svg';
import GitHubLog from './images/GitHub.jpg';
import './App.css';
import { LeftMenuRoute, ContentRoute } from './route';
import Current from './page/CurrentDate';

const { Footer, Content, Sider } = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <div style={{height: '100%'}}>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <span className="left-time"><Current></Current></span>
                </header>
                <Layout style={{height: '95%'}}>
                    <Sider className="fixed" collapsible trigger={null} collapsed={this.state.collapsed}>
                       <LeftMenuRoute/>
                        <Icon className={this.state.collapsed ? 'trigger width-80' : 'trigger width-200'}
                              type={this.state.collapsed ? 'double-right' : 'double-left'}
                              onClick={this.toggle}/>
                    </Sider>
                    <Layout className={this.state.collapsed ? 'content-normal' : 'content-max'} >
                        <Content style={{ margin: 0, overflow: 'auto', height:'100%' }}>
                           <ContentRoute />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Fork me on the <a target="_Blank" rel="noopener noreferrer" href="https://github.com/linkun-wang/my-app"><img alt="GitHub" src={ GitHubLog } className="GitHub-logo"/>GitHub</a>, created by linKun @2018, currently under learning...
                        </Footer>
                    </Layout>
                </Layout>
                {/*<footer className="footer"></footer>*/}
            </div>
        );
    }
}

export default App;
