import React from 'react';
import { View,Image,Dimensions,TouchableOpacity, Platform } from 'react-native';
import { WebView } from 'react-native-webview'
import DatabaseManager from './../../Storage/storage';
import { normalize } from 'react-native-elements';
import {ICON} from '../../constants';
import GlobalStyle from '../../style';
import { ScreenConstants } from './../../constants';


export default class WebViewComponent extends React.Component {

    constructor () {
        super()
        this.state = {
          data: {},
          visible:false
        }
        this.WEBVIEW_REF = React.createRef();
      }
      async componentDidMount(){
        let {sessionData} = this.props
        const emailId = await DatabaseManager.getEmailId();
        const token = await DatabaseManager.getUserToken()
        const profile = await DatabaseManager.getUserProfile()
        const profileData = JSON.parse(profile);
        let keys = []
        let keysStr = ''
        if (
          sessionData &&
          sessionData.companyData &&
          sessionData.companyData.branchNames
        ) {
          keys = Object.keys(sessionData.companyData.branchNames);
          keysStr = keys.join(',')
        }
          var data = {
            moglixB2BUserId: profileData.userId,
            userEmailId: emailId,
            userName: profileData.userName,
            plantId: global.GLOBAL_BRANCH_ID,
            moglixB2BToken: token,
            companyId:global.GLOBAL_COMPANY_ID,
            selectedBranchIds:keysStr
          };
          this.setState({data:data})
       
       }

      _onNavigationStateChange(webViewState){
          if (webViewState.url!='about:blank'){
            this.props.closeModal()
            this.WEBVIEW_REF.current.goBack();
            this.props.navigation.navigate(ScreenConstants.ORDER_LIST_SCREEN)
         }
      
      }


    render() {
    
    let html = `
    <html>
    <head>
      <!--<link rel="stylesheet" href="styles.css" />-->
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="background:none">
       <!--<p id="currentTime"></p>-->
        <script >   (function (w,d,s,o,f,js,fjs) {
          w['JS-Widget']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
          js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
          js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
        }(window, document, 'script', 'mw', 'https://portal.unobot.ai/static/js/app/widget.js'));
        mw('init', { someConfiguration: 42, deviceType: 'mobile', data: '${JSON.stringify(this.state.data)}'});
        mw('accessToken', 'e7c3b202-ff25-4d9a-aba9-083537132d5f');</script>
    </body>
  </html>
`;
        return (
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 99,
              position: "absolute",
              height: Dimensions.get("window").height,
              width: Dimensions.get("window").width,
              
            }}
          >
            {!this.state.visible && (
              <View style={GlobalStyle.loaderStyle}></View>
            )}
              <WebView
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                onLoad={() => this.setState({ visible: true })}
                contentMode={"mobile"}
                ref={ this.WEBVIEW_REF}
                originWhitelist={Platform.OS == 'android'?[]:['https://*', 'git://*']}
                style={GlobalStyle.webstyle}
                javaScriptEnabled={true}
                domStorageEnabled = {true}
                source={{ html: html }}
              />
            
            
            {this.state.visible && (
              <TouchableOpacity
                onPress={() => this.props.closeModal()}
                style={{
                  justifyContent: "flex-end",
                  right: 10,
                  alignSelf: "flex-end",
                  position: "absolute",
                  zIndex: 100,
                  top: normalize(80),
                }}
              >
                <Image
                  source={ICON.IMG_CONTACT_CLOSE}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
            )}
          </View>
        );
    }
}