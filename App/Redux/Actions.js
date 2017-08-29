import { TOGGLE_TAR_BAR } from '../Redux/ActionTypes';

export const toggleTabBarAction = showTabBar => ({
  type: TOGGLE_TAR_BAR,
  payload: { showTabBar },
});
