import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { colors } from '../../constants';
const { width, height } = Dimensions.get('window')
import { CUSTOM_FONT } from '../../constants/strings';
import { PlantListPopup } from '../index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  dot: {
    padding: 5,
    width: 12,
    height: 12,
    marginBottom: 10,
    alignSelf: 'center',
    marginLeft: 0,
    borderRadius: 8,
  },
  topSeparator: {
    height: 1,
    width: width,
    backgroundColor: '#C6C7CC',
    marginTop: 1,
    opacity: 0.6,
    // height: 1,
    // width: width,
    // backgroundColor: 'lightgray',
    // marginTop: -1,
    // opacity: (Platform.OS === 'ios') ? 0.1 : 1,
  },
  DliveredSBG: {
    // backgroundColor: '#61D8AD',
    color: '#61D8AD',
  },
  PlacedBG: {
    backgroundColor: '#46B6F540',
    color: '#46B6F540',
  },
  ConfirmedBG: {
    backgroundColor: '#46B6F540',
    color: '#46B6F540',
  },
  ShippedBG: {
    backgroundColor: '#1DD7F840',
    color: '#1DD7F840',
  },
  DliveredBG: {
    backgroundColor: '#61D8AD40',
    color: '#61D8AD40',
  },
  CreatedBG: {
    backgroundColor: '#3882E040',
  },

  PlacedSBG: {
    backgroundColor: '#46B6F5',
    color: '#46B6F5',
  },
  ConfirmedSBG: {
    backgroundColor: '#46B6F5',
    color: '#46B6F5',
  },
  ShippedSBG: {
    backgroundColor: '#1DD7F8',
    color: '#1DD7F8',
  },
  CancelledDot: {
    backgroundColor: colors.DEFAULT_RED_COLOR,
    color: colors.DEFAULT_RED_COLOR,
  },

  ShippedDot: {
    backgroundColor: 'orange',
    color: 'orange',
  },
  DliveredSBG: {
    backgroundColor: '#61D8AD',
    color: '#61D8AD',
  },
  DliveredDot: {
    backgroundColor: '#7ecb20',
    color: '#7ecb20',
  },
  CreatedSBG: {
    backgroundColor: '#3882E0',
    color: '#3882E0',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: -20,
  },
  headerLeftView: {
    flex: 1,
  },
  headerRightView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  LeftText1: {
    color: '#898A8F',
    fontSize: 10,
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  LeftText2: {
    color: '#454F63',
    fontSize: 14,
    marginTop: 2,
    marginBottom: 1,
    fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
  },
  LeftText3: {
    color: '#898A8F',
    fontSize: 10,
    fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
  },
  status: {
    fontSize: 14,
    color: '#454F63',
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
    marginLeft: 5,
    marginRight: 5,
  },
  ListContainer: {
    flex: 1,
    marginTop: 15,
  },
  RowContainer: {
    flex: 1,
    padding: 15,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  separatorStyle: {
    backgroundColor: 'lightgray',
    height: 1,
    width: width,
    marginTop: 15,
    marginLeft: -15,
  },
  flatList: {
    flex: 1,
    marginBottom: -80
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'red',
  },
  viewProductDesc: {
    flex: 1,
    flexDirection: 'row',
  },
  viewPriceQuantityAndTAmount: {
    flex: 1,
    marginTop: 15,
  },
  textProductDesc: {
    flex: 1,
    color: '#898A8F',
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  textItems: {
    flex: 1,
    textAlign: 'right',
    color: '#898A8F',
    fontSize: 10,
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  viewItemIdBGStyle: {
    // backgroundColor:'#898A8F1F',
    borderRadius: 4,
    flexDirection: "row",
    marginLeft: 10,
  },
  partNuView: {
    padding: 2,
    backgroundColor: '#898A8F1F',
    borderRadius: 4,
  },
  statusView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10
  },
  statusInnerView: {
    justifyContent: 'center',
    marginLeft: 10
  },
  textItemsID: {
    color: '#898A8F',
    fontSize: 12,
    fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  imageStyle: {
    marginTop: 0,
    height: 50,
    width: 50,
    resizeMode: 'contain',
    backgroundColor: '#898A8F1F',
  },
  textDesc: {
    flex: 1,
    marginTop: 5,
    textAlignVertical: 'center',
    marginLeft: 10,
    marginRight: 20,
    fontSize: 14,
    color: '#454F63',
    fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
  },
  viewPrice: {
    flex: 1,

  },
  viewQuantity: {
    flex: 1,
  },
  viewTotalAmount: {
    marginTop: -45,
    flex: 1,
    alignItems: 'flex-end',
  },
  viewTrackItem: {
    height: 33,
    width: 100,
    marginTop: 15,
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: '#D9232D14',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTrackItems: {
    fontSize: 14,
    color: '#D9232D',
    fontFamily: CUSTOM_FONT.HEEBO_BOLD,
  },
  contactContainer: {
    height: 50,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  contactPopView: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    zIndex: 9,
    left: 10,
    bottom: -20
  },

});