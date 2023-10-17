import { takeLatest, call, put } from "redux-saga/effects";
import { postProcurementAPICall } from "../utils/commonService";
import { ActionTypes, API_URLS } from "../constants";

function fetchData(baseURL, apiOptions, payload) {
  return postProcurementAPICall(baseURL, apiOptions, payload);
}

function formatData(data) {
  const { tabSelected, idBranch, params } = data;
  this.request = params;
}

function* getOrderListData({ payload }) {
  const {
    tabSelected,
    page,
    startDate,
    endDate,
    isUserFilter,
    activeUserFilterData,
    loading,
    checkSelected,
  } = payload;
  const dateRange = {
    startDate: startDate,
    endDate: endDate,
  };
  yield put({ type: ActionTypes.SELECTED_TAB_VALUE, tabSelected });
  yield put({ type: ActionTypes.START_AND_END_DATE, dateRange });
  yield put({ type: ActionTypes.IS_USER_FILTER, isUserFilter });
  yield put({ type: ActionTypes.ACTIVE_USER_FILTER, activeUserFilterData });
  yield put({ type: ActionTypes.IS_CHECK_DATA, checkSelected });

  try {
    const apiOptions = {
      data: new formatData(payload),
    };

    yield put({ type: ActionTypes.IS_ORDERLISTING_LOADING, loading: true });
    const response = yield call(() =>
      fetchData(API_URLS.PROCUREMENT_ITEMS_SEARCH + page, apiOptions, payload)
    );
    const { hits } = response.data;
    const { aggregations } = response.data;
    const { buckets } = aggregations.statuses;
    var { buckets: bucket } = aggregations.subStatuses;
    if (payload.fromHomeTogetDelayCount == "true") {
      global.delayCount = hits.total;
    }
    yield put({ type: ActionTypes.FILTER_SUBSTATUS_BUCKET_RECEIVED, bucket });
    yield put({ type: ActionTypes.ORDERLIST_DATA_RECEIVED, hits });
    yield put({ type: ActionTypes.ORDERLIST_BUCKET_RECEIVED, buckets });
    yield put({ type: ActionTypes.IS_ORDERLISTING_LOADING, loading: false });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_ORDERLISTING_LOADING, loading: false });
  }
}

function* getUpcomingListData({ payload }) {
  const {
    tabSelected,
    page,
    startDate,
    endDate,
    isUserFilter,
    activeUserFilterData,
    userId,
  } = payload;
  const dateRange = {
    startDate: startDate,
    endDate: endDate,
  };
  yield put({ type: ActionTypes.SELECTED_TAB_VALUE, tabSelected });
  yield put({ type: ActionTypes.START_AND_END_DATE, dateRange });
  yield put({ type: ActionTypes.IS_USER_FILTER, isUserFilter });
  yield put({ type: ActionTypes.ACTIVE_USER_FILTER, activeUserFilterData });

  try {
    const apiOptions = {
      data: new formatData(payload),
    };
    yield put({ type: ActionTypes.IS_ORDERLISTING_LOADING, loading: true });
    const response = yield call(() =>
      fetchData(API_URLS.PROCUREMENT_ITEMS_SEARCH + 50, apiOptions, payload)
    );

    const { hits } = response.data;
    if (payload.fromHomeTogetDelayCount == "true") {
      global.delayCount = hits.total;
    }
    yield put({ type: ActionTypes.UPCOMINGLIST_DATA_RECEIVED, hits });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_ORDERLISTING_LOADING, loading: false });
  }
}

function* getSubStatusFilterAction({ payload }) {
  const { page, tabSelected } = payload;

  yield put({ type: ActionTypes.SELECTED_TAB_VALUE, tabSelected });
  try {
    const apiOptions = {
      data: new formatData(payload),
    };
    yield put({ type: ActionTypes.IS_ORDERLISTING_LOADING, loading: true });
    const response = yield call(() =>
      fetchData(API_URLS.PROCUREMENT_ITEMS_SEARCH + 100, apiOptions, payload)
    );
    const { hits } = response.data;
    yield put({ type: ActionTypes.FILTER_SUBSTATUS_DATA_RECEIVED, hits });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_ORDERLISTING_LOADING, loading: false });
  }
}

function* getOrderListDelayedData({ payload }) {
  const {
    tabSelected,
    page,
    startDate,
    endDate,
    isUserFilter,
    activeUserFilterData,
  } = payload;
  const dateRange = {
    startDate: startDate,
    endDate: endDate,
  };
  try {
    const apiOptions = {
      data: new formatData(payload),
    };
    yield put({ type: ActionTypes.IS_ORDERLISTING_LOADING, loading: true });
    const response = yield call(() =>
      fetchData(API_URLS.PROCUREMENT_ITEMS_SEARCH + page, apiOptions, payload)
    );
    const { hits } = response.data;
    const { aggregations } = response.data;
    const { buckets } = aggregations.statuses;
    global.delayCount = hits.total;
    yield put({ type: ActionTypes.IS_ORDERLISTING_LOADING, loading: false });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_ORDERLISTING_LOADING, loading: false });
  }
}

export default function* watcherSaga() {
  yield takeLatest(ActionTypes.GET_UPCOMING_DATA, getUpcomingListData);
  yield takeLatest(
    ActionTypes.GET_SUBSTATUS_FILTER_DATA,
    getSubStatusFilterAction
  );
  yield takeLatest(ActionTypes.GET_ORDERLIST_DATA, getOrderListData);
  yield takeLatest(
    ActionTypes.GET_ORDERLIST_DELAY_DATA,
    getOrderListDelayedData
  );
}
