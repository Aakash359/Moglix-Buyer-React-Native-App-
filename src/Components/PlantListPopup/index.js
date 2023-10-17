import React from "react";
import { styles } from "./style";
import PropTypes from "prop-types";
import { ICON } from "../../constants";
import ExpandableListView from "./ExpandableListView";
import DatabaseManager from "../../Storage/storage";
import { GlobalService } from "../../utils/GlobalService";

import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  Image,
  UIManager,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";

const array = [];

export default class PlantListPopup extends React.PureComponent {
  static propTypes = {
    showPopup: PropTypes.bool,
    nav: PropTypes.object,
    company: PropTypes.string,
    branch: PropTypes.string,
    branchId: PropTypes.string,
    onSubmitAction: PropTypes.func,
  };

  static defaultProps = {
    showPopup: false,
    company: "",
    branch: "",
    branchId: "",
  };

  constructor(props) {
    super(props);
    this._onScroll = this._onScroll.bind(this);
    this.state = {
      modalVisible: false,
      AccordionData: [...array],
      isExpanded: false,
      text: "",
      searchedArr: [],
      selectedBranchId: "",
      selectedData: {},
      contentOffsetY: 0,
      companyCount: 10,
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  _onScroll(e) {
    var contentOffset = e.nativeEvent.contentOffset.y;
    if (Math.round(e.nativeEvent.contentSize.height) - 210 == contentOffset) {
      this.getSessionDetail();
    }
  }

  getSessionDetail = async () => {
    try {
      let sessionDataTemp = await DatabaseManager.getUserSession();
      let data = JSON.parse(sessionDataTemp);

      const { companyNames, companyToBranch, branchNames } = data.companyData;

      if (companyNames != null) {
        var len = Object.keys(companyNames).length;
        if (len > this.state.companyCount) {
          len = this.state.companyCount;
          this.setState({ companyCount: len + 10 });
        }
        var arrData = [];
        for (var i = 0; i < len; i++) {
          let CompanyID = Object.keys(companyNames)[i];
          let CompanyName = companyNames[CompanyID];

          var arrSubData = [];
          var branchIDArr = companyToBranch[CompanyID];
          if (typeof branchIDArr === "undefined") {
            console.log("undefined");
          } else {
            arrSubData = branchIDArr.map(function (braID) {
              return {
                id: braID,
                name: branchNames[braID],
              };
            });
          }
          var dataCompany = {
            expanded: false,
            companyName: CompanyName,
            companyId: CompanyID,
            sub_Category: arrSubData,
          };

          arrData.push(dataCompany);
        }
        this.setState({ AccordionData: arrData });
        this.setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible, text: "" });
  }

  update_Layout = (index, fromSearch) => {
    const { text, searchedArr, AccordionData, isExpanded } = this.state;

    let array = [];
    if (text.trim().length > 0) {
      array = [...searchedArr];

      if (fromSearch) {
        array[index]["expanded"] = true;
      } else {
        if (array.length && array[index]) {
          array[index]["expanded"] = !array[index]["expanded"];
        }
      }
      this.setState(() => {
        return {
          searchedArr: array,
        };
      });
    } else {
      array = [...AccordionData];
      if (fromSearch) {
        array[index]["expanded"] = true;
      } else {
        array[index]["expanded"] = !array[index]["expanded"];
      }
      this.setState(() => {
        return {
          AccordionData: array,
        };
      });
    }
    this.setState({ isExpanded: !isExpanded });
  };

  isSearchingData = (text) => {
    this.setState({ text: text });
    this.searchFilterFunction(text);
  };

  searchFilterFunction = (text) => {
    let filteredArr = [];

    for (let i = 0; i < this.state.AccordionData.length; i++) {
      const { sub_Category, companyId, companyName, expanded } =
        this.state.AccordionData[i];
      const newData = sub_Category.filter((item) => {
        const itemData =
          item && item.name
            ? `${item.name.toUpperCase()}   
                ${item.name.toUpperCase()} ${item.name.toUpperCase()} ${item.id
                .toString()
                .toUpperCase()}`
            : "";
        const textData = text.trim().toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      let data = {
        companyId,
        companyName,
        expanded,
        sub_Category: newData,
      };

      if (newData != []) {
        filteredArr[i] = data;
      }
      var filteredData = filteredArr.filter(function (obj) {
        return obj.sub_Category.length > 0;
      });
    }

    this.setState({ searchedArr: filteredData }, () => {
      if (this.state.searchedArr.length == 1) {
        this.update_Layout(0, true);
      }
    });
  };

  submitAction = () => {
    const { onSubmitAction } = this.props;
    GlobalService.AnalyticFunction(
      "selectplant_dropdown_submit",
      this.state.selectedData
    );
    if (Object.keys(this.state.selectedData).length > 0) {
      onSubmitAction(this.state.selectedData);
      this.setModalVisible(!this.state.modalVisible);
    }
  };

  selectedBranchId = (data) => {
    console.log(data, "data====");
    this.setState({ selectedBranchId: data.branchId, selectedData: data });
  };

  renderExpandableList() {
    const { text, searchedArr, AccordionData } = this.state;
    const { branch } = this.props;

    let arrData = [];

    if (text.trim().length > 0) {
      arrData = searchedArr;
    } else {
      arrData = AccordionData;
    }
    return (
      <View style={styles.listContainerFixedHeightStyle}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          onScroll={this._onScroll}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
        >
          {arrData.map((item, key) => {
            if (this.state.selectedData.companyName != item.companyName) {
              return (
                <ExpandableListView
                  key={item.companyName}
                  onClickFunction={this.update_Layout.bind(this, key, false)}
                  item={item}
                  branch={branch}
                  branchId={""}
                  selectedBranchId={this.selectedBranchId}
                  reloadList={text.trim().length > 0 ? true : false}
                />
              );
            } else {
              return (
                <ExpandableListView
                  key={item.companyName}
                  onClickFunction={this.update_Layout.bind(this, key, false)}
                  item={item}
                  branch={branch}
                  branchId={""}
                  selectedBranchId={this.selectedBranchId}
                  reloadList={text.trim().length > 0 ? true : false}
                />
              );
            }
          })}
        </ScrollView>
      </View>
    );
  }
  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          backdropTransitionOutTiming={1}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View style={styles.PlantListContainer}>
            <View style={styles.PlantListPopupContainer}>
              <Text style={styles.PlantListTitleStyle}>Select Plant</Text>
              <View style={styles.searchContainer}>
                <Image style={styles.searchIconStyle} source={ICON.IC_SEARCH} />
                <TextInput
                  style={styles.inputTextStyle}
                  ref={(input) => {
                    this.passwordTextInput = input;
                  }}
                  returnKeyType="default"
                  selectionColor="black"
                  underlineColorAndroid={"transparent"}
                  keyboardType="default"
                  placeholderTextColor="#C6C7CC"
                  placeholder="Search Company/Plant"
                  onChangeText={(text) => this.isSearchingData(text)}
                  value={this.state.text}
                  paddingRight={0}
                  paddingLeft={12}
                />
              </View>

              {this.renderExpandableList()}

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <View style={styles.PlantListCancelContainer}>
                    <Text style={styles.PlantListCancelText}>CANCEL</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.submitAction()}>
                  <View style={styles.submitButtonContainer}>
                    <Text style={styles.submitButtonText}>SUBMIT</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.navBarArrowButtonStyle}
          onPress={() => {
            this.getSessionDetail();
          }}
        >
          <Image style={styles.imageDownArrow} source={ICON.IC_DROP_DOWN} />
        </TouchableOpacity>
      </View>
    );
  }
}
