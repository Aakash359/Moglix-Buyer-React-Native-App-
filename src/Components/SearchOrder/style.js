import {
    StyleSheet,
    Dimensions,
} from 'react-native';

import { colors } from '../../constants';
import { CUSTOM_FONT } from '../../constants/strings';

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topSeparator: {
        height: 1,
        width: width,
        backgroundColor: '#C6C7CC',
        marginTop: 1,
        opacity: 0.6,
    },
    inputTextStyle: {
        color: colors.DEFAULT_BUTTON_DARK_GRAY,
        fontSize: 14,
        marginLeft: 8,
        marginRight: 8,
        height: 38,
    },
    imageHistoryStyle: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginLeft: 20,
    },
    historyContainer: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_COLOR,
        flexDirection: 'column',
    },
    historyTopContainer: {
        height: 60,
        //backgroundColor:'red',
        flexDirection: 'row',
    },
    historyIconContainer: {
        flex: 2,
        //backgroundColor:'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchTextStyle: {
        marginLeft: 16,
        color: '#505050',
        fontFamily: CUSTOM_FONT.HEEBO_REGULAR,

    },
    clearAllContainer: {
        flex: 1,
        //backgroundColor:'red',
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    clearAllButtonStyle: {
        height: 35,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:'white',
        marginRight: 16,
    },
    clearAllDisabledTextStyle: {
        color: '#3875FD',
        opacity: 0.3,
        fontSize: 14,
        fontWeight: '700',
        fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
    },
    clearAllTextStyle: {
        color: '#3875FD',
        fontSize: 14,
        fontWeight: '700',
        fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
    },
    historyEmptyTextContainer: {
        flex: 1,
        //backgroundColor:'white',
        flexDirection: 'column',
    },
    emptyTextStyle: {
        marginLeft: 20,
        color: '#B6B6B6',
        fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
    },
    searchedHistoryContainer: {
        flex: 1,
        //backgroundColor:'white',
    },

    item: {
        marginVertical: 2,
        marginHorizontal: 20,
        height: 35,
        justifyContent: 'center',
    },
    title: {
        color: '#454F63',
        fontSize: 16,
        fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
    },
    ListViewContainer: {
        flex: 1,
    },
    ListRow: {
        flex: 1,
        //flexDirection: 'row',
        shadowColor: "black",
        shadowOpacity: (Platform.OS === 'ios' ? 0.25 : 1),
        shadowRadius: 7,
        elevation: 7,
        marginBottom: 15,
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    statusWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dot: {
        padding: 5,
        width: 12,
        height: 12,
        marginTop: 8,
        alignSelf: 'center',
        marginLeft: 15,
        borderRadius: 8,
    },
    columnContainer: {
        flexDirection: 'column',
        alignSelf: "center"
    },
    status: {
        fontWeight: 'normal',
        marginTop: 0,
        marginBottom: 0,
        fontSize: 14,
        color: '#454F63',
        fontFamily: CUSTOM_FONT.HEEBO_BOLD,
        marginLeft: 5,
        marginRight: 5,
    },
    columnContainer2: {
        flexDirection: 'column',
        marginTop: 5,
        marginLeft: -10,
        width: 152,
    },
    ListRowInnerFirstView: {
        flex: 1.4,
        padding: 15,
        backgroundColor: 'white'
    },
    ListRowInnerSecondView: {
        flex: 1,
        alignItems: 'flex-end',
        padding: 15,
        backgroundColor: 'white'
    },
    invoiceSeparater: {
        height: 0.8,
        backgroundColor: '#e0e0e0',
        marginTop: 5,
    },
    viewOrderNumberBGStyle: {
        borderRadius: 4,
        flexDirection: "row",
        marginLeft: 0,
    },
    leftArrow: {
        fontSize: 18,
        top: 18,
        marginRight: 40,
        fontWeight: "bold",
    },
    leftClosedArrow: {
        fontSize: 18,
        top: 7,
        marginRight: 40,
        fontWeight: "bold",
    },
    LeftText1: {
        color: '#898A8F',
        fontSize: 10,
        //marginTop:-10,
        fontFamily: CUSTOM_FONT.HEEBO_BOLD,
    },
    orderNo: {
        color: '#898A8F',
        fontWeight: 'normal',
        fontSize: 12,
        marginTop: 0,
        marginBottom: 0,
        fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
        marginLeft: 5,
        marginRight: 5,
    },
    LeftText2: {
        color: '#D9232D',
        fontWeight: 'normal',
        fontSize: 16,
        marginTop: 0,
        marginBottom: 0,
        fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
    },
    Eta: {
        fontWeight: 'normal',
        marginTop: 0,
        marginBottom: 0,
        width: 180,
        fontSize: 14,
        color: '#454F63',
        fontFamily: CUSTOM_FONT.HEEBO_BOLD,
    },
    LeftText3: {
        color: '#898A8F',
        fontWeight: 'normal',
        fontSize: 12,
        marginBottom: 15,
        fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
    },
    pendingQty: {
        color: '#898A8F',
        fontWeight: 'normal',
        fontSize: 12,
        marginLeft: 5,
        alignSelf: 'center',
        fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
    },
    LeftText4: {
        color: '#454F63',
        fontSize: 14,
        marginTop: 0,
        alignSelf: 'center',
        fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
    },
    rightArrowStyle: {
        width: 24,
        height: 24,
        marginRight: -10,
    },
    ButtonViewStyle: {
        color: '#454F63',
        marginTop: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        borderRadius: 7,
        borderColor: 'transparent',
    },
    ButtonTextStyle: {
        textAlign: 'center',
        fontSize: 12,
        textTransform: 'uppercase',
        fontFamily: CUSTOM_FONT.HEEBO_BOLD,
        color: '#454F63',
        marginLeft: 10,
        marginRight: 0,
    },
    PlacedBG: {
        backgroundColor: '#3882E040',
    },
    ConfirmedBG: {
        backgroundColor: '#46B6F540',
    },
    ShippedBG: {
        backgroundColor: '#61D8AD4D',
    },
    DeliveredBG: {
        backgroundColor: '#77CB364D',
    },
    CreatedBG: {
        backgroundColor: 'lightblue',
    },
    CancelledDot: {
        backgroundColor: colors.DEFAULT_RED_COLOR,
        color: colors.DEFAULT_RED_COLOR,
    },
    DliveredDot: {
        backgroundColor: '#7ecb20',
        color: '#7ecb20',
    },
    ShippedDot: {
        backgroundColor: 'orange',
        color: 'orange',
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
    DliveredSBG: {
        backgroundColor: '#61D8AD',
        color: '#61D8AD',
    },
    CreatedSBG: {
        backgroundColor: '#3882E0',
        color: '#3882E0',
    },

    NoDataAvailableStyle: {
        flex: 1,
        textAlign: 'center',
    },
    DataAvailableStyle: {
        height: 0,
    },
    viewItemIdBGStyle: {
        // backgroundColor:'#898A8F1F',
        borderRadius: 4,
        flexDirection: "row",
        marginLeft: 10,
    },
    orderNoView: {
        padding: 2,
        backgroundColor: '#E5F2FD',
        borderRadius: 4,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    orderNoLable: {
        color: '#898A8F',
        fontSize: 12,
        fontFamily: CUSTOM_FONT.HEEBO_BOLD,
        marginBottom: 5,
        left: 3,
        alignSelf: 'center',
        marginTop: 0,
        marginBottom: 0,
    },
    orderNo: {
        color: '#898A8F',
        fontWeight: 'normal',
        fontSize: 12,
        marginTop: 0,
        marginBottom: 0,
        fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
        marginLeft: 5,
        marginRight: 5,
    },
    partNuView: {
        padding: 2,
        borderRadius: 4,
        marginLeft: 10,
    },
    textItemsID: {
        color: '#898A8F',
        fontSize: 12,
        fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
        textAlign: 'left',
        marginLeft: 5,
        marginRight: 5,
    },
    viewProductDesc: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 15,
        marginBottom: 20,
    },
    EtaWrap2: {
        flexDirection: 'row',
        width: 180,
        marginLeft: -30,
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    Etamsg: {
        color: '#898A8F',
        fontSize: 12,
        // marginLeft: 22,
        fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
    },
    imageStyle: {
        marginTop: 3,
        height: 75,
        width: 75,
        resizeMode: 'contain',
    },
    textDesc: {
        flex: 1,
        marginTop: 5,
        textAlignVertical: 'center',
        marginLeft: 10,
        fontSize: 14,
        color: '#454F63',
        fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
    },
    warpper: {
        flexDirection: 'row',
        marginLeft: 10,
        height: 40,
        marginBottom: 10,
    },
    LastLabelStyle: {
        color: '#898A8F',
        fontSize: 10,
        fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
    },
});