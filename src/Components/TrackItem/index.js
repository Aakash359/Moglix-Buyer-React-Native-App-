import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { styles } from "./style";
import PropTypes from "prop-types";
import NavBarBackButtonAndTitleOnly from "../../Components/Commons/NavBars/CommonNavBars/NavBarBackButtonAndTitleOnly";
import CardView from "react-native-cardview";
import ContactPopup from "../ContactPopup/index";
import OrderDetailsNavBar from "../../Components/Commons/NavBars/CommonNavBars/OrderDetailsNavBar";
import moment from "moment";
import { ICON, AppConfig } from "../../constants";
import Icon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/Fontisto";
import ICONS from "react-native-vector-icons/MaterialIcons";
import {
  getDashboardView,
  getCofiguartionRequest,
} from "../../utils/commonService";
import DatabaseManager from "../../Storage/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalService } from "../../utils/GlobalService.js";

export default class TrackItem extends Component {
  static propTypes = {
    onPressBackButton: PropTypes.func,
    onPressViewPoButton: PropTypes.func,
    nav: PropTypes.object,
    SelectedItemsD: PropTypes.object,
    navShowWithViewButton: PropTypes.bool,
    itemsTrackDetailD: PropTypes.object,
  };
  constructor() {
    super();
    this.viewabilityConfig = { itemVisiblePercentThreshold: 30 };
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    console.log("inside track mount");
    console.log(this.props);
    this.getDashboardViewApi();
  }

  getDashboardViewApi = async () => {
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
      idBranch: global.GLOBAL_BRANCH_ID,
      idUser: payload.userId,
    };

