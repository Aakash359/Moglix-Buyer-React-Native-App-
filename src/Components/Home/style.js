import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import { colors } from '../../constants';
import { CUSTOM_FONT } from '../../constants/strings';
import { normalize } from 'react-native-elements';
const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        //backgroundColor: colors.BACKGROUND_COLOR,
        padding: 18,
    },
    topSeparator: {
        height: 1,
        width: width,
        backgroundColor: '#C6C7CC',
        marginTop: 1,
        opacity: 0.6,
    },
    welcomeTextStyle: {
        fontSize: 26,
        color: 'black',
        fontFamily: CUSTOM_FONT.ROBOTO_BOLD,
    },
    usernameTextStyle: {
        fontSize: 26,
        color: colors.DEFAULT_RED_COLOR,
        fontFamily: CUSTOM_FONT.ROBOTO_BOLD,
    },
    subTitleTextStyle: {
        fontSize: 16,
        color: '#454F63',
        opacity: 0.6,
        marginTop: 12,
        fontFamily: CUSTOM_FONT.ROBOTO_REGULAR,
    },

    //Search...
    searchContainer: {
        height: 55,
        marginTop: 22,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        borderColor: '#C6C7CC',
        borderRadius: 8,
        borderWidth: 1,
        shadowColor: 'black',
        shadowOpacity: 0.29,
        shadowRadius: 16,
        elevation: 16,
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },
    searchIconStyle: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        marginLeft: normalize(15),
    },
    giftImageStyle: {
        width: 320,
        height: 55,
        borderRadius: 12,
        //resizeMode: 'contain',
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: normalize(25),
        marginRight: normalize(25),
    },
    infoStyle: {
        width: normalize(10),
        height: normalize(10),
        resizeMode: 'contain',
        marginLeft: 10,
        marginTop: 4
    },
    shareBoxStyle: {
        width: normalize(13),
        height: normalize(13),
        resizeMode: 'contain',
        marginLeft: normalize(9),
        marginRight: 0,
        right: 0,
        flex: 1
    },
    shareBoxStyle1: {
        width: normalize(13),
        height: normalize(13),
        resizeMode: 'contain',
        marginLeft: normalize(9),
        marginRight: 0,
        right: 0,
        // flex:1
    },
    searchTextStyle: {
        fontSize: 14,
        color: '#C6C7CC',
        marginLeft: normalize(15),
        fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
    },

    //Center View
    activeOrderContainer: {
        height: 67,
        marginTop: height * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.DEFAULT_RED_COLOR,
        borderRadius: 10,
        shadowColor: '#455B6314',
        shadowOpacity: 1,
        shadowRadius: 16,
        shadowOffset: {
            width: 0,
            height: 4,
        }
    },
    giftContainer: {
        height: 67,
        // marginTop: height*0.1,
        // flexDirection: 'row',
        flexDirection: 'column',
        // justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor: transp,
        borderRadius: 10,
        shadowColor: '#455B6314',
        shadowOpacity: 1,
        shadowRadius: 16,
        shadowOffset: {
            width: 0,
            height: 4,
        }
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: width
    },
    activeOrderCountStyle: {
        fontSize: 24,
        color: 'white',
        fontFamily: CUSTOM_FONT.HEEBO_BOLD,
        textAlign: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    activeOrderTextStyle: {
        fontSize: 18,
        color: 'white',
        opacity: 1,
        marginLeft: normalize(15),
        fontFamily: CUSTOM_FONT.HEEBO_BOLD,
    },
    rightArrowStyle: {
        width: 24,
        height: 24,
        marginRight: normalize(15),
    },
    rightContainer: {
        height: 40,
        marginRight: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },

    itemsContainer: {
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#2A2E43',
        flexDirection: 'column',
    },
    orderDetailsTextStyle: {
        color: '#959DAD',
        fontSize: 13,
        fontFamily: CUSTOM_FONT.HEEBO_MEDIUM,
        //marginLeft: 15,
        marginTop: 10,
    },
    box: {
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: 'white'
    },
    itemsTopLeftBoxStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#454F63',
        marginLeft: 10,
        marginTop: 10,
        marginRight: 0,
        borderRadius: 8,
    },
    ProcessBoxStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#454F63',
        marginLeft: 0,
        marginTop: 10,
        marginRight: 0,
        borderRadius: 8,
    },
    itemsTopRightBoxStyle: {
        flex: 1,
        flexDirection: 'column',
        width: 90,
        height: 50,
        backgroundColor: '#454F63',
        marginLeft: 9,
        marginTop: 10,
        marginRight: 16,
        borderRadius: 8,
        justifyContent: 'center',
    },
    itemsBottomBox: {
        flexDirection: 'row',
        height: 38,
        backgroundColor: '#454F63',
        marginLeft: 16,
        marginTop: 18,
        marginBottom: 20,
        marginRight: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
    },
    itemsTitleTopStyle: {
        fontSize: 14,
        color: 'white',
        marginBottom: 0,
        marginLeft: normalize(15),
        fontFamily: CUSTOM_FONT.HEEBO_BOLD,
    },
    itemsSubtitleTopStyle: {
        fontSize: normalize(10),
        color: '#959DAD',
        marginLeft: normalize(15),
        marginTop: 5,
        fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
    },
    itemsTitleBottomStyle: {
        fontSize: 14,
        color: 'white',
        top: 3,
        marginLeft: normalize(15),
        fontFamily: CUSTOM_FONT.HEEBO_BOLD,
    },
    itemsSubtitleBottomStyle: {
        fontSize: 12,
        color: '#959DAD',
        top: 4,
        marginLeft: normalize(15),
        marginRight: normalize(15),
        fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
    },
    scrollStyle: {
        backgroundColor: colors.BACKGROUND_COLOR,
    },
    contactContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        position: 'absolute',
        zIndex: 9,
        left: 10,
        bottom: -20
    },
    contactButtonStyle: {
        height: 52,
        width: 52,
        backgroundColor: 'white',
        marginRight: 30,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        shadowColor: '#FFC0CB',
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 12,
        shadowOffset: {
            width: 0,
            height: 6,
        }
    },
    contactImage: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },

    // ***************************** //
    //         SIDE DRAWER           //
    profileTopContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    profileContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25,
    },
    profileIconStyle: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 12,
    },
    nameTextStyle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#454F63',
        marginTop: 20,
    },
    nameEmailStyle: {
        fontSize: 14,
        color: '#898A8F',
        marginTop: 5,
    },
    namePhoneStyle: {
        fontSize: 14,
        color: '#898A8F',
        marginTop: 5,
    },
    companyInfoStyle: {
        fontSize: normalize(10),
        color: '#C6C7CC',
        fontWeight: 'bold',
        marginTop: 40,
    },
    companyNameStyle: {
        fontSize: 16,
        color: '#454F63',
        fontWeight: '700',
        marginTop: 5,
    },
    smallHeaderTextStyle: {
        fontSize: 10,
        color: '#C6C7CC',
        fontWeight: 'bold',
        marginTop: 20,
    },
    smallTextStyle: {
        fontSize: 14,
        color: '#454F63',
        marginTop: 5,
    },

    // Logout style...
    profileBottomContainer: {
        height: 70,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutStyle: {
        height: 46,
        width: 240,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.DEFAULT_RED_COLOR,
        borderRadius: 4,
        borderWidth: 1,
    },
    logoutTextStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.DEFAULT_RED_COLOR,
    },

    //Logout Popup style...
    logoutContainer: {
        flex: 1,
        backgroundColor: '#0000004D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutPopupContainer: {
        height: 190,
        width: '85%',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        borderRadius: 12,
    },
    logoutTitleStyle: {
        fontSize: 26,
        color: '#454F63',
        fontWeight: 'bold',
        marginTop: normalize(15),
        marginLeft: 24,
    },
    logoutDescriptionStyle: {
        fontSize: 14,
        color: '#454F63',
        marginTop: 14,
        marginLeft: 24,
        marginRight: 24,
        opacity: 0.68,
    },
    buttonContainer: {
        height: 44,
        flexDirection: 'row',
        marginLeft: 24,
        marginRight: 24,
        marginTop: 24,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        //alignItems:'flex-end',
    },
    logoutCancelContainer: {
        width: normalize(130),
        height: 44,
        backgroundColor: '#454F63',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutCancelText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    logoutButtonContainer: {
        width: normalize(130),
        height: 44,
        backgroundColor: '#78849E29',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButtonText: {
        fontSize: 14,
        color: '#2A2E43',
        fontWeight: 'bold',
    },
    serialTextStyle: {
        fontSize: 14, fontFamily: CUSTOM_FONT.HEEBO_BOLD,
        marginTop: 5, textAlign: 'left'
    },
    whiteTopContainer: { backgroundColor: '#fff', padding: normalize(10), borderBottomWidth: 1, borderBottomColor: '#EBEBEB' },
    bottomGraphBox: { paddingHorizontal: normalize(10), alignItems: "center", flexDirection: "row", flex: 1, justifyContent: 'space-between' },
    itemsContainer: { paddingHorizontal: normalize(10) },
    dashboardHead: { flexDirection: 'row', flex: 1, paddingTop: normalize(15), justifyContent: 'space-between', alignItems: 'center' },
    dashboardTitle: { fontFamily: CUSTOM_FONT.ROBOTO_BOLD, fontSize: 20, color: '#454F63' },
    timeDrop: { borderWidth: 1, borderColor: '#BCBCBC', paddingTop: 5 },
    dropView: { width: normalize(130), marginTop: -normalize(15), flexDirection: 'column' },
    summaryView: { flexDirection: "column", padding: normalize(10), paddingTop: normalize(15), borderWidth: 1, borderRadius: 8, borderColor: '#E8E8E8', backgroundColor: "white", justifyContent: "space-between", marginBottom: normalize(15) },
    GraphDetailBox: { paddingVertical: 10, paddingHorizontal: normalize(10) },
    sumBoxTitle: { fontFamily: CUSTOM_FONT.HEEBO_BOLD, fontSize: normalize(10), color: '#363636', top: 1 },
    summDetailRow: { flexDirection: "row" },
    summDetailBox: { position: 'relative', marginTop: normalize(15), flexBasis: '33.33%', flexDirection: "column", backgroundColor: "white", },
    greenLine: { marginBottom: 10, width: 20, height: 5, backgroundColor: "#4AB31E", borderRadius: 10 },
    summText: { width: "65%", fontSize: normalize(10), fontFamily: CUSTOM_FONT.HEEBO_MEDIUM, color: '#979797' },
    summDataNo: { fontSize: normalize(18), fontFamily: CUSTOM_FONT.HEEBO_REGULAR, color: '#363636' },
    graphInnerHeaderBox: { flexDirection: "row", justifyContent: 'space-between' },
    boxLeftArea: { flexDirection: 'row' },
    boxRightArea: { flexDirection: 'row' },
    viewCat: { color: '#da191e', fontFamily: CUSTOM_FONT.HEEBO_MEDIUM, fontSize: normalize(10), top: 1.5 },
    viewAllCatTitle: { justifyContent: "center", alignSelf: "center", fontSize: normalize(15), marginTop: 8, fontFamily: CUSTOM_FONT.HEEBO_BOLD },
    catTitleArea: { paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#E8E8E8' },
    dialogDataRow: { flex: 1, flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: '#E8E8E8', },
    dialogInnerBox: { flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingBottom: 5 },
    dialogDataText: { paddingVertical: 5, textAlign: 'left' },
    dropBoxWrap: { marginTop: -20, marginLeft: normalize(10) },
    timeStyle: { fontWeight: '500', borderWidth: 0, borderRadius: 10, borderColor: 'gray', fontSize: normalize(10), justifyContent: 'flex-end', right: 16, alignSelf: 'flex-end' }

});