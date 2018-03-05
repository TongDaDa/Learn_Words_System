import request from '../utils/request';

function toStrParams (obj){
    let str = '';
    for (let key in obj){
        str += `${key}/${obj[key]}`
    }
    return str
}

export async function reqWordList(params){  /* 获取物料分类列表 */
    return request('/word/list',{
        method: 'POST',
        body:{ ...params}
    })
}

export async function reqSaveWord(params) {     /* 请求物料modal */
    return request(`/word/save`,{
        method: 'POST',
        body: params,
    })
}

export async function reqGetWordModal(id) {  /* 请求物料modal */
    return request(`/word/get/${id}`,{
        method: 'GET'
    })
}

export async function reqDelword(id) {  /* 请求物料modal */
    return request(`/word/del/${id}`,{
        method: 'DELETE'
    })
}