import { Map } from 'immutable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';
import { ActionTypes,ASYNC_KEYS } from '../constants';
import { createReducer } from '../utils/commonService';
import DatabaseManager from '../Storage/storage';


const initialState = Map({
  isLoading: false,
  isUserLoggedIn: false,
  userDataInLocal: Map({}),
  userStatus: 'inactive',
})

export default {
  user: createReducer(initialState, {
      [ActionTypes.IS_LOGGED_IN]: (state, action) => {
      const { userData } = action.session;
      return state.withMutations(stateMap => {
        if (action) {
        DatabaseManager.saveUserProfile(JSON.stringify(action.session.userData))
           AsyncStorage.multiSet([
            [ASYNC_KEYS.USER_ID, userData.userId],
          ])
          const userDataInLocal = action
            stateMap.set('userDataInLocal', Map(userDataInLocal))
            stateMap.set('userStatus', 'active')
            stateMap.set('isUserLoggedIn', true)
            stateMap.set('isLoading', false)
            stateMap.set('userId', userData.userId)
         
        }
      })
    },
      [ActionTypes.SET_LOGIN_LOADING]: (state, { loading }) => state.set('isLoading', loading),
      [ActionTypes.GET_USERDATA_LOCAL]: (state, { payload }) => {
        
      return state.withMutations(stateMap => {
        const { userDataInLocal } = payload
        const userStatus = userDataInLocal && userDataInLocal.status
        if (userStatus === 'active') {
          stateMap.set('userDataInLocal', Map(userDataInLocal))
          stateMap.set('userStatus', userStatus)
        }
      })
    },
      [ActionTypes.USER_SIGN_OUT]: (state, { payload }) => {
      let keys = [ASYNC_KEYS.USER_PROFILE, ASYNC_KEYS.USER_ID];
       AsyncStorage.multiRemove(keys, (err) => {
          console.log('Error:',err)
       });
      return state.withMutations(stateMap => {
        stateMap.set('userDataInLocal', Map({}))
        stateMap.set('userStatus', 'inactive')
        stateMap.set('isUserLoggedIn', false)
        stateMap.set('isLoading', false)
      })
    },
  }),
}

export function isUserLoggedIn(state) {
  return state.getIn(['user', 'isUserLoggedIn'])
}

export function isLoginLoading(state) {
  return state.getIn(['user', 'isLoading'])
}

export function getLoggedInUserData(state) {
  return state.getIn(['user', 'userDataInLocal'])
}

export function getUserStatus(state) {
  return state.getIn(['user', 'userStatus'])
}

export function getUserIDFromInitiate(state) {
  let userProfileData = state.getIn(['user', 'userDataInLocal'])
  if (userProfileData) {
    userProfileData = userProfileData.toJS()
  }
  return get(userProfileData, 'userId', undefined)
}

export function getUserMobileNoFromInitiate(state) {
  let userProfileData = state.getIn(['user', 'userDataInLocal'])
  if (userProfileData) {
    userProfileData = userProfileData.toJS()
  }
  return get(userProfileData, 'mobile_number', undefined)
}
