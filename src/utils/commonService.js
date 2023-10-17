import axios from "axios";
import { isNull, isUndefined } from "lodash";
import Toast from "react-native-simple-toast";
import { AppConfig } from "../constants";

/**
 * Generate reducer.
 *
 * @param {Object} initialState
 * @param {Object} handlers
 * @returns {function}
 */
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if ({}.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

const loginHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  application: AppConfig.APP_ID,
};
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  application: AppConfig.APP_ID,
  idBranch: AppConfig.APP_ID,
  idCompany: AppConfig.APP_ID,
  idUser: AppConfig.APP_ID,
  Origin: AppConfig.APP_ID,
  token: AppConfig.APP_ID,
};

function getAPICall(URL, payload) {
  const config = {
    "Content-Type": "application/json",
    application: AppConfig.APP_ID,
    idBranch: global.GLOBAL_BRANCH_ID,
    idCompany: global.GLOBAL_COMPANY_ID,
    idUser: payload.userId,
    Origin: AppConfig.ORIGIN,
    token: payload.token,
  };

  return axios({
    method: "GET",
    url: AppConfig.PROCUREMENT_BASEURL + URL,
    headers: config,
  })
    .then(resolveAxios2)
    .catch(rejectAxios2);
}

function getInvoiceAPICall(URL, options, payload) {
  const data = { ...options.data.request };

  const config = {
    "Content-Type": "application/json",
    application: AppConfig.APP_ID,
    idBranch: global.GLOBAL_BRANCH_ID,
    idCompany: global.GLOBAL_COMPANY_ID,
    idUser: payload.userId,
    Origin: AppConfig.ORIGIN,
    token: payload.token,
  };
  return axios({
    method: "POST",
    url: AppConfig.BASEURL_QA + URL,
    headers: config,
    data,
  })
    .then(resolveAxios2)
    .catch(rejectAxios2);
}

function getInvoicetTrackAPICall(URL) {
  const config = {
    accessKey: AppConfig.LMS_ACCESS_KEY,
    applicationName: "EMS",
  };

  return axios({
    method: "GET",
    url: AppConfig.LMSBASE_URL + URL,
    headers: config,
  })
    .then(resolveAxios2)
    .catch(rejectAxios2);
}

function getNormalOrderAPICall(URL, payload) {
  const config = {
    "Content-Type": "application/json",
    application: AppConfig.APP_ID,
    idBranch: global.GLOBAL_BRANCH_ID,
    idCompany: global.GLOBAL_COMPANY_ID,
    idUser: payload.idUser,
    token: payload.token,
  };
  return axios({
    method: "GET",
    url: AppConfig.BASEURL_QA + URL,
    headers: config,
  })
    .then(resolveAxios2)
    .catch(rejectAxios2);
}

function getAPICall2(URL, payload) {
  const config = {
    "Content-Type": "application/json",
    application: AppConfig.APP_ID,
    idBranch: global.GLOBAL_BRANCH_ID,
    idCompany: global.GLOBAL_COMPANY_ID,
    idUser: payload.data.idUser,
    Origin: AppConfig.ORIGIN,
    token: payload.data.token,
  };

  return axios({
    method: "POST",
    url: AppConfig.BASEURL_QA + URL,
    headers: config,
    data: {
      createdBy: [],
    },
  })
    .then(resolveAxios2)
    .catch(rejectAxios2);
}

function postAPICall(URL, options) {
  const data = { ...options.data };

  return axios({
    method: "POST",
    url: AppConfig.BASEURL + URL,
    data,
  })
    .then(resolveAxios)
    .catch(rejectAxios);
}

function postProcurementAPICall(URL, options, payload) {
  if (global.GLOBAL_BRANCH_ID && global.GLOBAL_COMPANY_ID && payload.userId) {
    const data = { ...options.data.request };

    const config = {
      "Content-Type": "application/json",
      application: AppConfig.APP_ID,
      idBranch: global.GLOBAL_BRANCH_ID,
      idCompany: global.GLOBAL_COMPANY_ID,
      idUser: payload.userId,
      Origin: AppConfig.ORIGIN,
      token: payload.token,
    };
    return axios({
      method: "POST",
      url: AppConfig.PROCUREMENT_BASEURL + URL,
      headers: config,
      data,
    })
      .then(resolveProcurementAxios)
      .catch(rejectAxios);
  }
}



const getDashboardView = (options, payload) => {
  if (global.GLOBAL_BRANCH_ID && global.GLOBAL_COMPANY_ID && payload.userId) {
    const data = { ...options };
    const config = {
      "Content-Type": "application/json",
      application: AppConfig.APP_ID,
      idBranch: global.GLOBAL_BRANCH_ID,
      idCompany: global.GLOBAL_COMPANY_ID,
      idUser: payload.userId,
      Origin: AppConfig.ORIGIN,
      token: payload.token,
    };
    return axios({
      method: "POST",
      url: AppConfig.BASEURL + "/login/user/getBranchAccess",
      headers: config,
      data,
    });
  }
};

const getCofiguartionRequest = (options, payload) => {
  if (global.GLOBAL_BRANCH_ID && global.GLOBAL_COMPANY_ID && payload.userId) {
    const data = { ...options };
    const config = {
      application: AppConfig.APP_ID,
      "Content-Type": "application/json",
      idBranch: global.GLOBAL_BRANCH_ID,
      idCompany: global.GLOBAL_COMPANY_ID,
      idUser: payload.userId,
      token: payload.token,
    };
    return axios({
      method: "POST",
      url: AppConfig.BASEURL_QA + "/configuration/header/config/get",
      headers: config,
      data,
    });
  }
};



