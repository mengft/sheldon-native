import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate, createTransform } from 'redux-persist';
import { createFilter, createBlacklistFilter } from 'redux-persist-transform-filter';
import {
  rootNavReducer,
  mainTabReducer,
  tabMyDiaryReducer,
  tabMessageReducer,
  tabFriendReducer,
  tabPersonalCenterReducer,
} from './NavigationReducers';
import rootSaga from '../Sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(createLogger(), sagaMiddleware),
  autoRehydrate({ log: true }),
);

export default function configureStore() {
  const store = createStore(
    combineReducers({
      rootNav: rootNavReducer,
      mainTab: mainTabReducer,
      tabMyDiary: tabMyDiaryReducer,
      tabMessage: tabMessageReducer,
      tabFriend: tabFriendReducer,
      tabPersonalCenter: tabPersonalCenterReducer,
    }),
    enhancer,
  );

  sagaMiddleware.run(rootSaga);
  return store;
}