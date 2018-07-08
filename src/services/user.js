import request from '../utils/request';

export async function reqLogin(params){  /* 请求单词列表 */
    return request('/auth/login',{
        method: 'POST',
        body: params
    })
}

export async function logout(params){  /* 请求单词列表 */
    return request('/auth/logout',{
        method: 'POST',
        body: params
    })
}