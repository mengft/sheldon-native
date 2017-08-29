import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { toggleTabBarAction } from '../../Redux/Actions';
import connectWithNavigationIsFocused from '../../Utils/NavigationIsFocused';
import moment from 'moment';
import { Colors, Metrics, ApplicationStyles, px2dp } from '../../Themes';
import { ChartBoard, DiaryBoard } from '../../Components';

class MyDiaryScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: '首页',
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
        <Text>首页</Text>
        <Text onPress={()=> (navigate('myDiaryItem'))}>二级界面</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
    navigationState: state.tabMyDiary,
});

export default connectWithNavigationIsFocused(
  mapStateToProps,
  {
    toggleTabBarAction,
  },
  'tabMyDiary',
  'mainTab',
  0,
)(MyDiaryScreen);