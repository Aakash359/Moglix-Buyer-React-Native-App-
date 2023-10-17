import React, { Component } from "react";
import { InvoiceDetails } from "../../Components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatabaseManager from "./../../Storage/storage";
import { View, BackHandler } from "react-native";
import GlobalStyle from "./../../style";
import { Loader } from "../../Components/Commons";
import {
  isLoading,
  itemTrackDetailData,
} from "../../reducers/OrderListDetailReducer";
import {
  itemInvoiceTrackData,
  normalOrderData,
} from "../../reducers/InvoiceDetailListReducer";
import {
  getTrackItemDetailData,
  getInvoiceTrackRequest,
  getNormalOrderRequest,
} from "../../actions";

class InvoiceDetailsScreen extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: true,
  };

  constructor(props) {
    super(props);
    this.getTrackItemDetail();
    this.trackNormalOrderStatus();
    this.trackInvoiceStatus();
    this.state = {
      userData: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.goBack();
      return true;
    });
  }

  componentDidUpdate() {
    const { invoiceTrackDetailData } = this.props;
    if (!invoiceTrackDetailData.orderScans && !this.state.loading) {
      this.setState({
        loading: true,
      });
    }
  }

  getTrackItemDetail = async () => {
    const { navigation } = this.props;
    const trackingData = navigation.getParam("trackingData");
    let userDataTemp = await DatabaseManager.getUserProfile();
    this.setState({ userData: JSON.parse(userDataTemp) });

    const data = {
      itemID: trackingData.id,
      application: "1",
      idBranch: "8855",
      idCompany: "8653",
      userId: this.state.userData.userId,
      Origin: " https://buyersqa.moglix.com",
      token: this.state.userData.token,
    };
    const { getOrderListDetailD } = this.props;
    getOrderListDetailD(data);
  };

  trackInvoiceStatus = async () => {
    let userDataTemp = await DatabaseManager.getUserProfile();
    this.setState({ userData: JSON.parse(userDataTemp) }, () => {
      const params = {
        token: this.state.userData.token,
        userId: this.state.userData.userId,
        invoiceNo: this.props.navigation.state.params.invoice.item.invoiceNo,
      };
      const { getInvoiceTrackData } = this.props;
      getInvoiceTrackData(params);
    });
  };

  trackNormalOrderStatus = async () => {
    let userDataTemp = await DatabaseManager.getUserProfile();
    this.setState({ userData: JSON.parse(userDataTemp) }, () => {
      const params = {
        token: this.state.userData.token,
        userId: this.state.userData.userId,
        idUser: this.state.userData.userId,
        invoiceNo: this.props.navigation.state.params.invoice.item.invoiceNo,
      };
      const { getNormalOrderStatus } = this.props;
      getNormalOrderStatus(params);
    });
  };

  getSortedArray(itemsTrackDetailData) {
    try {
      itemsTrackDetailData.sort(function (a, b) {
        var c = new Date(a.CreationDate);
        var d = new Date(b.CreationDate);
        return c - d;
      });
    } catch (error) {
      console.log("error", error);
    }
    return itemsTrackDetailData;
  }

  backAction = () => {
    this.props.navigation.goBack();
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const {
      isLoading,
      itemsDetailData,
      navigation,
      itemsTrackDetailData,
      invoiceTrackDetailData,
      normalOrderTrackData,
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <InvoiceDetails
          onPressBackButton={this.backAction}
          onPressDownloadFileButton={this.downloadFileAction}
          nav={this.props.navigation}
          SelectedItemsDetail={itemsDetailData}
          trackingData={navigation.getParam("trackingData")}
          invoiceData={navigation.getParam("invoice")}
          itemsTrackDetailD={this.getSortedArray(itemsTrackDetailData)}
          invoiceTrackDetailData={invoiceTrackDetailData}
          normalOrderTrackData={normalOrderTrackData}
        />
        {isLoading ? (
          <View style={[GlobalStyle.loaderStyle2]}>
            <View style={[GlobalStyle.loaderStyle]}>
              <Loader />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: isLoading(state),
  itemsTrackDetailData: itemTrackDetailData(state),
  invoiceTrackDetailData: itemInvoiceTrackData(state),
  normalOrderTrackData: normalOrderData(state),
});

export default connect(mapStateToProps, {
  getOrderListDetailD: getTrackItemDetailData,
  getInvoiceTrackData: getInvoiceTrackRequest,
  getNormalOrderStatus: getNormalOrderRequest,
})(InvoiceDetailsScreen);
