// @flow
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MessageScreen from '../Containers/TabMessage/MessageScreen';
import MessageItemScreen from '../Containers/TabMessage/MessageItemScreen';

const routeConfiguration = {
  message: { screen: MessageScreen },
  messageItem: { screen: MessageItemScreen },
};

const navigatorConfiguration = {
  headerMode: 'float',
  initialRoute: 'message',
};

export const TabMessageNavigator = StackNavigator(
  routeConfiguration,
  navigatorConfiguration,
);

const mapStateToProps = state => ({ navigationState: state.tabMessage });

class TabMessageNavigation extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarLabel: '消息',
    tabBarVisible: navigation.state.params &&
      navigation.state.params.showTabBar,
    tabBarIcon: ({ tintColor }) => (
      <View>
        <Icon name="comment-o" size={30} color={tintColor}/>
      </View>
    ),
  });

  render() {
    const { navigationState, dispatch } = this.props;
    return (
      <TabMessageNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: navigationState,
        })}
      />
    );
  }
}

export default connect(mapStateToProps)(TabMessageNavigation);
