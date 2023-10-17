import { ActionTypes } from '../constants'

export const getDashboardData = payload => (
    { type: ActionTypes.GET_DASHBOARD_DATA, payload }
)

export const dashboardDataReceived = payload => (
    { type: ActionTypes.DASHBOARD_DATA_RECEIVED, payload }
)

export const getSessionDashBoardData = payload => (
    { type: ActionTypes.GET_LOGIN_USER_SESSION_DATA, payload }
)

export const getOverallSummaryData = payload => (
    { type: ActionTypes.GET_OVERALL_SUMMARY_DATA, payload }
)

export const getLastSixMonthSpentData = payload => (
    { type: ActionTypes.GET_LAST_SIX_MONTH_DATA, payload }
)

export const getSpendByCategoryData = payload => (
    { type: ActionTypes.GET_SPEND_BY_CATEGORY_DATA, payload }
)

export const getSpendByAllCategoryData = payload => (
    { type: ActionTypes.GET_SPEND_BY_ALL_CATEGORY_DATA, payload }
)

export const getOtifViewData = payload => (
    { type: ActionTypes.GET_OTIF_VIEW_DATA, payload }
)

export const getTopItemData = payload => (
    { type: ActionTypes.GET_TOP_ITEM_DATA, payload }
)

export const getTopPlantData = payload => (
    { type: ActionTypes.GET_TOP_PLANT_DATA, payload }
)

export const getUserFilterData = payload => (
    { type: ActionTypes.GET_USER_FILTER_DATA, payload }
)

export const getItemCountData = payload => (
    { type: ActionTypes.GET_ITEM_COUNT_DATA, payload }
)

export const getCompanyGetData = payload => (
    { type: ActionTypes.GET_COMPANY_DATA, payload }
)