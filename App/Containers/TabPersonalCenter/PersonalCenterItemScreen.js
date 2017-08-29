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
import { HeaderLeft } from '../../Components';

class PersonalCenterItemScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: '我的-二级界面',
    tabBarVisible: true,
    ...ApplicationStyles.defaultHeaderStyle,
    headerLeft: <HeaderLeft navigation={navigation} color={Colors.CB} />,
  });


  componentWillReceiveProps(nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      this.onFocus();
    }
  }

  onFocus() {
    this.props.toggleTabBarAction(false);
  }

  render() {
    return(
      <View>
        <Text>二级界面</Text>
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
)(PersonalCenterItemScreen);