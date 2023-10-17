import { takeLatest, call, put } from 'redux-saga/effects';
import { postAPICall } from '../utils/commonService';
import { ActionTypes, API_URLS, AppConfig } from '../constants';

function fetchData(baseURL, apiOptions) {
    return postAPICall(baseURL, apiOptions)
}

function formatLoginData(data) {
    const { userName, password } = data
    this.userName = userName.trim() || ''
    this.password = password
    this.application = AppConfig.APP_ID
}


function* postForgotPassword({ payload }) {
    try {
        const apiOptions = {
            data: payload,
        }
        yield put({ type: ActionTypes.SET_FORGOT_PASSWORD_LOADING, loading: true })
        const response = yield call(() => fetchData(API_URLS.FORGOT_PASSWORD_LINK, apiOptions))
        const { data } = response.data
        yield put({ type: ActionTypes.FORGOT_PASSWORD_DATA_RECEIVED, data })
        yield put({ type: ActionTypes.SET_FORGOT_PASSWORD_LOADING, loading: false })
    }
    catch (error) {
        
        yield put({ type: ActionTypes.GLOBAL_ERROR, error })
        yield put({ type: ActionTypes.SET_FORGOT_PASSWORD_LOADING, loading: false })
    }
}

function* postResetPassword({ payload }) {
    try {
        const apiOptions = {
            data: payload,
        }
        yield put({ type: ActionTypes.SET_RESET_PASSWORD_LOADING, loading: true })
        const response = yield call(() => fetchData(API_URLS.RESET_PASSWORD_URL, apiOptions))
        const { data } = response.data
        
        yield put({ type: ActionTypes.RESET_PASSWORD_DATA_RECEIVED, data })
        yield put({ type: ActionTypes.SET_FORGOT_PASSWORD_LOADING, loading: false })
    }
    catch (error) {
        
        yield put({ type: ActionTypes.GLOBAL_ERROR, error })
        yield put({ type: ActionTypes.SET_RESET_PASSWORD_LOADING, loading: false })
    }
}

function* flagValueChangeOfForgotP() {
    yield put({ type: ActionTypes.CHANGE_FLAG_VALUE, flag: '1' })
}



export default function* watcherSaga() {
    yield takeLatest(ActionTypes.SUBMIT_FORGOT_PASSWORD_FORM, postForgotPassword)
    yield takeLatest(ActionTypes.SUBMIT_RESET_PASSWORD_FORM, postResetPassword)
    yield takeLatest(ActionTypes.FLAG_SET_OF_FORGOT, flagValueChangeOfForgotP)
}
