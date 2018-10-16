import { fork, all } from 'redux-saga/effects'
import { watchLoginConfirm } from './login.js'

import {
  watchAddUser,
  watchTeacherList,
  watchStudentList,
  watchChangePassword,
  watchClassControl,
  watchGetClasses,
  watchGetNowClassInfo
} from './admin'

import {
  watchSearchClassList,
  watchPublishTask,
  watchPublishedTaks,
  watchDeleteTask
} from './teacher'

import {
  watchGetTasks,
  watchGetAskedTasks,
  watchGetEvalRecords
} from './student'

export default function* root() {
  yield all([
    fork(watchLoginConfirm),
    fork(watchAddUser),
    fork(watchChangePassword),
    fork(watchTeacherList),
    fork(watchStudentList),
    fork(watchClassControl),
    fork(watchSearchClassList),
    fork(watchPublishTask),
    fork(watchGetTasks),
    fork(watchGetClasses),
    fork(watchGetNowClassInfo),
    fork(watchPublishedTaks),
    fork(watchDeleteTask),
    fork(watchGetAskedTasks),
    fork(watchGetEvalRecords)
  ])
}