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

class FriendScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: '萌友',
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
    const {navigate} = this.props.navigation;
    return(
      <View>
        <Text>这个是萌友</Text>
        <Text onPress={()=> (navigate('friendItem'))}>二级界面</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
    navigationState: state.tabFriend,
});

export default connectWithNavigationIsFocused(
  mapStateToProps,
  {
    toggleTabBarAction,
  },
  'tabFriend',
  'mainTab',
  2,
)(FriendScreen);