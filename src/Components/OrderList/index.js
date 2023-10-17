import React, { Component } from "react";
import {
  FlatList,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  ScrollView,
} from "react-native";
import PropTypes from "prop-types";
import OrderListNavBar from "../../Components/Commons/NavBars/CommonNavBars/CommonNavBars";
import { styles } from "./style";
import moment from "moment";
import CardView from "react-native-cardview";
import ContactPopup from "../ContactPopup/index";
import { ICON, AppConfig, colors } from "../../constants";
import DatabaseManager from "../../Storage/storage";
import Toast from "react-native-simple-toast";
import { GlobalService } from "../../utils/GlobalService";
import MultiSelect from "react-native-multiple-select";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

let listViewRef;

export default class OrderList extends Component {
  static propTypes = {
    onPressBackButton: PropTypes.func,
    onPressFilterButton: PropTypes.func,
    searchButton: PropTypes.func,
    onTabButton: PropTypes.func,
    nav: PropTypes.object,
    hitsData: PropTypes.array.isRequired,
    upcomingData: PropTypes.array.isRequired,
    selectedTabString: PropTypes.string,
    onValueChange: PropTypes.func,
    checkedValue: PropTypes.bool,
  };

  static defaultProps = {
    checkedValue: false,
  };

  constructor(props) {
    super(props);
    this.myRef = React.createRef({});
    this.state = {
      // totalCountValue: 0,
      isApply: true,
      isDelivered: false,
      isAll: true,
      currentItem: "ALL",
      isCheck: false,
      modalVisible: false,
      isFilter: false,
      hitsData: this.props.hitsData,
      upcomingData: this.props.hits,
      currentFilter: ["", "", "", ""],
      hideScroll: false,
      selectedItems: [],
    };
    this.isFilter = false;
  }

  componentDidMount = async () => {
    const arrData = await DatabaseManager.getFilterData();
    let userDataTemp = await DatabaseManager.getUserProfile();
    if (arrData) {
      var data = JSON.parse(arrData);
      this.isFilter = false;
      data.map((item) => {
        if (item) {
          this.setState({ isFilter: true, currentFilter: data });
        }
      });
    }
    if (this.props.navigation.getParam("fromProcessing")) {
      setTimeout(() => {
        this.activeOrderTabSelectItem({ key: "IN-PROCESS", total: 0 });
      }, 1500);
    }
    if (this.props.navigation.getParam("fromShipped")) {
      setTimeout(() => {
        this.activeOrderTabSelectItem({ key: "SHIPPED", total: 0 });
      }, 1500);
    }
  };

  activeOrderTabSelectItem = async (selectedItem) => {
    const arrData = await DatabaseManager.getFilterData();
    if (arrData) {
      var data = JSON.parse(arrData);
      this.isFilter = false;

      data.map((item) => {
        if (item) {
          this.setState({ isFilter: true });
        }
      });
    }
    try {
      const { onTabButton } = this.props;
      this.setState({ selectedItem });

      this.setState({ currentItem: selectedItem.key });
      var _firebaseObj = {
        activeItem_sortby: selectedItem.key,
      };

      GlobalService.AnalyticFunction("activeItem_sortby", _firebaseObj);
      this.setState({ isDelivered: false, isAll: false });
      if (selectedItem.key == "DELIVERED") {
        this.setState({ isDelivered: true });
      }
      if (selectedItem.key == "ALL") {
        this.setState({ isAll: true });
      }
      onTabButton(selectedItem.key, 10);
    } catch (error) { }
  };

