import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_KEYS } from './../constants';
class DatabaseManager {


  static setOTPVerified = async status => {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.OTP, status);
    } catch (error) {


      console.log(error.message);
    }
  };

  static getOTPVerified = async () => {
    let status = '';
    try {
      status = await AsyncStorage.getItem(ASYNC_KEYS.OTP) || 'none';
    } catch (error) {

    }
    return status;
  };

  static saveUserToken = async token => {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.TOKEN, token);
    } catch (error) {

      console.log(error.message);
    }
  };

  static getUserToken = async () => {
    let token = '';
    try {
      token = await AsyncStorage.getItem(ASYNC_KEYS.TOKEN) || 'none';
    } catch (error) {

    }
    return token;
  };

  static saveUserId = async userId => {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.USER_ID, userId);
    } catch (error) {

      console.log(error.message);
    }
  };

  static getUserId = async () => {
    let userId = '';
    try {
      userId = await AsyncStorage.getItem(ASYNC_KEYS.USER_ID) || 'none';
    } catch (error) {

    }
    return userId;
  };
  static getUserEmail = async () => {
    let userEmail = '';
    try {
      userEmail = await AsyncStorage.getItem(ASYNC_KEYS.USER_EMAIL) || 'none';
      console.log("Email", userEmail);
    } catch (error) {

    }
    return userEmail;

  };


  static saveUserProfile = async action => {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.USER_PROFILE, action);
    } catch (error) {

      console.log('ERROR in saveUserProfile---' + error.message);
    }
  };

  static getUserProfile = async () => {
    let userProfile = '';
    try {
      let user = await AsyncStorage.getItem(ASYNC_KEYS.USER_PROFILE);

      userProfile = user
    } catch (error) {

      console.log('jsonUserProfile= ERROR ' + error)
    }
    return userProfile;
  };


  static saveUserSession = async action => {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.SESSION_DATA, action);

    } catch (error) {

      console.log('ERROR in saveUserSession---' + error.message);
    }
  };

  static getUserSession = async () => {
    let userProfile = '';
    try {
      let user = await AsyncStorage.getItem(ASYNC_KEYS.SESSION_DATA);
      userProfile = user

    } catch (error) {

      console.log('getUserSession= ERROR ' + error)
    }
    return userProfile;
  };


  static saveRememberAction = async value => {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.REMEMBER_ME, value);
    } catch (error) {

      console.log(error.message);
    }
  };
  static getRememberAction = async () => {
    let value = '0';
    try {
      value = await AsyncStorage.getItem(ASYNC_KEYS.REMEMBER_ME) || '0';
    } catch (error) {

    }
    return value;
  };


  static saveEmailId = async value => {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.REMEMBER_EMAIL, value);
    } catch (error) {

      console.log('saveEmailId', error.message);
    }
  };
  static getEmailId = async () => {
    let value = '';
    try {
      value = await AsyncStorage.getItem(ASYNC_KEYS.REMEMBER_EMAIL) || '';
    } catch (error) {

    }
    return value;
  };


  static savePassword = async value => {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.REMEMBER_PASSWORD, value);
    } catch (error) {

      console.log(error.message);
    }
  };
  static getPassword = async () => {
    let value = '';
    try {
      value = await AsyncStorage.getItem(ASYNC_KEYS.REMEMBER_PASSWORD) || '';
    } catch (error) {

    }
    return value;
  };


  static saveSearchedHistory = async value => {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.SEARCHED_HISTORY, value);
    } catch (error) {

      console.log(error.message);
    }
  };
  static getSearchedHistory = async () => {
    let value = '';
    try {
      value = await AsyncStorage.getItem(ASYNC_KEYS.SEARCHED_HISTORY) || '';
    } catch (error) {

    }
    return value;
  };



  static saveFilterData = async value => {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.FILTER_DATA, value);
    } catch (error) {

      console.log(error.message);
    }
  };
  static saveIsCheckData = async value => {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.CHECKED_DATA, value);
    } catch (error) {

      console.log(error.message);
    }
  };
  static getIsCheckData = async () => {
    let value = ''
    try {
      value = await AsyncStorage.getItem(ASYNC_KEYS.CHECKED_DATA) || '';
    } catch (error) {

      console.log(error.message);
    }
  };
  static getFilterData = async () => {
    let value = '';
    try {
      value = await AsyncStorage.getItem(ASYNC_KEYS.FILTER_DATA) || '';
    } catch (error) {

    }
    return value;
  };

  static saveDashbaordFilterData = async value => {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.DASHBAORD_FILTER_DATA, value);
    } catch (error) {

      console.log(error.message);
    }
  };
  static getDashbaordFilterData = async () => {
    let value = '';
    try {
      value = await AsyncStorage.getItem(ASYNC_KEYS.DASHBAORD_FILTER_DATA) || '';
    } catch (error) {

    }
    return value;
  };

  static saveUserFilterForParticular = async value => {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS.PARTILUCAR_USER_FILTER, value);
    } catch (error) {

      console.log(error.message);
    }
  };

  static getUserFilterForParticular = async () => {
    let value = '';
    try {
      value = await AsyncStorage.getItem(ASYNC_KEYS.PARTILUCAR_USER_FILTER) || '';
    } catch (error) {

    }
    return value;
  };


  static resetStorage = async () => {
    try {
      await AsyncStorage.clear()
    } catch (error) {

      console.log(error.message);
    }
  };
}
export default DatabaseManager;