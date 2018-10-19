import { call, takeLatest, put } from 'redux-saga/effects'

import {
  get_tasks,
  get_asked_tasks,
  get_eval_records
} from '../api/student'

function* getTasks() {
  try {
    // const id = yield select((state) => (state.getIn(['login', 'id'])));
    const id = localStorage.getItem("id");
    const data = yield call(get_tasks, id);
    yield put({ type: 'STUDENT_TASK_RESULT', payload: data });
  } catch (e) {
    console.log(e);
  }
}

function* getAskedTasks() {
  try {
    // const id = yield select((state) => (state.getIn(['login', 'id'])));
    const id = localStorage.getItem("id");
    const data = yield call(get_asked_tasks, id);
    console.log(data);
    yield put({ type: 'GROUP_EVALUATE_TASKS', payload: data })
  } catch (e) {
    console.log(e);
  }
}

function* getEvalRecords() {
  try {
    // const id = yield select((state) => (state.getIn(['login', 'id'])));
    const id = localStorage.getItem("id");
    const data = yield call(get_eval_records, id);
    console.log(data);
    yield put({ type: 'EVAL_RECORDS', payload: data })
  } catch (e) {
    console.log(e)
  }
}

export const watchGetTasks = function* watchGetTasks() {
  yield takeLatest('START_GET_TASKS', getTasks);
}

export const watchGetAskedTasks = function* watchGetAskedTasks() {
  yield takeLatest('START_GET_ASKED_TASKS', getAskedTasks);
}

export const watchGetEvalRecords = function* watchGetEvalRecords() {
  yield takeLatest('START_GET_EVAL_RECORDS', getEvalRecords);
}