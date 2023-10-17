import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import {CUSTOM_FONT } from '../../constants/strings';

const { width,height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    NewMainContaier:{backgroundColor:"#e8e8e8",},
    updateheding:{ fontWeight:'bold', fontSize:16, marginBottom:10,textAlign:'center',fontFamily:CUSTOM_FONT.ROBOTO_REGULAR,},
   updateatxt:{textAlign:'center', fontWeight:'600', fontSize:17,fontFamily:CUSTOM_FONT.ROBOTO_REGULAR,alignSelf:'center',textAlign:'center'},
   updateBtn:{borderWidth:0, borderColor:'black', fontWeight:'bold',color:'white', fontSize:20,margin:15, textAlign:'center',fontFamily:CUSTOM_FONT.ROBOTO_REGULAR},
   touchable:{marginTop:10, backgroundColor:'#FF0000', borderWidth:1,borderColor:'#FF0000',borderRadius:5}

})