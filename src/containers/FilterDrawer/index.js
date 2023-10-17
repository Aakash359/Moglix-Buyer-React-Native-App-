import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  Picker,
  ScrollView,
} from "react-native";
import { GlobalService } from "../../utils/GlobalService";
import { StackActions } from "react-navigation";
import { styles } from "./style";
import { ICON } from "../../constants";
import PropTypes from "prop-types";
import { ScreenConstants, } from "./../../constants";
import DatabaseManager from "../../Storage/storage";
import { connect } from "react-redux";
import { getOrderListData, getUserFilterData } from "../../actions";
import {
  isHomeLoading,
  orderListData,
  selectedTabData,
  userFilterData,
  activeUserFilterArray,
} from "../../reducers/OrderListReducer";
import RequestData from "../../constants/requestData";
import { AppConfig, API_URLS } from "../../constants";
import axios from "axios";
import moment from "moment";


var userResponse = []

class FilterDrawer extends React.Component {

  static propTypes = {
    nav: PropTypes.object,
    userData: PropTypes.object,
    isLoading: PropTypes.bool,
    hitsData: PropTypes.array,
    getActiveOrderListData: PropTypes.func,
    selectedTabS: PropTypes.string,
    isUserFilter: PropTypes.string,
    userFilterArray: PropTypes.array,
    manageStateOfFilterArray: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      manageStateOfFilterArray: ["", "", "", "",],
      selectedItems: [],
      isCheck: false,
      selectedTabS: 'All',
    };

