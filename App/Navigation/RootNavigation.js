// @flow
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import LoginScreen from '../Containers/Login/LoginScreen';
import MainTabNavigation from './MainTabNavigation';
import { ApplicationStyles } from '../Themes';

export const RootNavigator = StackNavigator(
  {
    mainTab: { screen: MainTabNavigation },
    login: { screen: LoginScreen },
  },
  {
    navigationOptions: {
      ...ApplicationStyles.defaultHeaderStyle,
      headerMode: 'float',
    },
  },
);

class RootNavigation extends Component {
  render() {
    const { dispatch, navigationState } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <RootNavigator
          navigation={addNavigationHelpers({
            dispatch,
            state: navigationState,
          })}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  navigationState: state.rootNav,
});

// export default connect(mapStateToProps, { hideToastAction })(RootNavigation);
export default connect(mapStateToProps)(RootNavigation);
