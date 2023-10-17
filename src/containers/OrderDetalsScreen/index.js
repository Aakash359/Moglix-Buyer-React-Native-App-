import React, { Component } from "react";
import {
  View,
  BackHandler,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { OrderDetails } from "../../Components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOrderListDetailData, runActivityMethod } from "../../actions";
import {
  isLoading,
  orderListDetailData,
} from "../../reducers/OrderListDetailReducer";
import GlobalStyle from "./../../style";
import { Loader } from "../../Components/Commons";
import DatabaseManager from "./../../Storage/storage";
import ReactNativeBlobUtil from "react-native-blob-util";
import { GlobalService } from "../../utils/GlobalService.js";
import analytics from "@react-native-firebase/analytics";

class OrderDetalsScreen extends Component {
  static propTypes = {
    SelectedItemsDetail: PropTypes.object,
    isLoading: PropTypes.bool,
    itemsDetailData: PropTypes.object,
    getOrderListDetailD: PropTypes.func,
    showProgress: PropTypes.func,
  };

  static defaultProps = {
    itemsDetailData: {},
    isLoading: true,
  };

  constructor(props) {
    super(props);
    this.state = { userData: {} };
    this.getOrderListDetail();
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    return true;
  }

  getOrderListDetail = async () => {
    const { navigation } = this.props;
    const { history } = navigation.getParam("SelectedItemsDetail");
    let userDataTemp = await DatabaseManager.getUserProfile();
    const { token } = JSON.parse(userDataTemp);
    const { userId } = JSON.parse(userDataTemp);

    const data = {
      itemID: history.po.poId,
      application: "1",
      idBranch: global.GLOBAL_BRANCH_ID,
      idCompany: global.GLOBAL_COMPANY_ID,
      userId: userId,
      Origin: "https://buyersqa.moglix.com",
      token: token,
    };
    const { getOrderListDetailD } = this.props;
    getOrderListDetailD(data);
  };

  backAction = () => {
    this.props.navigation.goBack();
  };

  downloadFileAction = () => { };

  actualDownload = (pdfURL) => {
    try {
      //commenting rn fetch
      const { showProgress } = this.props;

      const { config, fs } = ReactNativeBlobUtil;
      let DownloadDir = fs.dirs.DownloadDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: "PO File",
          path: DownloadDir + "/${new Date().getTime()}" + "." + "pdf",
          description: "Downloading file.",
        },
      };
      ReactNativeBlobUtil.config(options)
        .fetch("GET", pdfURL)
        .then((res) => {
          showProgress(false);
          console.warn("Success");
        })
        .catch((err) => {
          showProgress(false);
          console.log("error");
        });
    } catch (error) {
      console.log(error);
    }
  };

  downloadFile = async (pdfURLD) => {
    try {
      const { showProgress } = this.props;
      showProgress(true);

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload(pdfURLD);
      } else {
        Alert.alert(
          "Permission Denied!",
          "You need to give storage permission to download the file"
        );
      }
    } catch (err) {
      showProgress(false);
      console.warn(err);
    }
  };

  componentDidMount() {
    analytics().logEvent("orderDetails_event");
    GlobalService.AnalyticScreen("OrderDetalsScreen");
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.goBack();
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const { isLoading, itemsDetailData, navigation } = this.props;

    if (Object.keys(itemsDetailData).length <= 0) {
      return (
        <View
          style={{
            flex: 1,
          }}
        >
          {isLoading && (
            <View style={[GlobalStyle.loaderStyle]}>
              <Loader />
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
          }}
        >
          <OrderDetails
            onPressBackButton={this.backAction}
            onPressDownloadFileButton={this.downloadFileAction}
            nav={this.props.navigation}
            SelectedItemsDetail={itemsDetailData}
            itemSelectData={navigation.getParam("SelectedItemsDetail")}
          />
          {isLoading ? (
            <View style={[GlobalStyle.loaderStyle2]}>
              <SafeAreaView></SafeAreaView>
              <View style={[GlobalStyle.loaderStyle]}>
                <Loader />
              </View>
            </View>
          ) : null}
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isLoading: isLoading(state),
  itemsDetailData: orderListDetailData(state),
});

export default connect(mapStateToProps, {
  getOrderListDetailD: getOrderListDetailData,
  showProgress: runActivityMethod,
})(OrderDetalsScreen);
