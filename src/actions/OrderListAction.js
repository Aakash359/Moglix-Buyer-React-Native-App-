import { ActionTypes } from '../constants'

export const getOrderListData = payload => (
    { type: ActionTypes.GET_ORDERLIST_DATA, payload }
)

export const getUpcomingListData = payload => (
    { type: ActionTypes.GET_UPCOMING_DATA, payload }
)

export const getSubStatusFilterAction = payload => (
    { type: ActionTypes.GET_SUBSTATUS_FILTER_DATA, payload }
)

export const getOrderListDelayedData = payload => (
    { type: ActionTypes.GET_ORDERLIST_DELAY_DATA, payload }
)

export const orderListDataReceived = payload => (
    { type: ActionTypes.ORDERLIST_DATA_RECEIVED, payload }
)

export const upcomingListDataReceived = payload => (
    { type: ActionTypes.UPCOMINGLIST_DATA_RECEIVED, payload }
)

export const orderListBucketReceived = payload => (
    { type: ActionTypes.ORDERLIST_BUCKET_RECEIVED, payload }
)

export const filterListSubStatusBucketReceived = payload => (
    { type: ActionTypes.FILTER_SUBSTATUS_BUCKET_RECEIVED, payload }
)