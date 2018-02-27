/**
 people: liutong,
 changeTime: 2018-01-16 22:56:36,
 description: 公共api;
 **/

import request from '../utils/request';

function toStrParams (obj){
    let str = '';
    for (let key in obj){
        str += `${key}/${obj[key]}`
    }
    return str
}

function toStrParamsX (obj){
    let str = '';
    for (let key in obj){
        str += `/${obj[key]}`
    }
    return str
}

export async function reqInventoryQueryList(params){ /* 报表查询-库表查询 */
    return request('/inventory/inventory/list',{
        method: 'POST',
        body:{
            ...params
        }
    })
}
export async function reqWarnDetails(params){ /* 报表查询-保质期预警明细表 */
    return request('/shortageReport/shortage/report/desc',{
        method: 'POST',
        body:{
            ...params
        }
    })
}
export async function reqShortageReportDesc(params){ /* 报表查询-短缺分析表 */
    return request('/shortageReport/reportlist/desc',{
        method: 'POST',
        body:{
            ...params
        }
    })
}
export async function reqInventoryStatisticsList(params){ /* 报表查询-每日库存统计表 */
    return request('/inventory/inventory/statistics/list',{
        method: 'POST',
        body:{
            ...params
        }
    })
}
export async function reqOutboundInboundDescList(params){ /* 报表查询-出入库明细统计相关接口 */
    return request('/outboundinbound/outboundInboundDescList',{
        method: 'POST',
        body:{
            ...params
        }
    })
}

export async function reqOutboundInboundStatisticsList(params){ /* 报表查询-出入库统计表 */
    return request('/outboundinbound/outboundInboundStatisticsList',{
        method: 'POST',
        body: {
            ...params
        }
    })
}