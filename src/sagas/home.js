import { takeLatest, call, put } from "redux-saga/effects";
import {
  postProcurementAPICall,
  postAPICallWithHeader,
  postAPICallWithHeader3,
  getAPICall2,
  postAPICallWithHeader4,
} from "../utils/commonService";
import { ActionTypes, API_URLS, AppConfig } from "../constants";
import analytics from "@react-native-firebase/analytics";
import moment from "moment";

function fetchData(apiOptions, payload) {
  return postProcurementAPICall(
    API_URLS.PROCUREMENT_ITEMS_SEARCH2,
    apiOptions,
    payload
  );
}

function fetchItemCountData(apiOptions, payload) {
  return postProcurementAPICall(
    API_URLS.PROCUREMENT_ITEMS_SEARCH3,
    apiOptions,
    payload
  );
}

function fetchSessionData(apiOptions, payload) {
  return postAPICallWithHeader(API_URLS.GET_SESSION_URL, apiOptions, payload);
}

function fetchSummaryData(apiOptions, payload) {
  return postAPICallWithHeader3(
    API_URLS.GET_OVERALL_SUMMARY_URL,
    apiOptions,
    payload
  );
}

function fetchSixMonthData(apiOptions, payload) {
  return getAPICall2(API_URLS.LAST_SIX_MONTH_SPENT, apiOptions, payload);
}

function fetchSpendByCategory(apiOptions, payload) {
  return postAPICallWithHeader3(
    API_URLS.SPEND_BY_CATEGORY,
    apiOptions,
    payload
  );
}

function fetchSpendByAllCategory(apiOptions, payload) {
  return postAPICallWithHeader3(
    API_URLS.SPEND_BY_ALL_CATEGORY,
    apiOptions,
    payload
  );
}

function fetchOtifView(apiOptions, payload) {
  return postAPICallWithHeader3(API_URLS.OTIF_VIEW, apiOptions, payload);
}

function fetchTopItem(apiOptions, payload) {
  return postAPICallWithHeader3(API_URLS.TOP_ITEM_COUNT, apiOptions, payload);
}

function fetchTopPlant(apiOptions, payload) {
  return postAPICallWithHeader3(API_URLS.TOP_PLANT_COUNT, apiOptions, payload);
}

function fetchUserFilter(apiOptions, payload) {
  return postAPICallWithHeader4(API_URLS.USER_FILTER, apiOptions, payload);
}
function fetchCompanyGet(apiOptions, payload) {
  return postAPICallWithHeader4(API_URLS.COMPANY_GET, apiOptions, payload);
}

function formatData(data) {
  var currenteeDate = new Date().getTime();
  var lastDaysOfDate = new Date(new Date().setDate(new Date().getDate() - 30));
  var lastDaysOfDateMilisecond = lastDaysOfDate.getTime();
  let userFilter = [];
  if (data.userFilter) {
    userFilter = data.userFilter;
  }
  let filter = {
    bool: {
      should: [
        {
          bool: {
            must_not: [
              {
                exists: {
                  field: "createdBy",
                },
              },
            ],
          },
        },
        {
          terms: {
            createdBy: userFilter,
          },
        },
        {
          terms: {
            purchaserId: userFilter,
          },
        },
      ],
    },
  };

  let params = {
    query: {
      bool: {
        must: [
          {
            terms: {
              buyerId: [String(global.GLOBAL_BRANCH_ID)],
            },
          },
          {
            range: {
              creationDate: {
                gt: moment().subtract('months', 6).unix(),  //changed due to 6 month data
              },
            },
          },
        ],
        must_not: {
          terms: {
            status: ["PR Created", "Revised", "Cancelled", "Closed"],
          },
        },
      },
    },
    size: 0,
    aggs: {
      statuses: {
        terms: {
          field: "status",
          size: 20,
        },
      },
    },
  };

  if (userFilter.length) {
    params = {
      query: {
        bool: {
          filter,
          must: [
            {
              terms: {
                buyerId: [global.GLOBAL_BRANCH_ID],
              },
            },
          ],
          must_not: {
            terms: {
              status: ["PR Created", "Revised", "Cancelled", "Closed"],
            },
          },
        },
      },
      size: 0,
      aggs: {
        statuses: {
          terms: {
            field: "status",
            size: 20,
          },
        },
      },
    };
  }

  this.request = params;
}

