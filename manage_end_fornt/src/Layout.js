import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import routes from './routes/index'
import {getMenuData} from './common/menu';
import NotFound from './routes/Exception/404';
import {Link,Switch,Route} from 'react-router-dom';
const {SubMenu} = Menu;
const {Sider, Content} = Layout;

const getIcon = (icon) => {
    return <Icon type={icon} />;
};

export default class Lay extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.menus = getMenuData();
        this.state = {
            location: this.props.location,
            collapsed: true,
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

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
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

    render() {

        const {location} = this.props;
        const { openKeys } = this.state;
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
                collapsed={this.state.collapsed}
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
                <Content className="app-user-container">
                    <Switch>
                        {
                            routes.map(
                                (i,k)=> <Route path={i.path} key={i.path} component={i.component} exact={i.isExact} />
                            )
                        }
                        <Route render={NotFound} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    }
}