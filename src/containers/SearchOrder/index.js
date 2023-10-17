import React, { Component } from "react";
import { SearchOrder } from "../../Components";
import DatabaseManager from "./../../Storage/storage";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GlobalStyle from "./../../style";
import { Loader } from "../../Components/Commons";
import {
  isSearchedOrderLoading,
  isSearchedOrderData,
} from "../../reducers/SearchOrder";
import { getSearchedData } from "../../actions";
import { isUserFilterData } from "../../reducers/home";
import { View } from "react-native";
import {
  selectedTabData,
} from "../../reducers/OrderListReducer";
import { GlobalService } from "../../utils/GlobalService.js";
import analytics from "@react-native-firebase/analytics";

class SearchScreen extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    getSearchedOrderData: PropTypes.func,
    hitsData: PropTypes.array,
    onPressBackButton: PropTypes.func,
    onPressFilterButton: PropTypes.func,
    searchButton: PropTypes.func,
    userFilterData: PropTypes.object,
  };

  static defaultProps = {
    isLoading: false,
    hitsData: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      searchedData: [],
      load: false,
      selectedTab: "",
      isCheck: false,
      starDate: '',
      filterState: [],
    };
    this.getUserDetail();
    this.selectedTab = "";
    this.isCheck = false;
  }

  componentDidMount() {
    analytics().logEvent("search_event");
    GlobalService.AnalyticScreen("SearchScreen");

    if (this.props.navigation.getParam("fromLinking")) {
      setTimeout(() => {
        this.searchAction(this.props.navigation.getParam("fromLinking"));
      }, 1000);
    }
  }

  getUserDetail = async () => {
    let userDataTemp = await DatabaseManager.getUserProfile();
    this.setState({ userData: JSON.parse(userDataTemp) });
  };

  backButtonAction() {
    this.props.navigation.goBack();
  }

  clearSearchAction() {
    this.setState({ load: false });
  }

  searchAction = (text, key) => {

    if (text != null) {
      this.setState({ load: true });


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
        userId: this.state.userData.userId,
        token: this.state.userData.token,
        text: text,
        selectedTab: this.props.navigation.getParam("selectedTab"),
        isUserFilter: this.props.navigation.getParam("isUserFilter"),
        isCheck: this.props.navigation.getParam("isCheck"),
        userFilter: arr,
        startDate: global.StartTime,
        key: key || "_id",
      };
      const { getSearchedOrderData } = this.props;
      getSearchedOrderData(data);

    }
  };

  render() {
    const {
      onPressBackButton,
      onPressFilterButton,
      searchButton,
      selectedTabString,
    } = this.props;
    this.selectedTab = selectedTabString;

    const { isLoading, hitsData } = this.props;
    var DATA = [];
    if (this.state.load) {
      DATA = hitsData;
      console.log(DATA);
      if (DATA[0] && this.props.navigation.getParam("fromLinking")) {
        this.props.navigation.navigate("TrackItemsScreen", {
          fromLinking: true,
          SelectedItemsDet: DATA[0]._source,
          comingFromItemsScreen: true,
        });
      }
      if (DATA._source) {
      }
    }

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <SearchOrder
          fromLinking={this.props.navigation.getParam("fromLinking")}
          backButtonAction={() => this.props.navigation.goBack()}
          onPressFilterButton={() => this.props.navigation.openDrawer()}
          searchAction={this.searchAction}
          hitsData={DATA}
          clearSearchAction={() => this.clearSearchAction()}
          nav={this.props.navigation}
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
  isLoading: isSearchedOrderLoading(state),
  hitsData: isSearchedOrderData(state),
  selectedTabS: selectedTabData(state),
  userFilterData: isUserFilterData(state),
});

export default connect(mapStateToProps, {
  getSearchedOrderData: getSearchedData,
})(SearchScreen);
