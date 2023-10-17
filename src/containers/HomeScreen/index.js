import React, { Component } from "react";
import { ScreenConstants } from "./../../constants";
import { Home } from "../../Components";
import DatabaseManager from "./../../Storage/storage";
import {
  getDashboardData,
  getSessionDashBoardData,
  getOverallSummaryData,
  getLastSixMonthSpentData,
  getSpendByCategoryData,
  getSpendByAllCategoryData,
  getOtifViewData,
  getTopItemData,
  getTopPlantData,
  getUserFilterData,
  getItemCountData,
  getOrderListData,
} from "../../actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GlobalStyle from "./../../style";
import { Loader } from "../../Components/Commons";
import {
  isHomeLoading,
  isHomeData,
  isSessionData,
  isBranchID,
  isCompanyID,
  isCompanyName,
  isBranchName,
  isSummaryData,
  isSixMonthData,
  isSpendByCategory,
  isSpendByAllCategory,
  isOtifData,
  isTopItemData,
  isTopPlantData,
  isUserFilterData,
  isItemCountData,
} from "../../reducers/home";
import { orderListData } from "../../reducers/OrderListReducer";
import {
  View,
  Linking,
  AppState,
  PermissionsAndroid,
  Alert,
  Platform,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalService } from "../../utils/GlobalService.js";
import analytics from "@react-native-firebase/analytics";
import messaging from "@react-native-firebase/messaging";
import ReactNativeBlobUtil from "react-native-blob-util";
import { AppConfig, API_URLS } from "../../constants";
import notifee, { AndroidGroupAlertBehavior } from "@notifee/react-native";
import axios from "axios";

