// @flow
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyDiaryScreen from '../Containers/TabMyDiary/MyDiaryScreen';
import MyDiaryItemScreen from '../Containers/TabMyDiary/MyDiaryItemScreen';

const routeConfiguration = {
  myDiary: { screen: MyDiaryScreen },
  myDiaryItem: { screen: MyDiaryItemScreen },
};

const navigatorConfiguration = {
  headerMode: 'float',
  initialRoute: 'myDiary',
};

export const TabMyDiaryNavigator = StackNavigator(
  routeConfiguration,
  navigatorConfiguration,
);

const mapStateToProps = state => ({ navigationState: state.tabMyDiary });

class TabMyDiaryNavigation extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarLabel: '首页',
    tabBarVisible: navigation.state.params &&
      navigation.state.params.showTabBar,
    tabBarIcon: ({ tintColor }) => (
      <View>
        <Icon name="home" size={30} color={tintColor}/>
      </View>
    ),
  });

  render() {
    const { navigationState, dispatch } = this.props;
    return (
      <TabMyDiaryNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: navigationState,
        })}
      />
    );
  }
}

export default connect(mapStateToProps)(TabMyDiaryNavigation);
