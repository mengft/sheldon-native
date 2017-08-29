import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { toggleTabBarAction } from '../../Redux/Actions';
import connectWithNavigationIsFocused from '../../Utils/NavigationIsFocused';
import { Colors, Metrics, ApplicationStyles, px2dp } from '../../Themes';

class PersonalCenterScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: '我的',
    tabBarVisible: true,
    ...ApplicationStyles.defaultHeaderStyle,
  });

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      this.onFocus();
    }
    if (this.props.isFocused && !nextProps.isFocused) {
      this.onBlur();
    }
  }

  onFocus() {
    this.props.toggleTabBarAction(true);
  }

  onBlur() {
    // this.props.toggleTabBarAction(false);
  }

  render() {
    const { navigate } = this.props.navigation;
    return(
        <View>
          <Text>这个是我的</Text>
          <Text onPress={()=> (navigate('personalCenterItem'))}>二级界面</Text>
        </View>
    );
  }
}

const mapStateToProps = (state) => ({
    navigationState: state.tabPersonalCenter,
});

export default connectWithNavigationIsFocused(
  mapStateToProps,
  {
    toggleTabBarAction,
  },
  'tabPersonalCenter',
  'mainTab',
  3,
)(PersonalCenterScreen);