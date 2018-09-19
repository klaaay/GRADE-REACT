import { call, takeLatest, select, fork, all, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router';

import { login_confirm } from '../api/login.js'
import { add_user, change_password, search_role_list } from '../api/adminPage.js'


//login
function* loginConfirm() {
  try {
    const userName = yield select(state => (state.getIn(['login', 'userName'])));
    const password = yield select(state => (state.getIn(['login', 'password'])));
    const data = yield call(login_confirm, userName, password);
    yield put({ type: 'LOGIN_RESULT', payload: data })
    const status = yield select(state => (state.getIn(['login', 'status'])));
    if (status === 'success') {
      const role = yield select(state => (state.getIn(['login', 'role'])));
      if (role === 'admin') {
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
function* searchTeacherList() {
  try {
    const data = yield call(search_role_list, 'teacher');
    console.log(data);
    yield put({ type: 'TEACHER_LIST_SEARCH_RESULT', payload: data })
  } catch (e) {
    console.log(e)
  }
}

function* searchStudentList() {
  try {
    const data = yield call(search_role_list, 'student');
    console.log(data);
    yield put({ type: 'STUDENT_LIST_SEARCH_RESULT', payload: data })
  } catch (e) {
    console.log(e)
  }
}

function* watchTeacherList() {
  yield takeLatest('TEACHER_LIST_SEARCH', searchTeacherList);
}
function* watchStudentList() {
  yield takeLatest('STUDENT_LIST_SEARCH', searchStudentList);
}

function* addUser() {
  try {
    const userName = yield select(state => (state.getIn(['admin', 'userName'])));
    const password = yield select(state => (state.getIn(['admin', 'password'])));
    const repass = yield select(state => (state.getIn(['admin', 'repass'])));
    const role = yield select(state => (state.getIn(['admin', 'role'])));
    const data = yield call(add_user, userName, password, repass, role);
    yield put({ type: 'ADD_USER_RESULT', payload: data })
  } catch (e) {
    console.log(e)
  }
}

function* watchAddUser() {
  yield takeLatest('START_ADD_USER', addUser);
}

function* changePassword() {
  try {
    const userName = yield select(state => (state.getIn(['login', 'userName'])));
    const relOld = yield select(state => (state.getIn(['login', 'password'])));
    const oldPass = yield select(state => (state.getIn(['admin', 'oldPass'])));
    const newPass = yield select(state => (state.getIn(['admin', 'newPass'])));
    const reNewPass = yield select(state => (state.getIn(['admin', 'reNewPass'])));
    const data = yield call(change_password, userName, relOld, oldPass, newPass, reNewPass);
    console.log(data)
    yield put({ type: 'CHANGE_PASSWORD_RESULT', payload: data })
  } catch (e) {
    console.log(e)
  }
}

function* watchChangePassword() {
  yield takeLatest('START_CHANGE_PASSWORD', changePassword);
}

export default function* root() {
  yield all([
    fork(watchLoginConfirm),
    fork(watchAddUser),
    fork(watchChangePassword),
    fork(watchTeacherList),
    fork(watchStudentList)
  ])
}

