import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { toggleTabBarAction } from '../../Redux/Actions';
import connectWithNavigationIsFocused from '../../Utils/NavigationIsFocused';
import { getConstraintedHeight } from '../../Utils/Chart';
import { Colors, Metrics, ApplicationStyles, px2dp } from '../../Themes';
import { HeaderLeft, ButtonGroup, Chart } from '../../Components';

const { width: ww } = Dimensions.get('window');
const lowGlucsType = [
  {},
  { report: [
    { endTime: 1499097599999, startTime: 1499011200000, value: 12, date: "7.03" },
    { endTime: 1499097599990, startTime: 1499011200000, value: 12, date: "7.03" },
    { endTime: 1499097599991, startTime: 1499011200000, value: 33, date: "7.03" },
    { endTime: 1499097599992, startTime: 1499011200000, value: 2, date: "7.03" },
    { endTime: 1499097599997, startTime: 1499011200000, value: 34, date: "7.03" },
    { endTime: 1499097599917, startTime: 1499011200000, value: 78, date: "7.03" },
    { endTime: 1499097599927, startTime: 1499011200000, value: 11, date: "7.03" },
    { endTime: 1499097599937, startTime: 1499011200000, value: 3, date: "7.03" },
    { endTime: 1499097599947, startTime: 1499011200000, value: 44, date: "7.03" },
    { endTime: 1499097599957, startTime: 1499011200000, value: 64, date: "7.03" },
    { endTime: 1499097599967, startTime: 1499011200000, value: 74, date: "7.03" },
    { endTime: 1499097599977, startTime: 1499011200000, value: 14, date: "7.03" },
    { endTime: 1499097599987, startTime: 1499011200000, value: 24, date: "7.03" },
    { endTime: 1499097599187, startTime: 1499011200000, value: 54, date: "7.03" },
    { endTime: 1499097599137, startTime: 1499011200000, value: 14, date: "7.03" },
  ], timeType: 1, timeStartNum: 0, timeSize: 30, dotsPerPage: 5, selectedBarIndex: 29, loading: false },
  { report: [
    { endTime: 1499097599999, startTime: 1499011200000, value: 12, date: "7.03" },
    { endTime: 1499097599990, startTime: 1499011200000, value: 1, date: "7.03" },
    { endTime: 1499097599991, startTime: 1499011200000, value: 13, date: "7.03" },
    { endTime: 1499097599992, startTime: 1499011200000, value: 34, date: "7.03" },
    { endTime: 1499097599997, startTime: 1499011200000, value: 23, date: "7.03" },
  ], timeType: 2, timeStartNum: 0, timeSize: 30, dotsPerPage: 7, selectedBarIndex: 29, loading: false },
  { report: [
    { endTime: 1499097599999, startTime: 1499011200000, value: 12, date: "7.03" },
    { endTime: 1499097599990, startTime: 1499011200000, value: 3, date: "7.03" },
    { endTime: 1499097599991, startTime: 1499011200000, value: 32, date: "7.03" },
    { endTime: 1499097599992, startTime: 1499011200000, value: 12, date: "7.03" },
    { endTime: 1499097599997, startTime: 1499011200000, value: 54, date: "7.03" },
  ], timeType: 3, timeStartNum: 0, timeSize: 30, dotsPerPage: 6, selectedBarIndex: 29, loading: false },
];

class MyDiaryItemScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: '首页-二级界面',
    tabBarVisible: true,
    ...ApplicationStyles.blueHeaderStyle,
    headerLeft: <HeaderLeft navigation={navigation} color={Colors.C8} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      selectedTimeType: 1
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      this.onFocus();
    }
  }

  onFocus() {
    this.props.toggleTabBarAction(false);
  }

  render() {
    const { selectedTimeType } = this.state;
    return(
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.C8,
        }}
      >
        <View style={{
          backgroundColor: Colors.CB,
          height: 40,
        }}>
          <ButtonGroup
            inverted
            selectedIndex={selectedTimeType - 1}
            onPress={selectedIndex => this.setState({ selectedTimeType: selectedIndex + 1 })}
            buttons={['日', '周', '月']}
          />
        </View>
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
)(MyDiaryItemScreen);