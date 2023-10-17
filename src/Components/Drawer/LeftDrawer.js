import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { styles } from './style';
import LogoutPopup from '../LogoutPopup/index';
import { ICON } from '../../constants';
import DatabaseManager from './../../Storage/storage';

export default class Drawer extends React.Component {

  constructor(props) {
    super(props);

    this.state = { userData: {} }
    this.getUserDetail()
  }

  getUserDetail = async () => {
    let userDataTemp = await DatabaseManager.getUserProfile()
    this.setState({ 'userData': JSON.parse(userDataTemp) })

  }

  render() {
    const { userData } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.profileTopContainer}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profileIconStyle}
              source={ICON.APP_ENTERPRISE_LOGO}
            />
            <Text style={styles.nameTextStyle}>{userData.userName}</Text>
            <Text style={styles.nameEmailStyle}>{userData.userEmail}</Text>
            <Text style={styles.namePhoneStyle}>Ph : +91- {userData.phoneNo}</Text>

            <Text style={styles.companyInfoStyle}>COMPANY INFORMATION</Text>
            <Text style={styles.companyNameStyle}>Havells India Limited CRI</Text>

            <Text style={styles.smallHeaderTextStyle}>Company ID</Text>
            <Text style={styles.smallTextStyle}>8655FGS12</Text>

            <Text style={styles.smallHeaderTextStyle}>Default Plant</Text>
            <Text style={styles.smallTextStyle}>Neemrana Water Heater - 243</Text>
          </View>

        </View>
        <View >
          <LogoutPopup
            nav={this.props.navigation}
          />
        </View>
      </SafeAreaView>
    );
  }
}