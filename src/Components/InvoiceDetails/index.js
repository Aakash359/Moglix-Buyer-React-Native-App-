import React, { Component } from "react";
import PropTypes from "prop-types";
import { styles } from "./style";
import CardView from "react-native-cardview";
import moment from "moment";
import { CUSTOM_FONT, ICON } from "../../constants";
import ContactPopup from "../ContactPopup/index";
import { View, Text, SafeAreaView, ScrollView, FlatList, Image } from "react-native";
import InvoiceDetailsNavBar from "../Commons/NavBars/CommonNavBars/InvoiceDetailsNavBar";
import Icon from "react-native-vector-icons/Fontisto";
import ICONS from "react-native-vector-icons/MaterialIcons";

const stepIndicatorStyles = {
  stepIndicatorSize: 20,
  currentIndicatorSize: 10,
  stepStrokWidth: 10,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 4,
  currentStepStrokeWidth: 10,
  stepStrokeCurrentColor: "#4AB316",
  separatorFinishedColor: "#4AB316",
  separatorUnFinishedColor: "#EDEDED",
  stepIndicatorFinishedColor: "#4AB316",
  stepIndicatorUnFinishedColor: "#EDEDED",
  stepIndicatorCurrentColor: "transparent",
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: "#000000",
  stepIndicatorLabelFinishedColor: "transparent",
  stepIndicatorLabelUnFinishedColor: "transparent",
  labelColor: "#666666",
  labelSize: 14,
  currentStepLabelColor: "#4AB316",
};

export default class InvoiceDetails extends Component {
  static propTypes = {
    onPressBackButton: PropTypes.func,
    trackingData: PropTypes.object,
    nav: PropTypes.object,
  };
  constructor(props) {
    super(props);
  }

  getItemTrackStatus(index) {
    try {
      const { itemsTrackDetailD } = this.props;
      console.log(this.props.itemsTrackDetailD);
      console.log(this.props.itemsTrackDetailD.length);
      var i;
      for (i = 0; i < this.props.itemsTrackDetailD.length; i++) {
        console.log("ok", this.props.itemsTrackDetailD[i].status);
        if (this.props.itemsTrackDetailD[i].status == "Delivered") {
          var found = this.props.itemsTrackDetailD[i];
          this.props.itemsTrackDetailD.splice(i, 1);
          this.props.itemsTrackDetailD.splice(2, 0, found);
          console.log("edited", this.props.itemsTrackDetailD);
        }
        if (this.props.itemsTrackDetailD[i].status == "Return Initiated") {
          var found = this.props.itemsTrackDetailD[i];
          this.props.itemsTrackDetailD.splice(i, 1);
          this.props.itemsTrackDetailD.splice(3, 0, found);
          console.log("edited 2 ", this.props.itemsTrackDetailD);
        }
      }
      const { status } = itemsTrackDetailD[index];
      return status;
    } catch (error) {
      return "";
    }
  }

  getETADate() {
    try {
      const { itemsTrackDetailD } = this.props;
      const data = itemsTrackDetailD.filter(
        (item) => item.status === "In-Process"
      );
      const { eta } = data[0];
      console.log("Aakas===>", eta);
      var fulldate = new Date(eta);
      var converted_date = moment(fulldate).format("DD/MM/YYYY");
      if (
        converted_date.toString() == "Invalid date" ||
        converted_date.toString() == "01/01/1970"
      ) {
        return "To be updated";
      } else {
        return converted_date.toString();
      }
      return data.eta;
    } catch (error) {
      console.log(error);
      return "To be updated";
    }
  }

