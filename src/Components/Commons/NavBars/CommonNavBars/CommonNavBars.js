import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Text,
} from 'react-native'; 

import {styles} from '../style'; 
import {ICON} from '../../../../constants';


export default function OrderListNavBar(props) {
    return (
      <View style={styles.navBarStyle}>
        <TouchableOpacity onPress={props.BackAction}>
            <View style={styles.navBarHamburgerButtonStyle}>
            <Image
                style={styles.imageDownArrow}
                source={ICON.IC_BACK_LOGO}
            />
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.SearchAction} activeOpacity={0.7}>
        <View style={[
            styles.navBarTitleViewStyle,
            styles.navBarSearchOrderViewStyle
            ]
            }>
            <Text style = {styles.searchOrderStyle}>Order ID, Product Name or ID</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.FilterAction}>
            <View style={styles.navBarArrowButtonStyle}>
            <Image
                style={styles.imageDownArrow}
                source={ICON.IC_FILTER_LOGO}
            />
            </View>
        </TouchableOpacity>
      </View>
    );
}
