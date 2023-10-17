import React from "react";
import { styles } from "./style";
import NavBar from "../../Components/Commons/NavBars/navBar";
import PropTypes from "prop-types";
import { CUSTOM_FONT, ICON } from "../../constants";
import { normalize, Text, Tooltip } from "react-native-elements";
import DatabaseManager from "../../Storage/storage";
import ContactPopup from "../ContactPopup/index";
import { ScreenConstants } from "./../../constants";
import analytics from "@react-native-firebase/analytics";
import ChartView from "react-native-highcharts";
import { getDashboardView } from "../../utils/commonService";
import { Dropdown } from "react-native-material-dropdown";
import { Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalService } from "../../utils/GlobalService";
import messaging from "@react-native-firebase/messaging";
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from "react-native-popup-dialog";
const FILTER_OPTIONS = [
  { value: "Today" },
  { value: "Yesterday" },
  { value: "Last 7 Days" },
  { value: "Last 30 Days" },
  { value: "This Month" },
  { value: "Last Month" },
  { value: "Custom Range" },
];
const options = {
  global: {
    useUTC: false,
  },
  lang: {
    decimalPoint: ".",
    thousandsSep: ".",
  },
};
const modules = ["highcharts-more", "variable-pie"];
const arrData = [
  "24 %category",
  "24 %category",
  "24 %category",
  "24 %category",
  "24 %category",
];
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  BackHandler,
} from "react-native";
import { Alert } from "react-native";

