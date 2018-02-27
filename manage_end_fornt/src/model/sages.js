import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* fetchUser(action) {
    try {
        const user = yield call(Api.fetchUser, action.payload.userId);
        yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

function* add(action){

}

function* mySaga() {
    yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
    yield takeEvery("ADD_AADDD", add);
}

export default mySaga;