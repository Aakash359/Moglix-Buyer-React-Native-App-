import React from 'react';
import PropTypes from 'prop-types';
import {
    TextInput,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../constants';
import { utilityStyles } from './styles';

var FloatingLabel = require('react-native-floating-labels');

class TextInputWrapper extends React.Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        
        onChange: PropTypes.func,
        onPress:PropTypes.func,
        returnKey: PropTypes.string,
        keyboardT: PropTypes.string,
        header: PropTypes.string.isRequired,
        errorFlag: PropTypes.bool,
        inputType:PropTypes.bool,
        
    }

    static defaultProps = {
        
        returnKey: 'default',
        keyboardT: 'default',
        
    }

    constructor(props){
        super(props);
        this.state = {
            isEditing : false 
        }
        this.onBlur = this.onBlur.bind(this);
        this.onEndEditing = this.onEndEditing.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    onBlur() {
        this.setState({isEditing : false})
    }
    onFocus() {
        this.setState({isEditing : true})
    }

    onEndEditing() {
        this.setState({isEditing: false})
    }

    render() {
        const {maxLength,editable,onPress, isSecureTextEntry,inputType, onChange, value, header, returnKey, keyboardT, errorFlag } = this.props
        const {isEditing} = this.state
        return (

            <View style={utilityStyles.inputViewContainer}>
                <View style={!errorFlag ? (!isEditing ? utilityStyles.textInputContainer : utilityStyles.selectedTextInputContainer): (!isEditing ? [utilityStyles.textInputContainer] : [utilityStyles.selectedTextInputContainer,{borderColor: 'red'}])}>
                    <FloatingLabel
                        maxLength={maxLength}
                        editable={editable}
                        ref={(input) => { this.passwordTextInput = input; }}
                        labelStyle={!errorFlag ? (!isEditing ? utilityStyles.labelInput : utilityStyles.selectedLabelInput) : (!isEditing ? [utilityStyles.labelInput] : [utilityStyles.selectedLabelInput, {color:'red'}])}
                        inputStyle={utilityStyles.input}
                        style={utilityStyles.formInput}
                        password={isSecureTextEntry}
                        returnKeyType={returnKey}
                        keyboardType={keyboardT}
                        value={value}
                        onChangeText={onChange}
                        onBlur={this.onBlur}
                        
                        
                        onFocus={this.onFocus}
                    >{header}  
                    
                   
                    </FloatingLabel>
                    {
                        inputType?
                        <TouchableOpacity
                         onPress={onPress}
                        style={utilityStyles.passIcon}>
                        <MatIcon
                          name={'eye'}
                          color={isSecureTextEntry ? '#979797' : '#000'}
                          size={22}
                        />
                      </TouchableOpacity>:null

                    }
                   
                </View>
            </View>


        );
    }
}


export default TextInputWrapper;