    this.getFilterD();
  }

  async componentDidMount() {
    const arrData = await DatabaseManager.getFilterData();
    this.getUsersList()
  }



  componentDidUpdate() {
    if (global.DateUpdate) {
      this.getFilterD();
      global.DateUpdate = false;
    }
  }

  getFilterD = async () => {

    if (global.FilterApply != "ClearApply" && global.FilterApply) {
      const arrData = await DatabaseManager.getFilterData();
      if (arrData != null) {
        var DATA = JSON.parse(arrData);
        this.setState({ manageStateOfFilterArray: DATA });
      }

    }

  };

  onSelectionsChange = (selectedItems) => {
    var _firebaseObj = {
      multi_check_filter_event: (selectedItems),
    }
    this.setState({ selectedItems });
    global.SelectedArrayItems = selectedItems
    global.multiValues = global.SelectedArrayItems.map(a => a.value);
    GlobalService.AnalyticFunction('multi_check_filter_event', _firebaseObj);
  };



  getUsersList = async () => {
    var userToken = await DatabaseManager.getUserProfile();
    const config = {
      "Content-Type": "application/json",
      application: AppConfig.APP_ID,
      idBranch: 11701,//global.GLOBAL_BRANCH_ID,
      idCompany: '61245',
      idUser: "278",
      Origin: AppConfig.ORIGIN,
      token: JSON.parse(userToken).token,
    };
    axios({
      method: "POST",
      url: AppConfig.BASEURL + API_URLS.USER_FILTER,
      headers: config,
      data: { "idCompany": '61245', "idUser": "278" },
    })
      .then(response => {
        if (response.data.successful) {
          for (var i = 0; i < response.data.data.userResponse.length; i++) {
            var obj = {};
            obj['label'] = response.data.data.userResponse[i].emailId;
            obj['value'] = response.data.data.userResponse[i].idUser;
            userResponse.push(obj);
          }

        }
      })

  }
  dateRangeFilter() {
    console.log("in date range", this.state.manageStateOfFilterArray[1])
    console.log("in date range", this.state.manageStateOfFilterArray[2])
    if (
      this.state.manageStateOfFilterArray[1] != "" &&
      this.state.manageStateOfFilterArray[2] != ""
    ) {
      var dateChanged = this.state.manageStateOfFilterArray[1]
        .split("-")
        .join("/");
      var start = new Date(dateChanged);
      start.setUTCHours(0, 0, 0, 0)
      var fromDateMilisecond = Date.parse(dateChanged);
      console.log(fromDateMilisecond)
      var dateChanged2 = this.state.manageStateOfFilterArray[2]
        .split("-")
        .join("/");
      console.log("end", dateChanged2)
      var toDateMilisecond = Date.parse(dateChanged2 + " 23:59:59");
      console.log("final start", fromDateMilisecond)
      console.log("final end", toDateMilisecond)
      global.StartTime = fromDateMilisecond;
      global.EndTime = toDateMilisecond;
      console.log("Start===>", fromDateMilisecond, toDateMilisecond);

      this.searchByDaysAndDateRange(
        this.props.selectedTabS,
        10,
        fromDateMilisecond,
        toDateMilisecond
      );
    } else if (this.state.manageStateOfFilterArray[1] == "") {
      Alert.alert("Please select from date");
    } else if (this.state.manageStateOfFilterArray[2] == "") {
      Alert.alert("Please select to date");
    }
    this.props.navigation.closeDrawer();
  }



  dateRangeFilterAction(dates) {
    console.log("inside action")
    if (dates[1] != "" && dates[2] != "") {
      var dateChanged = dates[1].split("-").join("/");
      var start = new Date(dateChanged);
      start.setUTCHours(0, 0, 0, 0);
      var fromDateMilisecond = Date.parse(dateChanged);
      var dateChanged = dates[2].split("-").join("/");
      var toDateMilisecond = Date.parse(dateChanged + " 23:59:59");
      global.StartTime = fromDateMilisecond;
      global.EndTime = toDateMilisecond;
      global.FilterApply = "Apply";
      this.searchByDaysAndDateRange(
        this.props.selectedTabS,
        10,
        fromDateMilisecond,
        toDateMilisecond
      );
    } else if (dates[1] == "") {
      Alert.alert("Please select from date");
    } else if (dates[2] == "") {
      Alert.alert("Please select to date");
    }
    this.props.navigation.closeDrawer();
  }

  daysFilter(startDate, endDate) {
    global.StartTime = startDate;
    global.EndTime = endDate;
    this.searchByDaysAndDateRange(
      this.props.selectedTabS,
      10,
      startDate,
      endDate
    );
    this.props.navigation.closeDrawer();
  }

  applyFilterAction() {

    global.FilterApply = "Apply";
    if (global.PO_SA_Value != "") {
      this.searchByDaysAndDateRange(this.props.selectedTabS, 10, "", "");
      this.props.navigation.closeDrawer();
      return;
    }

    if (this.state.manageStateOfFilterArray[0] != "") {
      var todayDate = new Date();
      var lastDaysOfDateMilisecond = "";
      var todayDateString = todayDate.getTime();

      switch (this.state.manageStateOfFilterArray[0]) {
        case "7 DAYS":
          var today = new Date();
          today.setHours(23, 59, 59);
          var lastDaysOfDate = new Date(
            today.setDate(new Date().getDate() - 7)
          );
          lastDaysOfDate.setHours(23, 59, 59);
          lastDaysOfDateMilisecond = lastDaysOfDate.getTime();
          this.daysFilter(lastDaysOfDateMilisecond, todayDateString);
          var _firebaseObj = {
            orderDetail_filter: this.state.manageStateOfFilterArray[0]
          }
          GlobalService.AnalyticFunction('orderDetail_filter', _firebaseObj);
          break;
        case "15 DAYS":
          var today = new Date();
          today.setHours(23, 59, 59);
          var lastDaysOfDate = new Date(
            today.setDate(new Date().getDate() - 15)
          );
          lastDaysOfDate.setHours(23, 59, 59);
          lastDaysOfDateMilisecond = lastDaysOfDate.getTime();
          this.daysFilter(lastDaysOfDateMilisecond, todayDateString);
          var _firebaseObj = {
            orderDetail_filter: this.state.manageStateOfFilterArray[0]
          }

          GlobalService.AnalyticFunction('orderDetail_filter', _firebaseObj);
          break;
        case "30 DAYS":
          var today = new Date();
          today.setHours(23, 59, 59);
          var lastDaysOfDate = new Date(
            today.setDate(new Date().getDate() - 30)
          );
          lastDaysOfDate.setHours(23, 59, 59);
          lastDaysOfDateMilisecond = lastDaysOfDate.getTime();
          this.daysFilter(lastDaysOfDateMilisecond, todayDateString);
          var _firebaseObj = {
            orderDetail_filter: this.state.manageStateOfFilterArray[0]
          }
          GlobalService.AnalyticFunction('orderDetail_filter', _firebaseObj);
          break;
        case "MultiCheck":
          break;
        default:
          this.dateRangeFilter();
          break;
      }
    }
  }

  searchByDaysAndDateRange = async (

    selectedTabString,
    paginationCount,
    starDate = "",
    endDate = ""
  ) => {
    let startDate1 = global.StartTime
    let userDataTemp = await DatabaseManager.getUserProfile();
    let userid = await DatabaseManager.getUserId()

    this.setState({ userData: JSON.parse(userDataTemp) });
    let isCheck = global.isCheck
    const data = {
      application: "1",
      idBranch: "8855",
      idCompany: "8653",
      userId: this.state.userData.userId,
      Origin: " https://buyersqa.moglix.com",
      token: this.state.userData.token,
      tabSelected: selectedTabString,
      page: paginationCount,
      startDate: starDate,
      endDate: endDate,
      isUserFilter: this.props.isUserFilter,
      activeUserFilterData: this.props.userFilterArray,
      params:
        global.FilterApply == "Apply"
          ? global.PO_SA_Value != ""
            ? RequestData.getPOAndSADataRequest()
            : selectedTabString == ""
              ? RequestData.getAllOrderDataRequest(
                global.GLOBAL_BRANCH_ID,
                global.StartTime,
                global.EndTime,
                isCheck,
                userid
              )
              : (RequestData.getEnterTabsDataOrderDataRequest(
                selectedTabString,
                global.GLOBAL_BRANCH_ID,
                global.StartTime,
                global.EndTime,
                this.props.isUserFilter,
                this.props.userFilterArray,
                isCheck,
                userid,
              )
                &&
                RequestData.upComingDataWithFilter(
                  isCheck,
                  userid,
                  global.GLOBAL_BRANCH_ID,
                  global.StartTime,
                  global.EndTime,
                  startDate1,
                )
              )
          : selectedTabString == ""
            ? RequestData.getAllOrderDataWithoutFilterRequest(
              global.GLOBAL_BRANCH_ID,
            )
            : RequestData.getEnterTabsDataOrderDataWithoutFilterRequest(
              selectedTabString,
              global.GLOBAL_BRANCH_ID,
              this.setState({ selectedItems: "" }),
            ),
    };

    const { getActiveOrderListData } = this.props;
    getActiveOrderListData(data);
  };





  selectAndDeSelectedStateOfFilter = (index, value,) => {

    const some_array = [...this.state.manageStateOfFilterArray];
    some_array[index] = value;
    if (index == 3) {

      some_array[0] = "";
      some_array[1] = "";
      some_array[2] = "";
    } else {
      some_array[3] = "";
    } if (some_array[3] == "") {
      global.PO_SA_Value = "";
    } else {
      global.PO_SA_Value = some_array[3];
    }
    this.setState({ manageStateOfFilterArray: some_array });
    DatabaseManager.saveFilterData(JSON.stringify(some_array));
  };

  render() {
    const { nav } = this.props;
    const { manageStateOfFilterArray, } = this.state;
    global.manageStateOfFilterArray = this.state.manageStateOfFilterArray
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.filterViewStyle}>
          <Text style={styles.filterTextStyle}>Filters</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.closeDrawer();
            }}
          >
            <Image
              source={ICON.IC_CLOSE_LOGO}
              style={styles.crosImageStyle}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.toogleViewStyle}>
          <Text style={styles.subTitle}>Placed In</Text>
        </View>
        <View style={styles.placedInViewRowStyle}>
          <TouchableOpacity
            onPress={() => {
              this.selectAndDeSelectedStateOfFilter(0, "7 DAYS");

            }}
          >
            <View
              style={
                this.state.manageStateOfFilterArray[0] != "7 DAYS"
                  ? styles.placedInButtonViewStyle
                  : styles.placedInButtonSelectedViewStyle
              }
            >
              <Text
                style={
                  this.state.manageStateOfFilterArray[0] != "7 DAYS"
                    ? styles.placedInButtonTextStyle
                    : styles.placedInButtonTextSelectedStyle
                }
              >
                7 DAYS
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.selectAndDeSelectedStateOfFilter(0, "15 DAYS");
            }}
          >
            <View
              style={
                this.state.manageStateOfFilterArray[0] != "15 DAYS"
                  ? styles.placedInButtonViewStyle
                  : styles.placedInButtonSelectedViewStyle
              }
            >
              <Text
                style={
                  this.state.manageStateOfFilterArray[0] != "15 DAYS"
                    ? styles.placedInButtonTextStyle
                    : styles.placedInButtonTextSelectedStyle
                }
              >
                15 DAYS
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.selectAndDeSelectedStateOfFilter(0, "30 DAYS");
            }}
          >
            <View
              style={
                this.state.manageStateOfFilterArray[0] != "30 DAYS"
                  ? styles.placedInButtonViewStyle
                  : styles.placedInButtonSelectedViewStyle
              }
            >
              <Text
                style={
                  this.state.manageStateOfFilterArray[0] != "30 DAYS"
                    ? styles.placedInButtonTextStyle
                    : styles.placedInButtonTextSelectedStyle
                }
              >
                30 DAYS
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.selectDataTitle}>Select Date</Text>
        <View style={styles.placedInViewRowStyle}>
          <View style={styles.selectFromDataView}>
            <Text style={styles.subTitle2}>From</Text>
            <TouchableOpacity
              onPress={() => {
                this.selectAndDeSelectedStateOfFilter(0, "Select from Date");
                this.props.navigation.dispatch(
                  StackActions.push({
                    routeName: ScreenConstants.CALENDAR_SCREEN,
                    params: {
                      commingFromOrTo: "from",
                      applyFilterAction: (dates) =>
                        this.dateRangeFilterAction(dates),
                    },
                  })
                );
              }}
            >
              <Text style={styles.selectFromAndToDataTitle}>
                {manageStateOfFilterArray[1] == ""
                  ? "Select Date"
                  : manageStateOfFilterArray[1]}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.selectToDataView}>
            <Text style={styles.subTitle2}>To</Text>
            <TouchableOpacity
              onPress={() => {
                this.selectAndDeSelectedStateOfFilter(0, "Select to Date");
                this.props.navigation.dispatch(
                  StackActions.push({
                    routeName: ScreenConstants.CALENDAR_SCREEN,
                    params: {
                      commingFromOrTo: "to",
                      applyFilterAction: (dates) =>
                        this.dateRangeFilterAction(dates),
                    },
                  })
                );
              }}
            >
              <Text style={styles.selectFromAndToDataTitle}>
                {manageStateOfFilterArray[2] == ""
                  ? "Select Date"
                  : manageStateOfFilterArray[2]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            this.state.manageStateOfFilterArray[0] == "" &&
              this.state.manageStateOfFilterArray[1] == "" &&
              this.state.manageStateOfFilterArray[2] == "" &&
              this.state.manageStateOfFilterArray[3] == "" &&
              this.state.selectedItems == ""
              ? styles.cancelAndApplyFilterViewWithOpacity
              : styles.cancelAndApplyFilterView,
          ]}
        >
          <View style={styles.cancelAndApplyButtonView}>
            <TouchableOpacity
              onPress={() => {
                global.StartTime = "";
                global.EndTime = "";
                global.FilterApply = "ClearApply";
                this.setState({ manageStateOfFilterArray: ["", "", "", ""] });
                DatabaseManager.saveFilterData(
                  JSON.stringify(["", "", "", ""])
                );
                this.searchByDaysAndDateRange(
                  this.props.selectedTabS,
                  10,
                  "",
                  ""
                );
                this.props.navigation.closeDrawer();
              }}
            >
              <View style={styles.cancelButtonView}>
                <Text style={styles.cancelButtonTextStyle}>CLEAR ALL</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.spaceView}></View>
            <TouchableOpacity onPress={() => this.applyFilterAction()}>
              <View style={styles.applyButtonView}>
                <Text style={styles.applyButtonTextStyle}>APPLY FILTER</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>



    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: isHomeLoading(state),
  hitsData: orderListData(state),
  selectedTabS: selectedTabData(state),
  isUserFilter: userFilterData(state),
  userFilterArray: activeUserFilterArray(state),
});

export default connect(mapStateToProps, {
  getActiveOrderListData: getOrderListData,
  getFilterData: getUserFilterData,
})(FilterDrawer);
