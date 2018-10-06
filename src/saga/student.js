import { call, takeLatest, select, put } from 'redux-saga/effects'

import {
  get_tasks,
  get_asked_tasks
} from '../api/student'

function* getTasks() {
  try {
    const id = yield select((state) => (state.getIn(['login', 'id'])));
    const data = yield call(get_tasks, id);
    yield put({ type: 'STUDENT_TASK_RESULT', payload: data });
  } catch (e) {
    console.log(e);
  }
}

function* getAskedTasks() {
  try {
    const id = yield select((state) => (state.getIn(['login', 'id'])));
    console.log(id);
    const data = yield call(get_asked_tasks, id);
    console.log(data);
    yield put({ type: 'GROUP_EVALUATE_TASKS', payload: data })
  } catch (e) {
    console.log(e);
  }
}

export const watchGetTasks = function* watchGetTasks() {
  yield takeLatest('START_GET_TASKS', getTasks);
}

export const watchGetAskedTasks = function* watchGetAskedTasks() {
  yield takeLatest('START_GET_ASKED_TASKS', getAskedTasks);
}