import { ActionTypes } from '../constants'

export const postUserLogin = payload => (
    { type: ActionTypes.SUBMIT_LOGIN_FORM, payload }
)

export const postGoogleUserLogin = payload => (
    { type: ActionTypes.SUBMIT_GOOGLE_LOGIN_FORM, payload }
)

export const isLoginLoading = payload => (
    { type: ActionTypes.IS_LOGIN_LOADING, payload }
)

export const getUserDataFromLocal = payload => {
    return { type: ActionTypes.GET_USERDATA_LOCAL, payload }
}

export const getUserSignOut = payload => (
    { type: ActionTypes.USER_SIGN_OUT, payload }
)


