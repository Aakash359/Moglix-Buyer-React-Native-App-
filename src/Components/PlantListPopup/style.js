import {
    StyleSheet,
    Dimensions,
} from 'react-native';

import { CUSTOM_FONT } from '../../constants/strings';
import { colors } from '../../constants';
const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({

    //Plant List Popup style...
    PlantListContainer: {
        flex: 1,
        backgroundColor: '#0000004D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    PlantListPopupContainer: {
        width: '91%',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        borderRadius: 12,
    },
    PlantListTitleStyle: {
        fontSize: 26,
        color: '#454F63',
        fontFamily: CUSTOM_FONT.ROBOTO_BOLD,
        marginTop: 15,
        marginLeft: 24,
    },
    //Search...
    searchContainer: {
        height: 55,
        marginTop: 15,
        marginLeft: 24,
        marginRight: 24,
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
        marginLeft: 15,
    },
    searchTextStyle: {
        fontSize: 14,
        color: '#C6C7CC',
        marginLeft: 15,
        fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
    },
    inputTextStyle: {
        color: colors.DEFAULT_BUTTON_DARK_GRAY,
        fontSize: 14,
        marginLeft: 0,
        marginRight: 40,
        height: 38,
        width: width - 130,
        fontFamily: CUSTOM_FONT.HEEBO_REGULAR,
    },

    buttonContainer: {
        height: 44,
        flexDirection: 'row',
        marginLeft: 24,
        marginRight: 24,
        marginTop: 24,
        marginBottom: 24,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        //alignItems:'flex-end',
    },
    PlantListCancelContainer: {
        width: width * 0.35,
        height: 44,
        backgroundColor: '#78849E29',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    PlantListCancelText: {
        fontSize: 14,
        color: '#2A2E43',
        fontFamily: CUSTOM_FONT.HEEBO_BOLD,
    },
    submitButtonContainer: {
        width: width * 0.35,
        height: 44,
        backgroundColor: '#D9232D',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonText: {
        fontSize: 14,
        color: 'white',
        fontFamily: CUSTOM_FONT.HEEBO_BOLD,
    },

    navBarArrowButtonStyle: {
        height: 44,
        width: 84,
        marginLeft: 10,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageDownArrow: {
        width: 33,
        height: 33,
        fontSize: 20,
        left: 10,
        resizeMode: 'contain',
    },

    listContainerDynamicHeightStyle: {
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
    },

    listContainerFixedHeightStyle: {
        height: 210,
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
    },
});