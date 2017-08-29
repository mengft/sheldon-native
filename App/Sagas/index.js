import qs from 'qs';
import {
  all,
  takeLatest,
  takeEvery,
  put,
  call,
  select,
  race,
  delay,
} from 'redux-saga/effects';
import * as ActionTypes from '../Redux/ActionTypes';
import Api from '../Services/ServiceApi'
import * as UserSaga from './User';

export function * myFetch ({ url, method, params, dataType, types = [], actions = [], isLogin = false, isLogout = false, showErrorMsg = true, filename, fileId }) {
  if (types[0]) {
    yield put({ type: types[0] })
  } else if (actions[0]) {
    yield put(actions[0])
  }
  const { response, error } = yield call(Api.fetch, {
    url,
    method,
    data: params,
    headers: yield call(getHeader, {isLogout}),
    dataType,
    filename,
    fileId
  })
  let errmsg = ''
  if (error) {
    if (types[2]) {
      yield put({ type: types[2] })
    } else if (actions[2]) {
      if (typeof actions[2] === 'function') {
        if (isGenerator(actions[2])) {
          yield call(actions[2], error)
        } else {
          yield put(actions[2](error))
        }
      } else {
        yield put(actions[2])
      }
    }
    errmsg = error.message
    if ((error.message === '400' || error.message === '401') && isLogin) {
      yield put({
        type: ActionTypes.SHOW_TOAST,
        message: error.message === '400' ? '用户名或密码错误' : '服务繁忙，请稍后再试'
      })
    } else if (error.message === '401') {
      yield put({ type: ActionTypes.LOGOUT })
      errmsg = '用户失效！请重新登录'
    } else {
      if (showErrorMsg) {
        yield put({
          type: ActionTypes.SHOW_TOAST,
          message: errmsg
        })
      }
    }
    return { error }
  }
  if (types[1]) {
    yield put({ type: types[1], payload: response.data })
  } else if (actions[1]) {
    if (typeof actions[1] === 'function') {
      if (isGenerator(actions[1])) {
        yield call(actions[1], response)
      } else {
        yield put(actions[1](response))
      }
    } else {
      yield put(actions[1])
    }
  }
  return { response }
}

export function* range() {
  console.log(222);
  yield '111';
}

export default function* rootSaga() {
  yield all([
    takeLatest(ActionTypes.LOGIN, range),
  ]);
}