function formatDataItemCount(data) {
  let currentDate = `${new Date().getFullYear()}-${
    String(Number(new Date().getMonth()) + 1).length > 1
      ? String(Number(new Date().getMonth()) + 1)
      : "0" + String(Number(new Date().getMonth()) + 1)
  }-${new Date().getDate()}`;

  var myEnd = new Date(data.toTime);
  myEnd.setUTCHours(23, 59, 59, 999);
  let endDate = Date.parse(myEnd);
  var start = new Date(data.fromTime);
  start.setUTCHours(0, 0, 0, 0);

  let startDate = Date.parse(start);
  if (currentDate == data.toTime) {
    endDate = Date.parse(
      data.toTime +
        ` ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    );
  }
  const params = {
    query: {
      bool: {
        must: [
          {
            terms: {
              buyerId: [global.GLOBAL_BRANCH_ID],
            },
          },
          {
            range: {
              creationDate: {
                gt: startDate,
                lte: endDate,
              },
            },
          },
        ],
        must_not: {
          terms: {
            status: ["PR Created", "Revised", "Cancelled", "Closed"],
          },
        },
      },
    },
    sort: {
      creationDate: {
        order: "desc",
      },
    },
    aggs: {
      statuses: {
        terms: {
          field: "status",
          size: 30,
        },
        aggs: {
          statusWiseSum: {
            nested: {
              path: "amount",
            },
            aggs: {
              total: {
                sum: {
                  field: "amount.amountWithTax",
                },
              },
            },
          },
        },
      },
    },
  };

  this.request = params;
}

function* getDashboardData({ payload }) {
  try {
    const apiOptions = {
      data: new formatData(payload),
    };
    var clearData = [];
    yield put({ type: ActionTypes.DASHBOARD_DATA_RECEIVED, clearData });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: true });
    const response = yield call(() => fetchData(apiOptions, payload));

    const { aggregations } = response.data;
    const { buckets } = aggregations.statuses;

    yield put({ type: ActionTypes.DASHBOARD_DATA_RECEIVED, buckets });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  }
}

function* getItemCountData({ payload }) {
  try {
    const apiOptions = {
      data: new formatDataItemCount(payload),
    };
    var clearData = [];
    yield put({ type: ActionTypes.ITEM_COUNT_DATA_RECEIVED, clearData });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: true });
    const response = yield call(() => fetchItemCountData(apiOptions, payload));
    const { aggregations } = response.data;
    const { buckets } = aggregations.statuses;

    yield put({ type: ActionTypes.ITEM_COUNT_DATA_RECEIVED, buckets });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  }
}

function formatGetSessionData(payload) {
  const { userId, token } = payload;

  this.idUser = userId;
  this.token = token;
  this.application = AppConfig.APP_ID;
  this.dataType = AppConfig.DATA_TYPE;
}

function formatGetDashboardData(payload) {
  const { userId, token, fromTime, toTime, periodic } = payload;

  this.idUser = userId;
  this.token = token;
  this.application = AppConfig.APP_ID;
  this.dataType = AppConfig.DATA_TYPE;
  this.fromTime = fromTime;
  this.toTime = toTime;
}

function formatGetUserFilterData(payload) {
  const { idUser, idCompany, token } = payload;

  this.idUser = idUser;
  this.idCompany = AppConfig.COMPANY_ID;
  this.token = token;
}

function formatGetOtifData(payload) {
  const {
    userId,
    token,
    fromTime,
    toTime,
    weekDataFlag,
    periodicFlag,
    monthDataFlag,
    performanceFlag,
  } = payload;

  this.idUser = userId;
  this.token = token;
  this.application = AppConfig.APP_ID;
  this.dataType = AppConfig.DATA_TYPE;
  this.fromTime = fromTime;
  this.toTime = toTime;
  this.weekDataFlag = weekDataFlag;
  this.periodicFlag = periodicFlag;
  this.monthDataFlag = monthDataFlag;
  this.performanceFlag = performanceFlag;
}

function formatGetSessionHeaderData(payload) {
  const { userId, token } = payload;

  this.idUser = userId;
  this.token = token;
}

function* getSessionDashBoardData({ payload }) {
  try {
    const apiOptions = {
      data: new formatGetSessionData(payload),
    };
    const newPayload = {
      data: new formatGetSessionHeaderData(payload),
    };

    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: true });
    const response = yield call(() => fetchSessionData(apiOptions, newPayload));

    const { data } = response;

    if (!global.GLOBAL_BRANCH_NAME) {
      var allPropertyNames = Object.keys(
        response.data.data.companyData.branchNames
      );
      for (var j = 0; j < 1; j++) {
        var name = allPropertyNames[j];
        global.GLOBAL_BRANCH_ID = String(name);
        global.GLOBAL_BRANCH_NAME =
          response.data.data.companyData.branchNames[name];
        global.GLOBAL_COMPANY_ID =
          response.data.data.companyData.branchToCompany[name];
        analytics().setUserProperty(
          "customerID",
          global.GLOBAL_COMPANY_ID.toString()
        );
        global.GLOBAL_COMPANY_NAME =
          response.data.data.companyData.companyNames[global.GLOBAL_COMPANY_ID];
      }
    }
    yield put({ type: ActionTypes.SET_HOME_GET_SESSION_DATA, data });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  }
}

function* getOverallSummaryData({ payload }) {
  try {
    const apiOptions = {
      data: new formatGetDashboardData(payload),
    };
    const newPayload = {
      data: new formatGetSessionHeaderData(payload),
    };

    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: true });
    const response = yield call(() => fetchSummaryData(apiOptions, newPayload));
    const { data } = response;
    yield put({ type: ActionTypes.SUMMARY_DATA_RECEIVED, data });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  }
}

function* getSixMonthData({ payload }) {
  try {
    const apiOptions = {
      data: new formatGetDashboardData(payload),
    };
    const newPayload = {
      data: new formatGetSessionHeaderData(payload),
    };

    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: true });
    const response = yield call(() =>
      fetchSixMonthData(apiOptions, newPayload)
    );
    const { data } = response;
    yield put({ type: ActionTypes.LAST_SIX_MONTH_DATA_RECEIVED, data });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  }
}

function* getSpendByCategoryData({ payload }) {
  try {
    const apiOptions = {
      data: new formatGetDashboardData(payload),
    };
    const newPayload = {
      data: new formatGetSessionHeaderData(payload),
    };

    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: true });
    const response = yield call(() =>
      fetchSpendByCategory(apiOptions, newPayload)
    );
    const { data } = response;
    yield put({ type: ActionTypes.SPEND_BY_CATEGORY_DATA_RECEIVED, data });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  } catch (error) {
    console.log("Summary error", error);
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  }
}
function* getSpendByAllCategoryData({ payload }) {
  try {
    const apiOptions = {
      data: new formatGetDashboardData(payload),
    };
    const newPayload = {
      data: new formatGetSessionHeaderData(payload),
    };

    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: true });
    const response = yield call(() =>
      fetchSpendByAllCategory(apiOptions, newPayload)
    );
    const { data } = response;
    yield put({ type: ActionTypes.SPEND_BY_ALL_CATEGORY_DATA_RECEIVED, data });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  }
}

function* getOtifViewData({ payload }) {
  try {
    const apiOptions = {
      data: new formatGetOtifData(payload),
    };
    const newPayload = {
      data: new formatGetSessionHeaderData(payload),
    };

    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: true });
    const response = yield call(() => fetchOtifView(apiOptions, newPayload));
    const { data } = response;
    yield put({ type: ActionTypes.OTIF_VIEW_DATA_RECEIVED, data });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  }
}

function* getTopItemData({ payload }) {
  try {
    const apiOptions = {
      data: new formatGetDashboardData(payload),
    };
    const newPayload = {
      data: new formatGetSessionHeaderData(payload),
    };

    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: true });
    const response = yield call(() => fetchTopItem(apiOptions, newPayload));
    const { data } = response;
    yield put({ type: ActionTypes.TOP_ITEM_DATA_RECEIVED, data });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  }
}

function* getTopPlantData({ payload }) {
  try {
    const apiOptions = {
      data: new formatGetDashboardData(payload),
    };
    const newPayload = {
      data: new formatGetSessionHeaderData(payload),
    };

    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: true });
    const response = yield call(() => fetchTopPlant(apiOptions, newPayload));
    const { data } = response;
    yield put({ type: ActionTypes.TOP_PLANT_DATA_RECEIVED, data });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  }
}

function* getUserFilterData({ payload }) {
  try {
    const apiOptions = {
      data: new formatGetUserFilterData(payload),
    };
    const newPayload = {
      data: new formatGetSessionHeaderData(payload),
    };

    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: true });
    const response = yield call(() => fetchUserFilter(apiOptions, newPayload));
    const { data } = response;

    yield put({ type: ActionTypes.USER_FILTER_DATA_RECEIVED, data });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  }
}

function* getCompanyGetData({ payload }) {
  try {
    const apiOptions = {
      data: new formatGetUserFilterData(payload),
    };
    const newPayload = {
      data: new formatGetSessionHeaderData(payload),
    };

    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: true });
    const response = yield call(() => fetchCompanyGet(apiOptions, newPayload));
    const { data } = response.data;
    yield put({ type: ActionTypes.COMPANY_GET_RECEIVED, data });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });
  }
}

export default function* watcherSaga() {
  yield takeLatest(ActionTypes.GET_DASHBOARD_DATA, getDashboardData);
  yield takeLatest(
    ActionTypes.GET_LOGIN_USER_SESSION_DATA,
    getSessionDashBoardData
  );
  yield takeLatest(ActionTypes.GET_OVERALL_SUMMARY_DATA, getOverallSummaryData);
  yield takeLatest(ActionTypes.GET_LAST_SIX_MONTH_DATA, getSixMonthData);
  yield takeLatest(
    ActionTypes.GET_SPEND_BY_CATEGORY_DATA,
    getSpendByCategoryData
  );
  yield takeLatest(
    ActionTypes.GET_SPEND_BY_ALL_CATEGORY_DATA,
    getSpendByAllCategoryData
  );
  yield takeLatest(ActionTypes.GET_OTIF_VIEW_DATA, getOtifViewData);
  yield takeLatest(ActionTypes.GET_TOP_ITEM_DATA, getTopItemData);
  yield takeLatest(ActionTypes.GET_TOP_PLANT_DATA, getTopPlantData);
  yield takeLatest(ActionTypes.GET_USER_FILTER_DATA, getUserFilterData);
  yield takeLatest(ActionTypes.GET_ITEM_COUNT_DATA, getItemCountData);
  yield takeLatest(ActionTypes.GET_COMPANY_DATA, getCompanyGetData);
}
