import React from 'react';
import { Modal, View,Text, TouchableOpacity, Image, Linking, TextInput, Dimensions } from 'react-native';
import { styles } from './style';
import PropTypes from 'prop-types';
import {ICON} from '../../constants';
import { ScrollView,Button } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import email from 'react-native-email';
const { width,height } = Dimensions.get('window')
import { connect } from 'react-redux'
import { getSendMessageResponseData } from "../../actions";
import { isLoading, sendMessageResponseData } from '../../reducers/OrderListDetailReducer';
import GlobalStyle from './../../style';
import { Loader } from '../../Components/Commons'
import DatabaseManager from './../../Storage/storage';
import WebViewComponent from '../../Components/WebView/index'

class ContactPopup extends React.Component {

    static propTypes = {
        showPopup:PropTypes.bool,
        nav:PropTypes.object,
        onEmailButton:PropTypes.func,

        isLoading: PropTypes.bool,
        sendMailStatus: PropTypes.array,
        sendQueryMessage: PropTypes.array,

    }

    static defaultProps = {
        isLoading:false,
        showPopup:false,
    }

    constructor(props){
        super(props);

        const {showPopup} = this.props
        this.state = {
            modalVisible: false,
            modalVisible2: false,
            dropDownValue: '',
            yourQuery: '',
            userData: {},
        };
    }

    sendQuery = async (subjectValue,bodyValue) => {
        
        let userDataTemp = await DatabaseManager.getUserProfile()
          this.setState({'userData':JSON.parse(userDataTemp)})
          
          const data = {
             application:'1',idBranch: '1', idCompany: '1',userId: this.state.userData.userId,
             Origin: 'https://buyersqa.moglix.com', 
             token: this.state.userData.token,
             sendMessageBody: {
                "templateName": "Blank Template",
                "toMailId": "support.b2b@moglix.com",
                "fromMailId" : this.state.userData.userEmail,
                "mailData": {
                    "objectMap": {
                        "mail": {
                            "subject": subjectValue,
                            "body": bodyValue
                        }
                    }
                }
            }
          }
          const { sendQueryMessage } = this.props;
          await sendQueryMessage(data)
          this.setModalVisible2(false);
          alert('Sent request successfully')
          
        }

   

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    setModalVisible2(visible) {
        this.setState({ modalVisible2: visible });
    }

    emailAction = () =>{
        const {onEmailButton} = this.props
        this.setModalVisible(false);
        this.setModalVisible2(true);
    }

    submitAction(){
        if(this.state.dropDownValue == ''){
            alert('Please select category')
            return
        }else if(this.state.yourQuery == ''){
            alert('Please enter your query')
            return
        }
        this.sendQuery(this.state.dropDownValue,this.state.yourQuery)
    }


    handleEmail = () => {
        const to = ['support.b2b@moglix.com'] 
        email(to, {
        
            subject: this.state.dropDownValue,
            body: this.state.yourQuery
        }).catch(console.error)
    }

    closeModal() {
        this.props.isOpen(false);
        this.setState({modalVisible:false})
    }
     
    render() {

        let data = [{
            value: 'Delivery related query',
          }, {
            value: 'Invoice related query',
          }, {
            value: 'PO related query',
          }, {
            value: 'Return/Replacement query',
          }, {
            value: 'Request call back',
          }];

        const { onEmailButton, isLoading } = this.props
        return (
            <View style={{backgroundColor:'Transparent', height: 80, width: 80,
            alignItems: 'flex-end',
            justifyContent: 'flex-end', marginLeft: width - 80}}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                 <WebViewComponent 
                    sessionData={this.props.sessionData}
                    navigation={this.props.navigation} 
                    closeModal={()=>this.closeModal()}>
                 </WebViewComponent>

                </Modal>
                <ScrollView style={styles.scrollViewStyle}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible2}
                   >

                <View style={{
                      flex: 1, 
                   }}>
                    
                   <View style={styles.emailContainerView}>
                       <View style={styles.emailBodyView}>
                           <Text style={styles.haveAQueryText}>Have a query…</Text>
                       
            <View style={styles.inputViewContainer}>
                    <View style={styles.textInputContainer}>
                            <View style={styles.inputTextHeaderContainerStyle}>
                                <Text style={styles.inputTextHeaderStyle}>Select Category</Text>
                            </View>
                    <Dropdown containerStyle={styles.dropdownStyle}
                          dropdownMargins={{ min: 8, max: 16 }}
                          dropdownOffset={{ top: 31, left: 0 }}
                          pickerStyle={{height:220}}
                          ref='picker'
                          data={data}
                          value={this.state.value}
                          onChangeText={(value) => {
                          this.setState({dropDownValue: value})
                          setTimeout(() => {
                          let me = this.refs['picker'];
            }, 100);
          }}
          animationDuration={0}
                    />
                </View>
            </View>


            <View style={styles.entryViewContainer}>
                    <View style={styles.textEntryContainer}>
                            <View style={styles.inputTextHeaderContainerStyle}>
                                <Text style={styles.inputTextHeaderStyle}>Enter your query</Text>
                            </View>
                    <TextInput style={styles.inputTextStyle}
                        multiline={true}
                        returnKeyType={'default'}
                        onChangeText={(value) => {
                            this.setState({yourQuery: value})
                        }}
                    />
                </View>
            </View>

            <View style={styles.cancelAndSubmitButtonView}>
                <TouchableOpacity activeOpacity={0.7} style={[styles.cancelButtonView,{
        backgroundColor: '#78849E29'}]} 
                        onPress={() => {
                        this.setModalVisible2(false);
                        }}>
                <View style={styles.cancelButtonView}>
                    <Text style={styles.cancelButtonTextStyle}>CANCEL</Text>
                </View>
                </TouchableOpacity>

                <View style={styles.spaceView}></View>

                <TouchableOpacity activeOpacity={0.7} style={styles.submitButtonView}
                    onPress={() => {
                        this.submitAction();
                    }}>
                <View style={styles.submitButtonView}>
                <Text style={styles.submitButtonTextStyle}>SUBMIT</Text>
                </View>
                </TouchableOpacity>

            </View>
                       
                       </View>
                    </View>

                    {/* ----- */}
                    {(isLoading) &&
                 <View style={GlobalStyle.loaderStyle}>
                  <Loader />
                 </View>
                 }
                 </View>
                    
                </Modal>
                </ScrollView>

                {!this.state.modalVisible&&<TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => {
                        this.setModalVisible(true);
                        this.props.isOpen(true)
                    }}>
                    <View style={styles.contactButtonStyle}>
                        <Image
                            style={styles.contactImage}
                            source={ICON.IMG_CONTACT_SUPPORT}
                        />
                    </View>
                    </TouchableOpacity>}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: isLoading(state),
    sendMailStatus: sendMessageResponseData(state),
  }
  );
  
  export default connect(mapStateToProps, {
    sendQueryMessage: getSendMessageResponseData,
  })(ContactPopup);