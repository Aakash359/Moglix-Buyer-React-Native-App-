import React, { Component } from "react";
import { OrderList } from "../../Components";
import { ScreenConstants } from "./../../constants";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getOrderListData,
  getUpcomingListData,
  getSubStatusFilterAction,
  getUserFilterData,
  getCompanyGetData,
  getOrderListDelayedData,
} from "../../actions";
import { isUserFilterData, isCompanyGetData } from "../../reducers/home";
import {
  isHomeLoading,
  orderListData,
  selectedTabData,
  _subStatusFilterListData,
  bucketListData,
  upComingData,
  isCheckData,
  subStatusbucketList,
} from "../../reducers/OrderListReducer";
import DatabaseManager from "./../../Storage/storage";
import { View, BackHandler } from "react-native";
import RequestData from "../../constants/requestData";
import { isHomeData } from "../../reducers/home";
import { GlobalService } from "../../utils/GlobalService.js";
import analytics from "@react-native-firebase/analytics";
import { AppConfig } from "../../constants";

const initalState = [
  {
    label: "ALL",
    checked: true,
    id: 0,
  },
  {
    label: "Pending Clarification",
    checked: true,
    id: 1,
  },
  {
    label: "Accepted",
    checked: true,
    id: 2,
  },
  {
    label: "Material Being Procured",
    checked: true,
    id: 3,
  },
  {
    label: "QC Done - Ready to Ship",
    checked: true,
    id: 4,
  },
  {
    label: "QC in Progress",
    checked: true,
    id: 5,
  },
  {
    label: "Other",
    checked: true,
    id: 6,
  },
];

