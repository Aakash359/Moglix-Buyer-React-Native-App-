import { Map } from 'immutable'
import { ActionTypes } from '../constants'
import { createReducer } from '../utils/commonService'
import {get} from 'lodash';
import DatabaseManager from '../Storage/storage'

const initialState = Map({
    isLoading: false,
    buckets:[],
    sessionData:{},
    branchID: '',
    companyID: '',
    branchName: '',
    companyName: '',
    summaryData:{},
    sixmonthData:{},
    spendByCategoryData:{},
    spendByAllCategoryData:[],
    otifData:{},
    topItemData:{},
    topPlantData:{},
    userFilterData:{},
    itemCountData:[],
    companyGetData:{}
})

export default {
    home: createReducer(initialState, {
        [ActionTypes.DASHBOARD_DATA_RECEIVED]: (state, { buckets }) => {
        return state.withMutations(stateMap => {
          stateMap.set('isLoading', false)
          stateMap.set('buckets', buckets)
        })
      },
      [ActionTypes.SET_HOME_GET_SESSION_DATA]: (state,  payload) => {
        DatabaseManager.saveUserSession(JSON.stringify(payload.data.data))
        return state.withMutations(stateMap => {
        const CompanyNameAndID =  get(payload, 'data.data.companyData.companyNames', {});
        const CompanyID =Object.keys(CompanyNameAndID)[0];
        const CompanyName = CompanyNameAndID[CompanyID];
        let defaultBranchName =""
        let defaultBranchId = ""
        if(Object.keys(payload.data.data.companyData.companyToDefaultBranch).length != 0){
         defaultBranchId = payload.data.data.companyData.companyToDefaultBranch[CompanyID]
         defaultBranchName = payload.data.data.companyData.branchNames[defaultBranchId]
        }
          global.GLOBAL_COMPANY_NAME = CompanyName
          stateMap.set('sessionData', payload.data.data)
          stateMap.set('branchID', defaultBranchId)
          stateMap.set('companyID', CompanyID)
          stateMap.set('companyName', CompanyName)
          stateMap.set('branchName', defaultBranchName)

        })
      },
      [ActionTypes.IS_HOME_LOADING]: (state, { loading }) => {
        return state.withMutations(stateMap => {
          stateMap.set('isLoading', loading)
        })
    },
      [ActionTypes.SUMMARY_DATA_RECEIVED]: (state, { data }) => {
        return state.withMutations(stateMap => {
        stateMap.set('summaryData', data)
      })
    },
    [ActionTypes.LAST_SIX_MONTH_DATA_RECEIVED]: (state, { data }) => {
      return state.withMutations(stateMap => {
      stateMap.set('sixmonthData', data)
    })
  },
  [ActionTypes.SPEND_BY_CATEGORY_DATA_RECEIVED]: (state, { data }) => {
    return state.withMutations(stateMap => {
    stateMap.set('spendByCategoryData', data)
  })
},
[ActionTypes.SPEND_BY_ALL_CATEGORY_DATA_RECEIVED]: (state, { data }) => {
  return state.withMutations(stateMap => {
  stateMap.set('spendByAllCategoryData', data)
})
},
[ActionTypes.OTIF_VIEW_DATA_RECEIVED]: (state, { data }) => {
  return state.withMutations(stateMap => {
  stateMap.set('otifData', data)
})
},
[ActionTypes.TOP_ITEM_DATA_RECEIVED]: (state, { data }) => {
  return state.withMutations(stateMap => {
  stateMap.set('topItemData', data)
})
},
[ActionTypes.TOP_PLANT_DATA_RECEIVED]: (state, { data }) => {
  return state.withMutations(stateMap => {
  stateMap.set('topPlantData', data)
})
},
[ActionTypes.USER_FILTER_DATA_RECEIVED]: (state, { data }) => {
  return state.withMutations(stateMap => {
  stateMap.set('userFilterData', data)
})
},
[ActionTypes.ITEM_COUNT_DATA_RECEIVED]: (state, { buckets }) => {
  return state.withMutations(stateMap => {
  stateMap.set('itemCountData', buckets)
})
},
[ActionTypes.COMPANY_GET_RECEIVED]: (state, { data }) => {
  return state.withMutations(stateMap => {
  stateMap.set('companyGetData', data)
})
},
    }),
  }

  export function isHomeLoading(state) {
    return state.getIn(['home', 'isLoading'])
  }

  export function isHomeData(state) {
    return state.getIn(['home', 'buckets'])
  }

  export function isSessionData(state) {
    return state.getIn(['home', 'sessionData'])
  }

  export function isItemCountData(state) {
    return state.getIn(['home', 'itemCountData'])
  }

  export function isBranchID(state) {
    return state.getIn(['home', 'branchID'])
  }

  export function isCompanyID(state) {
    return state.getIn(['home', 'companyID'])
  }

  export function isCompanyName(state) {
    return state.getIn(['home', 'companyName'])
  }

  export function isBranchName(state) {
    return state.getIn(['home', 'branchName'])
  }

  export function isSummaryData(state) {
    return state.getIn(['home', 'summaryData'])
  }

  export function isSixMonthData(state) {
    return state.getIn(['home', 'sixmonthData'])
  }

  export function isSpendByCategory(state) {
    return state.getIn(['home', 'spendByCategoryData'])
  }

  export function isSpendByAllCategory(state) {
    return state.getIn(['home', 'spendByAllCategoryData'])
  }

  export function isOtifData(state) {
    return state.getIn(['home', 'otifData'])
  }
  export function isTopItemData(state) {
    return state.getIn(['home', 'topItemData'])
  }
  export function isTopPlantData(state) {
    return state.getIn(['home', 'topPlantData'])
  }
  export function isUserFilterData(state) {
    return state.getIn(['home', 'userFilterData'])
  }
  export function isCompanyGetData(state) {
    return state.getIn(['home', 'companyGetData'])
  }