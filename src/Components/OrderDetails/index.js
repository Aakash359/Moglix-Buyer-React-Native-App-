import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableHighlight,
} from "react-native";
import PropTypes from "prop-types";
import OrderDetailsNavBar from "../../Components/Commons/NavBars/CommonNavBars/OrderDetailsNavBar";
import { styles } from "./style";
import CardView from "react-native-cardview";
import moment from "moment";
import ContactPopup from "../ContactPopup/index";
import { ICON, AppConfig } from "../../constants";
import { GlobalService } from "../../utils/GlobalService";
import {
  getDashboardView,
  getCofiguartionRequest,
} from "../../utils/commonService";
import DatabaseManager from "../../Storage/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class OrderDetails extends Component {
  static propTypes = {
    onPressBackButton: PropTypes.func,
    onPressDownloadFileButton: PropTypes.func,
    nav: PropTypes.object,
    SelectedItemsDetail: PropTypes.object,
    itemSelectData: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  getImageURL(item) {
    try {
      var imageURL = "";
      try {
        if (item._source.product.extraDetails.images.length > 0) {
          imageURL = item._source.product.extraDetails.images[0].links.icon;
        }
        return imageURL;
      } catch (error) {
        return imageURL;
      }
    } catch (error) {}
  }

  getStatusCount(status) {
    const { SelectedItemsDetail } = this.props;
    const { hits } = SelectedItemsDetail;
    const statusCount = hits.filter(
      (item) => item._source.groupedStatus === status
    );
    return statusCount.length;
  }

  componentDidMount() {
    console.log("inside detail");
    this.getDashboardViewApi();
  }
  getDashboardViewApi = async () => {
    let payload = {
      token: JSON.parse(await DatabaseManager.getUserProfile()).token,
      userId: JSON.parse(await DatabaseManager.getUserProfile()).userId,
    };
    // let selectedbranchData = await AsyncStorage.getItem("@selectedbranchData");
    // selectedbranchData = JSON.parse(selectedbranchData);
    let options = {
      idBranch: global.GLOBAL_BRANCH_ID,
      idUser: payload.userId,
    };
    const data = await getDashboardView(options, payload);
    global.getBranchResponse = data.data?.data?.branchModules?.roleNames;
    global.ItemPriceHideFlag =
      data?.data?.data?.branchModules?.itemPriceHideFlag;
    global.getBranch_RoleName = data.data?.data?.branchModules?.roleNames?.[0];
    if (data.data?.data?.branchModules?.roleNames.length == 1) {
      this.getCofiguartionAPi();
    }
  };

  getCofiguartionAPi = async () => {
    let payload = {
      token: JSON.parse(await DatabaseManager.getUserProfile()).token,
      userId: JSON.parse(await DatabaseManager.getUserProfile()).userId,
      userEmail: JSON.parse(await DatabaseManager.getUserProfile()).userEmail,
    };
    const { userEmail } = payload;
    global.Email = userEmail;
    // let selectedbranchData = await AsyncStorage.getItem("@selectedbranchData");
    // selectedbranchData = JSON.parse(selectedbranchData);
    let options = {
      idCompany: global.GLOBAL_COMPANY_ID,
      pageType: "m-app",
    };
    const data = await getCofiguartionRequest(options, payload);
    global.getConfigResponse = data?.data?.data;
    global.Config_ItemPriceHideFlag =
      data.data?.data?.configuration?.hidePrice?.item_price_hide_flag;
    global.Config_RoleName =
      data.data?.data?.configuration?.hidePrice?.item_price_hide_flag;
  };

  orderListSelectItem(selectedItem) {
    const { nav, invoiceDetailsData } = this.props;
    var invoiceDetailList = invoiceDetailsData?.data?.hits?.hits?.[0]?._source;
    const { _source } = selectedItem;
    var _firebaseObj = {
      view_po_item: _source,
    };
    GlobalService.AnalyticFunction("view_po_item", _firebaseObj);
    nav.navigate("TrackItemStatusScreen", {
      SelectedItemsDet: _source,
      comingFromItemsScreen: false,
      invoiceList: invoiceDetailList,
    });
  }

  getTimeAndDate(timestamp, status) {
    var fulldate = new Date(parseInt(timestamp));

    var converted_date = moment(fulldate).format("DD/MM/YYYY");
    if (
      converted_date.toString() == "Invalid date" ||
      converted_date.toString() == "01/01/1970"
    ) {
      return "To be updated";
    } else {
      return status + ": " + converted_date.toString();
    }
  }

  getItemTrackStatus(itemSelectData) {
    try {
      const { groupedStatus } = itemSelectData;
      return "Placed";
    } catch (error) {
      return "";
    }
  }

  getPONumber(item) {
    try {
      return item.history.po.customerPoNo;
    } catch (error) {
      return "";
    }
  }

  getPlacedDate(item) {
    try {
      return item.creationDate;
    } catch (error) {
      return 0;
    }
  }

  getItemLength(items) {
    try {
      return items.length;
    } catch (error) {
      return 0;
    }
  }

  getTotalAmount(items) {
    try {
      var sum = 0.0;
      items.forEach(function (item) {
        sum = sum + item._source.amount.amountWithTax;
      });
      return sum.toFixed(2);
    } catch (error) {
      return 0;
    }
  }

  getCurrency(items) {
    try {
      return items.rate.currency;
    } catch (error) {
      return "";
    }
  }

  getCPN(item) {
    try {
      return item._source.product.cpn;
    } catch (error) {
      return "";
    }
  }

  getName(item) {
    try {
      return item._source.product.name;
    } catch (error) {
      return "";
    }
  }

  getAmount(item) {
    try {
      return item._source.rate.amount;
    } catch (error) {
      return "";
    }
  }

  getUOM(item) {
    try {
      return item._source.quantity.uom;
    } catch (error) {
      return "";
    }
  }

  getQuantity(item) {
    try {
      return item._source.quantity.qty;
    } catch (error) {
      return "";
    }
  }

  getRemainingDeliveredQty(item) {
    try {
      if (item._source.history.remainingShippedQty !== undefined) {
        return item._source.history.remainingShippedQty;
      }
      return item._source.quantity.qty;
    } catch (error) {
      return 0;
    }
  }

  getItemAmount(item) {
    try {
      return item._source.amount.amountWithTax
        ? item._source.amount.amountWithTax.toFixed(2)
        : 0;
    } catch (error) {
      return 0.0;
    }
  }

  getTaxValue(item) {
    try {
      return item._source.tax.taxValue;
    } catch (error) {
      return "";
    }
  }

  getStatus(item) {
    try {
      return item._source.groupedStatus.toUpperCase();
    } catch (error) {
      return "";
    }
  }

  getETADate(item) {
    try {
      if (item._source.customerETA != undefined) {
        return item._source.customerETA;
      } else {
        return "";
      }
    } catch (error) {
      return "";
    }
  }

  getStatusColor(statusValue) {
    switch (statusValue.toUpperCase()) {
      case "PROCESSING":
        return styles.PlacedSBG;
      case "IN-PROCESS":
        return styles.PlacedSBG;
      case "PLACED":
        return styles.PlacedSBG;
      case "RETURNED":
        return styles.CancelledDot;
      case "CANCELLED":
        return styles.CancelledDot;
      case "CLOSED":
        return styles.CancelledDot;
      case "PARTIALLY SHIPPED":
        return styles.ShippedDot;
      case "SHIPPED":
        return styles.ShippedDot;
      case "DELIVERED":
        return styles.DliveredDot;
      case "PARTIALLY DELIVERED":
        return styles.DliveredDot;
      default:
        return styles.CreatedSBG;
    }
  }

  render() {
    const {
      onPressBackButton,
      onPressDownloadFileButton,
      SelectedItemsDetail,
      itemSelectData,
      invoiceDetailsData,
    } = this.props;
    const { hits } = SelectedItemsDetail;
    const items = hits;
    var converted_date = "To be updated";
    if (
      items[0] &&
      items[0]._source &&
      items[0]._source.delivery &&
      items[0]._source.delivery.cdd2
    ) {
      var fulldate = new Date(items[0]._source.delivery.cdd2);
      converted_date = moment(fulldate).format("DD/MM/YYYY");
    } else if (
      items[0] &&
      items[0]._source &&
      items[0]._source.delivery &&
      items[0]._source.delivery.customerDueDeliveryDate
    ) {
      var fulldate = new Date(
        items[0]._source.delivery.customerDueDeliveryDate
      );
      converted_date = moment(fulldate).format("DD/MM/YYYY");
    }
    let length = global.getBranchResponse;

    return (
      <SafeAreaView style={styles.container}>
        <CardView cardElevation={10} cardMaxElevation={10} cornerRadius={0}>
          <OrderDetailsNavBar
            BackAction={onPressBackButton}
            ViewPOAction={onPressDownloadFileButton}
            customerPoNum={this.getPONumber(itemSelectData)}
            dateAndTime={this.getTimeAndDate(
              this.getPlacedDate(itemSelectData),
              this.getItemTrackStatus(itemSelectData)
            )}
            buttonTitle={"DOWNLOAD PO"}
          />
          <View style={styles.topSeparator}></View>

          <View style={styles.headerContainer}>
            <View style={styles.headerLeftView}>
              <Text style={styles.LeftText1}>Items</Text>
              <Text style={styles.LeftText2}>
                {this.getItemLength(items) + " Items"}
              </Text>
            </View>
            {length > 1 || undefined ? (
              <View style={styles.headerRightView}>
                <Text style={styles.LeftText1}>PO Value</Text>
                <Text style={styles.LeftText2}>
                  {this.getTotalAmount(items) +
                    " " +
                    this.getCurrency(itemSelectData)}
                </Text>
              </View>
            ) : global.getConfigResponse == null || undefined ? (
              <View style={styles.headerRightView}>
                <Text style={styles.LeftText1}>PO Value</Text>
                <Text style={styles.LeftText2}>
                  {this.getTotalAmount(items) +
                    " " +
                    this.getCurrency(itemSelectData)}
                </Text>
              </View>
            ) : global.getBranch_RoleName == global.Config_RoleName ? (
              <>
                {(global.Config_ItemPriceHideFlag == undefined || null
                  ? null
                  : global.Config_ItemPriceHideFlag) == true ? null : (
                  <View style={styles.headerRightView}>
                    <Text style={styles.LeftText1}>PO Value</Text>
                    <Text style={styles.LeftText2}>
                      {this.getTotalAmount(items) +
                        " " +
                        this.getCurrency(itemSelectData)}
                    </Text>
                  </View>
                )}
              </>
            ) : null}
          </View>
          <View style={styles.statusView}>
            <View style={styles.statusInnerView}>
              <View style={styles.partNuView}>
                <Text style={styles.textItemsID}>
                  {this.getStatusCount("Processing")} IN-PROCESS
                </Text>
              </View>
            </View>
            <View style={styles.statusInnerView}>
              <View style={styles.partNuView}>
                <Text style={styles.textItemsID}>
                  {this.getStatusCount("Shipped")} SHIPPED
                </Text>
              </View>
            </View>
            <View style={styles.statusInnerView}></View>
            <View style={styles.partNuView}>
              <Text style={styles.textItemsID}>
                {this.getStatusCount("Delivered")} DELIVERED
              </Text>
            </View>
          </View>
        </CardView>

        <View style={styles.ListContainer}>
          <FlatList
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 150 }}
            data={items}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => this.orderListSelectItem(item)}
                underlayColor={"#ffffff"}
              >
                <CardView
                  cardElevation={10}
                  cardMaxElevation={10}
                  cornerRadius={0}
                  style={styles.RowContainer}
                >
                  <View style={styles.viewProductDesc}>
                    <Image
                      style={styles.imageStyle}
                      source={
                        this.getImageURL(item)
                          ? {
                              uri:
                                AppConfig.ITEMS_IMAGES_SUB_URL +
                                this.getImageURL(item),
                            }
                          : ICON.IMG_DEFAULT
                      }
                    ></Image>
                    <View style={{ flexDirection: "column", marginRight: 50 }}>
                      <View style={styles.viewItemIdBGStyle}>
                        <View style={styles.partNuView}>
                          <Text style={styles.textItemsID}>
                            Item no: {this.getCPN(item)}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.textDesc}>{this.getName(item)} </Text>
                    </View>
                  </View>

                  <View style={styles.viewPriceQuantityAndTAmount}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 8,
                      }}
                    >
                      <View style={styles.viewQuantity}>
                        <Text style={styles.LeftText1}>Customer Due Date</Text>
                        <Text style={styles.LeftText2}>{converted_date}</Text>
                      </View>
                      {length > 1 || undefined ? (
                        <View
                          style={[
                            styles.viewQuantity,
                            { alignItems: "flex-end" },
                          ]}
                        >
                          <Text style={[styles.LeftText1]}>Price</Text>
                          <Text style={styles.LeftText2}>
                            {this.getAmount(item)}{" "}
                            {this.getCurrency(item._source)} /{" "}
                            {this.getUOM(item)}
                          </Text>
                        </View>
                      ) : global.getConfigResponse == null || undefined ? (
                        <View
                          style={[
                            styles.viewQuantity,
                            { alignItems: "flex-end" },
                          ]}
                        >
                          <Text style={[styles.LeftText1]}>Price</Text>
                          <Text style={styles.LeftText2}>
                            {this.getAmount(item)}{" "}
                            {this.getCurrency(item._source)} /{" "}
                            {this.getUOM(item)}
                          </Text>
                        </View>
                      ) : global.getBranch_RoleName ==
                        global.Config_RoleName ? (
                        <>
                          {(global.Config_ItemPriceHideFlag == undefined || null
                            ? null
                            : global.Config_ItemPriceHideFlag) ==
                          true ? null : (
                            <View
                              style={[
                                styles.viewQuantity,
                                { alignItems: "flex-end" },
                              ]}
                            >
                              <Text style={[styles.LeftText1]}>Price</Text>
                              <Text style={styles.LeftText2}>
                                {this.getAmount(item)}{" "}
                                {this.getCurrency(item._source)} /{" "}
                                {this.getUOM(item)}
                              </Text>
                            </View>
                          )}
                        </>
                      ) : null}
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <View
                        style={[
                          length > 1 || undefined
                            ? [styles.viewPrice]
                            : (global.Config_ItemPriceHideFlag == undefined ||
                              null
                                ? null
                                : global.Config_ItemPriceHideFlag) == true
                            ? [
                                styles.viewPrice,
                                { alignItems: "flex-end", marginTop: -45 },
                              ]
                            : [styles.viewPrice],
                        ]}
                      >
                        <Text style={styles.LeftText1}>Qty</Text>
                        <Text style={styles.LeftText2}>
                          {this.getQuantity(item)} {this.getUOM(item)}
                        </Text>
                        <Text style={styles.LeftText3}>
                          Pending Qty -{" "}
                          {this.getRemainingDeliveredQty(item).toFixed(2)}{" "}
                          {this.getUOM(item)}
                        </Text>
                      </View>
                    </View>
                    {length > 1 || undefined ? (
                      <View style={[styles.viewTotalAmount]}>
                        <Text style={styles.LeftText1}>Total Amount</Text>
                        <Text
                          style={[styles.LeftText2, { textAlign: "right" }]}
                        >
                          {this.getItemAmount(item)}{" "}
                          {this.getCurrency(item._source)}
                        </Text>
                        <Text style={styles.LeftText3}>
                          {this.getTaxValue(item)}% Tax
                        </Text>
                      </View>
                    ) : global.getConfigResponse == null || undefined ? (
                      <View style={[styles.viewTotalAmount]}>
                        <Text style={styles.LeftText1}>Total Amount</Text>
                        <Text
                          style={[styles.LeftText2, { textAlign: "right" }]}
                        >
                          {this.getItemAmount(item)}{" "}
                          {this.getCurrency(item._source)}
                        </Text>
                        <Text style={styles.LeftText3}>
                          {this.getTaxValue(item)}% Tax
                        </Text>
                      </View>
                    ) : global.getBranch_RoleName == global.Config_RoleName ? (
                      <>
                        {(global.Config_ItemPriceHideFlag == undefined || null
                          ? null
                          : global.Config_ItemPriceHideFlag) == true ? null : (
                          <View style={[styles.viewTotalAmount]}>
                            <Text style={styles.LeftText1}>Total Amount</Text>
                            <Text
                              style={[styles.LeftText2, { textAlign: "right" }]}
                            >
                              {this.getItemAmount(item)}{" "}
                              {this.getCurrency(item._source)}
                            </Text>
                            <Text style={styles.LeftText3}>
                              {this.getTaxValue(item)}% Tax
                            </Text>
                          </View>
                        )}
                      </>
                    ) : null}
                  </View>

                  <View style={styles.separatorStyle}></View>
                  <View
                    style={
                      item._source.groupedStatus != "Processing"
                        ? { flexDirection: "row", marginTop: 15 }
                        : { flexDirection: "row", marginTop: 10 }
                    }
                  >
                    <View
                      style={[
                        [
                          item._source.subStatus
                            ? styles.dot
                            : [styles.dot, { marginBottom: 25 }],
                        ],
                        this.getStatusColor(item._source.groupedStatus),
                      ]}
                    ></View>
                    <View
                      style={[
                        styles.viewPrice,
                        { marginBottom: 8.9, marginLeft: 5 },
                      ]}
                    >
                      <Text style={styles.status}>{this.getStatus(item)}</Text>
                      {item._source.groupedStatus == "Processing" ? (
                        <Text
                          style={[
                            styles.LeftText1,
                            { marginLeft: 5, fontSize: 12, bottom: 2 },
                          ]}
                        >
                          {item._source.subStatus}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  <View style={styles.viewTotalAmount}>
                    <Text
                      style={
                        item._source.groupedStatus != "Processing"
                          ? [styles.textTrackItems, { marginTop: 8 }]
                          : [styles.textTrackItems]
                      }
                    >
                      TRACK ITEM
                    </Text>
                    <Text
                      style={[
                        styles.LeftText1,
                        { marginLeft: 5, marginTop: 1 },
                      ]}
                    >
                      ETA - {this.getTimeAndDate(this.getETADate(item), "")}
                    </Text>
                  </View>
                </CardView>
              </TouchableHighlight>
            )}
            style={styles.flatList}
          />
          <View style={styles.contactPopView}>
            <ContactPopup
              navigation={this.props.nav}
              isOpen={(info) => this.showOpen(info)}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  showOpen(data) {
    if (data) {
      this.setState({ modalOver: true });
    } else {
      this.setState({ modalOver: false });
    }
  }
}
