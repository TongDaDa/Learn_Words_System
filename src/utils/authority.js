import { verifyLogin } from 'services/authority';

const getAuthority = () => {
    let autohor = 'visitor'
    // return verifyLogin().then((res)=>{
    //     return autohor
    // })
    return new Promise((res)=>{
        setTimeout(()=>{
            // autohor = 'guest'
            res(autohor)
        },500)
    })
}

export default getAuthority;