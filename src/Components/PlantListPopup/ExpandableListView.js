import React from "react";
import { CUSTOM_FONT } from "../../constants/strings";
import { ICON } from "../../constants";
import PropTypes from "prop-types";

import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default class ExpandableListView extends React.Component {
  static propTypes = {
    branchId: PropTypes.string,
    selectedBranchId: PropTypes.func,
    reloadList: PropTypes.bool,
    allId:PropTypes.object
  };

  static defaultProps = {
    branchId: "",
    allId:[],
  };

  constructor(props) {
    super(props);
    this.state = {
      layout_Height: 0,
      update: false,
      branchId: this.props.branchId,
      allId:this.props.allId,
      lastComp: "",
      defaultPlant: global.GLOBAL_BRANCH_ID,
    };
    const { branchId } = this.props;
    this.setState({ branchId: branchId });
    
  }
  componentWillReceiveProps(nextProps) {
  
    if (nextProps.item.expanded) {
      this.setState({ layout_Height: null });
    } else {
      this.setState({ layout_Height: 0 });
    }
   }
   
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.update !== nextState.update) {
      return true;
    }
    if (this.state.layout_Height !== nextState.layout_Height) {
      return true;
    }
    if (this.state.branchId !== nextState.branchId) {
      return true;
    }
    if (nextProps.reloadList != null) {
      return true;
    }
    return false;
  }

  show_Selected_Category = (item) => {
    const { branchId} = this.state;
    const allIDData= this.props.item.sub_Category 
    
    let result = allIDData.map(a => a.id);
 
 
      const { selectedBranchId } = this.props;
      this.setState({
        defaultPlant: "",
        branchId: item.id,
        lastComp: this.props.item.companyName,
      });
      const { id, name } = item;
        selectedBranchId({
          branchId:id,
          branchName: name,
          companyName: this.props.item.companyName,
          companyId: this.props.item.companyId,
        })
    
    };

  render() {
    
    const { branchId , defaultPlant} = this.state;
    let branchIdTemp = "";
    if (branchId == "") {
      branchIdTemp = branchId;
    } else {
      branchIdTemp = branchId;
    }
    const subCategory = [...this.props.item.sub_Category]
    const defaultCategory = [{id:-1, name:'All Plants'},...subCategory]
   
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.category_View}
        >
          <Text style={styles.category_Text}>
            {this.props.item.companyName}{" "}
          </Text>

          {this.props.item.expanded == true && (
            <Image style={styles.iconStyle} source={ICON.IC_DROP_UP} />
          )}
          {this.props.item.expanded == false && (
            <Image style={styles.iconStyle} source={ICON.IC_DROP_DOWN} />
          )}
        </TouchableOpacity>

        <View style={{ height: this.state.layout_Height, overflow: "hidden" }}>
          {this.props.item.sub_Category.map((item, key) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={this.show_Selected_Category.bind(this, item)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {(branchIdTemp == item.id ||
                    item.id == this.state.defaultPlant) && (
                    <Image
                      style={styles.iconRadioStyle}
                      source={ICON.IC_RADIO_ACTIVE}
                    />
                  )}
                  {branchIdTemp != item.id &&
                    item.id != this.state.defaultPlant && (
                      <Image
                        style={styles.iconRadioStyle}
                        source={ICON.IC_RADIO_INACTIVE}
                      />
                    )}

                  <Text style={styles.sub_Category_Text}>
                    {" "}
                    {item.name} ({item.id})
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 10 : 0,
    backgroundColor: "#F5FCFF",
  },

  iconStyle: {
    width: 30,
    height: 30,
  },
  iconRadioStyle: {
    width: 18,
    height: 18,
    marginLeft: 5,
  },

  sub_Category_Text: {
    fontSize: 14,
    color: "#454F63",
    padding: 10,
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
    marginLeft: -5,
  },

  category_Text: {
    textAlign: "left",
    color: "#454F63",
    fontWeight: "500",
    fontSize: 16,
    padding: 10,
    height: 40,
    width: width * 0.6,
    fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
  },

  category_View: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#C6C7CCB3",
    borderRadius: 8,
    borderWidth: 1,
  },

  Btn: {
    padding: 10,
    backgroundColor: "#FF6F00",
  },
});
