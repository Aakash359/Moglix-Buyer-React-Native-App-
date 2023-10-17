import React, { Component } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import NavBarBackButtonAndTitleOnly from "../../Components/Commons/NavBars/CommonNavBars/NavBarBackButtonAndTitleOnly";
import PropTypes from "prop-types";
import DatabaseManager from "../../Storage/storage";
import moment from "moment";

import { CUSTOM_FONT } from "../../constants/strings";

export default class CustomCalendar extends Component {
  constructor(props) {
    super(props);
    const { commingFromOrTo } = this.props;
    this.state = {
      dateSelected: "",
      fromDate: "",
      toDate: "",
      manageStateOfFilterArray: ["", "", "", ""],
      selectedTab: commingFromOrTo,
    };
    this.getFilterD();
  }

  static propTypes = {
    onPressBackButton: PropTypes.func,
    nav: PropTypes.object,
    commingFromOrTo: PropTypes.string,
  };

  static defaultProps = {};

  getFilterD = async () => {
    const arrData = await DatabaseManager.getFilterData();
    if (arrData != null) {
      DATA = JSON.parse(arrData);
      this.setState({ fromDate: DATA[1] });
      this.setState({ toDate: DATA[2] });
      this.setState({ manageStateOfFilterArray: DATA });
    }
  };

  selectedDate(day) {
    this.setState(
      {
        dateSelected: {
          [day.dateString]: {
            selected: true,
            selectedColor: "#D9232D",
            borderRadius: 4,
          },
        },
      },
      () => {

        if (
          this.state.selectedTab == "from" ||
          this.state.selectedTab == "dashbaord"
        ) {
          var fromDate = day.dateString;

          this.setState({ fromDate: fromDate, selectedTab: "to" });
        } else {

          var toDate = day.dateString;
          var toD = new Date(toDate);
          var fromD = new Date(this.state.fromDate);
          var p = fromD.toLocaleString().split(",")[0]
          var fDate = p.split("/").reverse().join("/");
          var start = new Date(fDate);
          start.setUTCHours(0, 0, 0, 0);
          // var oo = Date.parse(start)
          if (toD < fromD) {
            alert("To date always greater then to from date");
          } else {
            this.setState({ toDate: toDate });
          }
        }


      }
    );
  }

  render() {
    const { nav } = this.props;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var currentDate = "";
    currentDate = year + "-" + month + "-" + date;
    if (date < 10) {
      currentDate = year + "-" + month + "-" + "0" + date;
    }
    if (month < 10) {
      currentDate = year + "-" + "0" + month + "-" + date;
    }
    if (month < 10 && date < 10) {
      currentDate = year + "-" + "0" + month + "-" + "0" + date;
    }
    const { dateSelected, onPressBackButton, fromDate } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <NavBarBackButtonAndTitleOnly
          BackAction={onPressBackButton}
          title={"Select Dates"}
        />
        <View style={styles.topSeparator}></View>

        <View style={styles.placedInViewRowStyle}>
          <View style={styles.selectFromDataView}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ selectedTab: "from" });
              }}
            >
              <Text
                style={[
                  styles.subTitle2,
                  this.state.selectedTab == "from"
                    ? { color: "red" }
                    : { color: "#898A8F80" },
                ]}
              >
                From
              </Text>
              <Text style={styles.selectFromAndToDataTitle}>
                {this.state.fromDate == ""
                  ? "Select Date"
                  : this.state.fromDate}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.selectToDataView}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ selectedTab: "to" });
              }}
            >
              <Text
                style={[
                  styles.toDateStyle,
                  this.state.selectedTab == "to"
                    ? { color: "red" }
                    : { color: "#898A8F80" },
                ]}
              >
                To
              </Text>
              <Text style={styles.selectFromAndToDataTitle}>
                {this.state.toDate == "" ? "Select Date" : this.state.toDate}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.daysNameViewStyle}>
          <Text style={styles.daysNameTextStyle}>SUN</Text>
          <Text style={styles.daysNameTextStyle}>MON</Text>
          <Text style={styles.daysNameTextStyle}>TUE</Text>
          <Text style={styles.daysNameTextStyle}>WED</Text>
          <Text style={styles.daysNameTextStyle}>THU</Text>
          <Text style={styles.daysNameTextStyle}>FRI</Text>
          <Text style={styles.daysNameTextStyle}>SAT</Text>
        </View>

        <View style={styles.separatorView}></View>

        <CalendarList
          style={styles.calendarView}
          minDate={'2021-04-01'}
          maxDate={new Date()}
          current={currentDate}
          theme={{
            selectedDayBackgroundColor: "#D9232D",
            todayTextColor: "brown",
            dotColor: "grey",
            arrowColor: "orange",
            monthTextColor: "#454F63",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
            borderRadius: 1,
            textMonthFontFamily: CUSTOM_FONT.HEEBO_BOLD,
            textDayFontFamily: CUSTOM_FONT.HEEBO_BOLD,
            textDayHeaderFontFamily: CUSTOM_FONT.HEEBO_BOLD,
            textMonthFontWeight: "bold",
            textDayFontWeight: "300",
          }}
          onDayPress={(day) => {
            this.selectedDate(day);
          }}
          markedDates={this.state.dateSelected}
          onDayLongPress={(day) => this.selectedDate(day)}
          monthFormat={"MMMM yyyy"}
          // onMonthChange={(month) => {
          //   console.log("month changed", month);
          // }}
          hideArrows={true}
          renderArrow={(direction) => <Arrow />}
          hideExtraDays={true}
          disableMonthChange={true}
          firstDay={0}
          hideDayNames={true}
          showWeekNumbers={false}


        />

        <TouchableOpacity
          disabled={!this.state.fromDate || !this.state.toDate}
          onPress={() => {
            const some_array = [...this.state.manageStateOfFilterArray];
            some_array[1] = this.state.fromDate;
            some_array[2] = this.state.toDate;
            this.setState({ manageStateOfFilterArray: some_array });
            if (this.props.commingFromOrTo != "dashbaord") {
              DatabaseManager.saveFilterData(JSON.stringify(some_array));
            } else {
              DatabaseManager.saveDashbaordFilterData(
                JSON.stringify(some_array)
              );
            }
            onPressBackButton(some_array);
          }}
        >
          <View
            style={
              this.state.fromDate && this.state.toDate
                ? styles.doneButtonView
                : styles.doneButtonViewWithOpacity
            }
          >
            <Text style={styles.doneButtonText}>DONE</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

