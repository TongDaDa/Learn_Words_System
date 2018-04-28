import request from '../utils/request';

function toStrParams (obj){
    let str = '';
    for (let key in obj){
        str += `${key}/${obj[key]}`
    }
    return str
}

export async function reqWordList(params){  /* 请求单词列表 */
    return request('/word/list',{
        method: 'POST',
        body:{ ...params}
    })
}

export async function reqSaveWord(params) {  /* 保存单词 */
    return request(`/word/save`,{
        method: 'POST',
        body: params,
    })
}

export async function reqGetWordModal(id) {  /* 获取单词modal */
    return request(`/word/get/${id}`,{
        method: 'GET'
    })
}

export async function reqDelword(id) {  /* 删除单词 */
    return request(`/word/del/${id}`,{
        method: 'DELETE'
    })
}


/******************* root ************************/
export async function reqRootList(params){  /* 请求单词列表 */
    return request('/root/list',{
        method: 'POST',
        body:{ ...params}
    })
}

export async function reaSaveRoot(params){  /* 保存词根 */
    return request('/root/save',{
        method: 'POST',
        body:{ ...params}
    })
}

export async function reqDelRoot(params){  /* 删除词根 */
    return request('/root/del',{
        method: 'DELETE',
        body:{ ...params}
    })
}

export async function reqGetRootModal(params){  /* 请求单词列表 */
    return request('/root/get',{
        method: 'GET',
        body:{ ...params}
    })
}