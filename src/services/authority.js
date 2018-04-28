import request from '../utils/request';

export async function verifyLogin(){  /* 请求单词列表 */
    return request('/authority/verify',{
        method: 'GET'
    })
}