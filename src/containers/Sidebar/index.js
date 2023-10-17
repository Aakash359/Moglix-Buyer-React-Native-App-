import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { getUserSignOut } from '../../actions';
import { getLoggedInUserData } from '../../reducers/user';
import PropTypes from 'prop-types';
import { styles } from './style';
import LogoutPopup from "../../Components/LogoutPopup/index";
import { ICON } from '../../constants';
import DatabaseManager from './../../Storage/storage';
import VersionCheck from 'react-native-version-check';

class SideBar extends Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        signOutUser: PropTypes.func,
        userData: PropTypes.object,
        sessionData: PropTypes.object,
    }

    static defaultProps = {
        userData: {},
        sessionData: {},
        signOutUser: () => {
        },
    }

    constructor(props) {
        super(props);
        this.state = { userData: {}, sessionData: {} }
        this.getUserAndSessionData()
    }

    componentDidUpdate() {
        if (global.profileUpdate) {
            this.getUserAndSessionData()
            global.profileUpdate = false
        }
    }

    getUserAndSessionData() {
        (async () => {
            this.getUserDetail()
            this.getSessionDetail()
        })();
    }

    getUserDetail = async () => {
        let userDataTemp = await DatabaseManager.getUserProfile()

        this.setState({ 'userData': JSON.parse(userDataTemp) })
    }

    getSessionDetail = async () => {
        let sessionDataTemp = await DatabaseManager.getUserSession()
        this.setState({ 'sessionData': JSON.parse(sessionDataTemp) })
    }

    navigationLogic = (data) => {
        const { navigation, signOutUser } = this.props
        let returnValue = () => {
        }
        switch (data.actionType) {
            case 'switchScreen':
                navigation.navigate(data.route)
                break

            case 'logout':
                signOutUser()

                break

            default:
                returnValue = () => {
                }
        }
        return returnValue
    }

    render() {


        const { userData, sessionData } = this.state


        let defaultBranchName = "N/A"
        let CompanyName = ""
        let CompanyID = ""

        if (sessionData != null) {
            if (Object.keys(sessionData).length > 0) {

                CompanyID = global.GLOBAL_COMPANY_ID
                CompanyName = global.GLOBAL_COMPANY_NAME
                let defaultBranchId = ""
                if (Object.keys(sessionData.companyData.branchNames).length != 0) {
                    defaultBranchName = sessionData.companyData.branchNames[global.GLOBAL_BRANCH_ID]
                }
                if (Object.keys(sessionData.companyData.companyToDefaultBranch).length != 0) {
                    defaultBranchId = sessionData.companyData.companyToDefaultBranch[CompanyID]
                    defaultBranchName = sessionData.companyData.branchNames[global.GLOBAL_BRANCH_ID]
                }
            }
        }

        return (
            <View style={styles.container}>
                <View style={styles.profileTopContainer}>
                    <View style={styles.profileContainer}>
                        <View style={styles.userContainerStyle}>
                            <Image
                                style={styles.profileIconStyle}
                                source={ICON.APP_ENTERPRISE_LOGO}
                            />
                            <Text style={styles.nameTextStyle}>{userData.userName}</Text>
                            <Text style={styles.nameEmailStyle}>{userData.userEmail}</Text>
                            <Text style={styles.namePhoneStyle}>Ph : +91-{userData.phoneNo}</Text>
                        </View>

                        <View >
                            <Text style={styles.companyInfoStyle}>COMPANY INFORMATION</Text>
                            <Text style={styles.companyNameStyle}>{CompanyName}</Text>

                            <Text style={styles.smallHeaderTextStyle}>Company ID</Text>
                            <Text style={styles.smallTextStyle}>{CompanyID}</Text>

                            <Text style={styles.smallHeaderTextStyle}>Default Plant</Text>
                            <Text style={styles.smallTextStyle}>{defaultBranchName}</Text>

                            <Text style={styles.smallHeaderTextStyle}>App Version</Text>
                            <Text style={styles.smallTextStyle}>{VersionCheck.getCurrentVersion()}</Text>
                        </View>

                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                    <LogoutPopup
                        nav={this.props.navigation}
                    />
                </View>

            </View>
        )
    }
}


const mapStateToProps = state => {
    let userData = getLoggedInUserData(state)
    userData = { user_profile: userData.toJS() }

    return {
        userData,
    }
}

export default connect(mapStateToProps, {
    signOutUser: getUserSignOut,
})(SideBar)