    const data = await getDashboardView(options, payload);
    global.getBranchResponse = data.data?.data?.branchModules?.roleNames;
    global.getBranch_ItemPriceHideFlag =
      data?.data?.data?.branchModules?.itemPriceHideFlag;
    global.getBranch_RoleName = data.data?.data?.branchModules?.roleNames?.[0];
    if (
      data.data?.data?.branchModules?.roleNames.length == 1 &&
      !this.state.loading
    ) {
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

  getImageURL(item) {
    var imageURL = "";
    try {
      if (item.product.extraDetails.images.length > 0) {
        imageURL = item.product.extraDetails.images[0].links.icon;
      }
      return imageURL;
    } catch (error) {
      return imageURL;
    }
  }

  getDateMilisecondFromItemsTrackStatus(SelectedItemsD) {
    try {
      return SelectedItemsD.creationDate;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  getETADate(SelectedItemsD) {
    try {
      if (SelectedItemsD.customerETA != undefined) {
        return SelectedItemsD.customerETA;
      } else {
        return "";
      }
    } catch (error) {
      return "";
    }
  }

  getRunningstatus(SelectedItemsD) {
    try {
      if (SelectedItemsD.etaRunningDelay != undefined) {
        return SelectedItemsD.etaRunningDelay;
      }
    } catch (error) {
      return "";
    }
  }

  invoiceDate(check, status, obj) {
    try {
      var date = global.date;
      var fulldate = new Date(date);
      var converted_date = moment(fulldate).format("DD/MM/YYYY");
      if (check && status) {
        if (status == "Delivered") {
          converted_date = moment(obj.deliveredDate).format("DD/MM/YYYY");
        } else if (status == "Shipped") {
          converted_date = moment(obj.shippedDate).format("DD/MM/YYYY");
        }
      }
      if (
        converted_date.toString() == "Invalid date" ||
        converted_date.toString() == "01/01/1970"
      ) {
        return "To be updated";
      } else {
        return converted_date.toString();
      }
    } catch (error) {
      console.log(error);
      return "To be updated";
    }
  }

  invoiceDetailItem(list) {
    let email = global.Email;
    var _firebaseObj = {
      trackingData: SelectedItemsD,
      invoice: list,
      email,
      idCompany: global.GLOBAL_COMPANY_ID,
    };

    const { nav, SelectedItemsD } = this.props;
    GlobalService.AnalyticFunction("trackInvoice_event", _firebaseObj);
    nav.navigate("InvoiceDetailsScreen", {
      trackingData: SelectedItemsD,
      invoice: list,
    });
  }

  getTimeAndDate(timestamp) {
    var fulldate = new Date(timestamp);

    var converted_date = moment(fulldate).format("DD/MM/YYYY");

    if (
      converted_date.toString() == "Invalid date" ||
      converted_date.toString() == "01/01/1970"
    ) {
      return "To be updated";
    } else {
      return converted_date.toString();
    }
  }

  invoiceRenderItem = (list) => {
    let data = list.item;
    global.date = data?.invoiceDate;
    global.InvoiceNo = data?.invoiceNo;
    return (
      <>
        {data.status == "Shipped" || data.status == "Delivered" ? (
          <TouchableOpacity
            onPress={() => {
              this.invoiceDetailItem(list);
            }}
            activeOpacity={0.7}
          >
            <View style={styles.inVoiceView}>
              <View style={[styles.wrapContainer, { top: 3 }]}>
                <View style={styles.inNuView}>
                  <View style={{ flexDirection: "row" }}>
                    <Text numberOfLines={2} style={styles.inNo}>
                      Invoice No.
                    </Text>
                    <Text numberOfLines={2} style={[styles.inNo, { left: 1 }]}>
                      {data?.invoiceNo}
                    </Text>
                  </View>
                </View>
                <Text numberOfLines={2} style={styles.qty}>
                  Qty - {data?.quantity?.qty / 1000}
                </Text>
              </View>
              {data?.runnerPhone == "" || undefined ? (
                <>
                  {data?.driverName == "Delhivery Surface (B2B)" ||
                    data?.driverName == "Delhivery (B2C)" ||
                    data?.driverName == "Delhivery B2B" ||
                    data?.driverName == "Xpressbees" ||
                    data?.driverName == "Spoton" ||
                    data?.driverName == "Safe Express" ||
                    data?.driverName == "Bluedart" ||
                    data?.driverName == "Blowhorn" ? (
                    <View style={[styles.wrapContainer, { top: 5 }]}>
                      {data.awbNo == "" || undefined ? null : (
                        <View style={{ flexDirection: "row" }}>
                          <Text style={[styles.nostyle, { top: 8 }]}>
                            AWB NO. {data?.awbNo}
                          </Text>
                          <Text
                            style={[
                              styles.nostyle,
                              {
                                left: 5,
                                color: "#898A8F",
                                fontSize: 12,
                                top: 8,
                              },
                            ]}
                          >
                            ({data?.driverName})
                          </Text>
                        </View>
                      )}
                    </View>
                  ) : (
                    <Text style={[styles.qty, { width: "100%", top: 8 }]}>
                      {data?.invoiceMessage}
                    </Text>
                  )}
                </>
              ) : (
                <>
                  {data.status == "Shipped" ? (
                    <View style={[styles.wrapContainer, { top: 5 }]}>
                      <View style={{ flexDirection: "row" }}>
                        <Icons
                          color="#454F63"
                          name="phone"
                          style={{
                            fontSize: 16,
                            top: 6.5,
                            left: 2,
                            fontWeight: "bold",
                          }}
                        />
                        <View style={{ flexDirection: "row" }}>
                          <Text style={[styles.nostyle, { left: 8 }]}>
                            {data?.runnerName}:
                          </Text>
                          <Text
                            style={[
                              styles.nostyle,
                              { left: 10, color: "#0081cb" },
                            ]}
                          >
                            {" "}
                            {data?.runnerPhone}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <Text style={[styles.qty, { width: "100%", top: 8 }]}>
                      {data?.invoiceMessage}
                    </Text>
                  )}
                </>
              )}
              {data?.status == "Delivered" || data?.status == "Shipped" ? (
                <View
                  style={
                    data?.invoiceMessage == ""
                      ? [styles.deliverSeparater, styles.denSeparater]
                      : styles.invoiceSeparater
                  }
                />
              ) : data?.status == "Delivered" ? (
                <View
                  style={
                    data?.invoiceMessage == "" &&
                      (data?.driverName == "Delhivery Surface (B2B)" ||
                        data?.driverName == "Delhivery (B2C)" ||
                        data?.driverName == "Delhivery B2B" ||
                        data?.driverName == "Xpressbees" ||
                        data?.driverName == "Spoton" ||
                        data?.driverName == "Safe Express" ||
                        data?.driverName == "Bluedart" ||
                        data?.driverName == "Blowhorn")
                      ? styles.invoiceSeparater
                      : (data?.runnerPhone != "" && data.status == "Shipped") ||
                        data.status == "Delivered"
                        ? data?.status == "Delivered" &&
                          data?.invoiceMessage == ""
                          ? [styles.invoiceSeparater, { marginTop: -12 }]
                          : styles.invoiceSeparater
                        : [styles.invoiceSeparater, { marginTop: -12 }]
                  }
                />
              ) : (
                <View style={styles.invoiceSeparater} />
              )}

              {data.status == "Shipped" || data.status == "Delivered" ? (
                <View
                  style={
                    data.status == "Shipped"
                      ? [styles.dot, { backgroundColor: "orange" }]
                      : [styles.dot, { backgroundColor: "#1faa00" }]
                  }
                ></View>
              ) : (
                <View style={null}></View>
              )}

              <View style={[styles.wrapContainer]}>
                {data.status == "Shipped" || data.status == "Delivered" ? (
                  <Text style={[styles.nostyle, { left: 25, bottom: 10 }]}>
                    {data.status}
                  </Text>
                ) : (
                  <Text style={[styles.nostyle, { left: 25, bottom: 10 }]}>
                    {null}
                  </Text>
                )}

                <View style={styles.trackWrap}>
                  <Text
                    style={[styles.nostyle, { color: "#D9232D", right: 10 }]}
                  >
                    TRACK ITEM
                  </Text>
                  <Icon
                    color="#D9232D"
                    name="right"
                    style={{
                      fontSize: 16,
                      top: 6.5,
                      left: 2,
                      fontWeight: "bold",
                    }}
                  />
                </View>
              </View>
              <Text style={styles.date}>
                {this.invoiceDate(true, data.status, data)}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

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
      SelectedItemsD,
      onPressBackButton,
      navShowWithViewButton,
      onPressViewPoButton,
      invoiceDetailsData,
    } = this.props;
    let invoiceList =
      invoiceDetailsData?.data?.hits?.hits?.[0]?._source?.invoicing;
    var converted_date = "To be updated";
    if (
      SelectedItemsD &&
      SelectedItemsD.delivery &&
      SelectedItemsD.delivery.cdd2
    ) {
      var fulldate = new Date(SelectedItemsD.delivery.cdd2);
      converted_date = moment(fulldate).format("DD/MM/YYYY");
    } else if (
      SelectedItemsD &&
      SelectedItemsD.delivery &&
      SelectedItemsD.delivery.customerDueDeliveryDate
    ) {
      var fulldate = new Date(SelectedItemsD.delivery.customerDueDeliveryDate);
      converted_date = moment(fulldate).format("DD/MM/YYYY");
    }
    let length = global.getBranchResponse;

    return (
      <SafeAreaView style={styles.container}>
        {!navShowWithViewButton && (
          <NavBarBackButtonAndTitleOnly
            BackAction={onPressBackButton}
            title={"Track Item"}
          />
        )}
        {navShowWithViewButton && (
          <OrderDetailsNavBar
            BackAction={onPressBackButton}
            ViewPOAction={onPressViewPoButton}
            customerPoNum={SelectedItemsD.history.po.customerPoNo}
            dateAndTime={this.getTimeAndDate(
              this.getDateMilisecondFromItemsTrackStatus(SelectedItemsD),
              "Placed"
            )}
            buttonTitle={"VIEW PO"}
          />
        )}
        <View style={styles.topSeparator}></View>
        {

          SelectedItemsD.reasonForDelay ? (
            <View style={{ backgroundColor: "#FFEBE0" }}>
              <Text
                style={{
                  color: "#F5681E",
                  marginLeft: 10,
                  marginTop: 8,
                  marginBottom: 8,
                }}
              >
                {" "}
                {SelectedItemsD.reasonForDelay}
              </Text>
            </View>
          ) : null}
        <ScrollView style={{ marginBottom: -80 }}>
          <CardView
            cardElevation={10}
            cardMaxElevation={10}
            cornerRadius={0}
            style={styles.viewProductDesc}
          >
            <View style={styles.statusWrap}>
              <View style={{ flexDirection: "row", width: "55%" }}>
                <View
                  style={[
                    styles.dot2,
                    this.getStatusColor(SelectedItemsD.groupedStatus),
                  ]}
                ></View>
                <View
                  style={
                    SelectedItemsD.subStatus
                      ? [
                        styles.columnContainer,
                        { marginTop: 10, marginLeft: 5 },
                      ]
                      : SelectedItemsD.groupedStatus == "Processing"
                        ? [
                          styles.columnContainer,
                          { marginTop: 22, marginLeft: 5 },
                        ]
                        : [
                          styles.columnContainer,
                          { marginTop: 5, marginLeft: 5 },
                        ]
                  }
                >
                  <Text style={styles.status}>
                    {SelectedItemsD.groupedStatus.toUpperCase()}
                  </Text>
                  {SelectedItemsD.groupedStatus == "Processing" ? (
                    <Text
                      style={[
                        SelectedItemsD.status == "Partially Shipped"
                          ? [styles.textItemsID, { right: 10 }]
                          : [
                            SelectedItemsD.subStatus == "Accepted"
                              ? [styles.textItemsID, { marginRight: 50 }]
                              : styles.textItemsID,
                          ],
                      ]}
                    >
                      {SelectedItemsD.subStatus}
                    </Text>
                  ) : null}
                  {SelectedItemsD.groupedStatus == "Closed" &&
                    SelectedItemsD["closingReason"] ? (
                    <Text style={{ color: "red", marginLeft: 4 }}>
                      {SelectedItemsD.closingReason}
                    </Text>
                  ) : null}
                </View>
              </View>
              <View style={styles.EtaWrap2}>
                <View style={styles.columnContainer2}>
                  {SelectedItemsD.status != "CANCELLED" &&
                    SelectedItemsD.status != "Returned" &&
                    SelectedItemsD.groupedStatus != "Closed" && (
                      <View
                        style={[
                          this.getRunningstatus(SelectedItemsD)
                            ? [styles.EtaWrap, { marginTop: 5 }]
                            : [styles.EtaWrap, { marginTop: 13 }],
                        ]}
                      >
                        {SelectedItemsD.status == "Returned" ? (
                          <Text numberOfLines={2} style={styles.Eta}>
                            {" "}
                            ETA - Not Applicable
                          </Text>
                        ) : null}
                        <Text
                          style={
                            this.getRunningstatus(SelectedItemsD)
                              ? [styles.Eta, { marginLeft: 35 }]
                              : SelectedItemsD.status == "Partially Delivered"
                                ? [styles.Eta, { marginLeft: 43, marginTop: 5 }]
                                : SelectedItemsD.status != "Delivered"
                                  ? [styles.Eta, { marginLeft: 45, marginTop: 6 }]
                                  : [styles.Eta]
                          }
                        >
                          {SelectedItemsD.status == "Delivered"
                            ? "Delivered on:"
                            : "ETA - "}
                          {SelectedItemsD.status == "Delivered"
                            ? "" +
                            this.getTimeAndDate(SelectedItemsD.completionDate)
                            : "" +
                            this.getTimeAndDate(
                              this.getETADate(SelectedItemsD)
                            )}
                        </Text>
                      </View>
                    )}
                  <Text style={styles.Etamsg}>
                    {this.getRunningstatus(SelectedItemsD)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.invoiceSeparater2} />

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Image
                style={styles.imageStyle}
                source={
                  this.getImageURL(SelectedItemsD)
                    ? {
                      uri:
                        AppConfig.ITEMS_IMAGES_SUB_URL +
                        this.getImageURL(SelectedItemsD),
                    }
                    : ICON.IMG_DEFAULT
                }
              ></Image>
              <View style={{ flexDirection: "column", marginRight: 50 }}>
                <View style={styles.viewItemIdBGStyle}>
                  <View style={styles.partNuView}>
                    <Text style={styles.textItemsID}>
                      Item no: {SelectedItemsD.product.cpn}
                    </Text>
                  </View>
                </View>
                <Text style={styles.textDesc}>
                  {SelectedItemsD.product.name}
                </Text>
              </View>
            </View>

            <View style={styles.viewPriceQuantityAndTAmount}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.viewQuantity}>
                  <Text style={styles.LeftText1}>Customer Due Date</Text>
                  <Text style={styles.LeftText2}>{converted_date}</Text>
                </View>
                {length > 1 || undefined ? (
                  <View
                    style={[styles.viewQuantity, { alignItems: "flex-end" }]}
                  >
                    <Text style={[styles.LeftText1]}>Price</Text>
                    <Text style={styles.LeftText2}>
                      {SelectedItemsD.rate.amount}{" "}
                      {SelectedItemsD.rate.currency} /{" "}
                      {SelectedItemsD.quantity.uom}
                    </Text>
                  </View>
                ) : global.getConfigResponse == null || undefined ? (
                  <>
                    {
                      <View
                        style={[
                          styles.viewQuantity,
                          { alignItems: "flex-end" },
                        ]}
                      >
                        <Text style={[styles.LeftText1]}>Price</Text>
                        <Text style={styles.LeftText2}>
                          {SelectedItemsD.rate.amount}{" "}
                          {SelectedItemsD.rate.currency} /{" "}
                          {SelectedItemsD.quantity.uom}
                        </Text>
                      </View>
                    }
                  </>
                ) : global.getBranch_RoleName == global.Config_RoleName ? (
                  <>
                    {(global.Config_ItemPriceHideFlag == undefined || null
                      ? null
                      : global.Config_ItemPriceHideFlag) == true ? null : (
                      <View
                        style={[
                          styles.viewQuantity,
                          { alignItems: "flex-end" },
                        ]}
                      >
                        <Text style={[styles.LeftText1]}>Price</Text>
                        <Text style={styles.LeftText2}>
                          {SelectedItemsD.rate.amount}{" "}
                          {SelectedItemsD.rate.currency} /{" "}
                          {SelectedItemsD.quantity.uom}
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
                  marginTop: 8,
                }}
              >
                <View
                  style={[
                    length > 1 || undefined
                      ? [styles.viewPrice]
                      : (global.Config_ItemPriceHideFlag == undefined || null
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
                    {SelectedItemsD.quantity.qty} {SelectedItemsD.quantity.uom}
                  </Text>
                  <Text style={styles.LeftText3}>
                    Pending Qty -{" "}
                    {SelectedItemsD.history.remainingShippedQty != undefined
                      ? SelectedItemsD.history.remainingShippedQty.toFixed(2)
                      : SelectedItemsD.quantity.qty.toFixed(2)}{" "}
                    {SelectedItemsD.quantity.uom}
                  </Text>
                </View>
                {length > 1 || undefined ? (
                  <View style={[styles.viewTotalAmount]}>
                    <Text style={styles.LeftText1}>Total Amount</Text>
                    <Text style={[styles.LeftText2, , { textAlign: "right" }]}>
                      {SelectedItemsD.amount.amountWithTax
                        ? SelectedItemsD.amount.amountWithTax.toFixed(2)
                        : 0.0}{" "}
                      {SelectedItemsD.rate.currency}
                    </Text>
                    <Text style={styles.LeftText3}>
                      {SelectedItemsD.tax.taxValue}% Tax
                    </Text>
                  </View>
                ) : global.getConfigResponse == null || undefined ? (
                  <>
                    {
                      <View style={[styles.viewTotalAmount]}>
                        <Text style={styles.LeftText1}>Total Amount</Text>
                        <Text
                          style={[styles.LeftText2, , { textAlign: "right" }]}
                        >
                          {SelectedItemsD.amount.amountWithTax
                            ? SelectedItemsD.amount.amountWithTax.toFixed(2)
                            : 0.0}{" "}
                          {SelectedItemsD.rate.currency}
                        </Text>
                        <Text style={styles.LeftText3}>
                          {SelectedItemsD.tax.taxValue}% Tax
                        </Text>
                      </View>
                    }
                  </>
                ) : global.getBranch_RoleName == global.Config_RoleName ? (
                  <>
                    {(global.Config_ItemPriceHideFlag == undefined || null
                      ? null
                      : global.Config_ItemPriceHideFlag) == true ? null : (
                      <View style={[styles.viewTotalAmount]}>
                        <Text style={styles.LeftText1}>Total Amount</Text>
                        <Text
                          style={[styles.LeftText2, , { textAlign: "right" }]}
                        >
                          {SelectedItemsD.amount.amountWithTax
                            ? SelectedItemsD.amount.amountWithTax.toFixed(2)
                            : 0.0}{" "}
                          {SelectedItemsD.rate.currency}
                        </Text>
                        <Text style={styles.LeftText3}>
                          {SelectedItemsD.tax.taxValue}% Tax
                        </Text>
                      </View>
                    )}
                  </>
                ) : null}
              </View>
            </View>
            <View style={styles.bottomSeparator}></View>
          </CardView>
          {SelectedItemsD?.groupedStatus == "Processing" ||
            SelectedItemsD?.invoicing.length == 0 ? (
            <View style={styles.inVoiceView2}>
              <View style={styles.msgWrap}>
                <ICONS
                  color="black"
                  name="info"
                  size={18}
                  style={{ fontWeight: "bold" }}
                />
                <Text numberOfLines={2} style={[styles.shippedmsg]}>
                  You will be able to see the details once the item is shipped
                </Text>
              </View>
              <View style={styles.inVoiceWrap}>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.shippedmsg,
                    { position: "absolute", top: 15, left: 20, width: 280 },
                  ]}
                >
                  Items in processing stage will go through 5 sub-steps
                </Text>
              </View>
              <View style={styles.stepsWrap}>
                <Text style={styles.stepdmsg}>STEP 1 :</Text>
                <Text style={[styles.stepdmsg, { marginLeft: 15 }]}>
                  Pending Clarification
                </Text>
              </View>
              <View style={[styles.stepsWrap, { top: 155 }]}>
                <Text style={styles.stepdmsg}>STEP 2 :</Text>
                <Text style={[styles.stepdmsg, { marginLeft: 15 }]}>
                  Accepted
                </Text>
              </View>
              <View style={[styles.stepsWrap, { top: 202 }]}>
                <Text style={styles.stepdmsg}>STEP 3 :</Text>
                <Text style={[styles.stepdmsg, { marginLeft: 15 }]}>
                  Material Being Procured
                </Text>
              </View>
              <View style={[styles.stepsWrap, { top: 250 }]}>
                <Text style={styles.stepdmsg}>STEP 4 :</Text>
                <Text style={[styles.stepdmsg, { marginLeft: 15 }]}>
                  QC in Progress
                </Text>
              </View>
              <View style={[styles.stepsWrap, { top: 300 }]}>
                <Text style={styles.stepdmsg}>STEP 5 :</Text>
                <Text style={[styles.stepdmsg, { marginLeft: 15 }]}>
                  QC Done - Ready to Ship
                </Text>
              </View>
            </View>
          ) : invoiceList && invoiceList.length ? (
            <View style={styles.ListViewContainer}>
              <Text style={[styles.nostyle, { left: 20, bottom: 2 }]}>
                Item Details
              </Text>
              <FlatList
                style={styles.flatListStyle}
                contentContainerStyle={{ paddingBottom: 150 }}
                horizontal={false}
                showsVerticalScrollIndicator={true}
                data={invoiceList || []}
                onEndReached={this.reloadData}
                onEndReachedThreshold={0.7}
                renderItem={(list) => this.invoiceRenderItem(list)}
              />
            </View>
          ) : (
            <View style={styles.inVoiceView2}>
              <View style={styles.msgWrap}>
                <ICONS
                  color="black"
                  name="info"
                  size={18}
                  style={{ fontWeight: "bold" }}
                />
                <Text numberOfLines={2} style={[styles.shippedmsg]}>
                  You will be able to see the details once the item is shipped
                </Text>
              </View>
              <View style={styles.inVoiceWrap}>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.shippedmsg,
                    { position: "absolute", top: 15, left: 20, width: 280 },
                  ]}
                >
                  Items in processing stage will go through 5 sub-steps
                </Text>
              </View>
              <View style={styles.stepsWrap}>
                <Text style={styles.stepdmsg}>STEP 1 :</Text>
                <Text style={[styles.stepdmsg, { marginLeft: 15 }]}>
                  Pending Clarification
                </Text>
              </View>
              <View style={[styles.stepsWrap, { top: 155 }]}>
                <Text style={styles.stepdmsg}>STEP 2 :</Text>
                <Text style={[styles.stepdmsg, { marginLeft: 15 }]}>
                  Accepted
                </Text>
              </View>
              <View style={[styles.stepsWrap, { top: 202 }]}>
                <Text style={styles.stepdmsg}>STEP 3 :</Text>
                <Text style={[styles.stepdmsg, { marginLeft: 15 }]}>
                  Material Being Procured
                </Text>
              </View>
              <View style={[styles.stepsWrap, { top: 250 }]}>
                <Text style={styles.stepdmsg}>STEP 4 :</Text>
                <Text style={[styles.stepdmsg, { marginLeft: 15 }]}>
                  QC in Progress
                </Text>
              </View>
              <View style={[styles.stepsWrap, { top: 300 }]}>
                <Text style={styles.stepdmsg}>STEP 5 :</Text>
                <Text style={[styles.stepdmsg, { marginLeft: 15 }]}>
                  QC Done - Ready to Ship
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
        <View style={styles.contactContainer}>
          <ContactPopup
            navigation={this.props.nav}
            isOpen={(info) => this.showOpen(info)}
          />
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