  getTrackItemTimeAndDate(item) {
    let trackDate = item.date
    try {

      var fulldate = new Date(trackDate);
      var converted_date = moment(fulldate).format("DD/MM/YYYY");
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

  inVoiceTime(list) {
    let InvoiceDate = list.item.statusUpdateTime;
    try {
      var fulldate = new Date(InvoiceDate);

      var converted_date = moment(fulldate).format("DD/MM/YYYY");
      console.log("CreationdfDate", converted_date);
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



  getCurrentPage(fromCustom) {
    try {
      if (fromCustom) {
        return (
          (((this.props.normalOrderTrackData || {}).data || {}).track || [])
            .length - 1
        );
      }
      const { itemsTrackDetailD } = this.props;
      return Object.keys(itemsTrackDetailD).length - 1;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  invoiceDate() {
    const { invoiceData } = this.props;
    let item = invoiceData?.item;
    try {
      var date = item.invoiceDate;
      var fulldate = new Date(date);
      var converted_date = moment(fulldate).format("DD/MM/YYYY");
      if (
        converted_date.toString() == "Invalid date" ||
        converted_date.toString() == "01/01/1970"
      ) {
        return "To be updated";
      } else {
        return converted_date.toLocaleString();
      }
    } catch (error) {
      console.log(error);
      return "To be updated";
    }
  }

  showOpen(data) {
    if (data) {
      this.setState({ modalOver: true });
    } else {
      this.setState({ modalOver: false });
    }
  }

  invoiceTrackRenderItem = ({ item, index }) => {
    let date = item.statusUpdateTime;
    let slicedDate = date.slice(0, 10);
    let reverseDate = slicedDate.split("-").reverse().join("-");
    console.log("MyDate====>", reverseDate);
    const { SelectedItemsD, trackInvoice, trackingData } = this.props;
    return (
      <View style={styles.containerForIndicator}>
        <View style={{ flexDirection: "column", width: "20%", }}>
          <Text
            style={
              trackingData.status == "Returned"
                ? styles.whenReturnSubTitleInitStyle
                : styles.customLabelSubTitleTextStyle
            }
          >
            {this.getCurrentPage() >= 0 ? reverseDate : "To be updated"}
          </Text>
          <Text
            style={
              trackingData.status == "Returned"
                ? styles.whenReturnInitaitedStyle
                : styles.customLabelSelectedTitleTextStyle &&
                  this.getCurrentPage() >= 0
                  ? styles.Text1Style
                  : styles.customLabelTitleTextStyle
            }
          ></Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "20%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 15,
              borderRadius: 25,
              width: 15,
              backgroundColor: "#4AB316",
            }}
          ></View>
          {index ==
            (this.props.invoiceTrackDetailData?.orderScans || []).length - 1 ? (
            <View style={{ width: 4, height: 40 }}></View>
          ) : (
            <View
              style={{ width: 4, height: 40, backgroundColor: "#4AB316" }}
            ></View>
          )}
        </View>
        <View style={styles.customLabelInnerView}>
          <Text
            style={styles.Text2Style}
          >
            {item.status}
          </Text>
          <Text style={styles.Text3Style}>
            {item.location}
          </Text>
        </View>
      </View>
    );
  };


  invoiceTrackRenderItem2 = ({ item, index }) => {
    let date = item.statusUpdateTime;
    // let slicedDate = date.slice(0, 10);
    // let reverseDate = slicedDate.split("-").reverse().join("-");
    // console.log("MyDate====>",reverseDate);
    const { SelectedItemsD, trackInvoice, trackingData } = this.props;
    return (
      <View style={styles.containerForIndicator}>
        <View style={{ flexDirection: "column", width: "20%", }}>
          <Text
            style={
              trackingData.status == "Returned"
                ? styles.whenReturnSubTitleInitStyle
                : styles.customLabelSubTitleTextStyle
            }
          >
            {this.getTrackItemTimeAndDate(item)}
          </Text>
          <Text
            style={
              trackingData.status == "Returned"
                ? styles.whenReturnInitaitedStyle
                : styles.customLabelSelectedTitleTextStyle &&
                  this.getCurrentPage() >= 0
                  ? styles.Text1Style
                  : styles.customLabelTitleTextStyle
            }
          ></Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "20%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 15,
              borderRadius: 25,
              width: 15,
              backgroundColor: "#4AB316",
            }}
          ></View>
          {index ==
            (this.props.normalOrderTrackData?.data?.track || []).length - 1 ? (
            <View style={{ width: 4, height: 40 }}></View>
          ) : (
            <View
              style={{ width: 4, height: 40, backgroundColor: "#4AB316" }}
            ></View>
          )}
        </View>
        <View style={styles.customLabelInnerView}>
          <Text
            style={styles.Text2Style}
          >
            {item.status}
          </Text>
          <Text style={styles.Text3Style}>
            {item.location}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const {
      trackingData,
      onPressBackButton,
      itemsTrackDetailD,
      invoiceData,
      invoiceTrackDetailData,
      normalOrderTrackData
    } = this.props;
    let item = invoiceData?.item;
    let invoiceTrackingStatus = invoiceTrackDetailData?.orderScans;
    let kamDetail = itemsTrackDetailD == undefined ? itemsTrackDetailD : itemsTrackDetailD;
    let normalOrderData = normalOrderTrackData?.data?.track

    return (
      <SafeAreaView style={styles.container}>

        <CardView cardElevation={10} cardMaxElevation={10} cornerRadius={0}>
          <InvoiceDetailsNavBar
            BackAction={onPressBackButton}
            dateAndTime={this.invoiceDate()}
            inVoiceNum={"Invoice No. " + item.invoiceNo}
          />
          <View style={styles.topSeparator}></View>
          <View style={(item?.driverName == 'Delhivery Surface (B2B)' ||
            item?.driverName == 'Delhivery (B2C)' || item?.driverName == 'Delhivery B2B' ||
            item?.driverName == 'Xpressbees' || item?.driverName == 'Spoton' ||
            item?.driverName == 'Safe Express' || item?.driverName == 'Bluedart' ||
            item?.driverName == 'Blowhorn') ? [styles.headerContainer, { marginBottom: -18 }] : item.runnerPhone ? styles.headerContainer :
            [((trackingData || {}).vendor?.name) ? [styles.headerContainer, { marginBottom: -18 }] : styles.headerContainer]}>
            <View style={styles.headerLeftView}>
              <Text style={styles.LeftText2}>
                Qty - {item.quantity?.qty / 1000}
              </Text>
              {
                ((trackingData || {}).vendor?.name) ?
                  <Text style={(item?.driverName == 'Delhivery Surface (B2B)' ||
                    item?.driverName == 'Delhivery (B2C)' || item?.driverName == 'Delhivery B2B' ||
                    item?.driverName == 'Xpressbees' || item?.driverName == 'Spoton' ||
                    item?.driverName == 'Safe Express' || item?.driverName == 'Bluedart' ||
                    item?.driverName == 'Blowhorn') ? styles.vendor : item.runnerPhone ? [(item.status == "Delivered") ? [styles.vendor, {
                      left: 110, width: 250,
                      bottom: 20, fontFamily: CUSTOM_FONT.HEEBO_MEDIUM, color: "#454F63", fontSize: 12,
                    }] : styles.vendor] : [styles.vendor, {
                      left: 110, width: 250,
                      bottom: 20, fontFamily: CUSTOM_FONT.HEEBO_MEDIUM, color: "#454F63", fontSize: 12,
                    }]}>
                    {trackingData?.vendor?.name}/
                    {trackingData?.vendor?.vendorCity}
                  </Text> : null
              }

            </View>
            <View style={styles.headerRightView}>
              {item.runnerPhone == "" || undefined ?
                <>
                  {
                    (item?.driverName == 'Delhivery Surface (B2B)' ||
                      item?.driverName == 'Delhivery (B2C)' || item?.driverName == 'Delhivery B2B' ||
                      item?.driverName == 'Xpressbees' || item?.driverName == 'Spoton' ||
                      item?.driverName == 'Safe Express' || item?.driverName == 'Bluedart' ||
                      item?.driverName == 'Blowhorn') ?
                      (
                        <View style={{ flexDirection: "row" }}>
                          {item.awbNo == "" || undefined ? null : (
                            <>
                              <Text style={styles.LeftText2}>AWB No. </Text>
                              <Text style={styles.LeftText2}>{item.awbNo}</Text>
                            </>
                          )}
                        </View>
                      ) : null
                  }
                </>

                :
                <>
                  {
                    (item?.status == "Shipped") ?
                      (<View style={{ flexDirection: "row" }}>
                        <Icon
                          color="#454F63"
                          name="phone"
                          style={{ fontSize: 16, top: 3, right: 10 }}
                        />
                        <Text style={[styles.LeftText2, { right: 2 }]}>
                          {item?.runnerName}:{" "}
                        </Text>
                        <Text style={[styles.LeftText2, { color: "#0081cb" }]}>
                          {item?.runnerPhone}
                        </Text>
                      </View>) : (item?.status == "Delivered") ? null :
                        (<View style={{ flexDirection: "row" }}>
                          <Icon
                            color="#454F63"
                            name="phone"
                            style={{ fontSize: 16, top: 3, right: 10 }}
                          />
                          <Text style={[styles.LeftText2, { right: 2 }]}>
                            {item?.runnerName}:{" "}
                          </Text>
                          <Text style={[styles.LeftText2, { color: "#0081cb" }]}>
                            {item?.runnerPhone}
                          </Text>
                        </View>)
                  }

                </>

              }

              {item.runnerPhone == "" || undefined ?
                <>
                  {
                    (item?.driverName == 'Delhivery Surface (B2B)' ||
                      item?.driverName == 'Delhivery (B2C)' || item?.driverName == 'Delhivery B2B' ||
                      item?.driverName == 'Xpressbees' || item?.driverName == 'Spoton' ||
                      item?.driverName == 'Safe Express' || item?.driverName == 'Bluedart' ||
                      item?.driverName == 'Blowhorn') ?
                      (
                        <>
                          {item.awbNo == "" || undefined ? null : (
                            <Text style={styles.LeftText1}>{item.driverName}</Text>
                          )}
                        </>
                      ) : (null)
                  }
                </>

                : (null)
              }
            </View>
          </View>
        </CardView>
        <ScrollView style={{ marginBottom: -90, }}>
          {invoiceTrackingStatus == null || undefined ?
            (
              <View style={styles.customLabelView}>
                <FlatList
                  style={styles.flatListStyle}
                  contentContainerStyle={{ paddingBottom: 150 }}
                  data={normalOrderData}
                  renderItem={(list) => this.invoiceTrackRenderItem2(list)}
                />
              </View>
            )
            : (
              <View>
                {trackingData.groupedStatus != "Cancelled" && (
                  <View style={styles.customLabelView}>
                    <FlatList
                      style={styles.flatListStyle}
                      contentContainerStyle={{ paddingBottom: 150 }}
                      data={invoiceTrackingStatus}
                      renderItem={(list) => this.invoiceTrackRenderItem(list)}
                    />
                  </View>
                )}
              </View>
            )}

          {
            item?.status == 'Delivered' ? null :
              <>
                {
                  (item?.driverName == 'Delhivery Surface (B2B)' ||
                    item?.driverName == 'Delhivery (B2C)' || item?.driverName == 'Delhivery B2B' ||
                    item?.driverName == 'Xpressbees' || item?.driverName == 'Spoton' ||
                    item?.driverName == 'Safe Express' || item?.driverName == 'Bluedart' ||
                    item?.driverName == 'Blowhorn') ? null :

                    <View style={styles.msgWrap}>
                      <ICONS color="#F5681E" name="info" size={18} style={{ fontWeight: 'bold' }} />
                      <Text style={[styles.inNo, { alignSelf: 'center', fontSize: 14, left: 5 }]}>In case of delay connect with Moglix KAM</Text>
                    </View>

                }
              </>

          }

          <View style={styles.kamView}>
            <View style={styles.imageWrap}>
              <View style={styles.Wrap}>
                <Text style={styles.kamStyle}>KAM Details</Text>
                <View style={styles.nameWrap}>
                  <Text style={styles.nameStyle}>Name</Text>
                  <Text numberOfLines={2} style={styles.dataStyle}>
                    {kamDetail?.[0]?.kam_name}
                  </Text>
                  <Text style={styles.nameStyle}>Email ID</Text>
                  <Text numberOfLines={2} style={styles.dataStyle}>
                    {kamDetail?.[0]?.kam_emailid}
                  </Text>
                </View>
              </View>
              <Image
                resizeMode="contain"
                style={styles.photoStyle}
                source={ICON.KAM_BG} />

            </View>
          </View>



        </ScrollView>
        {/* <View style={styles.emailWrap}>
          <Text style={styles.nameStyle}>Email ID</Text>
          <Text style={styles.dataStyle}>{kamDetail?.[0]?.kam_emailid}</Text>
        </View> */}
        <View style={styles.contactContainer}>
          <ContactPopup
            navigation={this.props.nav}
            isOpen={(info) => this.showOpen(info)}
          />
        </View>
      </SafeAreaView>
    );
  }
}
