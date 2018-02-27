import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom';

// 物料档案
import Word from '../pages/manageWord';
import Essay from '../pages/manageEssay';
import LearnPlan from '../pages/manageLearnPlan';

import NotFound500 from "./Exception/500";
import NotFound403 from "./Exception/403";
import NotFound404 from "./Exception/404";

export default [
    {name:"单词管理",component:Word,path:"/word",isExact:true},
    {name:"文章管理",component:Essay,path:"/essay",isExact:true},
    {name:"学习计划管理",component:LearnPlan,path:"/learnPlan",isExact:true},

    {name: '异常页面-500', component: NotFound500, path:"exception/500"},
    {name: '异常页面-403', component: NotFound403, path:"exception/403"},
    {name: '异常页面-404', component: NotFound404, path:"exception/404"}
];