// @flow
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import FriendScreen from '../Containers/TabFriend/FriendScreen';
import FriendItemScreen from '../Containers/TabFriend/FriendItemScreen';

const routeConfiguration = {
  friend: { screen: FriendScreen },
  friendItem: { screen: FriendItemScreen },
};

const navigatorConfiguration = {
  headerMode: 'float',
  initialRoute: 'friend',
};

export const TabFriendNavigator = StackNavigator(
  routeConfiguration,
  navigatorConfiguration,
);

const mapStateToProps = state => ({ navigationState: state.tabFriend });

class TabFriendNavigation extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarLabel: '萌友',
    tabBarVisible: navigation.state.params &&
      navigation.state.params.showTabBar,
    tabBarIcon: ({ tintColor }) => (
      <View>
        <Icon name="facebook" size={30} color={tintColor}/>
      </View>
    ),
  });

  render() {
    const { navigationState, dispatch } = this.props;
    return (
      <TabFriendNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: navigationState,
        })}
      />
    );
  }
}

export default connect(mapStateToProps)(TabFriendNavigation);
