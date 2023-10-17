# Moglix_Buyers_App
Moglix Buyers App Backup

STEPS TO RUN PROJECT AFTER NPM INSTALL

1. react-native-material-textfield/src/components
Three Files are 
Affix/index.js
Helper/index.js
label/index.js
Replace style: Animated.Text.propTypes.style
with style: Text.propType
and change  import { Animated,Text } from 'react-native';

2. Comment WebView  import from react-native 
and import { WebView } from 'react-native-webview'; 
And in file react-native-highcharts.js in path -----> node_modules/react-native-highcharts/react-native-highcharts.js and path -----> node_modules/react-native-highcharts/App/index.js

3. Comment  this line 
  // this.setState({
        //     height: e.nativeEvent.layout.height,
        //     width: e.nativeEvent.layout.width,
        // })
in react-native-highcharts.js in path -----> node_modules/react-native-highcharts/

4.  node_module/react-native-elements/src/tooltip/Tooltip.js and in getElementPosition() method remove StatusBar.currentHeight from yOffset

5.  pasBuyer App Credentials
    Prod Users 
1-  Email: user_a@gmail.com
    Pass:  Moglix@123


2- Eamil: buyer_user99@gmail.com
   Pass:  Moglix@123

3- Eamil: rahul@moglix.com
   Pass:  sivukae#496

   QA Users

1- Eamil: rahul@moglix.com
   Pass : dontKnow
   
   Email : user_a@gmail 
   Pass :  Moglix@123

2- Email: app_usera@gmail.com
   Pass: Moglix@123
