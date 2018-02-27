import request from '../utils/request';

export async function reqSaveOutbound(params) { /* 保存仓库 */
    return request(`/outbound/save`,{
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function reqGetAllOutbound(params) { /* 获取出库列表 */
    return request(`/outbound/list`,{
        method: 'POST',
        body: {
            ...params
        }
    });
}

export async function reqGetOutboundListDetil(params) {
    return request(`/outbound/get/${params}`,{ /* 获取出库单详情 */
        method: 'GET'
    });
}

export async function reqDeleteOutboundOrder(id) {  /* 删除入库单 */
    return request(`/outbound/del/${id}`,{
        method: 'DELETE'
    });
}