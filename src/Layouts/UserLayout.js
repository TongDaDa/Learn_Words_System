import React, {Component} from 'react';
import {Layout, Menu, Icon, message} from 'antd';
import getRouteData from '../common/router'
import {getMenuData} from '../common/menu';
import {Link,Switch,Route} from 'react-router-dom';
const {SubMenu} = Menu;
const {Sider, Content, Header} = Layout;
import CatchWrapper from 'utils/CatchWrapper'
import GlobalHeader from '../components/GlobalHeader';
import { connect } from 'react-redux';
import createHistory from 'history/createHashHistory'

const histroy = createHistory();

const getIcon = (icon) => {
    return <Icon type={icon} />;
};

@connect(state=>({...state}))
export default class UserLayout extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.menus = getMenuData();
        this.routes = getRouteData(props.app);
        this.state = {
            location: this.props.location,
            collapsed: true,
            isMobile: false,
            openKeys: this.getDefaultCollapsedSubMenus(this.props),
        };
    }

    getDefaultCollapsedSubMenus(props) {
        const { location: { pathname } } = props || this.props;
        const snippets = pathname.split('/').slice(1, -1);
        const currentPathSnippets = snippets.map((item, index) => {
            const arr = snippets.filter((_, i) => i <= index);
            return arr.join('/');
        });
        let currentMenuSelectedKeys = [];
        currentPathSnippets.forEach((item) => {
            currentMenuSelectedKeys = currentMenuSelectedKeys.concat(this.getSelectedMenuKeys(item));
        });
        if (currentMenuSelectedKeys.length === 0) {
            return ['/base/record'];
        }
        return currentMenuSelectedKeys;
    }

    toggle = (collapsed) => {
        this.setState({
            collapsed: collapsed ? collapsed : !this.state.collapsed,
        });
    }

    handleNoticeVisibleChange = (visible) => {
        if (visible) {
            this.props.dispatch({
                type: 'global/fetchNotices',
            });
        }
    }

    handleMenuClick = ({ key }) => {
        if (key === 'triggerError') {
            this.props.dispatch(routerRedux.push('/exception/trigger'));
            return;
        }
        if (key === 'logout') {
            this.props.dispatch({ type: 'login/logout' });
        }
        if (key === 'profile') {
            history.push("/profile")
        }
    }

    handleOpenChange = (openKeys) => {
        const lastOpenKey = openKeys[openKeys.length - 1];
        const isMainMenu = this.menus.some(
            item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
        );
        this.setState({
            openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
        });
    }

    getFlatMenuKeys = (menus) => {
        let keys = [];
        menus.forEach((item) => {
            if (item.children) {
                keys.push(item.path);
                keys = keys.concat(this.getFlatMenuKeys(item.children));
            } else {
                keys.push(item.path);
            }
        });
        return keys;
    }

    getSelectedMenuKeys = (path) => {
        const flatMenuKeys = this.getFlatMenuKeys(this.menus);
        if (flatMenuKeys.indexOf(path) > -1) {
            return [path];
        }
        if (flatMenuKeys.indexOf(path.replace(/\/$/, '')) > -1) {
            return [path.replace(/\/$/, '')];
        }
        return flatMenuKeys.filter((item) => {
            const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`;
            const itemRegExp = new RegExp(itemRegExpStr);
            return itemRegExp.test(path.replace(/\/$/, ''));
        });
    }

    getSubMenuOrItem = (item)=>{
        if (item.children && item.children.some(child => child.name)) {
            return (
                <SubMenu
                    title={
                        item.icon ? (
                            <span>
                                {getIcon(item.icon)}
                                <span>{item.name}</span>
                            </span>
                        ) : item.name
                    }
                    key={item.path}
                >
                    {this.getNavMenuItems(item.children)}
                </SubMenu>
            );
        } else {
            return (
                <Menu.Item key={item.key || item.path}>
                    <Link
                        to={item.path}
                        replace={item.path === this.props.location.pathname}
                    >
                        {getIcon(item.icon)}<span>{item.name}</span>
                    </Link>
                </Menu.Item>
            );
        }
    }

    getNavMenuItems = (menusData) => {
        if (!menusData) {
            return [];
        }
        return menusData
            .filter(item => item.name && !item.hideInMenu)
            .map((item) => this.getSubMenuOrItem(item) )
            .filter(item => !!item);
    }

    handleMenuCollapse = (collapsed) => {
        this.props.dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed,
        });
    }

    handleNoticeClear = (type) => {
        message.success(`清空了${type}`);
        this.props.dispatch({
            type: 'global/clearNotices',
            payload: type,
        });
    }

    render() {

        const {location,children} = this.props;
        const { openKeys, collapsed } = this.state;
        const pathname = location.pathname;

        // if pathname can't match, use the nearest parent's key
        let selectedKeys = this.getSelectedMenuKeys(pathname);
        if (!selectedKeys.length) {
            selectedKeys = [openKeys[openKeys.length - 1]];
        }

        return <Layout style={{height: '100vh'}}>
            <Sider
                collapsible
                breakpoint="md"
                collapsed={collapsed}
                onCollapse={this.toggle}
                width={256}
            >
                <Menu
                    key="Menu"
                    mode="inline"
                    onOpenChange={this.handleOpenChange}
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    style={{padding: '16px 0', width: '100%'}}
                >
                    { this.getNavMenuItems(this.menus) }
                </Menu>
            </Sider>
            <Layout>
                <GlobalHeader
                    logo='https://iknowpc.bdimg.com/static/common/pkg/common_z.75a813d.png'
                    currentUser={{name:'12'}}
                    fetchingNotices={true}
                    notices=''
                    collapsed={collapsed}
                    isMobile={this.state.isMobile}
                    onNoticeClear={this.handleNoticeClear}
                    onCollapse={this.toggle}
                    onMenuClick={this.handleMenuClick}
                    onNoticeVisibleChange={this.handleNoticeVisibleChange}
                />
                <Content className="app-user-container">
                    {/*<CatchWrapper>  </CatchWrapper>*/}
                        <Switch>
                            {
                                this.routes.map(r =>
                                    <Route exact={r.isExact} path={r.path} key={r.path} component={r.component} />
                                )
                            }
                        </Switch>
                </Content>
            </Layout>
        </Layout>
    }
}