  orderListSelectItem(selectedItem) {
    try {
      const { nav } = this.props;
      var _firebaseObj = {
        order_item: selectedItem._source,
      };

      GlobalService.AnalyticFunction("order_item", _firebaseObj);
      nav.navigate("TrackItemsScreen", {
        SelectedItemsDet: selectedItem._source,
        comingFromItemsScreen: true,
      });
    } catch (error) { }
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

  reloadData = () => {
    try {
      const { onTabButton, hitsData, selectedTabString } = this.props;
      const { total, hits } = hitsData;

      if (this.state.isAll) {
        if (hits.length > 500) {
          Toast.show(
            "You have reached max data limit. Kindly search the item you are looking for."
          );
        }
        if (total > hits.length && hits.length <= 500) {
          onTabButton(selectedTabString.toUpperCase(), hits.length + 10);
          return true;
        } else {
          return true;
        }
      }
      if (hits.length > 100) {
        Toast.show(
          "You have reached max data limit. Kindly search the item you are looking for."
        );
      }

      if (total > hits.length && hits.length <= 100) {
        onTabButton(selectedTabString.toUpperCase(), hits.length + 10);
      }
    } catch (error) { }
  };

  // reloadSubStatusFilterData = () => {

  //   try {
  //     const { onTabButton, selectedTabString, subStatusFilterList } = this.props;

  //     const { total, hits } = subStatusFilterList

  //     if (this.state.isAll) {
  //       console.log("normal load ho raha hai ", total > hits.length && hits.length <= 500);
  //       if (hits.length > 500) {
  //         Toast.show(
  //           "You have reached max data limit. Kindly search the item you are looking for."
  //         );
  //       }
  //       if (total > hits.length && hits.length <= 500) {
  //         onTabButton(selectedTabString.toUpperCase(), hits.length + 10);
  //         return true;
  //       } else {
  //         return true;
  //       }
  //     }
  //     if (hits.length > 100) {
  //       Toast.show(
  //         "You have reached max data limit. Kindly search the item you are looking for."
  //       );
  //     }

  //     if (total > hits.length && hits.length <= 100) {
  //       onTabButton(selectedTabString.toUpperCase(), hits.length + 10);
  //     }
  //   } catch (error) {
  //   }
  // };

  getButtonStatusBG(statusValue) {
    switch (statusValue.toUpperCase()) {
      case "PROCESSING":
        return styles.PlacedBG;
      case "IN-PROCESS":
        return styles.PlacedBG;
      case "PLACED":
        return styles.PlacedBG;
      case "CONFIRMED":
        return styles.ConfirmedBG;
      case "SHIPPED":
        return styles.ShippedBG;
      case "DELIVERED":
        return styles.DliveredBG;
      default:
        return styles.CreatedBG;
    }
  }

  getButtonSelectedStatusBG(statusValue) {
    switch (statusValue.toUpperCase()) {
      case "PROCESSING":
        return styles.PlacedSBG;
      case "IN-PROCESS":
        return styles.PlacedSBG;
      case "PLACED":
        return styles.PlacedSBG;
      case "CONFIRMED":
        return styles.ConfirmedSBG;
      case "SHIPPED":
        return styles.ShippedSBG;
      case "DELIVERED":
        return styles.DliveredSBG;
      default:
        return styles.CreatedSBG;
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

  getItemListDataIsAvailable(hits) {
    try {
      if (hits.length > 0) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return true;
    }
  }
  getAmount(item) {
    try {
      return item._source.amount.amountWithTax.toFixed(2);
    } catch (error) {
      return 0.0;
    }
  }

  getPONumber(item) {
    try {
      return item._source.history.po.customerPoNo;
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

  getRunningstatus(item) {
    try {
      if (item._source.etaRunningDelay != undefined) {
        return item._source.etaRunningDelay;
      }
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

  getProductName(item) {
    try {
      return item._source.product.name;
    } catch (error) {
      return "";
    }
  }
  uprenderItem = (data, selectedT) => {
    global.tab = selectedT;
    var item = data.item;
    return (
      <TouchableOpacity
        onPress={() => {
          this.upButtonHandler();
          this.activeOrderTabSelectItem(item);
        }}
        activeOpacity={0.7}
      >
        <View
          style={[
            this.getButtonStatusBG(item.key),
            selectedT == item.key
              ? [
                this.getButtonSelectedStatusBG(item.key),
                styles.CellSelectedContainer,
              ]
              : styles.CellUnSelectedContainer,
          ]}
        >
          <Text style={styles.item}>
            {item.key} ({item.total ? item.total : 0})
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  myrenderItem = (data) => {
    const { upcomingData } = this.props;
    var upComingItem = this.upComingItemList(upcomingData);
    global.upcomingDate = new Date(
      new Date().setDate(new Date().getDate() + 50)
    ).getTime();
    global.currentDate = new Date(
      new Date().setDate(new Date().getDate())
    ).getTime();
    var item = data.item;
    return (
      <>
        <TouchableOpacity
          onPress={() => this.orderListSelectItem(item)}
          activeOpacity={0.7}
        >
          {tab == "SHIPPED" &&
            upComingItem.length == data.index &&
            upComingItem.length > 0 ? (
            <Text style={styles.otherDays}>Other items to be delivered</Text>
          ) : null}
          <CardView
            cardElevation={10}
            cardMaxElevation={10}
            cornerRadius={0}
            style={styles.ListRow}
          >
            {
              (item._source.groupedStatus == "Closed"
                && item._source["closingReason"]) ?
                <Text style={{ color: "red", marginLeft: 4 }}>
                  {item._source["closingReason"]}
                </Text> : null
            }
            <View style={styles.statusWrap}>
              <View style={{ flexDirection: "row", width: "55%" }}>
                <View
                  style={[
                    item._source.groupedStatus == "Processing"
                      ? [
                        item._source.subStatus
                          ? [styles.dot, { marginTop: 10 }]
                          : [styles.dot, { marginTop: 0 }],
                      ]
                      : [styles.dot, { marginTop: 4 }],
                    this.getStatusColor(item._source.groupedStatus),
                  ]}
                ></View>

                <View
                  style={
                    item._source.groupedStatus != "Processing"
                      ? [
                        styles.columnContainer,
                        { marginTop: 5, marginLeft: 5 },
                      ]
                      : item._source.subStatus
                        ? [
                          styles.columnContainer,
                          { marginTop: 8, marginLeft: 5 },
                        ]
                        : [
                          styles.columnContainer,
                          { marginTop: 18, marginLeft: 5 },
                        ]
                  }
                >
                  <Text style={styles.groupedStatus}>
                    {item._source.groupedStatus.toUpperCase()}
                  </Text>
                  {item._source.groupedStatus == "Processing" ? (
                    <Text style={[styles.statusItem]}>
                      {item._source.subStatus}
                    </Text>
                  ) : null}

                  {(item._source.groupedStatus == "Closed"
                    && item._source["closingReason"]) ?
                    <Text style={{ color: "red", marginLeft: 4 }}>
                      {item._source["closingReason"]}
                    </Text> : null
                  }
                </View>
              </View>
              <View style={styles.EtaWrap2}>
                <View style={styles.columnContainer2}>
                  {item._source.groupedStatus != "CANCELLED" &&
                    item._source.groupedStatus != "Returned" &&
                    item._source.groupedStatus != "Closed" ? (
                    <View
                      style={[
                        this.getRunningstatus(item)
                          ? [styles.EtaWrap, { marginTop: 5 }]
                          : [styles.EtaWrap, { marginTop: 13 }],
                      ]}
                    >
                      {item._source.groupedStatus == "Returned" ? (
                        <Text numberOfLines={2} style={styles.Eta}>
                          {" "}
                          ETA - Not Applicable
                        </Text>
                      ) : null}
                      <Text
                        style={
                          this.getRunningstatus(item)
                            ? [styles.Eta, { marginLeft: 35 }]
                            : item._source.groupedStatus ==
                              "Partially Delivered"
                              ? [styles.Eta, { marginLeft: 15 }]
                              : item._source.groupedStatus != "Delivered"
                                ? [styles.Eta, { marginLeft: 25, marginTop: 0 }]
                                : styles.Eta
                        }
                      >
                        {item._source.groupedStatus == "Delivered"
                          ? "Delivered on:"
                          : "ETA - "}
                        {item._source.groupedStatus == "Delivered"
                          ? "" +
                          this.getTimeAndDate(item._source.completionDate)
                          : "" + this.getTimeAndDate(this.getETADate(item))}
                      </Text>
                      <Text style={styles.Etamsg}>
                        {this.getRunningstatus(item)}
                      </Text>
                    </View>
                  ) : null
                  }
                </View>
                {(item._source.groupedStatus == "Closed" || item._source.groupedStatus == "Returned") ? (
                  <Icon
                    color="#454F63"
                    name="right"
                    style={styles.leftClosedArrow}
                  />
                ) : (
                  <Icon color="#454F63" name="right" style={styles.leftArrow} />
                )}
              </View>
            </View>

            <View style={styles.invoiceSeparater} />

            <View style={styles.ListRowInnerFirstView}>
              <View style={styles.viewOrderNumberBGStyle}>
                <View style={styles.orderNoView}>
                  <Text style={styles.orderNoLable}>Order No.</Text>
                  <Text style={styles.orderNo}>{this.getPONumber(item)}</Text>
                </View>
                <View style={styles.partNuView}>
                  <Text style={styles.textItemsID}>
                    Item No. {this.getCPN(item)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.viewProductDesc}>
              <Image
                style={styles.imageStyle}
                source={
                  this.getImageURL(item._source)
                    ? {
                      uri:
                        AppConfig.ITEMS_IMAGES_SUB_URL +
                        this.getImageURL(item._source),
                    }
                    : ICON.IMG_DEFAULT
                }
              ></Image>
              <View style={{ flexDirection: "column", marginRight: 50 }}>
                <Text numberOfLines={2} style={styles.textDesc}>
                  {this.getProductName(item)}{" "}
                </Text>

                <View style={styles.warpper}>
                  <Text style={styles.LeftText4}>Qty - </Text>
                  <Text style={styles.LeftText4}>
                    {this.getQuantity(item)} {this.getUOM(item)}
                  </Text>
                  <Text style={styles.pendingQty}>
                    ( Pending Qty -{" "}
                    {this.getRemainingDeliveredQty(item).toFixed(2)}{" "}
                    {this.getUOM(item)})
                  </Text>
                </View>
              </View>
            </View>
          </CardView>
        </TouchableOpacity>
      </>
    );
  };
  getQuantity(item) {
    try {
      return item._source.quantity.qty;
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

  getCurrency(item) {
    try {
      return item._source.rate.currency;
    } catch (error) {
      return "";
    }
  }

  getTaxValue(item) {
    try {
      return item._source.tax.taxValue;
    } catch (error) {
      return "";
    }
  }

  getImage(status) {
    switch (status) {
      case "Processing":
        return ICON.IMG_INPROCESS;
      case "Shipped":
        return ICON.IMG_SHIPPED;
      case "Delivered":
        return ICON.IMG_DELIVERED;
      default:
        return ICON.IMG_FORWARD;
    }
  }

  getItemList(hitsData) {
    try {
      const { hits } = hitsData;
      return hits;
    } catch (error) {
      return "";
    }
  }

  upComingItemList(upComingData) {
    try {
      const { hits } = upComingData;
      global.sourceID = hits.map(a => a._source.id);
      // console.log('====================================');
      // console.log("Aakash====>", global.sourceID);
      // console.log('====================================');
      return hits;
    } catch (error) {
      return "";
    }
  }

  getSubStatusList(subStatusFilterList) {
    try {
      const { hits } = subStatusFilterList;
      return hits;
    } catch (error) {
      return "";
    }
  }

  getTotalItem(hitsData) {
    try {
      const { total } = hitsData;
      return total;
    } catch (error) {
      return 0;
    }
  }

  getsubStatusTotal(subStatusFilterList) {
    try {
      const { total } = subStatusFilterList;
      return total;
    } catch (error) {
      return 0;
    }
  }

  componentDidUpdate = async (prevProps) => {
    if (
      prevProps.hitsData !== this.props.hitsData &&
      prevProps?.upcomingData?.hits !== this.props?.upcomingData?.hits
    ) {
      const arrData = await DatabaseManager.getFilterData();
      var data = JSON.parse(arrData);
      var newFilter = false;
      if (
        JSON.stringify(this.state.currentFilter) !==
        JSON.stringify(["", "", "", ""]) &&
        JSON.stringify(data) === JSON.stringify(["", "", "", ""])
      ) {
        this.setState({ isFilter: false, currentFilter: data });
        this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
        this.activeOrderTabSelectItem({ key: "ALL", total: 0 });
      }
      if (JSON.stringify(data) !== JSON.stringify(this.state.currentFilter)) {
        this.setState({ currentFilter: data });
        newFilter = true;
      }
      if (this.state.currentItem != "ALL" && newFilter) {
        const arrData = await DatabaseManager.getFilterData();
        var data = JSON.parse(arrData);
        this.isFilter = false;
        data.map((item) => {
          if (item) {
            this.isFilter = true;
            this.setState({ isFilter: true, currentFilter: data });
            this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
            this.activeOrderTabSelectItem({ key: "ALL", total: 0 });
          }
        });
      }
    }
  };
  handleScroll = (event) => {
    this.setState({ hideScroll: false });
    if (event.nativeEvent.contentOffset.x >= 10) {
      this.setState({ hideScroll: true });
    }
  };

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };
  selectAll = (param) => {
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
    if (param == "fromClear") {
      this.setState({ selectedItems: [] });
    } else {
      this.setState({ selectedItems: arr });
    }

    this.props.onTabButton("ALL", 10);
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.props.selectedUserIds(arr);
  };

  responder() {
    if (
      this &&
      this.myRef &&
      this.myRef.current &&
      this.myRef.current._clearSelectorCallback
    ) {
      this.myRef.current._clearSelectorCallback();
    }
  }
  upButtonHandler = () => {
    listViewRef.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  onPress = () => {
    var _firebaseObj = {
      upcoming_strip_event: global.upcomingDate,
    };
    this.activeOrderTabSelectItem({ key: "SHIPPED", total: global.shipped });
    GlobalService.AnalyticFunction("upcoming_strip_event", _firebaseObj);
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  openFilter = async () => {
    this.setModalVisible(true);
  };

  myFilterList = (item, index) => {
    const { subStatusBuckets } = this.props;
    global.QCDone = 0;
    global.MateBeing = 0;
    global.QCProgres = 0;
    global.Accepted = 0;
    (global.Other = 0), (global.PendingClarification = 0);
    subStatusBuckets.forEach(function (arrayItem) {
      const { key, doc_count } = arrayItem;

      if (key == "QC Done - Ready to Ship") {
        global.QCDone = doc_count == undefined || null ? 0 : doc_count;
      }
      if (key == "Material Being Procured") {
        global.MateBeing = doc_count == undefined || null ? 0 : doc_count;
      }
      if (key == "QC in Progress") {
        global.QCProgres = doc_count == undefined || null ? 0 : doc_count;
      }
      if (key == "Accepted") {
        global.Accepted = doc_count == undefined || null ? 0 : doc_count;
      }
      if (key == "Pending Clarification") {
        global.PendingClarification =
          doc_count == undefined || null ? 0 : doc_count;
      }
    });
    global.Other =
      global.totalCountValue -
      (global.QCDone +
        global.Accepted +
        global.MateBeing +
        global.QCProgres +
        global.PendingClarification);
    global.totalSum =
      global.Other +
      (global.QCDone + global.Accepted + global.MateBeing + global.QCProgres);

    return (
      <>
        <ScrollView
          style={{ marginBottom: 0 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {index == [0] ? null : (
              <View
                style={[styles.invoiceSeparater, { marginHorizontal: -150 }]}
              />
            )}
            <View style={styles.checkBoxWrapper}>
              <CheckBox
                checked={item?.checked}
                checkedIcon={
                  <Icons
                    name="checkbox-marked-outline"
                    size={25}
                    color={colors.DEFAULT_RED_COLOR}
                  />
                }
                uncheckedIcon={
                  <Icons
                    name="checkbox-blank-outline"
                    size={25}
                    color={colors.DEFAULT_RED_COLOR}
                  />
                }
                onPress={() => {
                  this.props.checkedItems(item.id),
                    this.setState({ isApply: false });
                }}
              />
              <Text style={styles.filterList_Text}>{item?.label}</Text>
              <Text style={[styles.filterList_Text, { marginLeft: 5 }]}>
                {item?.label == "QC Done - Ready to Ship"
                  ? `(${global.QCDone})`
                  : item?.label == "Material Being Procured"
                    ? `(${global.MateBeing})`
                    : item?.label == "QC in Progress"
                      ? `(${global.QCProgres})`
                      : item?.label == "Accepted"
                        ? `(${global.Accepted})`
                        : item?.label == "Pending Clarification"
                          ? global.PendingClarification == undefined || null
                            ? `(${0})`
                            : `(${global.PendingClarification})`
                          : item?.label == "Other"
                            ? `(${global.Other})`
                            : item?.label == "ALL"
                              ? `(${global.totalCountValue})`
                              : null}
              </Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  };

  render() {
    const { selectedItems } = this.state;

    const filterData =
      this.props.userFilterData &&
        this.props.userFilterData.data &&
        this.props.userFilterData.data.userResponse
        ? this.props.userFilterData.data.userResponse
        : [];

    const {
      onPressBackButton,
      onPressFilterButton,
      searchButton,
      hitsData,
      selectedTabString,
      upcomingData,
      subStatusFilterList,
      visible,
      onPressFilter,
    } = this.props;
    var hits = this.getItemList(hitsData);
    var filterhits = this.getSubStatusList(subStatusFilterList);
    var upComingItem = this.upComingItemList(upcomingData);
    global.subStatusTotal = this.getsubStatusTotal(subStatusFilterList);
    global.totalCountValue = this.getTotalItem(hitsData);
    var selectedT = selectedTabString.toUpperCase();
    if (selectedTabString.toUpperCase() == "") {
      selectedT = "ALL";
    }

    if (this.state.isAll) {
      global.activeOrders = 0;
      global.shipped = 0;
      global.delivered = 0;
      global.inProcess = 0;
      global.other = 0;
      var partiallyDelivered = 0;
      var partiallyShipped = 0;
      this.props.buckets.forEach(function (arrayItem) {
        const { key, doc_count } = arrayItem;

        if (key == "Partially Delivered") {
          partiallyDelivered = doc_count;
        }
        if (key == "Partially Shipped") {
          partiallyShipped = doc_count;
        }
        if (key == "Delivered") {
          global.delivered = doc_count;
        }
        if (key == "Processing") {
          global.inProcess = doc_count;
        }
        if (key == "Shipped") {
          global.shipped = doc_count;
        }
        if (
          key != "Shipped" &&
          key != "PR Created" &&
          key != "Revised" &&
          key != "Delivered" &&
          key != "Processing" &&
          key != "Partially Shipped" &&
          key != "Partially Delivered"
        ) {
          global.other = global.other + doc_count;
        }
        global.activeOrders =
          inProcess +
          shipped +
          other +
          delivered +
          partiallyDelivered +
          partiallyShipped;
      });
      global.delivered = global.delivered + partiallyDelivered;
      global.shipped = global.shipped + partiallyShipped;
    }
    let tab = global.tab;
    const filtersData = this.props.filterListData.filter((item) => {
      return item.checked == true;
    });
    return (
      <SafeAreaView style={styles.container}>
        <OrderListNavBar
          selectedTab={this.state.currentItem}
          BackAction={onPressBackButton}
          FilterAction={() => {
            onPressFilterButton();
            this.activeOrderTabSelectItem({ key: "ALL", total: 0 });
          }}
          SearchAction={searchButton}
          isCheck={this.state.isCheck}
        />
        <View style={styles.topSeparator}></View>
        <View
          onStartShouldSetResponder={this.responder}
          style={styles.TabbedContainer}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.activeOrderText}>Active Items</Text>
            <View style={styles.wrapView}>
              <Text style={styles.allPlant}>Show my orders</Text>
              <CheckBox
                checked={this.props.checkedValue}
                checkedIcon={
                  <Icons
                    name="checkbox-marked-outline"
                    size={20}
                    style={{ marginLeft: 20 }}
                    color={colors.CHECK_BOX_COLOR}
                  />
                }
                uncheckedIcon={
                  <Icons
                    name="checkbox-blank-outline"
                    size={20}
                    style={{ marginLeft: 20 }}
                    color={colors.CHECK_BOX_COLOR}
                  />
                }
                onPress={() => {
                  this.props.checkBoxAction(
                    this.activeOrderTabSelectItem({ key: "ALL", total: 0 })
                  );
                }}
                style={styles.toggleStyle}
              />
            </View>
          </View>
          {this.props.umAssignedData &&
            this.props.umAssignedData.company &&
            this.props.umAssignedData.company.umAssigned ? (
            <View style={styles.orderlistPageInnerWrap}>
              <View
                style={{
                  backgroundColor: "transparent",
                  position: "relative",
                  paddingTop: 2,
                }}
              >
                <MultiSelect
                  ref={this.myRef}
                  hideTags={this.state.hideDropdown}
                  styleDropdownMenu={{ backgroundColor: "#f5f5f9" }}
                  styleMainWrapper={styles.multiSelectDrop}
                  styleDropdownMenuSubsection={{ backgroundColor: "#f5f5f9" }}
                  styleItemsContainer={{
                    maxHeight: 150,
                    backgroundColor: "#f5f5f9",
                  }}
                  styleInputGroup={{ backgroundColor: "#f5f5f9" }}
                  items={filterData}
                  uniqueKey="idUser"
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={selectedItems}
                  selectText="Select Users"
                  searchInputPlaceholderText="Search"
                  tagRemoveIconColor="#888"
                  tagBorderColor="#000"
                  tagTextColor="#333"
                  selectedItemTextColor="#DA191E"
                  selectedItemIconColor="#DA191E"
                  itemTextColor="#000"
                  displayKey="firstName"
                  styleTextDropdown={{ marginBottom: -10 }}
                  searchInputStyle={{
                    backgroundColor: "#f5f5f9",
                    color: "#CCC",
                    borderBottomWidth: 0,
                    paddingLeft: 10,
                  }}
                  displayKey2="lastName"
                  submitButtonColor={colors.DEFAULT_RED_COLOR}
                  submitButtonText="APPLY"
                  submitPressed={() => {
                    this.props.onTabButton("ALL", 10);
                    this.flatListRef.scrollToOffset({
                      animated: true,
                      offset: 0,
                    });
                    this.props.selectedUserIds(this.state.selectedItems);
                  }}
                />
              </View>
              <View style={styles.clearWrap}>
                <TouchableOpacity
                  style={styles.clearAll}
                  onPress={() => {
                    this.selectAll("fromClear");
                  }}
                >
                  <Text style={styles.clearText}>CLEAR ALL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.clearAll}
                  onPress={() => {
                    this.selectAll();
                  }}
                >
                  <Text style={styles.clearText}>SELECT ALL</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          <FlatList
            onScroll={(event) => this.handleScroll(event)}
            indicatorStyle={"black"}
            scrollIndicatorInsets={{ bottom: 0 }}
            horizontal={true}
            persistentScrollbar={true}
            showsHorizontalScrollIndicator={true}
            data={[
              { key: "ALL", total: global.activeOrders },
              { key: "IN-PROCESS", total: global.inProcess },
              { key: "SHIPPED", total: global.shipped },
              { key: "DELIVERED", total: global.delivered },
              { key: "OTHER", total: global.other },
              { key: "DELAYED", total: global.delayCount },
            ]}
            keyExtractor={(item) => item.id}
            renderItem={(item) => this.uprenderItem(item, selectedT)}
            style={styles.flatList}
          />
          {tab == "ALL" && upcomingData.total > 0 && hits && hits.length ? (
            <TouchableOpacity onPress={this.onPress} style={styles.stripView}>
              <View style={styles.wrap}>
                <Icon
                  color="#454F63"
                  name="shoppingcart"
                  style={{ fontSize: 20 }}
                />
                <Text style={styles.count}>{upcomingData.total}</Text>
                <Text style={styles.nextDays}>
                  items getting delivered in next 7 days
                </Text>
                <Icon
                  color="#454F63"
                  name="right"
                  style={{ fontSize: 16, top: 3 }}
                />
              </View>
            </TouchableOpacity>
          ) : tab == "SHIPPED" && upcomingData.total > 0 ? (
            <Text style={styles.weekDays}>Delivery for this week</Text>
          ) : tab == "IN-PROCESS" ? (
            <View style={styles.Shippedwrap}>
              <Text style={styles.showText}>
                Showing{" "}
                {global.subStatusfilterLength < 7
                  ? [global.subStatusTotal]
                  : global.totalCountValue}{" "}
                of {global.totalCountValue} items
              </Text>
              <TouchableOpacity onPress={() => this.openFilter()}>
                <View style={styles.filterView}>
                  <Icons
                    color="#454F63"
                    name="filter-variant"
                    style={[styles.filterIcon]}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {/* {!this.state.hideScroll && Platform.OS == "ios" && (
          <View
            style={{
              marginBottom: 10,
              marginTop: -25,
              marginLeft: 16,
              width: 150,
              height: 2,
              backgroundColor: "black",
            }}
          ></View>
        )} */}

        <View style={styles.ListViewContainer}>
          <FlatList
            style={styles.flatListStyle}
            contentContainerStyle={{ paddingBottom: 150 }}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={
              tab == "SHIPPED"
                ? upComingItem.concat(hits)
                : tab == "IN-PROCESS" && global.subStatusfilterLength < 7
                  ? filterhits
                  : hits
            }
            ref={(ref) => {
              listViewRef = ref;
            }}
            onEndReached={this.reloadData}
            onEndReachedThreshold={0.7}
            renderItem={this.myrenderItem}
            keyExtractor={(item) => item.id}
          />
          {upcomingData.total == 1 ? null : global.subStatusTotal == 0 ? (
            <Text
              style={
                this.getItemListDataIsAvailable(
                  global.subStatusfilterLength < 7 ? filterhits : hits
                )
                  ? styles.NoDataAvailableStyle
                  : styles.DataAvailableStyle
              }
            >
              No data available
            </Text>
          ) : (
            <Text
              style={
                this.getItemListDataIsAvailable(hits)
                  ? styles.NoDataAvailableStyle
                  : styles.DataAvailableStyle
              }
            >
              No data available
            </Text>
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            hasBackdrop={true}
            backdropOpacity={0.4}
            onRequestClose={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "#0000004D",
              }}
            >
              <View
                style={{
                  height: "75%",
                  marginTop: "auto",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  padding: 10,
                  backgroundColor: "white",
                }}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.headerText}>In-Process Filter</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Icon
                      color="#454F63"
                      name="closecircle"
                      style={[styles.crossArrow2]}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={[
                    styles.invoiceSeparater,
                    { marginHorizontal: -30, marginTop: 12 },
                  ]}
                />

                {this.props.filterListData.map(this.myFilterList)}
                <View style={styles.buttonHeader}>
                  <TouchableOpacity
                    disabled={this.props.filterListData[0].checked}
                    onPress={() => {
                      global.ClearSubStausFilter == "CLEAR FILTER";
                      this.setModalVisible(!this.state.modalVisible);
                      this.props.onClearFilterList();
                    }}
                  >
                    <Text
                      style={[
                        !this.props.filterListData[0].checked
                          ? [styles.buttonText, { color: "#D9232D" }]
                          : [styles.buttonText, { color: "#B4B4B4" }],
                      ]}
                    >
                      CLEAR FILTER
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={
                      filtersData.length == 0 || this.state.isApply == true
                        ? true
                        : false
                    }
                    onPress={() => {
                      if (
                        this.state.isApply == false || filtersData.length == 0
                          ? false
                          : true
                      ) {
                        this.setState({ isApply: false });
                      } else {
                        this.setModalVisible(!this.state.modalVisible);
                        this.props.onSelectedFilterList();
                      }
                    }}
                  >
                    <View
                      style={[
                        filtersData.length == 0 || this.state.isApply == true
                          ? styles.applyWrap
                          : [styles.applyWrap, { backgroundColor: "#D9232D" }],
                      ]}
                    >
                      <Text style={styles.buttonText}>APPLY</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.contactPopView}>
          <ContactPopup
            navigation={this.props.navigation}
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
