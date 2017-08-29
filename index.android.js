// @flow

import React, { Component, Alert } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import RootNavigation from './App/Navigation/RootNavigation';
import configureStore from './App/Redux/CreateStore';

export default class sheldon extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <RootNavigation />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('sheldon', () => sheldon);
