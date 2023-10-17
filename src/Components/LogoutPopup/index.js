import React from 'react';
import { Modal, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { styles } from './style';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenConstants,ASYNC_KEYS} from '../../constants';
import {AppConfig} from '../../constants';
import DatabaseManager from './../../Storage/storage';
import GlobalStyle from './../../style';
import { Loader } from '../../Components/Commons';

const axios = require('axios');

export default class LogoutPopup extends React.Component {

    static propTypes = {
        showPopup: PropTypes.bool,
        nav: PropTypes.object,
    }

    static defaultProps = {
        showPopup: false
    }

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false, isLoading: false
        }
    }

    setModalVisible(visible) {
        global.GLOBAL_COMPANY_NAME = ''
        global.GLOBAL_BRANCH_NAME = ''
        global.activeOrders = 0
        global.shipped = 0
        global.delivered = 0
        global.inProcess = 0
        global.other = 0
        this.setState({ modalVisible: visible });
    }

    logout = async () => {
        const { nav } = this.props
        AsyncStorage.removeItem(ASYNC_KEYS.USER_ID)
        DatabaseManager.setOTPVerified('false')
        nav.navigate(ScreenConstants.LOGIN_SCREEN, { logout: true })
    }

    getUserDetail = async () => {
        let userDataTemp = await DatabaseManager.getUserProfile()
        const userData = JSON.parse(userDataTemp)
        const data = {
            userId: userData.userId, token: userData.token
        }
        this.setState({ isLoading: true })
        this.callLogoutAPI(data)
    }

    callLogoutAPI = (data) => {

        const config = {
            'Content-Type': 'application/json',
            application: 1,
            idBranch: global.GLOBAL_BRANCH_ID,
            idCompany: global.GLOBAL_COMPANY_ID,
            idUser: data.idUser,
            Origin: 'https://buyersqa.moglix.com',
            token: data.token,
        }

        axios.post(AppConfig.BASEURL + '/login/auth/logout', config, {})
            .then(function (response) {
                this.setState({ isLoading: true })
                this.logout()
            }.bind(this))
            .catch(function (error) {
                this.setState({ isLoading: false })
                this.logout()
            }.bind(this));
    }

    render() {

        const { isLoading } = this.state
        return (

            <SafeAreaView >
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={{
                        flex: 1,
                    }}>
                        <View style={styles.logoutContainer}>
                            <View style={styles.logoutPopupContainer}>
                                <Text style={styles.logoutTitleStyle}>Logout</Text>
                                <Text style={styles.logoutDescriptionStyle}>Are you sure you want to logout? If you logout will be returned to the login screen</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                                        <View style={styles.logoutCancelContainer}>
                                            <Text style={styles.logoutCancelText}>CANCEL</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.getUserDetail()}>
                                        <View style={styles.logoutButtonContainer}>
                                            <Text style={styles.logoutButtonText}>LOGOUT</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {(isLoading) &&
                            <View style={GlobalStyle.loaderStyle}>
                                <Loader />
                            </View>
                        }
                    </View>
                </Modal>

                <TouchableOpacity style={{  backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <View style={styles.logoutStyle}>
                        <Text style={styles.logoutTextStyle}>LOGOUT</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}