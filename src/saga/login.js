import { call, takeLatest, select, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router';

import { login_confirm } from '../api/login.js'


//login
function* loginConfirm() {
  try {
    const userName = yield select(state => (state.getIn(['login', 'userName'])));
    const password = yield select(state => (state.getIn(['login', 'password'])));
    const data = yield call(login_confirm, userName, password);
    yield put({ type: 'LOGIN_RESULT', payload: data })
    const status = yield select(state => (state.getIn(['login', 'status'])));
    if (status === 'success') {
      const role = data.role;
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("id", data.id);
      localStorage.setItem("userName", userName);
      localStorage.setItem("password", password);
      if (role === 'admin') {
        browserHistory.push('/admin');
      } else if (role === 'teacher') {
        browserHistory.push('/teacher');
      } else if (role === 'student') {
        browserHistory.push('/student');
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export const watchLoginConfirm = function* watchLoginConfirm() {
  yield takeLatest('VALIDATE_USER', loginConfirm);
}