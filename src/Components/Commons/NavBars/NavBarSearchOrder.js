import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Picker,
  Platform,
} from "react-native";
import { styles } from "./style";
import { ICON, colors } from "../../../constants";
import PropTypes from "prop-types";
import { Menu, MenuItem } from "react-native-material-menu";
export default class NavBarSearchOrder extends React.Component {
  state = {
    menuVisible: false,
  };

  static propTypes = {
    values: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    backButtonAction: PropTypes.func,
    crossButtonAction: PropTypes.func,
    onEndEditingSearching: PropTypes.func,
    onPressFilterButton: PropTypes.func,
    searchButton: PropTypes.func,
    onTabButton: PropTypes.func,
    nav: PropTypes.object,
    hitsData: PropTypes.array,
    selectedTabString: PropTypes.string,
    navOptions: PropTypes.string,
    selectedOption: PropTypes.array,
    onChangeOption: PropTypes.func,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  focusPassword() {
    this.passwordTextInput.focus();
  }

  render() {
    const {
      values,
      onChange,
      backButtonAction,
      onEndEditingSearching,
      crossButtonAction,
    } = this.props;

    var isEditing = false;
    if (values != null) {
      if (values.length > 0) {
        isEditing = true;
      }
    }
    return (
      <View style={styles.navBarStyleSearch}>
        <TouchableOpacity onPress={backButtonAction}>
          <View style={styles.navBarBackButtonStyleSearch}>
            <Image style={styles.imageBackButton} source={ICON.IC_BACK_LOGO} />
          </View>
        </TouchableOpacity>
        <View style={styles.navBarInputViewStyleSearch}>
          <View
            style={{
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 4,
              width: "50%",
            }}
          >
            {Platform.OS == "android" ? (
              <Picker
                selectedValue={this.props.selectedOption}
                mode={"dropdown"}
                style={{
                  height: 32,
                  paddingVertical: 8,
                }}
                itemStyle={{ color: "#000" }}
                onValueChange={(itemValue, itemIndex) =>
                  this.props.onChangeOption(itemValue)
                }
              >
                {this.props.navOptions.map((item, index) => (
                  <Picker.Item
                    key={index}
                    itemStyle={{ color: "#000" }}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Picker>
            ) : (
              <Menu
                visible={this.state.menuVisible}
                onRequestClose={() =>
                  this.setState({
                    menuVisible: false,
                  })
                }
                style={{
                  borderColor: "#ccc",
                  borderWidth: 1,
                  padding: 8,
                  borderRadius: 4,
                  width: "50%",
                }}
                anchor={
                  <Text
                    style={{
                      padding: 8,
                      fontSize: 12,
                    }}
                    onPress={() => this.setState({ menuVisible: true })}
                  >
                    {
                      this.props.navOptions.find(
                        (_) => _.value == this.props.selectedOption
                      ).label
                    }
                  </Text>
                }
              >
                {this.props.navOptions.map((item, index) => (
                  <MenuItem
                    key={index}
                    onPress={() => {
                      this.props.onChangeOption(item.value);
                      this.setState({
                        menuVisible: false,
                      });
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            )}
          </View>
          <TextInput
            style={styles.inputTextStyle}
            ref={(input) => {
              this.passwordTextInput = input;
            }}
            returnKeyType="search"
            selectionColor={colors.DEFAULT_TEXT_BLACK}
            underlineColorAndroid={"transparent"}
            keyboardType="default"
            placeholderTextColor="#959DAD"
            placeholder="Search"
            onChangeText={onChange}
            value={values}
            onEndEditing={onEndEditingSearching}
            autoFocus={true}
            maxLength={50}
          />
        </View>
        <TouchableOpacity onPress={crossButtonAction}>
          <View style={styles.navBarBackButtonStyleSearch}>
            {isEditing && (
              <Image
                style={styles.imageCloseButton}
                source={ICON.IC_CLOSE_LOGO}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
