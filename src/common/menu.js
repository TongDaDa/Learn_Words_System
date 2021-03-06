﻿const menuData = [{
    name: '基础学习',
    icon: 'dashboard',
    path: '/user/base',
    children: [{
        name: '生词管理',
        path: 'manage_word',
    }, {
        name: '词根管理',
        path: 'root',
    }, {
        name: '句子管理',
        path: 'sentence',
    }, {
        name: '短文管理',
        path: 'essay'
    }, {
        name: '词组管理',
        path: 'wordGroup',
    }],
},{
    name: "复习计划",
    icon: 'dashboard',
    path: '/user/plan',
    children: [{
        name: '文章阅读',
        path: 'read_essay',
    },{
        name: '复习计划管理',
        path: 'learnPlan',
    },{
        name: '单词复习',
        path: 'manage_reviewWord',
    },{
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
