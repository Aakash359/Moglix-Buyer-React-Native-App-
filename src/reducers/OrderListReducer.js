import { Map } from 'immutable'
import { ActionTypes } from '../constants'
import { createReducer } from '../utils/commonService'

const initialState = Map({
  isLoading: true,
  hitsData: [],
  selectedTabString: '',
  startDate: '',
  endDate: '',
  orderBuckets: [],
  filterSubStatus: [],
  subStatusBuckets: [],
  userFilterValue: '',
  activeUserFilterData: [],
  upComingData: [],
  isCheck: false,
  StateOfFilterArray: ["", "", "", ""],

})

export default {
  OrderList: createReducer(initialState, {

    [ActionTypes.ORDERLIST_DATA_RECEIVED]: (state, { hits }) => {
      return state.withMutations(stateMap => {
        stateMap.set('hitsData', hits)
      })
    },
    [ActionTypes.UPCOMINGLIST_DATA_RECEIVED]: (state, { hits }) => {
      return state.withMutations(stateMap => {
        stateMap.set('upComingData', hits)
      })
    },
    [ActionTypes.FILTER_SUBSTATUS_DATA_RECEIVED]: (state, { hits }) => {
      return state.withMutations(stateMap => {
        stateMap.set('filterSubStatus', hits)
      })
    },
    [ActionTypes.IS_ORDERLISTING_LOADING]: (state, { loading }) => {
      return state.withMutations(stateMap => {
        stateMap.set('isLoading', loading)
      })
    },
    [ActionTypes.FILTER_SUBSTATUS_BUCKET_RECEIVED]: (state, { bucket }) => {
      return state.withMutations(stateMap => {
        stateMap.set('subStatusBuckets', bucket)
      })
    },
    [ActionTypes.ORDERLIST_BUCKET_RECEIVED]: (state, { buckets }) => {
      return state.withMutations(stateMap => {
        stateMap.set('orderBuckets', buckets)
      })
    },
    [ActionTypes.SELECTED_TAB_VALUE]: (state, { tabSelected }) => {
      return state.withMutations(stateMap => {
        stateMap.set('selectedTabString', tabSelected)
      })
    },
    [ActionTypes.IS_USER_FILTER]: (state, { isUserFilter }) => {
      return state.withMutations(stateMap => {
        stateMap.set('userFilterValue', isUserFilter)
      })
    },
    [ActionTypes.ACTIVE_USER_FILTER]: (state, { activeUserFilterData }) => {
      return state.withMutations(stateMap => {
        stateMap.set('activeUserFilterData', activeUserFilterData)
      })
    },

    [ActionTypes.IS_CHECK_DATA]: (state, { checkSelected }) => {
      return state.withMutations(stateMap => {
        stateMap.set('isCheck', checkSelected)

      })
    },

    [ActionTypes.START_AND_END_DATE]: (state, { dateRange }) => {
      return state.withMutations(stateMap => {
        const { startDate, endDate } = dateRange
        stateMap.set('startDate', startDate)
        stateMap.set('endDate', endDate)
      })
    },

    [ActionTypes.FILTER_STATE_DATA]: (state, { filterState }) => {
      return state.withMutations(stateMap => {
        stateMap.set('StateOfFilterArray', filterState)

      })
    },

  }),
}

export function isHomeLoading(state) {
  return state.getIn(['OrderList', 'isLoading'])
}

export function orderListData(state) {
  return state.getIn(['OrderList', 'hitsData'])
}

export function upComingData(state) {
  return state.getIn(['OrderList', 'upComingData'])
}

export function _subStatusFilterListData(state) {
  return state.getIn(['OrderList', 'filterSubStatus'])
}

export function selectedTabData(state) {
  return state.getIn(['OrderList', 'selectedTabString'])
}

export function bucketListData(state) {
  return state.getIn(['OrderList', 'orderBuckets'])
}

export function subStatusbucketList(state) {
  return state.getIn(['OrderList', 'subStatusBuckets'])
}

export function filterBucketListData(state) {
  return state.getIn(['OrderList', 'bucket'])
}

export function userFilterData(state) {
  return state.getIn(['OrderList', 'userFilterValue'])
}

export function isCheckData(state) {
  return state.getIn(['OrderList', 'isCheck'])
}

export function activeUserFilterArray(state) {
  return state.getIn(['OrderList', 'activeUserFilterData'])
}

