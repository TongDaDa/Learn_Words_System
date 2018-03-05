import React,{Component} from 'react';
import Record from '../app/pages/base/record';
import Kind from '../app/pages/base/kind'

export default [
    {name:"基础档案-物料档案-",component:Record,path:"/base/record",isExact:true},
    {name:"基础档案-物料分类",component:Kind,path:"/base/kind",isExact:true},
    {name:"基础档案-仓库设置",component:WareHouse,path:"/base/workplace",isExact:true},
];