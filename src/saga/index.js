import { call, takeLatest, select, fork, all, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router';

import { login_confirm } from '../api/login.js'

function* loginConfirm() {
  try {
    const userName = yield select(state => (state.getIn(['login', 'userName'])));
    const password = yield select(state => (state.getIn(['login', 'password'])));
    const data = yield call(login_confirm, userName, password);
    yield put({ type: 'LOGIN_RESULT', payload: data })
    const status = yield select(state => (state.getIn(['login', 'status'])));
    if(status === 'success'){
      const role = yield select(state => (state.getIn(['login', 'role'])));
      if(role === 'admin'){
        browserHistory.push('/admin');
      }
    }
  } catch (e) {
    console.log(e)
  }
}

function* watchLoginConfirm() {
  yield takeLatest('VALIDATE_USER', loginConfirm);
}

export default function* root() {
  yield all([
    fork(watchLoginConfirm)
  ])
}

