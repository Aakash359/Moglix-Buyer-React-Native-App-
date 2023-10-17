import { StyleSheet } from 'react-native';
import { colors } from '../constants';

export default StyleSheet.create({

    RootBody: {
        flex: 1,
        backgroundColor: colors.APP_BACKGROUND_COLOR,
    },

    horizontalAlign: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    varticalAlign: {
        flex: 1,
    },

    bottomAlign: {
        flex: 0.3,
        bottom: 0,
    },

    footerBlock: {
        flex: 0.5,
        bottom: 0,
        maxHeight: 50,
        minHeight: 50,
    },

    bodyBlock: {
        paddingHorizontal: 10,
        marginBottom: 0,
        backgroundColor: colors.APP_BACKGROUND_COLOR,
    },

    scrollViewAlignConBottom: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    formTitle: {
        fontSize: 18,
        textAlign: 'center',
    },

    formTitleWrapper: {
        marginVertical: 15,
    },
    levelStyle: {
        fontSize: 16,
        color: 'black',
    },

    loaderStyle: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.4,
        zIndex: 9,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    webstyle:{
        backgroundColor: "rgba(255,255,255,0.01)" ,
        right:18
    },
    loaderStyle2: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.4,
        zIndex: 9,
      },
    textInputTitle: {
        fontSize: 14,
        textAlign: 'left',
        color: 'black',
        paddingLeft: 2,
    },


    ProgressContainerCss: {
        marginVertical: 35,
        height: 10
    },

    progressHeaderCSS: {
        alignSelf: 'center',
        top: -35,
        zIndex: 999,
        position: 'relative',
    },


})
