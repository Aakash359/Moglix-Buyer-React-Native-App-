import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from 'react-native';
import {styles} from './style'; 
import {ICON} from '../../constants';
import PropTypes from 'prop-types';
import { ScreenConstants } from './../../constants';
import DatabaseManager from '../../Storage/storage';

export default class FilterDrawer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      manageStateOfFilterArray: ['','','',''],
    };
      this.getFilterD()
    }
   static propTypes = {
      nav:PropTypes.object,
    }

  

  getFilterD = async () => {
    const arrData = await DatabaseManager.getFilterData();
    if (arrData != null) {
        var DATA = JSON.parse(arrData)
        this.setState({manageStateOfFilterArray:DATA})
    }
    
}

    selectAndDeSelectedStateOfFilter=(index,value)=>{
    
      const some_array = [...this.state.manageStateOfFilterArray]
      some_array[index] = value
      this.setState({manageStateOfFilterArray:some_array})
      DatabaseManager.saveFilterData(JSON.stringify(some_array))
     }


render() {
  const { nav } = this.props
  const { manageStateOfFilterArray } = this.state
  

    return (
            <SafeAreaView style={styles.container}>
              <View style={styles.filterViewStyle}>
                <Text style={styles.filterTextStyle}>Filters</Text>
                <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.closeDrawer()
                 }}>
                    <Image source={ICON.IC_CLOSE_LOGO} style={styles.crosImageStyle}></Image>
                </TouchableOpacity>
              </View>

              <Text style={styles.subTitle}>Placed In</Text>
              <View style={styles.placedInViewRowStyle}>
              <TouchableOpacity 
                        onPress={() => {
                          this.selectAndDeSelectedStateOfFilter(0,'LAST 7 DAYS')
                        }}>
                <View style={styles.placedInButtonViewStyle}>
                    <Text style={this.state.manageStateOfFilterArray[0] != 'LAST 7 DAYS' ? styles.placedInButtonTextStyle : styles.placedInButtonTextSelectedStyle}>LAST 7 DAYS</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity 
                        onPress={() => {
                          this.selectAndDeSelectedStateOfFilter(0,'LAST 10 DAYS')
                        }}>
                <View style={styles.placedInButtonViewStyle}>
                    <Text style={this.state.manageStateOfFilterArray[0] != 'LAST 10 DAYS' ? styles.placedInButtonTextStyle : styles.placedInButtonTextSelectedStyle}>LAST 10 DAYS</Text>
                </View>
                </TouchableOpacity>
              </View>


              <View style={styles.placedInViewRowStyle}>
              <TouchableOpacity
                        onPress={() => {
                          this.selectAndDeSelectedStateOfFilter(0,'LAST 20 DAYS')
                        }}>
                <View style={styles.placedInButtonViewStyle}>
                    <Text style={this.state.manageStateOfFilterArray[0] != 'LAST 20 DAYS' ? styles.placedInButtonTextStyle : styles.placedInButtonTextSelectedStyle}>LAST 20 DAYS</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity 
                        onPress={() => {
                          this.selectAndDeSelectedStateOfFilter(0,'LAST 1 MONTH')
                        }}>
                <View style={styles.placedInButtonViewStyle}>
                    <Text style={this.state.manageStateOfFilterArray[0] != 'LAST 1 MONTH' ? styles.placedInButtonTextStyle : styles.placedInButtonTextSelectedStyle}>LAST 1 MONTH</Text>
                </View>
                </TouchableOpacity>
              </View>
              <View style={styles.placedInViewRowStyle}>
              <TouchableOpacity
                        onPress={() => {
                          this.selectAndDeSelectedStateOfFilter(0,'LAST 3 MONTH')
                        }}>
                <View style={styles.placedInButtonViewStyle}>
                    <Text style={this.state.manageStateOfFilterArray[0] != 'LAST 3 MONTH' ? styles.placedInButtonTextStyle : styles.placedInButtonTextSelectedStyle}>LAST 3 MONTH</Text>
                </View>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.selectDataTitle}>Select Date</Text>
              <View style={styles.placedInViewRowStyle}>
                <View style={styles.selectFromDataView}>
                    <Text style={styles.subTitle2}>From</Text>
                    <TouchableOpacity 
                        onPress={() => {
                          this.selectAndDeSelectedStateOfFilter(0,'Select from Date')
                          this.props.navigation.navigate(ScreenConstants.CALENDAR_SCREEN,{commingFromOrTo: 'from'})
                        }}>
<Text style={styles.selectFromAndToDataTitle}>{manageStateOfFilterArray[1] == '' ? 'Select Date' :  manageStateOfFilterArray[1]}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.selectToDataView}>
                    <Text style={styles.subTitle2}>To</Text>
                    <TouchableOpacity
                        onPress={() => {
                          this.selectAndDeSelectedStateOfFilter(0,'Select to Date')
                          this.props.navigation.navigate(ScreenConstants.CALENDAR_SCREEN,{commingFromOrTo: 'to'})
                        }}>
                    <Text style={styles.selectFromAndToDataTitle}>{manageStateOfFilterArray[2] == '' ? 'Select Date' : manageStateOfFilterArray[2]}</Text>
                    </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.poTitle}>PO Type</Text>
              <View style={styles.poViewRowStyle}>
              <TouchableOpacity style={styles.openPoButtonViewStyle}
                        onPress={() => {
                          this.selectAndDeSelectedStateOfFilter(3,'OPEN PO')
                        }}>
                <View>
                    <Text style={this.state.manageStateOfFilterArray[3] != 'OPEN PO' ? styles.poTypeInButtonTextStyle : styles.poTypeInButtonTextSelectedStyle}>OPEN PO</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closePoButtonViewStyle}
                        onPress={() => {
                          this.selectAndDeSelectedStateOfFilter(3,'CLOSE PO')
                        }}>
                <View>
                    <Text style={this.state.manageStateOfFilterArray[3] != 'CLOSE PO' ? styles.poTypeInButtonTextStyle : styles.poTypeInButtonTextSelectedStyle}>CLOSE PO</Text>
                </View>
                </TouchableOpacity>
              </View>

              <View style={styles.cancelAndApplyFilterView}>
              <View style={styles.cancelAndApplyButtonView}>
                <TouchableOpacity style={styles.cancelButtonView} 
                        onPress={() => {
                          this.setState({manageStateOfFilterArray: ['','','','']})
                          DatabaseManager.saveFilterData(JSON.stringify(['','','','']))
                        }}>
                <View style={styles.cancelButtonView}>
                    <Text style={styles.cancelButtonTextStyle}>CLEAR ALL</Text>
                </View>
                </TouchableOpacity>

                <View style={styles.spaceView}></View>
                <TouchableOpacity style={styles.applyButtonView} 
                        onPress={() => {
                        }}>
                <View style={styles.applyButtonView}>
                <Text style={styles.applyButtonTextStyle}>APPLY FILTER</Text>
                </View>
                </TouchableOpacity>
            </View>
              </View>

            </SafeAreaView>
          );
    }
}
