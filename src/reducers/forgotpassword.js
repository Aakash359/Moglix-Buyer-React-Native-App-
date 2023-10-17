import { Map } from 'immutable'
import { ActionTypes } from '../constants'
import { createReducer } from '../utils/commonService'

const initialState = Map({
        isLoading: false,
        flagForLoadComponents: '',
        passwordKey: '',
        userId: '',
})

export default {
    ForgotPasswordDetail: createReducer(initialState, {
        [ActionTypes.FORGOT_PASSWORD_DATA_RECEIVED]: (state, { data }) => {
          console.log('Forgot Password Responce',data)
          console.log('Forgot Password data.passwordKey',data.key)
          console.log('Forgot Password data.userId',data.userId)
          return state.withMutations(stateMap => {
          stateMap.set('flagForLoadComponents', '2')
          stateMap.set('passwordKey', data.key)
          stateMap.set('userId', data.userId)
        })
      },
      [ActionTypes.SET_FORGOT_PASSWORD_LOADING]: (state, { loading }) => {
        return state.withMutations(stateMap => {
          stateMap.set('isLoading', loading)
      })
      },

      [ActionTypes.RESET_PASSWORD_DATA_RECEIVED]: (state, { response }) => {
        console.log('Reset Password Responce',response)
        return state.withMutations(stateMap => {
            stateMap.set('flagForLoadComponents', '3')
      })
    },
    [ActionTypes.SET_RESET_PASSWORD_LOADING]: (state, { loading }) => {
      return state.withMutations(stateMap => {
        stateMap.set('isLoading', loading)
    })
    },

    [ActionTypes.CHANGE_FLAG_VALUE]: (state, { flag }) => {
      return state.withMutations(stateMap => {
        console.log('flagForLoadComponents----', flag)
        stateMap.set('flagForLoadComponents', flag)
    })
    },

    }),
  }

  export function getIsLoading(state) {
    return state.getIn(['ForgotPasswordDetail', 'isLoading'])
  }

  export function getFlagForLoadComponents(state) {
    return state.getIn(['ForgotPasswordDetail', 'flagForLoadComponents'])
  }

  export function getKey(state) {
    return state.getIn(['ForgotPasswordDetail', 'passwordKey'])
  }

  export function getUserId(state) {
    return state.getIn(['ForgotPasswordDetail', 'userId'])
  }