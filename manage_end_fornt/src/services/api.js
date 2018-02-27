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

export async function reqMaterialList(params){ /* 获取物料分类列表 */
    return request('/materieltype/list',{
        method: 'POST',
        body:{
            ...params
        }
    })
}

export async function reqGetMaterielModal(id) {/* 请求物料modal */
    return request(`/materiel/get/${id}`,{
        method: 'GET'
    })
}

export async function reqDeleteMateriel(id) {  /* 删除物料项 */
    return request(`/materiel/del/${id}`,{
        method: 'DELETE'
    });
}

export async function reqMaterielTypeList(params) {  /* 物料类别list */
    return request(`/materieltype/list`,{
        method: 'POST',
        body: {
            ...params
        }
    });
}
export async function reqMaterielTypeTypeList(params) {
    return request(`/materieltype/type/list`,{
        method: 'GET'
    });
}
export async function reqAddMaterielType(params) {  /* 物料类别新增 */
    return request(`/materieltype/save`,{
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function reqGetMaterielTypeModal(id) {  /* 物料类别获取Modal */
    return request(`/materieltype/get/${id}`,{
        method: 'GET'
    });
}

export async function reqDeleteMaterielType(id) {  /* 物料类别删除 */
    return request(`/materieltype/del/${id}`,{
        method: 'DELETE'
    });
}

export async function reqGetMaterielTreelist() { /* 物料列别 tree List */
    return request(`/materieltype/treelist/`,{
        method: 'GET'
    });
}

export async function reqGetUnitList(params){ /* 单位list */
    return request(`/other/unitlist/${toStrParams(params)}`,{
        method: 'GET'
    })
}

export async function reqGetMaterielTreelistByList(params) {
    return request(`/materieltype/getmateriels/${params.typeid}/${params.pageNum}/${params.pageSize}?name=${params.name}`,{
        method: 'GET',
    });
}

export async function reqGetAttributeByMateriel(params) {  //入库 第二步，根据物料获取辅助属性
    return request(`/auxiliaryAttribute/getAttributeByMateriel`,{
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function reqSaveInbound(params) { /* 保存仓库 */
    return request(`/inbound/save`,{
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function reqGetAllInbound(params) { /* 获取仓库列表 */
    return request(`/inbound/list`,{
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function reqStorehouseList(params) {
    return request(`/storehouse/list`, {
        method: 'POST',
        body: {
            ...params
        }
    })
}

export async function reqmaterieltypeStoretype(params) {
    return request(`/materieltype/list/storetype`, {
        method: 'POST',
        body: {
            ...params
        }
    })
}