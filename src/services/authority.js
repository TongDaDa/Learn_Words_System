import request from '../utils/request';

export async function verifyLogin(token){  /* 请求单词列表 */
    return request('/auth/verify',{
        method: 'POST',
        body: { token }
    })
}