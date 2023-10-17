import { ActionTypes } from '../constants'

export const getOrderListDetailData = payload => (
    { type: ActionTypes.GET_ORDERLIST_DETAIL_DATA, payload }
)

export const orderListDetailDataReceived = payload => (
    { type: ActionTypes.ORDERLIST_DETAIL_DATA_RECEIVED, payload }
)

export const getTrackItemDetailData = payload => (
    { type: ActionTypes.GET_ITEM_TRACK_DETAIL_DATA, payload }
)

export const itemTrackDataReceived = payload => (
    { type: ActionTypes.ITEM_TRACK_DATA_RECEIVED, payload }
)

export const getInvoiceRequest = payload => (
    { type: ActionTypes.GET_INVOICE_REQUEST_DATA, payload }
)

export const invoiceRequestReceived = payload => (
    { type: ActionTypes.INVOICE_REQUEST_RECEIVED, payload }
)

export const getSendMessageResponseData = payload => (
    { type: ActionTypes.GET_SEND_MESSAGE_RESPONSE, payload }
)

export const sendMessageDataReceived = payload => (
    { type: ActionTypes.SEND_MESSAGE_DATA_RECEIVED, payload }
)

export const runActivityMethod = payload => (
    { type: ActionTypes.RUN_ACTIVITY, payload }
)