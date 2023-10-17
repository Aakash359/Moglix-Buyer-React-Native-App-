import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
} from 'react-native';

import { utilityStyles } from './styles';


class ButtonWrapper extends React.Component {
    static propTypes = {
        title:PropTypes.string.isRequired
    }

    static defaultProps = {
        
    }

    render() {
        const { title } = this.props
        return(
            <View style={utilityStyles.buttonStyleBig}>
                <Text style={utilityStyles.textStyleBigButton}>{title}</Text>
            </View>
        );
    }
}


export default ButtonWrapper;