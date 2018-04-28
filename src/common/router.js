import ReactRendering from 'utils/lazyLoadComWrapper'

const Word = ()=>import(/* webpackChunkName: "manage_word" */ "../routes/manageWord");
const Essay = ()=>import(/* webpackChunkName: "manage_essay" */ '../routes/manageEssay');
const Root = ()=>import(/* webpackChunkName: "manage_essay" */ '../routes/manageRoot');
const LearnPlan = ()=>import(/* webpackChunkName: "manage_learn_plan" */ '../routes/manageLearnPlan');

import NotFound500 from "../routes/Exception/500";
import NotFound403 from "../routes/Exception/403";
import NotFound404 from "../routes/Exception/404";

const routes = [
    {name:"单词管理",component:ReactRendering(Word),path:"/base/manage_word",isExact:true},
    {name:"文章管理",component:ReactRendering(Essay),path:"/base/essay",isExact:true},
    {name:"词根管理",component:ReactRendering(Root),path:"/base/root",isExact:true},
    {name:"学习计划管理",component:ReactRendering(LearnPlan),path:"/base/learnPlan",isExact:true},

    {name: '异常页面-500', component: NotFound500, path:"exception/500"},
    {name: '异常页面-403', component: NotFound403, path:"exception/403"},
    {name: '异常页面-404', component: NotFound404, path:"exception/404"}
];

/**
 * @param routeData
 * @param routes quote Array
 * @return undefined
 */
const getChildren = (routeData,quote,route)=>{
    const parentPath = route.path;
    for (let i = 0; i < routeData.length; i++) {
        let child = routeData[i];
        child.path = parentPath + "/"+child.path;
        child.authorityId = route.authorityId
        quote.push(child)
        if (Array.isArray(child.children)) {
            getChildren(child.children,quote,child)
            delete child.children
        }
    }
}

for (let i = 0; i < routes.length; i++) {
    let route = routes[i];
    const quote = [route];
    if (Array.isArray(route.children)) {
        getChildren(route.children,quote,route)
    }
    delete route.children;
    quote.shift();
    routes.push(...quote)
}

export default routes