import { Map } from 'immutable'
import { ActionTypes } from '../constants'
import { createReducer } from '../utils/commonService'

const initialState = Map({
    isLoading: false,
    itemDetailData:{},
    itemTrackData:{},
    sendMailStatus: {},
    invoiceDetailData:{},
    invoiceTrackData:{},
})

export default {
    OrderListDetail: createReducer(initialState, {
        [ActionTypes.ORDERLIST_DETAIL_DATA_RECEIVED]: (state, { hits }) => {
          return state.withMutations(stateMap => {
          stateMap.set('itemDetailData', hits)
        })
      },
      [ActionTypes.IS_ORDERLISTING_DETAIL_LOADING]: (state, { loading }) => {
        return state.withMutations(stateMap => {
          stateMap.set('isLoading', loading)
      })
      },

      [ActionTypes.ITEM_TRACK_DATA_RECEIVED]: (state, { response }) => {
        return state.withMutations(stateMap => {
        stateMap.set('itemTrackData', response)
      })
    },

    [ActionTypes.INVOICE_REQUEST_RECEIVED]: (state, { response }) => {
      return state.withMutations(stateMap => {
      stateMap.set('invoiceDetailData', response)
      })
    },

    [ActionTypes.SEND_MESSAGE_DATA_RECEIVED]: (state, { response }) => {
      return state.withMutations(stateMap => {
      stateMap.set('sendMailStatus', response)
      })
    },


    }),
  }

  export function isLoading(state) {
    return state.getIn(['OrderListDetail', 'isLoading'])
  }

  export function orderListDetailData(state) {
    return state.getIn(['OrderListDetail', 'itemDetailData'])
  }

  export function itemTrackDetailData(state) {
    return state.getIn(['OrderListDetail', 'itemTrackData'])
  }

  export function itemInvoiceDetailData(state) {
    return state.getIn(['OrderListDetail', 'invoiceDetailData'])
  }

  export function sendMessageResponseData(state) {
    return state.getIn(['OrderListDetail', 'sendMailStatus'])
  }