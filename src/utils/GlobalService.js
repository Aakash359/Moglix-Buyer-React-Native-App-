import analytics from '@react-native-firebase/analytics';
import VersionCheck from 'react-native-version-check';


  function AnalyticScreen(name){
    
    analytics().logScreenView({
      screen_name: name,
      screen_class: name,
    });
    
  }

  function AnalyticLogEventCompany(name,id){
    
    analytics().logEvent('company_name',{
      "name":name,
      "id":id
    })
    
  }

  function AnalyticLogEventBranch(name,id){
    
    analytics().logEvent('branch_name',{
      "name":name,
      "id":id
    })
    
  }

  function FailureToastCustom(message) {
    return (
      Toast.show({
        text: message,
        duration: 3000,
        position: "top",
        type: 'danger',
        style: {
          marginTop:-20
         }
      })
    );
  }



  function FailureToast(message) {
    return (
      Toast.show({
        text: "Something went wrong",
        duration: 3000,
        position: "top",
        type: 'danger',
        style: {
          marginTop:-20
         }
      })
    );
  }

  
  
  function SuccessToast(message) {
    return (
      Toast.show({
        text: message,
        position: "top",
        duration: 3000,
        type: 'success',
        style: {
          marginTop:-20
         }
      })
    );
  }

  function userTracking(func, value){
    webengage.user[func](value);
  }
  
  function trackScreen(screenName, screenData){
    webengage.screen(screenName, screenData);
  }


  function WebEngageTracking(name, _webEngageObj){
    let appVersion = VersionCheck.getCurrentVersion();
    _webEngageObj['_app_version'] = appVersion;
    webengage.track(name, _webEngageObj);
  }

  
function AnalyticFunction(name,obj, _webEngageObj){
  let _obj = {};
  let appVersion = VersionCheck.getCurrentVersion();
  _obj['_app_version'] = appVersion;
  for(let key in obj){
    if(obj[key] instanceof Array){
      if(obj[key].length){
        _obj[key.toUpperCase()] = []
        for(let i=0;i<obj[key].length;i++){
          _obj[key.toUpperCase()][i] = {};
          let ob = obj[key][i];
          for(let _key in ob){
            _obj[key.toUpperCase()][i][_key.toUpperCase()] = ob[_key];
          }
        }
      }
    }else{
      _obj[key.toUpperCase()] = obj[key];
    }
  }
  analytics().logEvent(name, _obj);
}

  export const GlobalService = {
    AnalyticScreen,
    AnalyticLogEventBranch,
    AnalyticLogEventCompany,
    FailureToast,
    SuccessToast,
    AnalyticFunction,
    AnalyticScreen,
    FailureToastCustom,
    userTracking,
    WebEngageTracking,
    
    trackScreen,
  }