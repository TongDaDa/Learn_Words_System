/**
 people: lawcery,
 changeTime: 2018-02-08 ,
 description:用户api;
 **/

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

export async function reqUserList(params){ /* 用户管理 */
    return request('/userList/list',{
        method: 'POST',
        body:{
            ...params
        }
    })
}

export async function reqSaveUser(params){ /* 用户管理-保存 */
    return request('/userList/save',{
        method: 'POST',
        body:{
            ...params
        }
    })
}
export async function reqDeleteUser(params){ /* 用户管理-删除 */
    return request('/userList/delete',{
        method: 'POST',
        body:{
            ...params
        }
    })
}