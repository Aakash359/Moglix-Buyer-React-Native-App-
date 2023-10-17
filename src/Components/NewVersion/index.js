import { View, Text, Content } from "native-base";
import React, { Component } from "react";
import VersionCheck from "react-native-version-check";
import { AppConfig } from "../../constants";
import axios from "axios";
import { TouchableOpacity, Linking, Platform } from "react-native";
import { styles } from "./style";
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from "react-native-popup-dialog";

export default class NewVersion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleAnimationDialog: false,
    };
    this._getCurrentVersion();
  }
  _openPS() {
    if (Platform.OS == "android") {
      Linking.openURL(AppConfig.PLAYSTORE_URL);
    } else {
      Linking.openURL(AppConfig.APPSTORE_URL);
    }
  }
   isNewerVersion (oldVer, newVer) {
    const oldParts = oldVer.split('.')
    const newParts = newVer.split('.')
    for (var i = 0; i < newParts.length; i++) {
      const a = ~~newParts[i] 
      const b = ~~oldParts[i]
      if (a > b) return true
      if (a < b) return false
    }
    return false
  }
  //
  _getCurrentVersion() {
    VersionCheck.getLatestVersion({
      provider: () =>
        axios
          .get(AppConfig.BASEURL + "/login/mobile/info")
          .then((response) => {
            if (response.data.status) {
              var keys = Object.keys(response.data.list);
              if (keys.length > 0) {
                for (let key of keys) {
                  if (
                    response.data.list[key].name == "ANDROID_APP_VERSION" &&
                    Platform.OS == "android"
                  ) {
                    if (
                      this.isNewerVersion(VersionCheck.getCurrentVersion(),response.data.list[key].value)
                    ) {
                      this.setState({ scaleAnimationDialog: true });
                    }
                  } else if (
                    response.data.list[key].name == "IOS_APP_VERSION" &&
                    Platform.OS === "ios"
                  ) {
                    if (
                      this.isNewerVersion(VersionCheck.getCurrentVersion(),response.data.list[key].value)
                    ) {
                      this.setState({ scaleAnimationDialog: true });
                    }
                  }
                }
              }
            }
          })
          .catch((err) => {
          }),
    });
  }
  render() {
    return (
      <Dialog
        onTouchOutside={() => {
          this.setState({ scaleAnimationDialog: true });
        }}
        width={0.9}
        visible={this.state.scaleAnimationDialog}
        dialogAnimation={new ScaleAnimation()}
        style={{ borderRadius: 8 }}
      >
        <DialogContent>
          <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <Text style={styles.updateheding}>New Version Available</Text>
            <Text style={styles.updateatxt}>
              We have noticed you are using older version of the app. There's a
              major update available.Please install it.
            </Text>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => this._openPS()}
            >
              <Text style={styles.updateBtn}>Update Now</Text>
            </TouchableOpacity>
          </View>
        </DialogContent>
      </Dialog>
    );
  }
}
