// @flow
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import {
  TabNavigator,
  TabBarBottom,
  addNavigationHelpers,
} from 'react-navigation';
import { connect } from 'react-redux';
import TabMyDiaryNavigation from './TabMyDiaryNavigation';
import TabMessageNavigation from './TabMessageNavigation';
import TabFriendNavigation from './TabFriendNavigation';
import TabPersonalCenterNavigation from './TabPersonalCenterNavigation';
import TabBar from '../Components/TabBar';
import { Colors } from '../Themes';

const routeConfiguration = {
  tabMyDiaryNavigation: { screen: TabMyDiaryNavigation },
  TabMessageNavigation: { screen: TabMessageNavigation },
  TabFriendNavigation: { screen: TabFriendNavigation },
  TabPersonalCenterNavigation: { screen: TabPersonalCenterNavigation },
};

const tabBarConfiguration = {
  tabBarPosition: 'bottom',
  tabBarComponent: TabBar,
  backBehavior: 'none',
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: Colors.CB,
    inactiveTintColor: Colors.C5,
    style: {
      borderTopWidth: 0,
      height: 50,
      backgroundColor: Colors.C9,
    },
    tabStyle: {
      marginTop: 7.5,
    },
    labelStyle: {
      fontSize: 10,
      lineHeight: 20,
    },
  },
};

export const MainTabNavigator = TabNavigator(
  routeConfiguration,
  tabBarConfiguration,
);

const mapStateToProps = state => ({ navigationState: state.mainTab });

class MainTabNavigation extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    const { dispatch, navigationState } = this.props;
    return (
      <MainTabNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: navigationState,
        })}
      />
    );
  }
}

export default connect(mapStateToProps)(MainTabNavigation);
