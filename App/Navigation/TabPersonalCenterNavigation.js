// @flow
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import PersonalCenterScreen from '../Containers/TabPersonalCenter/PersonalCenterScreen';
import PersonalCenterItemScreen from '../Containers/TabPersonalCenter/PersonalCenterItemScreen';

const routeConfiguration = {
  personalCenter: { screen: PersonalCenterScreen },
  personalCenterItem: { screen: PersonalCenterItemScreen },
};

const navigatorConfiguration = {
  headerMode: 'float',
  initialRoute: 'personalCenter',
};

export const TabPersonalCenterNavigator = StackNavigator(
  routeConfiguration,
  navigatorConfiguration,
);

const mapStateToProps = state => ({ navigationState: state.tabPersonalCenter });

class TabPersonalCenterNavigation extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarLabel: '我的',
    tabBarVisible: navigation.state.params &&
      navigation.state.params.showTabBar,
    tabBarIcon: ({ tintColor }) => (
      <View>
        <Icon name="user" size={30} color={tintColor}/>
      </View>
    ),
  });

  render() {
    const { navigationState, dispatch } = this.props;
    return (
      <TabPersonalCenterNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: navigationState,
        })}
      />
    );
  }
}

export default connect(mapStateToProps)(TabPersonalCenterNavigation);
