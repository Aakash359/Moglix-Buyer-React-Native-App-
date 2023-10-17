import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import {CUSTOM_FONT } from '../../constants/strings';

const { width,height } = Dimensions.get('window')

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    // ***************************** //
    //        RIGHT SIDE DRAWER           //
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
        fontFamily:CUSTOM_FONT.HEEBO_MEDIUM,
    },
    nameEmailStyle: {
        fontSize: 14,
        color: '#898A8F',
        marginTop: 5,
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,
    },
    namePhoneStyle: {
        fontSize: 14,
        color: '#898A8F',
        marginTop: 5,
        fontFamily:CUSTOM_FONT.HEEBO_REGULAR,
    },
    companyInfoStyle: {
        fontSize: 11,
        color: '#C6C7CC',
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        marginTop: 40,
    },
    companyNameStyle: {
        fontSize: 16,
        color: '#454F63',
        fontWeight: '700',
        marginTop: 5,
        fontFamily:CUSTOM_FONT.HEEBO_MEDIUM,
    },
    smallHeaderTextStyle: {
        fontSize: 10,
        color: '#C6C7CC',
        fontFamily:CUSTOM_FONT.HEEBO_BOLD,
        marginTop: 40,
        marginTop: 20,
    },
    smallTextStyle: {
        fontSize: 14,
        color: '#454F63',
        marginTop: 5,
        fontFamily:CUSTOM_FONT.HEEBO_MEDIUM,
    },
    profileBottomContainer: {
        flex: 1,
        backgroundColor: 'white',
    },

});