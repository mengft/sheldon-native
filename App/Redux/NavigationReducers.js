import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../Navigation/RootNavigation';
import { MainTabNavigator } from '../Navigation/MainTabNavigation';
import * as actionTypes from './ActionTypes';
import { TabMyDiaryNavigator } from '../Navigation/TabMyDiaryNavigation';
import { TabMessageNavigator } from '../Navigation/TabMessageNavigation';
import { TabFriendNavigator } from '../Navigation/TabFriendNavigation';
import { TabPersonalCenterNavigator } from '../Navigation/TabPersonalCenterNavigation';

export const rootNavReducer = (state, action) => {
  if (action.type === actionTypes.LOGIN || action.type === actionTypes.LOGIN_SUCCESS) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'mainTab' })],
    });
    const newState = RootNavigator.router.getStateForAction(resetAction, state);
    return newState || state;
  }  
  const newState = RootNavigator.router.getStateForAction(action, state);
  return newState || state;
};

export const mainTabReducer = (state, action) => {
  if (action.type === actionTypes.TOGGLE_TAR_BAR) {
    const routes = state.routes;
    const route = routes[state.index];
    route.params = { ...route.params, showTabBar: action.payload.showTabBar };
    return { ...state, routes };
  }
  return MainTabNavigator.router.getStateForAction(action, state);
};

export const tabMyDiaryReducer = (state, action) => {
  return TabMyDiaryNavigator.router.getStateForAction(action, state);
};

export const tabMessageReducer = (state, action) => {
  return TabMessageNavigator.router.getStateForAction(action, state);
};

export const tabFriendReducer = (state, action) => {
  return TabFriendNavigator.router.getStateForAction(action, state);
};

export const tabPersonalCenterReducer = (state, action) => {
  return TabPersonalCenterNavigator.router.getStateForAction(action, state);
};