function resolveProcurementAxios(response) {
  const responseError = response.data.error_msg;
  const responseSuccess = response.data.aggregations;

  if (!isNull(responseSuccess) && responseError == null) return response;
  const error = new Error();
  error.code = response.status_code;
  error.message = responseError;
  error.response = responseError;
  throw error;
}

function postAPICallWithHeader(URL, options, newHeader) {
  const data = { ...options.data };

  const config = {
    "Content-Type": "application/json",
    application: AppConfig.APP_ID,
    idBranch: AppConfig.BRANCH_ID,
    idCompany: AppConfig.COMPANY_ID,
    idUser: data.idUser,
    Origin: AppConfig.ORIGIN,
    token: data.token,
  };

  return axios({
    method: "POST",
    url: AppConfig.BASEURL + URL,
    headers: config,
    data,
  })
    .then(resolveAxios)
    .catch(rejectAxios);
}

function postAPICallWithHeader3(URL, options) {
  const data = { ...options.data };
  let data1 = {
    fromTime: data.fromTime,
    toTime: data.toTime,
    createdBy: [],
  };
  const config = {
    "Content-Type": "application/json",
    application: AppConfig.APP_ID,
    idBranch: global.GLOBAL_BRANCH_ID,
    idCompany: global.GLOBAL_COMPANY_ID,
    idUser: data.idUser,
    Origin: AppConfig.ORIGIN,
    token: data.token,
  };
  if (URL == "/report/spendByCategory" || URL == "/report/spendByAllCategory") {
    data1 = {
      fromDate: data.fromTime,
      toDate: data.toTime,
      createdBy: [],
    };
  } else if ("performanceFlag" in data) {
    data1 = {
      weekDataFlag: data.weekDataFlag,
      periodicFlag: data.periodicFlag,
      monthDataFlag: data.monthDataFlag,
      performanceFlag: data.performanceFlag,
      startDate: data.fromTime,
      endDate: data.toTime,
    };
  }
  return axios({
    method: "POST",
    url: AppConfig.BASEURL_QA + URL,
    headers: config,
    data: data1,
  })
    .then(resolveAxios2)
    .catch(rejectAxios);
}

function postAPICallWithHeader4(URL, options, newHeader) {
  const data = { ...options.data };
  const config = {
    "Content-Type": "application/json",
    application: AppConfig.APP_ID,
    idBranch: global.GLOBAL_BRANCH_ID,
    idCompany: global.GLOBAL_COMPANY_ID,
    idUser: data.idUser,
    Origin: AppConfig.ORIGIN,
    token: data.token,
  };

  let req = {
    idCompany: String(global.GLOBAL_COMPANY_ID),
    idUser: data.idUser,
  };
  if (URL == "/login/company/get") {
    req = {
      idCompany: String(global.GLOBAL_COMPANY_ID),
    };
  }
  return axios({
    method: "POST",
    url: AppConfig.BASEURL + URL,
    headers: config,
    data: req,
  })
    .then(resolveAxios)
    .catch(rejectAxios);
}

function postAPICallWithHeader2(URL, options) {
  const data = { ...options.sendMessageBody };
  const config = {
    "Content-Type": "application/json",
    application: AppConfig.APP_ID,
    idBranch: AppConfig.BRANCH_ID,
    idCompany: AppConfig.COMPANY_ID,
    idUser: options.userId,
    Origin: AppConfig.ORIGIN,
    token: options.token,
  };
  return axios({
    method: "POST",
    url: AppConfig.BASEURL + URL,
    headers: config,
    data,
  })
    .then(resolveAxios)
    .catch(rejectAxios);
}

function resolveAxios(response) {
  const responseError = response.data.message;
  const responseSuccess = response.data.successful;
  if (!isNull(responseSuccess) && isNull(responseError)) return response;
  const error = new Error();
  error.code = response.data.status;
  error.message = responseError;
  error.response = responseError;
  throw error;
}

function resolveAxios2(response) {
  return response.data;
  const error = new Error();
  error.code = response.data.status;
  error.message = responseError;
  error.response = responseError;
  throw error;
}

function rejectAxios(err) {
  const error = err;
  if (error.message === "Network Error") {
    error.code = "503";
    error.message = "Network Error.";
  }
  if (isUndefined(error.code)) {
    error.code = "500";
    error.message = "Something went wrong, please try again.";
  }
  if (!error.message.includes("Company Id given is not valid:"))
    alertBox(error.message);

  throw error;
}
function rejectAxios2(err) {
  const error = err;
  if (error.message === "Network Error") {
    error.code = "503";
    error.message = "Network Error.";
  }
  if (isUndefined(error.code)) {
    error.code = "500";
    error.message = "Something went wrong, please try again.";
  }
  throw error;
}

function alertBox(alertMsg) {
  Toast.show(alertMsg);
}

export {
  createReducer,
  getAPICall,
  postAPICall,
  alertBox,
  postProcurementAPICall,
  postAPICallWithHeader,
  postAPICallWithHeader2,
  postAPICallWithHeader3,
  postAPICallWithHeader4,
  getAPICall2,
  getInvoiceAPICall,
  getDashboardView,
  getCofiguartionRequest,
  getInvoicetTrackAPICall,
  getNormalOrderAPICall,
};
