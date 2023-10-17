import { Map } from 'immutable'
import { ActionTypes } from '../constants'
import { createReducer } from '../utils/commonService'

const initialState = Map({
   
    invoiceTrackData:{},
    normalOrderData:{},
})

export default {
    
    InvoiceListDetail: createReducer(initialState, {
        
   [ActionTypes.INVOICE_TRACK_DATA_RECEIVED]: (state, { response }) => {
        return state.withMutations(stateMap => {
        stateMap.set('invoiceTrackData', response)
        })
      },

   [ActionTypes.NORMAL_ORDER_DATA_RECEIVED]: (state, { response }) => {
        return state.withMutations(stateMap => {
        stateMap.set('normalOrderData', response)
        })
      },
     }),
     
  }

export function itemInvoiceTrackData(state) {
    return state.getIn(['InvoiceListDetail', 'invoiceTrackData'])
   
}

export function normalOrderData(state) {
    return state.getIn(['InvoiceListDetail', 'normalOrderData'])
   
}

