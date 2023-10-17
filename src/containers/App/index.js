import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthenticationRoutes from "../../routes/AuthenticationRoutes";
import AppStackRoutes from "../../routes/AppStackRoutes";
import ActiveOrderRoutes from "../../routes/ActiveOrderRoutes";
import {
  getLoggedInUserData,
  isUserLoggedIn,
  getUserStatus,
} from "../../reducers/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_KEYS, AppConfig, API_URLS } from "./../../constants";
import SplashScreen from "react-native-splash-screen";
import { View, Image } from "native-base";
import messaging from "@react-native-firebase/messaging";
import NewVersion from "../../Components/NewVersion/index";
import analytics from "@react-native-firebase/analytics";
import { AppState } from "react-native";
import DatabaseManager from "../../Storage/storage";
import { postAPICallWithHeader } from "../../utils/commonService";

class App extends Component {
  static propTypes = {
    getUserData: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    userData: PropTypes.object,
    userStatus: PropTypes.string,
  };

  static defaultProps = {
    getUserData: () => {},
    isLoggedIn: false,
    userData: {},
    userStatus: null,
  };
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
      if (global.GLOBAL_COMPANY_ID) {
        analytics().setUserProperty(
          "customerID",
          global.GLOBAL_COMPANY_ID.toString()
        );
      }
    }
  };
  async componentWillUnmount() {
    global.StartTime = "";
    global.EndTime = "";
    global.FilterApply = "ClearApply";
    await DatabaseManager.saveFilterData(JSON.stringify(["", "", "", ""]));
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  componentDidMount() {
    try {
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Message handled in the background!", remoteMessage);
      });
      var date = new Date();
      var time = date.toString();
      analytics().logEvent("land_app");
      AppState.addEventListener("change", this._handleAppStateChange);
    } catch (e) {
      var date = new Date();
      var time = date.toString();
      analytics().logEvent("land_app");
      AppState.addEventListener("change", this._handleAppStateChange);
    }
  }

  constructor(props) {
    super(props);
    SplashScreen.hide();
    this.state = {
      initialRouteName: "",
      userToken: "",
      appState: AppState.currentState,
    };

    this.getToken();
    this.requestUserPermission();
  }

  async requestUserPermission() {
    const oldToken = await messaging().getToken();

    await messaging().deleteToken();
    const newToken = await messaging().getToken();
    console.log(newToken);
    if (oldToken === newToken) {
      console.error("Token has not been refreshed");
    } else {
      // const token = await messaging().getToken();
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log("Authorization status:", authStatus);
      }
    }
  }

  getToken = async () => {
    let userToken = await AsyncStorage.getItem(ASYNC_KEYS.USER_ID);
    let userId = await AsyncStorage.getItem(ASYNC_KEYS.TOKEN);

    const otp = await DatabaseManager.getOTPVerified(ASYNC_KEYS.OTP);
    if (userToken == null) {
    } else if (userToken == "none") {
    } else if (userToken == "") {
    } else {
    }

    console.log(userId, userToken);
    if (userToken) {
      try {
        const apiOptions = {
          data: {
            idUser: userToken,
            token: userId,
            application: AppConfig.APP_ID,
            dataType: AppConfig.DATA_TYPE,
          },
        };
        const newPayload = {
          data: {
            idUser: userToken,
            token: userId,
          },
        };
        const responseSession = await postAPICallWithHeader(
          API_URLS.GET_SESSION_URL,
          apiOptions,
          newPayload
        );
        console.log(responseSession);
        const { data } = responseSession;
        // if (!global.GLOBAL_BRANCH_NAME) {
        var allPropertyNames = Object.keys(
          responseSession.data.data.companyData.branchNames
        );
        for (var j = 0; j < 1; j++) {
          var name = allPropertyNames[j];
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
        console.log(
          global.GLOBAL_BRANCH_ID,
          global.GLOBAL_BRANCH_NAME,
          global.GLOBAL_COMPANY_ID,
          global.GLOBAL_COMPANY_NAME
        );
      } catch (e) {
        console.log(e);
        userToken = null;
      }
    }

    const initRouteName =
      userToken !== null ? "AppStackRoutes" : "AuthenticationRoutes";
    this.setState({ initialRouteName: initRouteName });
  };

  render() {
    const { initialRouteName } = this.state;
    if (initialRouteName != "") {
      const MoglixRoutes = createAppContainer(
        createSwitchNavigator(
          {
            AuthenticationRoutes,
            AppStackRoutes,
            ActiveOrderRoutes,
          },
          {
            initialRouteName,
            navigationOptions: {
              backBehavior: "initialRoute",
            },
          }
        )
      );
      return (
        <>
          <NewVersion></NewVersion>
          <MoglixRoutes />
        </>
      );
    } else {
      return <View style={{ flex: 1 }}></View>;
    }
  }
}

const mapStateToProps = (state) => {
  const userStatus = getUserStatus(state);
  const userData = getLoggedInUserData(state);

  const isLoggedIn = isUserLoggedIn(state);
  return {
    userData,
    isLoggedIn,
    userStatus,
  };
};

export default connect(mapStateToProps)(App);
