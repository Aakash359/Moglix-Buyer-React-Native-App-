import React from "react";
import { styles } from "./style";
import PropTypes from "prop-types";
import { NavBarSearchOrder } from "../Commons";
import { Keyboard } from "react-native";
import { ICON, AppConfig } from "../../constants";
import DatabaseManager from "../../Storage/storage";
import moment from "moment";
import CardView from "react-native-cardview";
import { GlobalService } from "../../utils/GlobalService";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableHighlight,
} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';

var DATA = [];

export default class SearchOrder extends React.Component {
  static propTypes = {
    backButtonAction: PropTypes.func,
    searchAction: PropTypes.func,
    clearSearchAction: PropTypes.func,
    nav: PropTypes.object,
    hitsData: PropTypes.array,
  };

  static defaultProps = {
    hitsData: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      update: true,
      showNodata: false,
      navOptions: [
        { label: "PO No.", value: "poNo" },
        { label: "Product No.", value: "product.cpn" },
        { label: "Product Name", value: "product.name" },
      ],
      selectedOption: "product.name",
    };
    this.getSearchedHistoryData();
  }

  onChangeOption = (option) => {
    var _firebaseObj = {
      Search_Header_Filter: option,
    }
    GlobalService.AnalyticFunction('Search_Header_Filter', _firebaseObj);
    this.setState({
      selectedOption: option,
    });
  };

  getSearchedHistoryData = async () => {
    const arrData = await DatabaseManager.getSearchedHistory();
    if (arrData != null) {
      DATA = JSON.parse(arrData);
    }
    this.setState({ update: !this.state.update });
  };

  crossButtonAction() {
    this.setState({ text: "" });
    Keyboard.dismiss();
    const { clearSearchAction } = this.props;
    clearSearchAction();
  }

  onEndEditingSearching = () => {



    if (this.state.text.trim().length > 0) {
      var _firebaseObj = {
        searchedText: this.state.text,
      }
      GlobalService.AnalyticFunction('searched_text', _firebaseObj);
      let found = DATA.find(
        (searchedText) =>
          searchedText.text.trim().toLowerCase() ===
          this.state.text.trim().toLowerCase()
      );

      if (found == null) {
        if (DATA.length > 9) {
          DATA.unshift({
            text: this.state.text.trim(),
            key: this.state.selectedOption,
          });
          DATA.pop();
        } else {
          DATA.unshift({
            text: this.state.text.trim(),
            key: this.state.selectedOption,
          });
        }

        DatabaseManager.saveSearchedHistory(JSON.stringify(DATA));
      }
      this.setState({ update: !this.state.update });

      const { searchAction } = this.props;
      const { text, selectedOption } = this.state;
      searchAction(text, selectedOption);
    } else {
      this.setState({ text: "" });
    }
  };

  onPressSearchedItem = (text) => {
    let index = [...DATA].findIndex((x) => x.text === text);
    let key = [...DATA][index].key;
    DATA.splice(index, 1);
    DATA.unshift({ text: text, key });
    this.setState({ text: text });
    DatabaseManager.saveSearchedHistory(JSON.stringify(DATA));
    const { searchAction } = this.props;
    searchAction(text, key);
  };

  clearAllAction() {
    DATA = [];
    this.setState({ text: "" });
    DatabaseManager.saveSearchedHistory(JSON.stringify(DATA));
  }

  orderListSelectItem(selectedItem) {
    const { nav } = this.props;
    nav.navigate("TrackItemsScreen", {
      SelectedItemsDet: selectedItem._source,
      comingFromItemsScreen: true,
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
  getButtonStatusBG(statusValue) {
    switch (statusValue.toUpperCase()) {
      case "IN PROCESS":
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
    try {
      var imageURL = "";
      try {
        if (item.product.extraDetails.images.length > 0) {
          imageURL = item.product.extraDetails.images[0].links.icon;
        }
        return imageURL;
      } catch (error) {
        return imageURL;
      }
    } catch (error) {
      console.log("Order List", error);
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
  getRunningstatus(item) {
    try {
      if (item._source.etaRunningDelay != undefined) {
        return item._source.etaRunningDelay;
      }
    } catch (error) {
      return "";
    }
  }

  render() {
    const { backButtonAction, hitsData } = this.props;

    var hitsArr = [];
    if (hitsData != null) {
      if (hitsData.length > 0) {
        hitsArr = hitsData;

      }
    }



    return (
      <SafeAreaView style={styles.container}>
        <NavBarSearchOrder
          onPressFilterButton={this.props.onPressFilterButton}
          values={this.state.text}
          navOptions={this.state.navOptions}
          selectedOption={this.state.selectedOption}
          onChangeOption={this.onChangeOption}
          onChange={(text) => this.setState({ text })}
          backButtonAction={backButtonAction}
          onEndEditingSearching={() => this.onEndEditingSearching()}
          crossButtonAction={() => this.crossButtonAction()}
        />
        <View style={styles.topSeparator}></View>
        {hitsArr.length == 0 && this.renderHistory()}
        {hitsArr.length > 0 && this.renderOrderList()}
      </SafeAreaView>
    );
  }

  renderHistory() {
    return (
      <View style={styles.historyContainer}>
        <View style={styles.historyTopContainer}>
          <View style={styles.historyIconContainer}>
            <Image
              style={styles.imageHistoryStyle}
              source={ICON.IC_SEARCH_HISTORY_LOGO}
            />
            <Text style={styles.searchTextStyle}>Search History:</Text>
          </View>
          <View style={styles.clearAllContainer}>
            {DATA.length == 0 && (
              <View style={styles.clearAllButtonStyle}>
                <Text style={styles.clearAllDisabledTextStyle}>CLEAR ALL</Text>
              </View>
            )}
            {DATA.length > 0 && (
              <TouchableOpacity onPress={() => this.clearAllAction()}>
                <View style={styles.clearAllButtonStyle}>
                  <Text style={styles.clearAllTextStyle}>CLEAR ALL</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {DATA.length == 0 && (
          <View style={styles.historyEmptyTextContainer}>
            <Text style={styles.emptyTextStyle}>
              There is no Search History Available
            </Text>
          </View>
        )}
        {DATA.length > 0 && (
          <View style={styles.searchedHistoryContainer}>
            <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.onPressSearchedItem(item.text)}
                >
                  <View style={styles.item}>
                    <Text style={styles.title}>{item.text}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.text}
            />
          </View>
        )}
      </View>
    );
  }

  renderOrderList() {
    const { hitsData } = this.props;

    var hits = [];
    if (hitsData != null) {
      if (hitsData.length > 0) {
        hits = hitsData;
      }
    }


    return (
      <View style={styles.ListViewContainer}>
        <FlatList
          horizontal={false}
          showsVerticalScrollIndicator={true}
          data={hits}
          keyExtractor={(i) => i.status}
          onEndReached={this.reloadData}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => this.orderListSelectItem(item)}
              underlayColor={"#ffffff"}
            >
              <CardView
                cardElevation={10}
                cardMaxElevation={10}
                cornerRadius={0}
                style={styles.ListRow}
              >
                <View style={styles.statusWrap}>
                
                  <View style={{ flexDirection: 'row', width: '55%' }}>
                    <View style={[styles.dot, this.getStatusColor(
                      item._source.groupedStatus
                    ),]}></View>
                    <View style={[styles.columnContainer, { marginTop: 8, marginLeft: 5 }]}>
                      <Text style={styles.status}>{item._source.groupedStatus.toUpperCase()}</Text>
                      {
                        (item._source.groupedStatus == "Processing" && item._source["subStatus"]) ?
                          <Text style={styles.textItemsID}>{item._source.subStatus}</Text> : null
                      }
                       {(item._source.groupedStatus =="Closed" && item._source["closingReason"]) &&     
                        <Text style={{color:"red", marginLeft:4}}>{item._source.closingReason}
                        </Text> }
                       
                      </View>
           
                  </View>
                  <View style={styles.EtaWrap2}>
                    
                    <View style={styles.columnContainer2}>
                    {item._source.groupedStatus != 'Closed' && <View style={item._source.status == 'Partially Delivered' ? [styles.columnContainer2, { width: 137 }] : [styles.columnContainer2]}>
                        {item._source.status != "CANCELLED" && (
                          <Text style={this.getRunningstatus(item) ? [styles.Eta, { marginLeft: 35, }] :
                            item._source.status == 'Closed' ? [styles.Eta, { marginTop: 15, marginLeft: 40, }] :
                              item._source.status == 'Delivered' ? [styles.Eta, { marginTop: 12, }] :
                                item._source.status == 'Partially Delivered' ? [styles.Eta, { marginLeft: 45, marginTop: 12 }] :
                                  item._source.status != "Delivered" ? [styles.Eta, { marginLeft: 25, marginTop: 5 }] : styles.Eta}>
                            {item._source.status == "Delivered"
                              ? "Delivered on: "
                              : "ETA - "}
                            {item._source.status == "Delivered"
                              ? "" +
                              this.getTimeAndDate(item._source.completionDate)
                              : "" + this.getTimeAndDate(this.getETADate(item))}
                          </Text>
                        )}
                        <Text style={styles.Etamsg}>{this.getRunningstatus(item)}</Text>
                      </View>}
                    </View> 
                    {item._source.groupedStatus == 'Closed' ?
              <Icon
              color="#454F63"
              name="right"
              style={styles.leftClosedArrow}
            />:
                    <Icon
                      color="#454F63"
                      name="right"
                      style={[item._source.status == 'Partially Delivered' ? [styles.leftArrow, { marginTop: 4 }] :
                        item._source.status == 'Closed' ? [styles.leftArrow, { marginTop: 8 }] :
                          item._source.status == 'Delivered' ? [styles.leftArrow, { marginTop: 4 }] : [styles.leftArrow]]}
                    /> }
                  </View>
                </View>
                <View style={styles.invoiceSeparater} />
                <View style={styles.ListRowInnerFirstView}>
                  <View style={styles.viewOrderNumberBGStyle}>
                    <View style={styles.orderNoView}>
                      <Text style={styles.orderNoLable}>
                        Order No
                      </Text>
                      <Text style={styles.orderNo}>
                        {item._source.history.po.customerPoNo}
                      </Text>
                    </View>
                    <View style={styles.partNuView}>
                      <Text style={styles.textItemsID}>
                        Item no: {this.getCPN(item)}
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
                  <View style={{ flexDirection: "column", marginRight: 50, }}>
                    <Text style={styles.textDesc}>
                      {this.getProductName(item)}{" "}
                    </Text>
                    <View style={styles.warpper}>
                      <Text style={styles.LeftText4}>Qty</Text>
                      <Text style={styles.LeftText4}>
                        {this.getQuantity(item)} {this.getUOM(item)}
                      </Text>
                      <Text style={styles.pendingQty}>
                        (Pending Qty -{" "}
                        {this.getRemainingDeliveredQty(item).toFixed(2)}{" "}
                        {this.getUOM(item)})
                      </Text>
                    </View>


                  </View>
                </View>
              </CardView>
            </TouchableHighlight>
          )}
        />
        <Text
          style={
            Object.keys(hits.length) > 0
              ? styles.NoDataAvailableStyle
              : styles.DataAvailableStyle
          }
        >
          No data available
        </Text>
      </View>
    );
  }
}
