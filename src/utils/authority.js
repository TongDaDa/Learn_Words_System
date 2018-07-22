import { verifyLogin } from 'services/authority';

//三种权限: 参观者, 客户, 管理
//tst
const authorites = ['admin','guest','visitor']

const getAuthority = () => {
    let curAuthority = authorites[2]
    return verifyLogin().then((res) => {
        const { checkResultResponse } = res;
        if (checkResultResponse != null) { curAuthority = authorites[checkResultResponse.authorityStatus] }
        return curAuthority
    }).catch(() => {
        return curAuthority
    })
}

export default getAuthority;