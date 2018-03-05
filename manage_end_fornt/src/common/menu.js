const menuData = [{
    name: '基础学习',
    icon: 'dashboard',
    path: '/base',
    children: [{
        name: '生词管理',
        path: 'manage_word',
    }, {
        name: '词根管理',
        path: 'manage_root',
    }, {
        name: '复习计划管理',
        path: 'kind',
    }, {
        name: '文章管理',
        path: 'workplace'
    }],
},{
    name: "复习计划",
    icon: 'dashboard',
    path: '/plan',
    children: [{
        name: '文章阅读',
        path: 'read_essay',
    }, {
        name: '词根',
        path: 'root',
    }, {
        name: '单词',
        path: 'workplace'
    }],
},{
        name: '异常页',
        icon: 'warning',
        path: 'exception',
        hideInMenu: true,
        children: [{
            name: '403',
            path: '403',
        }, {
            name: '404',
            path: '404',
        }, {
            name: '500',
            path: '500',
        }, {
            name: '触发异常',
            path: 'trigger'
        }],
}];

function formatter(data, parentPath = '', parentAuthority) {
    return data.map((item) => {
        const result = {
            ...item,
            path: `${parentPath}${item.path}`,
            authority: item.authority || parentAuthority,
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
