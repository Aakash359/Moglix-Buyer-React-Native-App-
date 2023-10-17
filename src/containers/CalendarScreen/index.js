import React, { Component } from "react";
import { CustomCalendar } from "../../Components";
import DatabaseManager from '../../Storage/storage';
import { BackHandler,} from "react-native";

export default class CalendarScreen extends Component {
  constructor(props) {
    super(props);
  }

  backAction = () => {
    global.DateUpdate = false;
    DatabaseManager.saveFilterData(JSON.stringify(['','','','']))
    this.props.navigation.openDrawer(true);
    this.props.navigation.goBack();
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }
  backButtonAction = (backButtonData) => {
    if (
      this.props.navigation &&
      this.props.navigation.state &&
      this.props.navigation.state.params &&
      this.props.navigation.state.params.applyFilterAction &&
      backButtonData &&
      backButtonData.length
    ) {
      global.DateUpdate = true;
      this.props.navigation.state.params.applyFilterAction(backButtonData);
    }else{
      global.DateUpdate = false;
      DatabaseManager.saveFilterData(JSON.stringify(['','','','']))
    }
     this.props.navigation.openDrawer(true);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <CustomCalendar
        onPressBackButton={this.backButtonAction}
        commingFromOrTo={this.props.navigation.state.params.commingFromOrTo}
      />
    );
  }
}