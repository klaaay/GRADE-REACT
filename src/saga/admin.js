import { call, takeLatest, select, put } from 'redux-saga/effects'

import { add_user, change_password, search_role_list, class_control } from '../api/admin.js'

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

function* addUser() {
  try {
    const userName = yield select(state => (state.getIn(['admin', 'userName'])));
    const password = yield select(state => (state.getIn(['admin', 'password'])));
    const repass = yield select(state => (state.getIn(['admin', 'repass'])));
    const name = yield select(state => (state.getIn(['admin', 'name'])));
    const role = yield select(state => (state.getIn(['admin', 'role'])));
    const data = yield call(add_user, userName, password, repass, name, role);
    yield put({ type: 'ADD_USER_RESULT', payload: data })
  } catch (e) {
    console.log(e)
  }
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

function* classControl() {
  try {
    const addRole = yield select(state => (state.getIn(['admin', 'addRole'])));
    const addName = yield select(state => (state.getIn(['admin', 'addName'])));
    const nowClass = yield select(state => (state.getIn(['admin', 'nowClass'])));
    const data = yield call(class_control, addRole, addName, nowClass);
    console.log(data)
    // yield put({ type: 'CHANGE_PASSWORD_RESULT', payload: data })
  } catch (e) {
    console.log(e)
  }
}


export const watchTeacherList = function* watchTeacherList() {
  yield takeLatest('TEACHER_LIST_SEARCH', searchTeacherList);
}

export const watchStudentList = function* watchStudentList() {
  yield takeLatest('STUDENT_LIST_SEARCH', searchStudentList);
}

export const watchAddUser = function* watchAddUser() {
  yield takeLatest('START_ADD_USER', addUser);
}

export const watchChangePassword = function* watchChangePassword() {
  yield takeLatest('START_CHANGE_PASSWORD', changePassword);
}

export const watchClassControl = function* watchClassControl() {
  yield takeLatest('START_ADD_ROLE', classControl)
}