class OrderListScreen extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    hitsData: PropTypes.array,
    upcomingData: PropTypes.array,
    getActiveOrderListData: PropTypes.func,
    getActiveUpcomingListData: PropTypes.func,
    getSubStatusFilterRequest: PropTypes.func,
    getDelayData: PropTypes.func,
    selectedTabS: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    getFilterData: PropTypes.func,
    userFilterData: PropTypes.object,
    getUmAssignedData: PropTypes.func,
    umAssignedData: PropTypes.object,
    isCheck: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: false,
    hitsData: [],
    upcomingData: [],
    selectedTabS: "",
    startDate: "",
    endDate: "",
    isCheck: false,
    statusFilterApply: false,
  };

  constructor(props) {
    super(props);
    global.DateUpdate = false;
    this.state = {
      userData: {},
      selectedTab: "ALL",
      selectedUserIds: [],
      isCheck: false,
      filterIsCheck: true,
      pageCount: 0,
      modalVisible: false,
      filterListData: initalState,
    };
    this.getFilterD();
    this.getUserDetail("", 10);
    this.getUpcomingDetail("", 10);
  }

  getFilterD = async () => {
    if (global.FilterApply) {
      const arrData = await DatabaseManager.getFilterData();

      if (arrData.length > 0) {
        if (arrData == '["","","",""]') {
          global.FilterApply = "ClearApply";
        } else {
          global.FilterApply = "Apply";
        }
      } else {
        global.FilterApply = "ClearApply";
      }
    }
  };

  getUserDetail = async (selectedTabString, paginationCount) => {
    // let upcomingIds = global.idArray
    // console.log('====================================');
    // console.log("ojj===>", upcomingIds);
    // console.log('====================================');
    try {
      let userDataTemp = await DatabaseManager.getUserProfile();
      let userid = await DatabaseManager.getUserId();
      this.setState({ userData: JSON.parse(userDataTemp) }, () => {
        const params = {
          token: this.state.userData.token,
          idCompany: AppConfig.COMPANY_ID,
          idUser: this.state.userData.userId,
        };
        const { getUmAssignedData } = this.props;
        getUmAssignedData(params);
      });
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
      const data = {
        application: "1",
        idBranch: global.GLOBAL_BRANCH_ID,
        idCompany: global.GLOBAL_COMPANY_ID,
        userId: this.state.userData.userId,
        Origin: " https://buyersqa.moglix.com",
        token: this.state.userData.token,
        tabSelected: selectedTabString,
        page: paginationCount,
        startDate: global.StartTime,
        endDate: global.EndTime,
        isUserFilter: this.state.selectedUserIds.length ? "true" : "false",
        activeUserFilterData: this.state.selectedUserIds,
        params:
          global.FilterApply == "Apply"
            ? global.PO_SA_Value != ""
              ? selectedTabString == ""
                ? RequestData.getAllOrderDataWithoutFilterRequest(
                  global.GLOBAL_BRANCH_ID,
                  this.state.selectedUserIds,
                  arr,
                  this.state.isCheck,
                  userid
                )
                : RequestData.getPOAndSADataRequest()
              : selectedTabString == ""
                ? RequestData.getAllOrderDataRequest(
                  global.GLOBAL_BRANCH_ID,
                  global.StartTime,
                  global.EndTime,
                  this.state.selectedUserIds,
                  arr,
                  this.state.isCheck,
                  userid
                )
                : RequestData.getEnterTabsDataOrderDataRequest(
                  selectedTabString,
                  global.GLOBAL_BRANCH_ID,
                  global.StartTime,
                  global.EndTime,
                  this.state.isCheck,
                  userid
                )
            : selectedTabString == ""
              ? RequestData.getAllOrderDataWithoutFilterRequest(
                global.GLOBAL_BRANCH_ID,
                this.state.selectedUserIds,
                arr,
                this.state.isCheck,
                userid
              )
              : RequestData.getEnterTabsDataOrderDataWithoutFilterRequest(
                selectedTabString,
                global.GLOBAL_BRANCH_ID,
                this.state.selectedUserIds,
                arr,
                this.state.isCheck,
                userid,
                this.state.filterIsCheck,
              ),
      };
      global.USER_FILTER = this.state.selectedUserIds.length ? "true" : "false";
      const { getActiveOrderListData, getDelayData } = this.props;
      getActiveOrderListData(data);
      data["params"] =
        global.FilterApply == "Apply"
          ? global.PO_SA_Value != ""
            ? RequestData.getPOAndSADataRequest()
            : "Delayed" == ""
              ? RequestData.getAllOrderDataRequest(
                global.GLOBAL_BRANCH_ID,
                global.StartTime,
                global.EndTime,
                this.state.selectedUserIds,
                arr,
                userid
              )
              : RequestData.getEnterTabsDataOrderDataRequest(
                "Delayed",
                global.GLOBAL_BRANCH_ID,
                global.StartTime,
                global.EndTime
              )
          : "Delayed" == ""
            ? RequestData.getAllOrderDataWithoutFilterRequest(
              global.GLOBAL_BRANCH_ID,
              this.state.selectedUserIds,
              arr,
              this.state.isCheck,
              userid
            )
            : RequestData.getEnterTabsDataOrderDataWithoutFilterRequest(
              "Delayed",
              global.GLOBAL_BRANCH_ID,
              this.state.selectedUserIds,
              arr,
              this.state.isCheck,
              userid
            );
      // if (this.state.selectedTab == 'DELAYED') {
      getDelayData(data);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  getUpcomingDetail = async (selectedTabString, paginationCount) => {
    try {
      let userDataTemp = await DatabaseManager.getUserProfile();
      let userid = await DatabaseManager.getUserId();
      this.setState({ userData: JSON.parse(userDataTemp) }, () => {
        const params = {
          token: this.state.userData.token,
          idCompany: AppConfig.COMPANY_ID,
          idUser: this.state.userData.userId,
        };
        const { getUmAssignedData } = this.props;
        getUmAssignedData(params);
      });
      const data = {
        application: "1",
        idBranch: global.GLOBAL_BRANCH_ID,
        idCompany: global.GLOBAL_COMPANY_ID,
        userId: this.state.userData.userId,
        Origin: " https://buyersqa.moglix.com",
        token: this.state.userData.token,
        tabSelected: selectedTabString,
        page: paginationCount,
        startDate: global.StartTime,
        endDate: global.EndTime,
        isUserFilter: this.state.selectedUserIds.length ? "true" : "false",
        activeUserFilterData: this.state.selectedUserIds,
        params: RequestData.upComingData(this.state.isCheck, userid),
        source: "mapp",
      };
      const { getActiveUpcomingListData } = this.props;
      getActiveUpcomingListData(data);
    } catch (error) {
      console.log(error);
    }
  };

  subStatusFilterDataList = async (
    selectedTabString,
    paginationCount,
    lable
  ) => {
    const { StartTime, EndTime } = global;
    try {
      let userDataTemp = await DatabaseManager.getUserProfile();
      let userid = await DatabaseManager.getUserId();
      let userEmail = await DatabaseManager.getUserEmail();
      global.userId = userid;
      global.Email = userEmail;
      this.setState({ userData: JSON.parse(userDataTemp) }, () => {
        const params = {
          token: this.state.userData.token,
          idCompany: AppConfig.COMPANY_ID,
          idUser: this.state.userData.userId,
          userEmail,
        };
        const { getUmAssignedData } = this.props;
        getUmAssignedData(params);
      });
      const data = {
        application: "1",
        idBranch: global.GLOBAL_BRANCH_ID,
        idCompany: global.GLOBAL_COMPANY_ID,
        userId: this.state.userData.userId,
        Origin: " https://buyersqa.moglix.com",
        token: this.state.userData.token,
        tabSelected: selectedTabString,
        page: paginationCount,
        startDate: global.StartTime,
        endDate: global.EndTime,
        isUserFilter: this.state.selectedUserIds.length ? "true" : "false",
        activeUserFilterData: this.state.selectedUserIds,
        params: RequestData.subStatusFilterQuery(
          this.state.isCheck,
          userid,
          StartTime,
          EndTime,
          lable
        ),
        source: "mapp",
      };
      const { getSubStatusFilterRequest } = this.props;
      getSubStatusFilterRequest(data);
    } catch (error) {
      console.log(error);
    }
  };

  onCheckAction = () => {
    let email = global.Email;
    var _firebaseObj = {
      check_box_event: global.userId,
      email,
      idCompany: global.GLOBAL_COMPANY_ID,
    };
    if (this.state.selectedTab == "IN-PROCESS") {
      // this.getUserDetail('In-Process', 10)
      this.getUpcomingDetail("In-Process", 10);
    } else if (this.state.selectedTab == "SHIPPED") {
      // this.getUserDetail('Shipped', 10)
      this.getUpcomingDetail("Shipped", 10);
    } else if (this.state.selectedTab == "DELIVERED") {
      // this.getUserDetail('Delivered', 10)
    } else if (this.state.selectedTab == "OTHER") {
      // this.getUserDetail('Other', 10)
    } else if (
      this.state.selectedTab == "DELAYED" ||
      this.state.selectedTab == "Delayed"
    ) {
      // this.getUserDetail('Delayed', 10)
    } else {
      // this.getUserDetail('', 10)
      this.getUpcomingDetail("", 10);
    }
    GlobalService.AnalyticFunction("check_box_event", _firebaseObj);
  };

  selectedFilterData = (lable) => {
    if (this.state.selectedTab == "IN-PROCESS") {
      this.getUserDetail("In-Process", 10);
      this.subStatusFilterDataList("In-Process", 10, lable);
    }
  };

  selectedTabAction = (selectedTab, pageCount) => {
    this.setState({ selectedTab: selectedTab });
    this.setState({ pageCount: pageCount });
    if (selectedTab == "IN-PROCESS") {
      this.getUserDetail("In-Process", pageCount);
    } else if (selectedTab == "SHIPPED") {
      this.getUpcomingDetail("Shipped", pageCount),
        this.getUserDetail("Shipped", pageCount);
    } else if (selectedTab == "DELIVERED") {
      this.getUserDetail("Delivered", pageCount);
    } else if (selectedTab == "OTHER") {
      this.getUserDetail("Other", pageCount);
    } else if (selectedTab == "DELAYED" || selectedTab == "Delayed") {
      this.getUserDetail("Delayed", pageCount);
    } else {
      this.getUserDetail("", pageCount);
    }
  };
  componentDidMount() {
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
    this.setState({ selectedUserIds: arr });
    analytics().logEvent("itemList_event");
    GlobalService.AnalyticScreen("OrderListScreen");
    try {
      this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          this.backToHomeScreen();
          return true;
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  backToHomeScreen() {
    try {
      this.props.navigation.navigate(ScreenConstants.HOME_SCREEN, {
        screenName: "Active Order",
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    try {
      this.backHandler.remove();
    } catch (error) {
      console.log(error);
    }
  }
  onCheckItem = (id) => {
    let initialCopy = [...this.state.filterListData];
    let optionsLength = this.state.filterListData.length;
    let checkedOptions = [...initialCopy].filter((_) => _.checked).length;
    global.optionsLength = optionsLength;
    global.checkedOptions =
      checkedOptions == optionsLength ? checkedOptions : optionsLength;
    if (id == 0) {
      if (this.state.filterListData.find((_) => _.id == id).checked) {
        initialCopy = [...initialCopy].map((_) => ({ ..._, checked: false }));
      } else {
        initialCopy = [...initialCopy].map((_) => ({ ..._, checked: true }));
      }
    } else {
      if (checkedOptions == optionsLength) {
        initialCopy = [...initialCopy].map((_) => ({
          ..._,
          checked: _.id == id ? false : _.id == 0 ? false : _.checked,
        }));
      } else {
        if (this.state.filterListData.find((_) => _.id == id).checked) {
          initialCopy = [...initialCopy].map((_) => ({
            ..._,
            checked: _.id == id ? false : _.checked,
          }));
        } else {
          initialCopy = [...initialCopy].map((_) => ({
            ..._,
            checked: _.id == id ? true : _.checked,
          }));
        }
      }
    }
    checkedOptions = [...initialCopy].filter((_) => _.checked).length;
    if (
      checkedOptions + 1 == optionsLength &&
      !this.state.filterListData.find((_) => _.id == 0).checked
    ) {
      initialCopy = [...initialCopy].map((_) => ({ ..._, checked: true }));
    }
    this.setState({ filterListData: [...initialCopy] });
  };

  selectedUserIds = (param) => {
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
    let params;
    if (param.length == 0) {
      params =
        global.FilterApply == "Apply"
          ? global.PO_SA_Value != ""
            ? RequestData.getPOAndSADataRequest()
            : selectedTabString == ""
              ? RequestData.getAllOrderDataRequest(
                global.GLOBAL_BRANCH_ID,
                global.StartTime,
                global.EndTime,
                param,
                arr
              )
              : RequestData.getEnterTabsDataOrderDataRequest(
                selectedTabString,
                global.GLOBAL_BRANCH_ID,
                global.StartTime,
                global.EndTime,
                arr
              )
          : selectedTabString == ""
            ? RequestData.getAllOrderDataWithoutFilterRequest(
              global.GLOBAL_BRANCH_ID,
              param,
              arr
            )
            : RequestData.getEnterTabsDataOrderDataWithoutFilterRequest(
              selectedTabString,
              global.GLOBAL_BRANCH_ID,
              param,
              arr
            );
    } else {
      params = RequestData.getUserFilterRequest(
        param,
        this.props.selectedTabS,
        global.StartTime,
        global.EndTime,
        arr
      );
    }
    const data = {
      application: "1",
      idBranch: global.GLOBAL_BRANCH_ID,
      idCompany: global.GLOBAL_COMPANY_ID,
      userId: this.state.userData.userId,
      Origin: " https://buyersqa.moglix.com",
      token: this.state.userData.token,
      tabSelected: this.props.selectedTabS,
      page: 20,
      startDate: global.StartTime,
      endDate: global.EndTime,
      isUserFilter: param.length ? "true" : "false",
      params: params,
      activeUserFilterData: param,
    };
    const { getActiveOrderListData, getDelayData } = this.props;
    this.setState({ selectedUserIds: param, refresh: true }, () => {
      getActiveOrderListData(data);
      data["params"] =
        global.FilterApply == "Apply"
          ? global.PO_SA_Value != ""
            ? RequestData.getPOAndSADataRequest()
            : "Delayed" == ""
              ? RequestData.getAllOrderDataRequest(
                global.GLOBAL_BRANCH_ID,
                global.StartTime,
                global.EndTime,
                this.state.selectedUserIds,
                arr
              )
              : RequestData.getEnterTabsDataOrderDataRequest(
                "Delayed",
                global.GLOBAL_BRANCH_ID,
                global.StartTime,
                global.EndTime
              )
          : "Delayed" == ""
            ? RequestData.getAllOrderDataWithoutFilterRequest(
              global.GLOBAL_BRANCH_ID,
              this.state.selectedUserIds,
              arr
            )
            : RequestData.getEnterTabsDataOrderDataWithoutFilterRequest(
              "Delayed",
              global.GLOBAL_BRANCH_ID,
              this.state.selectedUserIds,
              arr
            );
      getDelayData(data);
    });
  };

  onSelectedFilterListAction = () => {
    let email = global.Email;
    let list = this.state.filterListData;
    const subStatusfilterData = list.filter((item) => {
      return item.checked == true;
    });
    var lable = subStatusfilterData.map((i) => i.label);
    var _firebaseObj = {
      lable,
      email,
      userID: global.userId,
      idCompany: global.GLOBAL_COMPANY_ID,
    };
    GlobalService.AnalyticFunction("subStatus_Filter", _firebaseObj);
    global.subStatusfilterLength = subStatusfilterData.length;
    this.selectedFilterData(lable);
  };

  render() {
    const {
      isLoading,
      hitsData,
      selectedTabS,
      subStatusFilterList,
      subStatusBuckets,
      userFilterData,
      upcomingData,
    } = this.props;

    // global.idArray = ((upcomingData || {}).hits || {}).map(({ _id }) => _id);
    // console.log("upcomingData===>", upcomingData, global.idArray);
    let isUserFilter = this.state.selectedUserIds.length ? true : false;
    global.isCheck = this.state.isCheck;
    global.In_Process_Filter = this.state.filterListData;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <OrderList
          refresh={this.state.refresh}
          umAssignedData={this.props.umAssignedData}
          selectedUserIds={this.selectedUserIds}
          userFilterData={userFilterData}
          navigation={this.props.navigation}
          buckets={this.props.orderBuckets}
          subStatusBuckets={subStatusBuckets}
          nav={this.props.navigation}
          onPressFilterButton={() => this.props.navigation.openDrawer()}
          onPressBackButton={() => this.backToHomeScreen()}
          searchButton={() =>
            this.props.navigation.navigate(
              ScreenConstants.SEARCH_ORDER_SCREEN,
              {
                selectedTab: this.state.selectedTab,
                isUserFilter: isUserFilter,
                isCheck: this.state.isCheck,
              }
            )
          }
          onTabButton={this.selectedTabAction}
          hitsData={hitsData}
          selectedTabString={selectedTabS}
          filterListData={this.state.filterListData}
          upcomingData={upcomingData}
          subStatusFilterList={subStatusFilterList}
          checkedValue={this.state.isCheck}
          onClearFilterList={() => {
            this.onCheckItem(0),
              setTimeout(() => {
                this.onSelectedFilterListAction();
              }, 500);
          }}
          onSelectedFilterList={() => this.onSelectedFilterListAction()}
          checkedItems={this.onCheckItem}
          checkBoxAction={() => {
            this.setState({ isCheck: !this.state.isCheck }, () => {
              this.onCheckAction();
            });
          }}
        />
        {/* {(isLoading) &&
          <View style={GlobalStyle.loaderStyle}>
            <Loader />
          </View>
        } */}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoading: isHomeLoading(state),
  hitsData: orderListData(state),
  upcomingData: upComingData(state),
  subStatusFilterList: _subStatusFilterListData(state),
  selectedTabS: selectedTabData(state),
  buckets: isHomeData(state),
  orderBuckets: bucketListData(state),
  subStatusBuckets: subStatusbucketList(state),
  userFilterData: isUserFilterData(state),
  umAssignedData: isCompanyGetData(state),
  isCheck: isCheckData(state),
});

export default connect(mapStateToProps, {
  getActiveOrderListData: getOrderListData,
  getActiveUpcomingListData: getUpcomingListData,
  getSubStatusFilterRequest: getSubStatusFilterAction,
  getFilterData: getUserFilterData,
  getUmAssignedData: getCompanyGetData,
  getDelayData: getOrderListDelayedData,
})(OrderListScreen);
