import ReactRendering from 'utils/lazyLoadComponent'
import bindModel from 'utils/bindModel'

/**
 * @param routeData
 * @param routes quote Array
 * @return undefined
 */
const getChildren = (routeData,quote,route)=>{
    const parentPath = route.path;
    for (let i = 0; i < routeData.length; i++) {
        const child = routeData[i];
        child.path = parentPath + "/"+child.path;
        child.authorityId = route.authorityId
        if (Array.isArray(child.children)) {
            const children = child.children
            delete child.children
            return getChildren(children,quote,child)
        }
        quote.push(child)
    }
}

const modelCatchMap = []

const Essay = ()=> import(/* webpackChunkName: "manage_essay" */ '../routes/manageEssay');
const Root = ()=> import(/* webpackChunkName: "manage_essay" */ '../routes/manageRoot');
const LearnPlan = ()=> import(/* webpackChunkName: "manage_learn_plan" */ '../routes/manageLearnPlan');

import NotFound500 from "../routes/Exception/500";
import NotFound403 from "../routes/Exception/403";
import NotFound404 from "../routes/Exception/404";


export default (app) => {

    class Modules {
        @bindModel('manageWord', modelCatchMap)
        word(namespace){ return import(/* webpackChunkName: "manage_word" */ `../routes/${namespace}`) }
    }

    const modules = new Modules();

    const routesSource = [
        {name:"基础学习", path:'/user/base', children: [
            {name:"单词管理",component:ReactRendering(modules.word), path:"manage_word",isExact:true},
            {name:"文章管理",component:ReactRendering(Essay),path:"essay",isExact:true},
            {name:"词根管理",component:ReactRendering(Root),path:"root",isExact:true},
            {name:"单词管理",component:ReactRendering(modules.word),path:"manage_word",isExact:true},
            {name:"学习计划管理",component:ReactRendering(LearnPlan),path:"learnPlan",isExact:true},
        ]},
        {name: '异常页面-500', component: NotFound500, path:"/exception/500",isExact:true},
        {name: '异常页面-403', component: NotFound403, path:"/exception/403", isExact:true},
        {name: '异常页面-404', component: NotFound404, path:"/exception/404", isExact:true}
    ];

    let routes = [];

    for (let i = 0; i < routesSource.length; i++) {
        let route = routesSource[i];
        const quote = [route];
        if (Array.isArray(route.children)) {
            getChildren(route.children,quote,route)
            try { delete route.children; } catch (err) {}
            quote.shift();
        }
        routes.push(...quote)
    }

    return routes;
}