import { call, takeLatest, select, fork, all, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router';

import { login_confirm } from '../api/login.js'
import { add_user } from '../api/adminPage.js'


//login
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

//adminPage
function* addUser(){
  try {
    const userName = yield select(state => (state.getIn(['admin', 'userName'])));
    const password = yield select(state => (state.getIn(['admin', 'password'])));
    const repass = yield select(state => (state.getIn(['admin', 'repass'])));
    const role = yield select(state => (state.getIn(['admin', 'role'])));
    const data = yield call(add_user, userName, password,repass,role);
    console.log(data);
    yield put({ type: 'ADD_USER_RESULT', payload: data })
    // const status = yield select(state => (state.getIn(['login', 'status'])));
    // if(status === 'success'){
    //   const role = yield select(state => (state.getIn(['login', 'role'])));
    //   if(role === 'admin'){
    //     browserHistory.push('/admin');
    //   }
    // }
  } catch (e) {
    console.log(e)
  }
}

function* watchAddUser() {
  yield takeLatest('START_ADD_USER', addUser);
}

export default function* root() {
  yield all([
    fork(watchLoginConfirm),
    fork(watchAddUser)
  ])
}