class HomeScreen extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    branchId: PropTypes.string,
    companyId: PropTypes.string,
    getOrderData: PropTypes.func,
    buckets: PropTypes.array,
    sessionData: PropTypes.object,
    getSessionData: PropTypes.func,
    getSummaryData: PropTypes.func,
    summaryData: PropTypes.object,
    getSixMonthData: PropTypes.func,
    sixMonthData: PropTypes.object,
    getSpendCategoryData: PropTypes.func,
    spendByCategoryData: PropTypes.object,
    getSpendAllCategoryData: PropTypes.func,
    spendByAllCategoryData: PropTypes.array,
    getOtifData: PropTypes.func,
    otifData: PropTypes.object,
    getItemData: PropTypes.func,
    topItemData: PropTypes.object,
    getPlantData: PropTypes.func,
    topPlantData: PropTypes.object,
    getFilterData: PropTypes.func,
    userFilterData: PropTypes.object,
    getCountOfItemData: PropTypes.func,
    itemCountData: PropTypes.array,
    getActiveOrderListData: PropTypes.func,
    hitsData: PropTypes.array,
  };

  static defaultProps = {
    isLoading: false,
    buckets: [],
    hitsData: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      appload: false,
      userData: {},
      update: false,
      appState: AppState.currentState,
      fromTime: "",
      toTime: "",
      weekDataFlag: false,
      periodicFlag: true,
      userFilter: [],
    };
    this.homeRef = React.createRef();
    this.getUserDetail();
  }

  getLoggedInUserId = async () => {
    const userToken = await DatabaseManager.getUserId();
    const userEmail = await DatabaseManager.getEmailId();
    if (global.GLOBAL_COMPANY_ID) {
      analytics().setUserProperty(
        "customerID",
        global.GLOBAL_COMPANY_ID.toString()
      );
      GlobalService.AnalyticScreen("HomePageScreen");
    }
    this.props.navigation.navigate(
      userToken != "none" ? "Application" : "Auth"
    );
  };

  async logCampaing(companyId, branchId, poID, status) {
    console.log("status==" + status);
    console.log("startlogCampaing");
    const userEmail = await DatabaseManager.getEmailId();
    console.log("startlogCampaing1");
    var date = new Date();
    var time = date.toString();
    console.log("startlogCampaing2");
    var data =
      "_" +
      status +
      "_" +
      companyId.toString() +
      "_" +
      branchId.toString() +
      "_" +
      userEmail.toString() +
      "_" +
      poID.toString() +
      "_" +
      time;
    analytics().logEvent("push_event", {
      companyId: companyId,
      branchId: branchId,
      email: userEmail,
      time: time,
      po_id: poID,
      status: status,
    });
    analytics().logCampaignDetails({
      source:
        "_" +
        status +
        "_" +
        companyId.toString() +
        "_" +
        branchId.toString() +
        "_" +
        userEmail.toString() +
        "_" +
        poID.toString() +
        "_" +
        time,
      medium: "notification_tapped",
      campaign: "push_notification",
    });
  }
  // Code commented to stop exit app from search screen
  // backAction = () => {
  //   if (this.homeRef.current) {
  //     this.homeRef.current.backAction();
  //   }
  //   return true;
  // };

  componentDidUpdate(prevProps, prevState) {
    global.activeOrders = 0;
    if (prevProps.userFilterData != this.props.userFilterData) {
      const filterData =
        this.props.userFilterData &&
          this.props.userFilterData.data &&
          this.props.userFilterData.data.userResponse
          ? this.props.userFilterData.data.userResponse
          : [];
      let arr = [];
      filterData.map((item) => {
        arr.push(item.idUser);
      });

      this.setState({ userFilter: arr });
      const params = {
        userId: this.state.userData.userId,
        token: this.state.userData.token,
        userFilter: arr,
      };
      const { getOrderData } = this.props;
      getOrderData(params);
    }
  }

  async componentDidMount() {
    global.activeOrders = 0;
    this.props.navigation.addListener("willFocus", () => {
      if (global.DateUpdate) {
        this.getFilterD();
        global.DateUpdate = false;
      }
    });
    analytics().logEvent("dashboard_event");
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      setTimeout(() => {
        global.GLOBAL_COMPANY_ID = remoteMessage.data.Company_Id;
        global.GLOBAL_BRANCH_ID = String(remoteMessage.data.BRANCH_Id);

        this.logCampaing(
          remoteMessage.data.Company_Id,
          remoteMessage.data.BRANCH_Id,
          remoteMessage.data.PO_Id,
          remoteMessage.data.Item_Id
        );
        if (this.props) {
          this.props.navigation.navigate(ScreenConstants.SEARCH_ORDER_SCREEN, {
            fromLinking: remoteMessage.data.Item_Id,
          });
        }
      }, 1000);
    });

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          const lastInitialNotificationId = await AsyncStorage.getItem(
            "last_notif_id"
          );
          if (Object.keys(remoteMessage.data).length !== 0) {
            const lastNotification = await AsyncStorage.getItem(
              "lastNotification"
            );
            if (lastNotification != remoteMessage.messageId) {
              await AsyncStorage.setItem(
                "lastNotification",
                remoteMessage.messageId
              );
              setTimeout(() => {
                global.GLOBAL_COMPANY_ID = remoteMessage.data.Company_Id;
                global.GLOBAL_BRANCH_ID = String(remoteMessage.data.BRANCH_Id);
                this.logCampaing(
                  remoteMessage.data.Company_Id,
                  remoteMessage.data.BRANCH_Id,
                  remoteMessage.data.PO_Id,
                  remoteMessage.data.status,
                  remoteMessage.data.Item_Id
                );
                if (this.props) {
                  this.props.navigation.navigate(
                    ScreenConstants.SEARCH_ORDER_SCREEN,
                    { fromLinking: remoteMessage.data.Item_Id }
                  );
                }
              }, 1000);
            }
          }
        }
      });

    var date = new Date();
    var time = date.toString();
    await this.getLoggedInUserId();
    setTimeout(() => {
      const params3 = {
        token: this.state.userData.token,
        idCompany: global.GLOBAL_COMPANY_ID,
        idUser: this.state.userData.userId,
      };
      this.props.getFilterData(params3);
      const params = {
        userId: this.state.userData.userId,
        token: this.state.userData.token,
        userFilter: this.state.userFilter,
      };
      const { getOrderData } = this.props;
      getOrderData(params);
      const params2 = {
        userId: this.state.userData.userId,
        token: this.state.userData.token,
        fromTime: this.formatDate("fromTime"),
        toTime: this.formatDate("toTime"),
      };
      this.refreshData("Last 30 Days");
    }, 1000);

    var dummyDeepLinkedUrl;
    if (!this.props.navigation.getParam("screenName")) {
      Linking.getInitialURL()
        .then((url) => {
          if (url && url != dummyDeepLinkedUrl) {
            this.setState({ appload: true });
            this._handleOpenURL(url);
            dummyDeepLinkedUrl = url;
          }
        })
        .catch((err) => {
          console.warn("An error occurred", err);
        });
    }
    AppState.addEventListener("change", this._handleAppStateChange);
    Linking.addEventListener("url", this._handleOpenURL.bind(this));
    if (global.GLOBAL_COMPANY_ID) {
      setTimeout(() => {
        this.getLoggedInUserId();
      }, 5000);
    }
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState == "active") {
      Linking.addEventListener("url", this._handleOpenURL);
      this.setState({ appload: this.props.navigation });
    }
    this.setState({ appState: nextAppState });
  };

  componentWillUnmount() {
    Linking.removeEventListener("url", this._handleOpenURL);
  }

  _handleOpenURL(event) {
    if (
      !event.url ||
      event.url ==
      "https://buyersqanew.moglix.com/#/pages/orders/po/items-list?page=1"
    ) {
      this.props.navigation.navigate(ScreenConstants.ORDER_LIST_SCREEN);
      return false;
    }
    var url = event;
    if (event.url) {
      url = event.url;
    }
    var id = url.split("/")[5];
    var companyId = url.split("/")[6];
    var plantId = url.split("/")[7];
    setTimeout(() => {
      global.GLOBAL_COMPANY_ID = companyId;
      global.GLOBAL_BRANCH_ID = String(plantId);

      if (this.props) {
        this.props.navigation.navigate(ScreenConstants.SEARCH_ORDER_SCREEN, {
          fromLinking: id,
        });
      }
    }, 1000);
  }

  getUserDetail = async () => {
    try {
      let userDataTemp = await DatabaseManager.getUserProfile();
      this.setState({ userData: JSON.parse(userDataTemp) });
      // const data = {
      //   userId: this.state.userData.userId,
      //   token: this.state.userData.token,
      // };
      // if (this.props.navigation.state.params != null) {
      //   if (
      //     this.props.navigation.state.params.screenName != null &&
      //     this.props.navigation.state.params.screenName == "Active Order"
      //   ) {
      //   } else {
      //     global.flag = true;
      //     this.callSessionAPI(data);
      //   }
      // } else {
      //   global.flag = true;
      //   this.callSessionAPI(data);
      // }
    } catch (error) {
      console.log("Home Screen", error);
    }
  };

  callSessionAPI(data) {
    try {
      (async () => {
        const { getSessionData } = this.props;
        await getSessionData(data);
      })();
    } catch (error) {
      console.log("Home Screen", error);
    }
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (global.GLOBAL_COMPANY_ID) {
    }
    try {
      const { branchId, companyId, branchName, companyName } = nextProps;
      if (global.flag && branchId != "") {
        const data = {
          userId: nextState.userData.userId,
          token: nextState.userData.token,
        };
        const { getOrderData } = nextProps;
        getOrderData(data);
        if (branchId != "") {
          global.flag = false;
        }
      }
    } catch (error) {
      console.log("Home Screen", error);
    }
  }

  onSubmitAction = async (data) => {
    var _firebaseObj = {
      view_search_results: data,
    };

    try {
      global.GLOBAL_COMPANY_ID = data.companyId;
      global.GLOBAL_BRANCH_ID = String(data.branchId);
      global.GLOBAL_COMPANY_NAME = data.companyName;
      global.GLOBAL_BRANCH_NAME = data.branchName;

      await AsyncStorage.setItem("@selectedbranchData", JSON.stringify(data));
      try {
        await messaging().subscribeToTopic(global.GLOBAL_BRANCH_ID.toString());
      } catch (e) {
        console.log(e);
      }

      const params = {
        userId: this.state.userData.userId,
        token: this.state.userData.token,
      };
      const { getOrderData } = this.props;
      getOrderData(params);
    } catch (error) {
      console.log("Home Screen", error);
      const params = {
        userId: this.state.userData.userId,
        token: this.state.userData.token,
      };
      const { getOrderData } = this.props;
      getOrderData(params);
    }
    analytics().setUserProperty(
      "customerID",
      global.GLOBAL_COMPANY_ID.toString()
    );
    GlobalService.AnalyticScreen("HomePageScreen");
    GlobalService.AnalyticFunction("submit_filter", _firebaseObj);
    this.getLoggedInUserId();
  };

  onPressMenuButtonAction() {
    global.profileUpdate = true;
    this.props.navigation.openDrawer();
  }

  onPressDownArrowButtonAction() {
    if (global.GLOBAL_BRANCH_ID) {
      var _firebaseObj = {
        view_search_results: global.GLOBAL_BRANCH_ID,
      };
      GlobalService.AnalyticFunction("track_item", _firebaseObj);
      this.props.navigation.navigate(ScreenConstants.ORDER_LIST_SCREEN);
    }
  }

  getAllDashboardData(params) {
    let stopApi = global.stopApi;
    if (stopApi) {
      const {
        getSummaryData,
        getSixMonthData,
        getSpendCategoryData,
        getSpendAllCategoryData,
        getOtifData,
        getItemData,
        getPlantData,
        getFilterData,
        getCountOfItemData,
      } = this.props;
      getSummaryData(params);
      getSixMonthData(params);
      getSpendCategoryData(params);
      getSpendAllCategoryData(params);
      getItemData(params);
      getPlantData(params);
      getCountOfItemData(params);

      const params2 = {
        userId: this.state.userData.userId,
        token: this.state.userData.token,
      };
      params2["fromTime"] = this.state.fromTime;
      params2["toTime"] = this.state.toTime;
      params2["weekDataFlag"] = this.state.weekDataFlag;
      params2["periodicFlag"] = this.state.periodicFlag;
      params2["monthDataFlag"] = !this.state.weekDataFlag;
      params2["performanceFlag"] = !this.state.periodicFlag;
      getOtifData(params2);
    }
  }

  formatDate(time, param) {
    if (param == "currentMonth") {
      var d = new Date(),
        month = "" + time == "toTime" ? d.getMonth() + 1 : d.getMonth(),
        day = 1;
      year = d.getFullYear();
    } else if (param == "lastMonth") {
      var date = new Date();
      date = new Date(date.setMonth(date.getMonth() - 1));
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      (month = date.getMonth() + 1),
        (day = time == "fromTime" ? lastDay.getDate() : firstDay.getDate());
      year = date.getFullYear();
    } else if (!isNaN(param)) {
      let today = new Date();
      let d = new Date();
      d.setDate(today.getDate() - param);
      (month = d.getMonth() + 1), (day = d.getDate()), (year = d.getFullYear());
    } else {
      var d = new Date(),
        month = "" + time == "toTime" ? d.getMonth() + 1 : d.getMonth(),
        day = !param ? d.getDate() : d.getDate() - param;
      year = d.getFullYear();
    }

    month = String(month);
    day = String(day);

    if (month.length < 2) month = "0" + String(month);
    if (day.length < 2) day = "0" + String(day);

    return [year, month, day].join("-");
  }

  getFilterD = async () => {
    const arrData = await DatabaseManager.getDashbaordFilterData();
    if (arrData != null && arrData !== JSON.stringify("0")) {
      DATA = JSON.parse(arrData);
      const params = {
        userId: this.state.userData.userId,
        token: this.state.userData.token,
        fromTime: DATA[1],
        toTime: DATA[2],
      };
      if (DATA[1] !== "" && DATA[2] !== "") {
        this.setState({ fromTime: DATA[1], toTime: DATA[2] }, () => {
          this.getAllDashboardData(params);
        });
      }
    }
  };

  refreshData = async (value) => {
    // let selectedbranchData = await AsyncStorage.getItem("@selectedbranchData");
    // console.log("dewrwerewrwer", selectedbranchData);

    // if (selectedbranchData) {
    //   selectedbranchData = JSON.parse(selectedbranchData);
    //   global.GLOBAL_COMPANY_ID = selectedbranchData.companyId;
    //   global.GLOBAL_BRANCH_ID = String(selectedbranchData.branchId);
    //   global.GLOBAL_COMPANY_NAME = selectedbranchData.companyName;
    //   global.GLOBAL_BRANCH_NAME = selectedbranchData.branchName;
    try {
      await messaging().subscribeToTopic(String(global.GLOBAL_BRANCH_ID));
    } catch (e) { }
    // }
    try {
      await messaging().subscribeToTopic(global.GLOBAL_BRANCH_ID);
    } catch (e) { }

    const { getOtifData } = this.props;
    let params2 = {
      userId: this.state.userData.userId,
      token: this.state.userData.token,
      fromTime: this.formatDate("toTime"),
      toTime: this.formatDate("toTime"),
    };

    if (value == "Custom Range") {
      await DatabaseManager.saveDashbaordFilterData(JSON.stringify("0"));
      this.props.navigation.navigate(ScreenConstants.CALENDAR_SCREEN, {
        commingFromOrTo: "dashbaord",
        applyFilterAction: (paramsData) => {
          params2["fromTime"] = paramsData[1];
          params2["toTime"] = paramsData[2];
          this.setState({
            fromTime: paramsData[1],
            fromTime: paramsData[2],
          });
          this.getAllDashboardData(params2);
        },
      });

      return true;
    } else if (value == "Today") {
      this.setState({ fromTime: this.formatDate("toTime") });
    } else if (value == "Yesterday") {
      params2["fromTime"] = this.formatDate("toTime", 1);
      params2["toTime"] = this.formatDate("toTime", 1);
      this.setState({
        fromTime: this.formatDate("toTime", 1),
        fromTime: this.formatDate("fromTime", 1),
      });
    } else if (value == "Last 7 Days") {
      params2["fromTime"] = this.formatDate("toTime", 6);
      this.setState({ fromTime: this.formatDate("toTime", 6) });
    } else if (value == "Last 30 Days") {
      params2["fromTime"] = this.formatDate("toTime", 30);
      this.setState({
        fromTime: this.formatDate("toTime", 30),
        toTime: this.formatDate("toTime"),
      });
    } else if (value == "This Month") {
      params2["fromTime"] = this.formatDate("toTime", "currentMonth");
      this.setState({ fromTime: this.formatDate("toTime", "currentMonth") });
    } else if (value == "Last Month") {
      params2["fromTime"] = this.formatDate("toTime", "lastMonth");
      params2["toTime"] = this.formatDate("fromTime", "lastMonth");
      this.setState({
        fromTime: this.formatDate("toTime", "lastMonth"),
        toTime: this.formatDate("fromTime", "lastMonth"),
      });
    } else if (value && (typeof value !== "number", "periodicFlag" in value)) {
      this.setState({
        periodicFlag: value.periodicFlag,
        weekDataFlag: value.weekDataFlag,
      });
      params2["fromTime"] = this.state.fromTime;
      params2["toTime"] = this.state.toTime;
      params2["weekDataFlag"] = value.weekDataFlag;
      params2["periodicFlag"] = value.periodicFlag;
      params2["monthDataFlag"] = !value.weekDataFlag;
      params2["performanceFlag"] = !value.periodicFlag;
      getOtifData(params2);
      return false;
    }
    this.getAllDashboardData(params2);
  };

  actualDownload = (url) => {
    //commenting rn fetch blob
    var ext = url.substr(url.lastIndexOf(".") + 1);
    const { dirs } = ReactNativeBlobUtil.fs;
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: ext,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        path: `${dirs.DownloadDir}/report.${ext}`,
      },
    })
      .fetch("GET", url, {})
      .then((res) => {
        console.log(res);
        if (Platform.OS === "ios") {
          ReactNativeBlobUtil.ios.openDocument(res.data);
        }
      });
  };

  downloadFile = async (url) => {
    if (Platform.OS == "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.actualDownload(url);
        } else {
          Alert.alert(
            "Permission Denied!",
            "You need to give storage permission to download the file"
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      this.actualDownload(url);
    }
  };

  getExcelData(value) {
    let url;
    let data = null;
    let method = "GET";
    let startDate = new Date(this.state.fromTime).getTime();
    let endDate = new Date(this.state.toTime).getTime();
    if (value == "otif") {
      //Item otif
      data = {
        createdBy: [],
      };
      method = "POST";
      url = API_URLS.DOWNLOAD_OTIF;
    } else if (value == "lastSixMonth") {
      //Item lastSixMonth Spend
      data = {
        createdBy: [],
      };
      method = "POST";
      url = API_URLS.DOWNLOAD_LAST_SIX_MONTH;
    } else if (value == "itemSheet") {
      //Item Count
      method = "POST";
      url = API_URLS.DOWNLOAD_ITEM_SHEET;
      data = {
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
                status: [
                  "PR Created",
                  "Revised",
                  "Cancelled",
                  "Closed",
                  "Returned",
                ],
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
    } else if (value == "spendByCategory") {
      url = API_URLS.DOWNLOAD_SPEND_BY_CATEGORY;
      method = "POST";
      data = {
        createdBy: [],
        fromDate: this.state.fromTime,
        toDate: this.state.toTime,
      };
    } else if (value == "topPlants") {
      url = API_URLS.DOWNLOAD_TOP_PLANTS;
      method = "POST";
      data = {
        createdBy: [],
        fromDate: this.state.fromTime,
        toDate: this.state.toTime,
      };
    }

    const config = {
      "Content-Type": "application/json",
      application: AppConfig.APP_ID,
      idBranch: global.GLOBAL_BRANCH_ID,
      idCompany: global.GLOBAL_COMPANY_ID,
      idUser: this.state.userData.userId,
      Origin: AppConfig.ORIGIN,
      token: this.state.userData.token,
    };
    axios({
      method: method,
      url: AppConfig.BASEURL_QA + url,
      headers: config,
      data: data,
    })
      .then((res) => {
        this.downloadFile(res.data.data.url);
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  }

  render() {
    const {
      isLoading,
      buckets,
      itemCountData,
      sessionData,
      spendByCategoryData,
      summaryData,
      topItemData,
      topPlantData,
      sixMonthData,
      otifData,
    } = this.props;
    let defaultBranchName = global.GLOBAL_BRANCH_NAME;
    let CompanyName = global.GLOBAL_COMPANY_NAME;
    let defaultBranchId = global.GLOBAL_BRANCH_ID;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Home
          fromTime={this.state.fromTime}
          toTime={this.state.toTime}
          ref={this.homeRef}
          itemCountData={itemCountData}
          sessionData={sessionData}
          getExcelData={(value) => this.getExcelData(value)}
          refreshData={this.refreshData}
          spendByCategoryData={spendByCategoryData}
          summaryData={summaryData}
          topItemData={topItemData}
          topPlantData={topPlantData}
          sixMonthData={sixMonthData}
          otifData={otifData}
          spendByAllCategoryData={this.props.spendByAllCategoryData}
          onPressMenuButton={() => this.onPressMenuButtonAction()}
          onPressSearchButton={() =>
            this.props.navigation.navigate(
              ScreenConstants.SEARCH_ORDER_SCREEN,
              { selectedTab: "ALL" }
            )
          }
          onPressActiveOrderButton={() => this.onPressDownArrowButtonAction()}
          userName={this.state.userData.userName}
          buckets={buckets}
          companyName={CompanyName}
          branchName={defaultBranchName}
          branchId={defaultBranchId}
          onSubmitAction={this.onSubmitAction}
          navigation={this.props.navigation}
        />
        {isLoading ? (
          <View style={GlobalStyle.loaderStyle}>
            <Loader />
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: isHomeLoading(state),
  buckets: isHomeData(state),
  sessionData: isSessionData(state),
  branchId: isBranchID(state),
  companyId: isCompanyID(state),
  companyName: isCompanyName(state),
  branchName: isBranchName(state),
  summaryData: isSummaryData(state),
  sixMonthData: isSixMonthData(state),
  spendByCategoryData: isSpendByCategory(state),
  otifData: isOtifData(state),
  topItemData: isTopItemData(state),
  spendByAllCategoryData: isSpendByAllCategory(state),
  topPlantData: isTopPlantData(state),
  userFilterData: isUserFilterData(state),
  itemCountData: isItemCountData(state),
  hitsData: orderListData(state),
});

export default connect(mapStateToProps, {
  getOrderData: getDashboardData,
  getSessionData: getSessionDashBoardData,
  getSummaryData: getOverallSummaryData,
  getSixMonthData: getLastSixMonthSpentData,
  getSpendCategoryData: getSpendByCategoryData,
  getSpendAllCategoryData: getSpendByAllCategoryData,
  getOtifData: getOtifViewData,
  getItemData: getTopItemData,
  getPlantData: getTopPlantData,
  getFilterData: getUserFilterData,
  getCountOfItemData: getItemCountData,
  getActiveOrderListData: getOrderListData,
})(HomeScreen);
