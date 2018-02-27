/**
 people: liutong,
 changeTime: 2018-01-17 09:55:07,
 description: ;
 **/

import React,{Component} from 'react';

// 物料档案
import Record from '../app/pages/base/record';
import Kind from '../app/pages/base/kind'
import WareHouse from '../app/pages/base/warehouse'
import Detail from '../app/pages/base/detail'
import Assist from '../app/pages/base/assist'
import Alarm from '../app/pages/base/transienceAlarm'
import Bat from '../app/pages/base/bat'

import Inventory from "../app/pages/inventoryManagement/inventory"
import Delivery from "../app/pages/inventoryManagement/delivery"
import DeliveryDetails from '../app/pages/inventoryManagement/deliveryDetails'
import OpeningInventory from '../app/pages/inventoryManagement/openingInventory';

import StorageClassification from '../app/pages/inventoryManagement/storageClassification';
//报表查询
import InventoryQuery from '../app/pages/reportQuery/inventoryQuery';
import SummaryTable from '../app/pages/reportQuery/inSummaryTable';
import StorageStatistics from '../app/pages/reportQuery/inoutboundStatistics';
import WarningDetails from '../app/pages/reportQuery/warningDetails';
import ShortageAnalysis from '../app/pages/reportQuery/shortageAnalysis';


export default [
    {name:"基础档案-物料档案-",component:Record,path:"/base/record",isExact:true},
    {name:"基础档案-物料分类",component:Kind,path:"/base/kind",isExact:true},
    {name:"基础档案-仓库设置",component:WareHouse,path:"/base/workplace",isExact:true},
    {name:"基础档案-物料明细",component:Detail,path:"/base/detail",isExact:true},
    {name:"基础档案-辅助属性",component:Assist,path:"/base/assist",isExact:true},
    {name:"基础档案-短缺预警管理",component:Alarm,path:"/base/alarm",isExact:true},
    {name:"基础档案-物料批号",component:Bat,path:"/base/bat",isExact:true},

    {name:"库存管理-入库管理",component:Inventory,path:"/inventory/in_mange",isExact:true},
    {name:"库存管理-出库管理",component:Delivery,path:"/inventory/out_mange",isExact:true},
    {name:"库存管理-出库明细",component:DeliveryDetails,path:"/inventory/delivery_details",isExact:true},

    {name:"库存管理-期初库存",component:OpeningInventory,path:"/inventory/opening_inventory",isExact:true},
    {name:"库存管理-出入库分类",component:StorageClassification,path:"/inventory/storage_classification",isExact:true},

    {name:"报表查询-库存管理",component:InventoryQuery,path:"/report_query/inventory_query",isExact:true},
    {name:"报表查询-出入库明细汇总库",component:SummaryTable,path:"/report_query/summary_table",isExact:true},

    {name:"报表查询-出入库统计表",component: StorageStatistics,path:"/report_query/storage_statistics",isExact:true},
    {name:"报表查询-保质期预警明细",component: WarningDetails,path:"/report_query/warning_details",isExact:true},
    {name:"报表查询-超储短缺分析表",component: ShortageAnalysis,path:"/report_query/shortage_analysis",isExact:true},
];