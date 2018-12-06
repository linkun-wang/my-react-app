import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Menu, Icon, Switch, Layout } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state={
            theme: 'light'
        }
    }
    switchTheme = (checked) => {
        let theme = checked ? 'light' : 'dark';
        this.setState({theme:theme});
    };
    render() {
        return (
            <div>
                <Menu theme={this.state.theme} defaultSelectedKeys={['/']} selectedKeys={[this.props.match.url]} defaultOpenKeys={['sub1']} mode="inline">
                    <Menu.Item key="/">
                        <Link to="/">
                            <Icon type="home"/>
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>信息展示</span></span>}>
                        <MenuItemGroup key="g1" title="个人信息">
                            <Menu.Item key="/stars-info"><Link to="/stars-info">GiHub收藏项目</Link></Menu.Item>
                            <Menu.Item key="/footprint"><Link to="/footprint" replace>足迹</Link></Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup key="g2" title="Notes">
                            <Menu.Item key="/anYang"><Link to="/learnSVG">SVG学习</Link></Menu.Item>
                            <Menu.Item key="/luoYang"><Link to="/luoYang">洛阳</Link></Menu.Item>
                            <Menu.Item key="/shangHai"><Link to="/shangHai">上海</Link></Menu.Item>
                            <Menu.Item key="/hangZhou"><Link to="/hangZhou">杭州</Link></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                        <Menu.Item key="13">Option 13</Menu.Item>
                        <Menu.Item key="14">Option 14</Menu.Item>
                        <Menu.Item key="15">Option 15</Menu.Item>
                        <Menu.Item key="16">Option 16</Menu.Item>
                        <Menu.Item key="17">Option 17</Menu.Item>
                        <Menu.Item key="18">Option 18</Menu.Item>
                        <Menu.Item key="19">Option 19</Menu.Item>
                        <Menu.Item key="20">Option 20</Menu.Item>
                        <Menu.Item key="21">Option 21</Menu.Item>
                        <Menu.Item key="22">Option 22</Menu.Item>
                    </SubMenu>
                </Menu>
                {/*<div className="switch-icon">*/}
                    {/*<Switch checkedChildren={'Light'} unCheckedChildren={'Dark'} checked={this.state.theme === 'light'} onChange={this.switchTheme}/>*/}
                {/*</div>*/}
            </div>
        );
    }
}
