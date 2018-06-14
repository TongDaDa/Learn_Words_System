import request from '../utils/request';

export async function reqLogin(params){  /* 请求单词列表 */
    return request('/user/login',{
        method: 'POST',
        body: params
    })
}