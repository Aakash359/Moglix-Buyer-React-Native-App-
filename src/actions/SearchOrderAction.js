import { ActionTypes } from '../constants'

export const getSearchedData = payload => (
    { type: ActionTypes.GET_SEARCHED_ORDER_DATA, payload }
)

export const searchedDataReceived = payload => (
    { type: ActionTypes.SEARCHED_ORDER_DATA_RECEIVED, payload }
)