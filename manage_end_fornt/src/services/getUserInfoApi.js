//lawcery

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


export async function reqGetUserInfo(params) {
    return request(`/auth/getuserinfo${toStrParamsX(params)}`,{
        method: 'GET'
    });
}

export async function reqGetAuthCode(params) {
    return request(`/auth/sign`,{
        method: 'GET'
    });
}
