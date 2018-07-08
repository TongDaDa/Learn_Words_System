import { take, call, put } from 'redux-saga/effects'
import * as Api from 'services/user'
import history from 'history'

export default namespace => ({
    namespace,
    state: {
        isLogin: false
    },
    effects: {
        *logout () {
            const status = yield call(Api.logout)
            yield put({type:"login/CLEAR_LOGIN_STATE"})
            return status
        }
    },
    reducers: {
        CLEAR_LOGIN_STATE(state) {
            window.location.reload()
            return {...state, isLogin: false}
        },
    },
})