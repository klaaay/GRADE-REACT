import { fork, all } from 'redux-saga/effects'
import { watchLoginConfirm } from './login.js'
import {
  watchAddUser,
  watchTeacherList,
  watchStudentList,
  watchChangePassword,
  watchClassControl
} from './admin'
import {
  watchSearchClassList,
  watchPublishTask
} from './teacher'

export default function* root() {
  yield all([
    fork(watchLoginConfirm),
    fork(watchAddUser),
    fork(watchChangePassword),
    fork(watchTeacherList),
    fork(watchStudentList),
    fork(watchClassControl),
    fork(watchSearchClassList),
    fork(watchPublishTask)
  ])
}

