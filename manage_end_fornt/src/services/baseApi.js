/**
     people: liutong,
     changeTime: 2018-01-18 17:19:55,
     description: 基础档案 API;
 **/

import request from '../utils/request';

function toStrParamsX (obj){
    let str = '';
    for (let key in obj){
        str += `&${key}=${obj[key]}`
    }
    return `?${str.substr(1)}`
}

/**-------------------------物料档案--------------------------------------**/

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

/**-------------------------物料类别--------------------------------------**/

export async function reqMaterielTypeList(params) {  /* 物料类别list */
    return request(`/materieltype/list`,{
        method: 'POST',
        body: {
            ...params
        }
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

export async function reqGetMaterielTreelist() { /* 物料类别 tree List */
    return request(`/materieltype/treelist/`,{
        method: 'GET'
    });
}

/**-------------------------仓库设置--------------------------------------**/


export async function reqStoreHouseList (params) {  /* 仓库list */
    return request('/storehouse/list',{
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function reqStoreHouseSave (params) {  /* 创建仓库 */
    return request('/storehouse/save',{
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function reqStoreHouseModal (id) {  /* 仓库getModal */
    return request(`/storehouse/get/${id}`,{
        method: 'GET'
    });
}

export async function reqDelStoreHouse (id) {  /* 仓库删除 */
    return request(`/storehouse/del/${id}`,{
        method: 'DELETE'
    });
}

/**-------------------------物料批号--------------------------------------**/
export async function reqMaterielBatchList (params) {  /* 仓库删除 */
    return request(`/materiel/batchNumber/list${toStrParamsX(params)}`,{
        method: 'GET',
    });
}

/**-------------------------短缺预警--------------------------------------**/

export async function reqShortageList (params) {  /* list */
    return request("/shortageReport/manage/list",{
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function reqUpdateShortage (params) {  /* update */
    return request("/shortageReport/update",{
        method: 'POST',
        body: {
            ...params
        }
    });
}


/**-------------------------辅助属性--------------------------------------**/

export async function reqAuxiliaryAttributeSave (params) {  /* 辅助属性创建 */
    return request("/auxiliaryAttribute/save",{
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function reqAuxiliaryAttributeList (params) {  /* 辅助属性创建 */
    return request("/auxiliaryAttribute/list",{
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function reqAuxiliaryAttributeGet (params) {  /* 辅助属性获取 */
    return request("/auxiliaryAttribute/get",{
        method: 'POST',
        body: {
            ...params
        }
    });
}