import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter } from 'react-native';

function withNavigationIsFocused(Children) {
  return class extends Component {
    static navigationOptions = typeof Children.navigationOptions === 'function'
      ? Children.navigationOptions
      : {
        ...Children.navigationOptions,
      };
    constructor(props) {
      super(props);
      this.state = { isFocused: false };
    }

    _checkRoute = (props) => {
      if (
        this.props.navigation.state.routeName === props.currentRoute &&
        props.isTabFocused
      ) {
        this.setState({ isFocused: true });
      } else {
        this.setState({ isFocused: false });
      }
    };

    componentDidMount() {
      this._checkRoute(this.props);
    }

    componentWillReceiveProps(newProps) {
      this._checkRoute(newProps);
    }

    render() {
      return <Children isFocused={this.state.isFocused} {...this.props} />;
    }
  };
}

export default function connectWithNavigationIsFocused(
  mapStateToProps,
  mapDispatchToProps,
  stackNavigatorReducerName,
  parentTabNavigatorReducerName,
  tabIndex,
) {
  return function (container) {
    const addNavigationMapStateToProps = function (state) {
      const map = typeof mapStateToProps === 'function' ? mapStateToProps(state) : mapStateToProps;
      const stackReducer = state[stackNavigatorReducerName];
      const currentRoute = stackReducer.routes[stackReducer.index].routeName;
      const tabReducer = state[parentTabNavigatorReducerName];
      return {
        ...map,
        isTabFocused: tabReducer.index === tabIndex,
        currentRoute,
      };
    };
    return connect(addNavigationMapStateToProps, mapDispatchToProps)(
      withNavigationIsFocused(container),
    );
  };
}
