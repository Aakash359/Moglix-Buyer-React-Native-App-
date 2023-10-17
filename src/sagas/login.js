import { takeLatest, call, put } from "redux-saga/effects";
import { postAPICall, postAPICallWithHeader } from "../utils/commonService";
import { ActionTypes, API_URLS, AppConfig } from "../constants";
import analytics from "@react-native-firebase/analytics";
import messaging from "@react-native-firebase/messaging";
import DatabaseManager from "./../Storage/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

function fetchData(baseURL, apiOptions) {
  return postAPICall(baseURL, apiOptions);
}

function formatLoginData(data) {
  const { userName, password } = data;
  this.userName = userName.trim() || "";
  this.password = password;
  this.application = AppConfig.APP_ID;
  this.source = "mapp";
}

function formatGoogleLoginData(data) {
  const { idToken } = data;
  this.idToken = idToken;
}

function fetchSessionData(apiOptions, payload) {
  return postAPICallWithHeader(API_URLS.GET_SESSION_URL, apiOptions, payload);
}

function* postUserLogin({ payload }) {
  try {
    const apiOptions = {
      data: new formatLoginData(payload),
    };
    yield put({ type: ActionTypes.SET_LOGIN_LOADING, loading: true });
    const response = yield call(() =>
      fetchData(API_URLS.LOGIN_USER_URL, apiOptions)
    );

    const { session } = response.data.data;

    const apiOption = {
      data: {
        idUser: session.userData.userId,
        token: session.userData.token,
        application: AppConfig.APP_ID,
        dataType: AppConfig.DATA_TYPE,
      },
    };
    const newPayload = {
      data: {
        idUser: session.userData.userId,
        token: session.userData.token,
      },
    };

    const responseSession = yield call(() =>
      fetchSessionData(apiOption, newPayload)
    );

    const { data } = responseSession;

    // if (!global.GLOBAL_BRANCH_NAME) {
    var allPropertyNames = Object.keys(
      responseSession.data.data.companyData.branchNames
    );
    for (var j = 0; j < 1; j++) {
      var name = allPropertyNames[j];
      console.log(
        String(name),
        responseSession.data.data.companyData.branchNames[name],
        responseSession.data.data.companyData.branchToCompany[name],
        "1======12"
      );
      global.GLOBAL_BRANCH_ID = String(name);
      global.GLOBAL_BRANCH_NAME =
        responseSession.data.data.companyData.branchNames[name];
      global.GLOBAL_COMPANY_ID =
        responseSession.data.data.companyData.branchToCompany[name];
      analytics().setUserProperty(
        "customerID",
        global.GLOBAL_COMPANY_ID.toString()
      );
      global.GLOBAL_COMPANY_NAME =
        responseSession.data.data.companyData.companyNames[
          global.GLOBAL_COMPANY_ID
        ];
    }
    // }
    yield put({ type: ActionTypes.SET_HOME_GET_SESSION_DATA, data });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });

    if (response.data.successful) {
      DatabaseManager.saveUserToken(session.userData["token"]);
      analytics().logEvent("login_event");
      analytics().setUserProperty("email", session.userData["userEmail"]);
    }
    yield put({ type: ActionTypes.IS_LOGGED_IN, session });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.SET_LOGIN_LOADING, loading: false });
  }
}

async function sendTokenToServer(session) {
  const token = await messaging().getToken();
  console.log("Token====>", global.GLOBAL_BRANCH_ID.toString());

  var axios = require("axios");
  var data = JSON.stringify({
    idUser: session.userData["userId"],
    emailId: session.userData["userEmail"],
    token: token,
    idBranch: global.GLOBAL_BRANCH_ID,
    idCompany: global.GLOBAL_COMPANY_ID,
  });
  try {
    await messaging().subscribeToTopic(global.GLOBAL_BRANCH_ID.toString());
  } catch (e) {}
  const headers = {
    application: AppConfig.APP_ID,
    idBranch: global.GLOBAL_BRANCH_ID,
    idCompany: global.GLOBAL_COMPANY_ID,
    idUser: session.userData["userId"],
    token: session.userData["token"],
    "Content-Type": "application/json",
  };
  var config = {
    method: "post",
    url: AppConfig.BASEURL + API_URLS.SEND_TOKEN_URL,
    headers: headers,
    data: data,
  };
  axios(config)
    .then(function (response) {})
    .catch(function (error) {});
}

function* postGoogleUserLogin({ payload }) {
  try {
    yield put({ type: ActionTypes.SET_LOGIN_LOADING, loading: true });
    const response = yield call(() =>
      fetchData(API_URLS.LOGIN_GOOGLE_USER_URL, payload)
    );
    const { session } = response.data.data;

    const apiOption = {
      data: {
        idUser: session.userData.userId,
        token: session.userData.token,
        application: AppConfig.APP_ID,
        dataType: AppConfig.DATA_TYPE,
      },
    };
    const newPayload = {
      data: {
        idUser: session.userData.userId,
        token: session.userData.token,
      },
    };

    const responseSession = yield call(() =>
      fetchSessionData(apiOption, newPayload)
    );

    const { data } = responseSession;

    // if (!global.GLOBAL_BRANCH_NAME) {
    var allPropertyNames = Object.keys(
      responseSession.data.data.companyData.branchNames
    );
    for (var j = 0; j < 1; j++) {
      var name = allPropertyNames[j];
      console.log(
        String(name),
        responseSession.data.data.companyData.branchNames[name],
        responseSession.data.data.companyData.branchToCompany[name],
        "1======12"
      );
      global.GLOBAL_BRANCH_ID = String(name);
      global.GLOBAL_BRANCH_NAME =
        responseSession.data.data.companyData.branchNames[name];
      global.GLOBAL_COMPANY_ID =
        responseSession.data.data.companyData.branchToCompany[name];
      analytics().setUserProperty(
        "customerID",
        global.GLOBAL_COMPANY_ID.toString()
      );
      global.GLOBAL_COMPANY_NAME =
        responseSession.data.data.companyData.companyNames[
          global.GLOBAL_COMPANY_ID
        ];
    }
    // }
    yield put({ type: ActionTypes.SET_HOME_GET_SESSION_DATA, data });
    yield put({ type: ActionTypes.IS_HOME_LOADING, loading: false });

    yield put({ type: ActionTypes.IS_LOGGED_IN, session });
    yield put({ type: ActionTypes.SET_LOGIN_LOADING, loading: false });
  } catch (error) {
    yield put({ type: ActionTypes.GLOBAL_ERROR, error });
    yield put({ type: ActionTypes.SET_LOGIN_LOADING, loading: false });
  }
}

export default function* watcherSaga() {
  yield takeLatest(ActionTypes.SUBMIT_LOGIN_FORM, postUserLogin);
  yield takeLatest(ActionTypes.SUBMIT_GOOGLE_LOGIN_FORM, postGoogleUserLogin);
}