export default class Home extends React.Component {
  static propTypes = {
    onPressMenuButton: PropTypes.func,
    onPressDownArrowButton: PropTypes.func,
    onPressSearchButton: PropTypes.func,
    onPressActiveOrderButton: PropTypes.func,
    userName: PropTypes.string,
    buckets: PropTypes.array,
    companyName: PropTypes.string,
    branchName: PropTypes.string,
    branchId: PropTypes.string,
    onSubmitAction: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      modalOver: false,
      fullScreenLastSpend: false,
      fullScreenOtif: false,
      fullScreenItem: false,
      fullScreenTopPlant: false,
      showDashboard: false,
      fullScreenCategory: false,
      scaleAnimationDialog: false,
      periodicFlag: true,
      weekDataFlag: false,
      plantData: {},
    };
  }
  backAction = () => {
    if (
      this.state.fullScreenLastSpend ||
      this.state.fullScreenOtif ||
      this.state.fullScreenItem ||
      this.state.fullScreenTopPlant ||
      this.state.fullScreenCategory
    ) {
      this.setState({
        fullScreenLastSpend: false,
        fullScreenOtif: false,
        fullScreenItem: false,
        fullScreenTopPlant: false,
        fullScreenCategory: false,
      });
    } else {
      BackHandler.exitApp();
    }
    return true;
  };
  componentDidMount(value) {
    if (global.GLOBAL_COMPANY_ID) {
      analytics().setUserProperty(
        "customerID",
        global.GLOBAL_COMPANY_ID.toString()
      );
    }
    this.props.refreshData(value);

    this.getDashboardViewApi();
  }

  getDashboardViewApi = async () => {
    let payload = {
      token: JSON.parse(await DatabaseManager.getUserProfile()).token,
      userId: JSON.parse(await DatabaseManager.getUserProfile()).userId,
    };
    let options = {
      idBranch: global.GLOBAL_BRANCH_ID,
      idUser: payload.userId,
    };
    const data = await getDashboardView(options, payload);
    global.stopApi = data.data.data.branchModules.modulesPermission.BI;
    if (data) {
      if (data.data.data.branchModules.modulesPermission.BI) {
        this.setState({
          showDashboard: true,
        });
        this.props.refreshData("Last 30 Days");
      } else {
        this.setState({
          showDashboard: false,
        });
      }
    }
  };

  static defaultProps = {
    userName: "",
    buckets: [],
    companyName: "",
    branchName: "",
    branchId: "",
  };

  onSubmitAction = async (data) => {
    try {
      await messaging().unsubscribeFromTopic(
        global.GLOBAL_BRANCH_ID.toString()
      );

      const { onSubmitAction } = this.props;
      global.GLOBAL_COMPANY_ID = data.companyId;
      global.GLOBAL_BRANCH_ID = String(data.branchId);
      global.GLOBAL_COMPANY_NAME = data.companyName;
      global.GLOBAL_BRANCH_NAME = data.branchName;

      await onSubmitAction(data);
      this.getDashboardViewApi();
    } catch (e) {
      console.log(e, "error ====");
      const { onSubmitAction } = this.props;
      global.GLOBAL_COMPANY_ID = data.companyId;
      global.GLOBAL_BRANCH_ID = String(data.branchId);
      global.GLOBAL_COMPANY_NAME = data.companyName;
      global.GLOBAL_BRANCH_NAME = data.branchName;

      await onSubmitAction(data);
      this.getDashboardViewApi();
    }
  };

  viewCategoryPercentage() {
    return arrData.map((item) => {
      return (
        <View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ width: 20, height: 20, backgroundColor: "red" }}
            ></View>
            <Text>{item}</Text>
          </View>
        </View>
      );
    });
  }

  viewSubSummary(text, data) {
    let number = data;

    let unit;
    if (number > 10000000) {
      number = number / 10000000;
      unit = "Cr";
      number = number.toFixed(2);
    } else if (number > 1000000) {
      number = number / 100000;
      unit = "L";
      number = number.toFixed(2);
    } else if (number > 100000) {
      number = number / 100000;
      unit = "L";
      number = number.toFixed(2);
    } else if (number > 10000) {
      number = number / 1000;
      unit = "K";
      number = number.toFixed(2);
    } else if (number > 1000) {
      number = number / 1000;
      unit = "K";
      number = number.toFixed(2);
    }

    return (
      <View style={styles.summDetailBox}>
        <View style={styles.greenLine}></View>
        <Text style={styles.summText}>{text}</Text>
        <Text style={styles.summDataNo}>
          {number} {unit}
        </Text>
      </View>
    );
  }

  viewSummary() {
    const { summaryData } = this.props;
    return (
      <View style={styles.summaryView}>
        <Text style={styles.sumBoxTitle}>Overall Summary</Text>
        {summaryData && (
          <View style={styles.summDetailRow}>
            {this.viewSubSummary(
              "Number Of Items Delivered",
              summaryData["Number of Items Delivered"]
            )}
            {this.viewSubSummary(
              "Value of goods Delivered",
              summaryData["Value of goods Delivered"]
            )}
            {this.viewSubSummary(
              "Number of Unique SKUs/products ordered",
              summaryData["Number of Unique SKUs/products ordered"]
            )}
          </View>
        )}
      </View>
    );
  }

  numDifferentiation = (val) => {
    if (val) {
      val = (val / 100000).toFixed(2);
    }
    return Number(val);
  };

  viewLastsSixMonths() {
    const { sixMonthData } = this.props;
    let value = [];
    let formattedValues = [];
    if (sixMonthData) {
      Object.values(sixMonthData)
        .reverse()
        .map((item, index) => {
          if (item == null) {
            value.push(0);
          } else {
            value.push(this.numDifferentiation(item));
          }
        });
    }

    var Highcharts = "Highcharts";
    var conf = {
      chart: {
        type: "line",
      },
      title: {
        text: "",
        style: {
          display: "none",
        },
      },
      navigation: {
        buttonOptions: {
          enabled: false,
        },
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "",
        style: {
          display: "none",
        },
      },
      xAxis: {
        categories: Object.keys(sixMonthData).reverse(),
      },
      yAxis: {
        title: {
          text: "Lac",
        },
        labels: {
          formatter: function () {
            return this.value;
          },
        },
      },
      tooltip: {
        formatter: function () {
          return `${this.x} <br/> Spend: ${this.y + this.series.name}`;
        },
      },
      series: [
        {
          showInLegend: false,
          name: "L",
          data: value,
        },
      ],
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.summaryView}>
          <View style={[styles.graphInnerHeaderBox, { paddingBottom: 10 }]}>
            <View style={styles.boxLeftArea}>
              <Text style={styles.sumBoxTitle}>Last 6 months spend</Text>
              <Tooltip
                placement="top"
                popover={<Text>Last 6 Months Spend</Text>}
              >
                <Image style={styles.infoStyle} source={ICON.IC_INFO} />
              </Tooltip>
            </View>
            <View style={styles.boxRightArea}>
              {Platform.OS == "android" ? (
                <TouchableOpacity
                  onPress={() => this.props.getExcelData("lastSixMonth")}
                >
                  <Image
                    style={styles.shareBoxStyle}
                    source={ICON.IMG_DOWNLOAD}
                  />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  this.setState((prevState) => ({
                    fullScreenLastSpend: !prevState.fullScreenLastSpend,
                  }));
                }}
              >
                <Image
                  style={styles.shareBoxStyle}
                  source={ICON.IC_SHARE_BOX}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ChartView
            originWhitelist={[""]}
            useWebKit={true}
            scalesPageToFit={undefined}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            style={{ height: 300 }}
            config={conf}
            options={options}
            modules={modules}
            more={true}
            updateArgs={[true]}
          ></ChartView>
        </View>
      </SafeAreaView>
    );
  }

  viewTopPlants() {
    let arr = [];
    let valueArr = [];
    let data =
      Object.keys(this.state.plantData).length === 0
        ? this.props.topItemData
        : this.state.plantData;
    if (data) {
      for (var key of Object.keys(data)) {
        arr.push({ name: key, y: data[key] });
      }
    }

    var Highcharts = "Highcharts";
    var conf = {
      chart: {
        type: "column",
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "",
        style: {
          display: "none",
        },
      },
      yAxis: {
        labels: {
          formatter: function () {
            if (this.value < 100) {
              return this.value;
            }
            if (this.value > 100000 && this.value % 100000 == 0) {
              return this.value / 100000 + ".00" + "L";
            } else {
              return null;
            }
          },
        },
        title: {
          text: "",
        },
      },
      navigation: {
        buttonOptions: {
          enabled: false,
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        // pointFormat: ": {point.y}",
        pointFormat: !this.state.showTopPlantCountByValue
          ? " Count:{point.y:1f}"
          : " Value:{point.y:1f}",
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
          },
        },
        column: {
          colorByPoint: true,
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      xAxis: {
        type: "category",
      },
      series: [
        {
          type: "column",
          colorByPoint: true,
          data: this.state.showTopPlantCountByValue ? valueArr : arr,
        },
      ],
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.summaryView, { paddingTop: 0 }]}>
          <View style={[styles.graphInnerHeaderBox, { alignItems: "center" }]}>
            <View style={styles.boxLeftArea}>
              <Text style={styles.sumBoxTitle}>Top Performing Plants</Text>
              <Tooltip popover={<Text>Top Performing Plants</Text>}>
                <Image style={styles.infoStyle} source={ICON.IC_INFO} />
              </Tooltip>
            </View>
            <View style={styles.boxRightArea}>
              <View
                style={{
                  width: normalize(60),
                  marginTop: -17,
                  marginLeft: normalize(10),
                }}
              >
                <Dropdown
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  labelFontSize={0}
                  textColor={"#000"}
                  fontSize={normalize(11)}
                  onChangeText={(value) => {
                    var _firebaseObj = {
                      Top_Filter: value,
                    };

                    GlobalService.AnalyticFunction("Top_Filter", _firebaseObj);
                    if (value == "Count") {
                      this.setState({ plantData: true });
                    } else {
                      var _firebaseObj = {
                        Top_Filter: value,
                      };

                      GlobalService.AnalyticFunction(
                        "Top_Filter",
                        _firebaseObj
                      );
                      this.setState({ plantData: false });
                    }
                  }}
                  value="Count"
                  data={[
                    {
                      value: "Count",
                    },
                    {
                      value: "Value",
                    },
                  ]}
                />
              </View>
              {Platform.OS == "android" ? (
                <TouchableOpacity
                  onPress={() => this.props.getExcelData("topPlants")}
                >
                  <Image
                    style={styles.shareBoxStyle}
                    source={ICON.IMG_DOWNLOAD}
                  />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  this.setState((prevState) => ({
                    fullScreenTopPlant: !prevState.fullScreenTopPlant,
                  }));
                }}
              >
                <Image
                  style={styles.shareBoxStyle}
                  source={ICON.IC_SHARE_BOX}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ChartView
            originWhitelist={[""]}
            useWebKit={true}
            scalesPageToFit={undefined}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            style={{ height: 400 }}
            config={conf}
            options={options}
            modules={modules}
            more={true}
            updateArgs={[true]}
          ></ChartView>
        </View>
      </SafeAreaView>
    );
  }

  viewItemvsStatus() {
    let arr = [];
    let valueArr = [];
    let data = this.props.itemCountData;
    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].key == "Placed" ||
          data[i].key == "Processing" ||
          data[i].key == "Partially Shipped" ||
          data[i].key == "Shipped" ||
          data[i].key == "Partially Delivered" ||
          data[i].key == "Delivered"
        ) {
          arr.push({ name: data[i].key, y: data[i].doc_count });
          valueArr.push({ name: data[i].key, y: data[i].total });
        }
      }
    }
    var Highcharts = "Highcharts";
    var conf = {
      chart: {
        type: "pie",
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "",
        style: {
          display: "none",
        },
      },
      navigation: {
        buttonOptions: {
          enabled: false,
        },
      },
      tooltip: {
        formatter: function () {
          let number = this.point.y;
          let data = " Count:";
          let unit = "";
          if (number > 10000000) {
            data = " Value:";
            number = number / 10000000;
            unit = "Cr";
            number = number.toFixed(2);
          } else if (number > 100000) {
            data = " Value:";
            number = number / 100000;
            unit = "L";
            number = number.toFixed(2);
          } else if (number > 10000) {
            data = " Value:";
            number = number / 10000;
            unit = "K";
            number = number.toFixed(2);
          }
          return (
            this.point.name +
            ": <b>" +
            "</b><br/>" +
            data +
            "<b>" +
            number +
            unit +
            "</b><br/>"
          );
        },
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: !this.state.showItemCountByValue
          ? " Count:{point.y:.1f}"
          : " Value:{point.y:.1f}",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },

      series: [
        {
          dataLabels: {
            enabled: true,
            connectorWidth: 1,
          },
          showInLegend: true,
          name: "",
          data: this.state.showItemCountByValue ? valueArr : arr,
        },
      ],
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.summaryView, { paddingTop: 0, flex: 1 }]}>
          <View style={[styles.graphInnerHeaderBox, { alignItems: "center" }]}>
            <View style={styles.boxLeftArea}>
              <Text style={styles.sumBoxTitle}>Item Count</Text>
              <Tooltip popover={<Text>Item Status</Text>}>
                <Image style={styles.infoStyle} source={ICON.IC_INFO} />
              </Tooltip>
            </View>
            <View style={styles.boxRightArea}>
              <View
                style={{
                  width: normalize(80),
                  marginTop: -17,
                  marginLeft: normalize(10),
                }}
              >
                <Dropdown
                  labelFontSize={0}
                  textColor={"#000"}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  fontSize={normalize(11)}
                  onChangeText={(value) => {
                    if (value == "Value") {
                      var _firebaseObj = {
                        Item_Count_Filter: value,
                      };

                      GlobalService.AnalyticFunction(
                        "Item_Count_Filter",
                        _firebaseObj
                      );
                      this.setState({ showItemCountByValue: true });
                    } else {
                      var _firebaseObj = {
                        Item_Count_Filter: value,
                      };

                      GlobalService.AnalyticFunction(
                        "Item_Count_Filter",
                        _firebaseObj
                      );
                      this.setState({ showItemCountByValue: false });
                    }
                  }}
                  value="Count"
                  data={[
                    {
                      value: "Count",
                    },
                    {
                      value: "Value",
                    },
                  ]}
                />
              </View>
              {Platform.OS == "android" ? (
                <TouchableOpacity
                  onPress={() => this.props.getExcelData("itemSheet")}
                >
                  <Image
                    style={styles.shareBoxStyle}
                    source={ICON.IMG_DOWNLOAD}
                  />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  this.setState((prevState) => ({
                    fullScreenItem: !prevState.fullScreenItem,
                  }));
                }}
              >
                <Image
                  style={styles.shareBoxStyle}
                  source={ICON.IC_SHARE_BOX}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ChartView
            originWhitelist={[""]}
            useWebKit={true}
            scalesPageToFit={undefined}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            style={{ height: 400 }}
            config={conf}
            options={options}
            modules={modules}
            more={true}
            updateArgs={[true]}
          ></ChartView>
        </View>
      </SafeAreaView>
    );
  }

  renderItem = (data) => {
    return (
      <View style={styles.dialogDataRow}>
        <Text style={styles.dialogDataText}>{data.item.sno}</Text>
        <Text style={styles.dialogDataText}>{data.item.categoryName}</Text>
        <Text style={styles.dialogDataText}>{data.item.spend}</Text>
      </View>
    );
  };

  showAllCategories() {
    return (
      <Dialog
        onTouchOutside={() => {
          this.setState({ scaleAnimationDialog: false });
        }}
        width={0.9}
        visible={this.state.scaleAnimationDialog}
        dialogAnimation={new ScaleAnimation()}
        style={{ borderRadius: 8 }}
      >
        <DialogContent>
          <View style={styles.catTitleArea}>
            <Text style={styles.viewAllCatTitle}>View All Categories</Text>
          </View>
          <View style={styles.dialogInnerBox}>
            <Text style={styles.serialTextStyle}>S No</Text>
            <Text style={styles.serialTextStyle}>Category Name</Text>
            <Text style={styles.serialTextStyle}>% Spend</Text>
          </View>
          {this.props.spendByAllCategoryData &&
            !this.props.spendByAllCategoryData.length ? (
            <Text style={{ alignSelf: "center", marginVertical: 15 }}>
              No Data Founds !
            </Text>
          ) : null}
          <View style={{ marginBottom: 0 }}>
            <FlatList
              data={this.props.spendByAllCategoryData}
              contentContainerStyle={{ marginBottom: -210 }}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </DialogContent>
      </Dialog>
    );
  }

  viewSpendByCategory() {
    let arr = [];
    if (Object.keys(this.props.spendByCategoryData || {})) {
      for (var key of Object.keys(this.props.spendByCategoryData || {})) {
        arr.push({ name: key, y: this.props.spendByCategoryData[key] });
      }
    }
    var Highcharts = "Highcharts";
    var conf = {
      chart: {
        type: "pie",
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "",
        style: {
          display: "none",
        },
      },
      navigation: {
        buttonOptions: {
          enabled: false,
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: "Spend: {point.y:if} % ",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      series: [
        {
          dataLabels: {
            enabled: true,
            connectorWidth: 1,
          },
          showInLegend: true,
          name: "",
          data: arr,
        },
      ],
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.summaryView, { flex: 1 }]}>
          <View style={styles.graphInnerHeaderBox}>
            <View style={styles.boxLeftArea}>
              <Text style={styles.sumBoxTitle}>Spend by category</Text>
              <Tooltip popover={<Text>Spend by catagory</Text>}>
                <Image style={styles.infoStyle} source={ICON.IC_INFO} />
              </Tooltip>
            </View>
            <View style={styles.boxRightArea}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ scaleAnimationDialog: true });
                }}
              >
                <Text style={styles.viewCat}>View All Categories</Text>
              </TouchableOpacity>
              {Platform.OS == "android" ? (
                <TouchableOpacity
                  onPress={() => this.props.getExcelData("spendByCategory")}
                >
                  <Image
                    style={styles.shareBoxStyle}
                    source={ICON.IMG_DOWNLOAD}
                  />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  this.setState((prevState) => ({
                    fullScreenCategory: !prevState.fullScreenCategory,
                  }));
                }}
              >
                <Image
                  style={styles.shareBoxStyle}
                  source={ICON.IC_SHARE_BOX}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ justifyContent: "space-between", flex: 1 }}>
            <ChartView
              originWhitelist={[""]}
              useWebKit={true}
              scalesPageToFit={undefined}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              style={{ height: 400 }}
              config={conf}
              options={options}
              modules={modules}
              more={true}
              updateArgs={[true]}
              variablepie={true}
            ></ChartView>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  viewOTIF() {
    let arr = [];
    if (Object.keys(this.props.otifData)) {
      for (var key of Object.keys(this.props.otifData)) {
        arr.push({ name: key, y: Number(this.props.otifData[key]) });
      }
    }

    var Highcharts = "Highcharts";
    var conf = {
      chart: {
        type: "column",
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "",
        style: {
          display: "none",
        },
      },
      xAxis: {
        type: "category",
        labels: {
          x: 4,
          y: 12,
          style: {
            fontSize: 10,
            right: 20,
          },
        },
      },
      yAxis: {
        labels: {
          formatter: function () {
            return this.value;
          },
        },
        title: {
          text: "",
        },
      },
      navigation: {
        buttonOptions: {
          enabled: false,
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: " {point.y:1f}%",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
        series: {
          dataLabels: {
            enabled: true,
            format: "{y} %",
          },
        },
        column: {
          colorByPoint: false,
          pointPadding: 0.1,
          borderWidth: 0,
        },
      },
      series: [
        {
          colorByPoint: true,
          data: arr,
        },
      ],
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.summaryView, { paddingTop: 0 }]}>
          <View style={[styles.graphInnerHeaderBox, { alignItems: "center" }]}>
            <View style={styles.boxLeftArea}>
              <Text style={styles.sumBoxTitle}>OTIF</Text>
              <Tooltip popover={<Text>OTIF Report</Text>}>
                <Image style={styles.infoStyle} source={ICON.IC_INFO} />
              </Tooltip>
            </View>
            <View style={styles.boxRightArea}>
              <View
                style={{
                  width: normalize(125),
                  marginTop: -17,
                  marginLeft: normalize(10),
                }}
              >
                <Dropdown
                  labelFontSize={0}
                  textColor={"#000"}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                  fontSize={normalize(11)}
                  onChangeText={(value) => {
                    if (value == "Periodic View") {
                      var _firebaseObj = {
                        OTIF_View_Filter: value,
                      };

                      GlobalService.AnalyticFunction(
                        "OTIF_View_Filter",
                        _firebaseObj
                      );
                      this.setState({ periodicFlag: true }, () => {
                        this.props.refreshData({
                          periodicFlag: this.state.periodicFlag,
                          weekDataFlag: this.state.weekDataFlag,
                        });
                      });
                    } else {
                      var _firebaseObj = {
                        OTIF_View_Filter: value,
                      };
                      GlobalService.AnalyticFunction(
                        "OTIF_View_Filter",
                        _firebaseObj
                      );
                      this.setState({ periodicFlag: false }, () => {
                        this.props.refreshData({
                          periodicFlag: this.state.periodicFlag,
                          weekDataFlag: this.state.weekDataFlag,
                        });
                      });
                    }
                  }}
                  value={"Periodic View"}
                  data={[
                    {
                      value: "Periodic View",
                    },
                    {
                      value: "Performance View",
                    },
                  ]}
                />
              </View>
              {this.state.periodicFlag && (
                <View
                  style={{
                    width: normalize(50),
                    marginTop: -17,
                    marginLeft: normalize(2),
                  }}
                >
                  <Dropdown
                    labelFontSize={0}
                    textColor={"#000"}
                    fontSize={normalize(11)}
                    inputContainerStyle={{ borderBottomWidth: 0, width: 70 }}
                    onChangeText={(value) => {
                      if (value == "Week") {
                        var _firebaseObj = {
                          OITF_Calander_Filter: value,
                        };

                        GlobalService.AnalyticFunction(
                          "OITF_Calander_Filter",
                          _firebaseObj
                        );
                        this.setState({ weekDataFlag: true }, () => {
                          this.props.refreshData({
                            periodicFlag: this.state.periodicFlag,
                            weekDataFlag: this.state.weekDataFlag,
                          });
                        });
                      } else {
                        var _firebaseObj = {
                          OITF_Calander_Filter: value,
                        };
                        GlobalService.AnalyticFunction(
                          "OITF_Calander_Filter",
                          _firebaseObj
                        );
                        this.setState({ weekDataFlag: false }, () => {
                          this.props.refreshData({
                            periodicFlag: this.state.periodicFlag,
                            weekDataFlag: this.state.weekDataFlag,
                          });
                        });
                      }
                    }}
                    value={"Month"}
                    data={[
                      {
                        value: "Month",
                      },
                      {
                        value: "Week",
                      },
                    ]}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>
            {Platform.OS == "android" ? (
              <TouchableOpacity onPress={() => this.props.getExcelData("otif")}>
                <Image
                  style={styles.shareBoxStyle}
                  source={ICON.IMG_DOWNLOAD}
                />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                this.setState((prevState) => ({
                  fullScreenOtif: !prevState.fullScreenOtif,
                }));
              }}
            >
              <Image style={styles.shareBoxStyle1} source={ICON.IC_SHARE_BOX} />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "space-between" }}>
            <ChartView
              originWhitelist={[""]}
              useWebKit={true}
              scalesPageToFit={undefined}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              style={{ height: 400 }}
              config={conf}
              options={options}
              modules={modules}
              more={true}
              updateArgs={[true]}
              variablepie={true}
            ></ChartView>
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
  onPressGift() {
    var _firebaseObj = {
      gift_card: "https://www.moglix.com/e-gift-voucher",
    };
    Linking.openURL("https://www.moglix.com/e-gift-voucher").catch((err) =>
      console.error("An error occurred", err)
    );
    GlobalService.AnalyticFunction("gift_card", _firebaseObj);
  }
  formatDate(time) {
    var d = new Date(),
      month = "" + time == "toTime" ? d.getMonth() + 1 : d.getMonth(),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  refreshData = async (value) => {
    var _firebaseObj = {
      dashboard_filter: value,
    };

    GlobalService.AnalyticFunction("dashboard_filter", _firebaseObj);
    this.props.refreshData(value);
  };

  render() {
    const {
      companyName,
      branchName,
      branchId,
      userName,
      onPressMenuButton,
      onPressSearchButton,
      onPressActiveOrderButton,
      buckets,
    } = this.props;

    global.activeOrders = 0;
    global.shipped = 0;
    global.delivered = 0;
    global.inProcess = 0;
    global.other = 0;
    global.placed = 0;
    var partiallyDelivered = 0;
    var partiallyShipped = 0;

    buckets.forEach(function (arrayItem) {
      const { key, doc_count } = arrayItem;
      if (key == "Partially Delivered") {
        partiallyDelivered = doc_count;
        global.partiallyDelivered = doc_count;
      }
      if (key == "Partially Shipped") {
        partiallyShipped = doc_count;
        global.partiallyShipped = doc_count;
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
      if (key == "Placed") {
        global.placed = doc_count;
      }
      if (
        key != "Shipped" &&
        key != "PR Created" &&
        key != "Revised" &&
        key != "Cancelled" &&
        key != "Delivered" &&
        key != "Processing" &&
        key != "Partially Shipped" &&
        key != "Partially Delivered"
      ) {
        global.other = global.other + doc_count;
      }

      global.activeOrders = inProcess + shipped + partiallyShipped;
    });
    global.delivered = global.delivered + partiallyDelivered;
    global.shipped = global.shipped + partiallyShipped;
    let timeString = "";
    if (this.props.fromTime && this.props.toTime)
      timeString =
        this.props.fromTime.replace(/-/g, "/") +
        " - " +
        this.props.toTime.replace(/-/g, "/");

    return (
      <>
        {!this.state.fullScreenLastSpend &&
          !this.state.fullScreenCategory &&
          !this.state.fullScreenItem &&
          !this.state.fullScreenOtif &&
          !this.state.fullScreenTopPlant ? (
          <SafeAreaView
            style={[
              styles.container,
              this.state.modalOver ? styles.overlay : null,
            ]}
          >
            <NavBar
              DrawerAction={onPressMenuButton}
              company={companyName}
              branch={branchName}
              branchId={branchId}
              onSubmitAction={this.onSubmitAction}
            />

            <View style={styles.topSeparator}></View>
            <ScrollView style={[styles.scrollStyle]}>
              <View style={{ flex: 1 }}>
                <View style={styles.homeContainer}>
                  <Text style={styles.welcomeTextStyle}>
                    Hi{" "}
                    <Text style={styles.usernameTextStyle}>
                      {userName.trim()}
                    </Text>
                    ,
                  </Text>
                  <Text style={styles.subTitleTextStyle}>
                    Welcome back to Moglix Enterprise
                  </Text>
                  <TouchableOpacity
                    onPress={onPressSearchButton}
                    activeOpacity={0.7}
                  >
                    <View style={styles.searchContainer}>
                      <Image
                        style={styles.searchIconStyle}
                        source={ICON.IC_SEARCH}
                      />
                      <Text style={styles.searchTextStyle}>
                        Search by Order ID, Product Name or ID
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View>
                    <TouchableOpacity
                      onPress={onPressActiveOrderButton}
                      style={styles.activeOrderContainer}
                    >
                      <Text style={styles.activeOrderTextStyle}>
                        Track Items
                      </Text>
                      <View style={styles.rightContainer}>
                        <Text style={styles.activeOrderCountStyle}>
                          {global.activeOrders}
                        </Text>
                        <Image
                          style={styles.rightArrowStyle}
                          source={ICON.IC_NEXT}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.itemsContainer}>
                    <Text style={styles.orderDetailsTextStyle}>
                      Order Details by Status
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        marginBottom: 15,
                        justifyContent: "space-between",
                        marginHorizontal: -10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          global.inProcess
                            ? this.props.navigation.navigate(
                              ScreenConstants.ORDER_LIST_SCREEN,
                              { fromProcessing: true }
                            )
                            : console.log("no data")
                        }
                        style={styles.ProcessBoxStyle}
                      >
                        <Text style={styles.itemsSubtitleBottomStyle}>
                          In Process
                        </Text>
                        <Text style={styles.itemsTitleBottomStyle}>
                          {global.inProcess}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          global.shipped
                            ? this.props.navigation.navigate(
                              ScreenConstants.ORDER_LIST_SCREEN,
                              { fromShipped: true }
                            )
                            : console.log("no data")
                        }
                        style={styles.itemsTopLeftBoxStyle}
                      >
                        <Text style={styles.itemsSubtitleTopStyle}>
                          Shipped Items
                        </Text>
                        <Text style={styles.itemsTitleTopStyle}>
                          {global.shipped}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.giftContainer}>
                    <TouchableOpacity onPress={() => this.onPressGift()}>
                      <Image
                        style={styles.giftImageStyle}
                        source={ICON.IMG_HOME_GIFT}
                      />
                    </TouchableOpacity>
                  </View>
                  {this.state.showDashboard ? (
                    <>
                      <View style={styles.bottomGraphBox}>
                        <View style={styles.dashboardHead}>
                          <Text style={styles.dashboardTitle}>Dashboard</Text>
                          <View style={styles.dropView}>
                            <Dropdown
                              fontSize={normalize(11)}
                              textColor={"#000"}
                              itemPadding={5}
                              labelFontSize={0}
                              value="Last 30 Days"
                              inputContainerStyle={{ borderBottomWidth: 0 }}
                              onChangeText={(value) => this.refreshData(value)}
                              data={FILTER_OPTIONS}
                            />
                          </View>
                        </View>
                      </View>
                      <Text style={styles.timeStyle}>{timeString}</Text>
                      <View style={styles.GraphDetailBox}>
                        {this.viewSummary()}
                        {this.viewSpendByCategory()}
                        {this.viewItemvsStatus()}
                        {this.viewLastsSixMonths()}
                        {this.viewOTIF()}
                        {this.viewTopPlants()}
                        {this.showAllCategories()}
                      </View>
                    </>
                  ) : null}
                </View>
              </View>
            </ScrollView>
            <View style={styles.contactContainer}>
              <ContactPopup
                sessionData={this.props.sessionData}
                navigation={this.props.navigation}
                isOpen={(info) => this.showOpen(info)}
              />
            </View>
          </SafeAreaView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {this.state.fullScreenLastSpend && this.viewLastsSixMonths()}
            {this.state.fullScreenItem && this.viewItemvsStatus()}
            {this.state.fullScreenCategory && this.viewSpendByCategory()}
            {this.state.fullScreenOtif && this.viewOTIF()}
            {this.state.fullScreenTopPlant && this.viewTopPlants()}
          </View>
        )}
      </>
    );
  }
}
const styless = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: "#fff",
    justifyContent: "center",
    flex: 1,
  },
  pieContainer: {
    width: 180,
    height: 158,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
