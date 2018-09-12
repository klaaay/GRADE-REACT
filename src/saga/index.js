import { call, takeLatest, select, fork, all } from 'redux-saga/effects'

import { login_confirm } from '../api/login.js'

function* loginConfirm() {
  try {
    const userName = yield select(state => (state.getIn(['login', 'userName'])));
    const password = yield select(state => (state.getIn(['login', 'password'])));
    console.log(userName);
    console.log(password);
    const data = yield call(login_confirm, userName, password);
    console.log(data)
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

