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

class MessageItemScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: '消息-二级界面',
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
    navigationState: state.tabMessage,
});

export default connectWithNavigationIsFocused(
  mapStateToProps,
  {
    toggleTabBarAction,
  },
  'tabMessage',
  'mainTab',
  1,
)(MessageItemScreen);