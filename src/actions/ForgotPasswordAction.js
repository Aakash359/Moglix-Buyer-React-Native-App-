import { ActionTypes } from '../constants'

export const postForgotPassword = payload => (
    { type: ActionTypes.SUBMIT_FORGOT_PASSWORD_FORM, payload }
)

export const getForgotPasswordResponse = payload => {
    return { type: ActionTypes.FORGOT_PASSWORD_DATA_RECEIVED, payload }
}


export const postResetPassword = payload => (
    { type: ActionTypes.SUBMIT_RESET_PASSWORD_FORM, payload }
)

export const getResetPasswordResponse = payload => {
    return { type: ActionTypes.RESET_PASSWORD_DATA_RECEIVED, payload }
}

export const flagValueChangeOfForgotP = payload => (
    { type: ActionTypes.FLAG_SET_OF_FORGOT, payload }
)


