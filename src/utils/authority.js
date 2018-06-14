import { verifyLogin } from 'services/authority';

//三种权限: 参观者, 客户, 管理
const authorites = ['admin','guest','visitor']

const getAuthority = () => {
    let curAuthority = authorites[0]
    return verifyLogin().then((res) => {
        if (res.authorityStatus != null) { curAuthority = authorites[res.authorityStatus] }
        return curAuthority;
    }).catch(()=>{
        return authorites[0]
    })
}

export default getAuthority;