import request from '../utils/request';


export async function reqGetInboundListDetails(params) {
    return request(`/inbound/get/${params.id}`,{ /* 获取入库单详情 */
        method: 'GET'
    });
}

export async function reqDeleteInboundOrder(id) {  /* 删除入库单 */
    return request(`/inbound/del/${id}`,{
        method: 'DELETE'
    });
}

export async function reqOutboundInboundTypeList(params) { /* 出入库分类列表 */
    return request(`/outboundInboundType/list`, {
        method: 'POST',
        body: {
            ...params
        }
    })
}
export async function reqOutboundInboundTypeSave(params) { /* 出入库分类保存 */
    return request(`/outboundInboundType/save`, {
        method: 'POST',
        body: {
            ...params
        }
    })
}
export async function reqOutboundInboundTypeDelete(params) { /* 出入库分类删除 */
    return request(`/outboundInboundType/delete`, {
        method: 'POST',
        body: {
            ...params
        }
    })
}
export async function reqOutboundInboundTypeInit(params) { /* 出入库分类初始化 */
    return request(`/outboundInboundType/init`, {
        method: 'POST',
        body: {
            ...params
        }
    })
}
export async function reqInventoryInitList(params) { /* 期初库存列表 */
    return request(`/inventory/init/list`, {
        method: 'POST',
        body: {
            ...params
        }
    })
}
export async function reqInventorySaveInit(params) { /* 期初库存列表 */
    return request(`/inventory/save/init`, {
        method: 'POST',
        body: {
            ...params
        }
    })
}
export async function reqInventoryUpdateInit(params) { /* 期初库存列表 修改*/
    return request(`/inventory/update/init`, {
        method: 'POST',
        body: {
            ...params
        }
    })
}
export async function reqInventoryDeleteInit(params) { /* 期初库存列表 修改*/
    return request(`/inventory/delete/init`, {
        method: 'POST',
        body: {
            ...params
        }
    })
}
export async function reqFindInventoryBatchNumberGet(params) {
    return request(`/inventory/findInventory`,{ /* 根据物料id获取批号信息 */
        method: 'POST',
        body: {
            ...params
        }
    });
}
export async function reqSaveOutBound(params) {
    return request(`/outbound/save`,{ /* 保存出库信息 */
        method: 'POST',
        body: {
            ...params
        }
    });
}
export async function reqOutBoundDetails(params) {
    return request(`/outbound/get/${params.id}`,{ /* 出库详情信息 */
        method: 'GET'
    });
}