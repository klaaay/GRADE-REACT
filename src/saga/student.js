import { call, takeLatest, select, put } from 'redux-saga/effects'

import { get_tasks } from '../api/student'

function* getTasks() {
  try {
    const id = yield select((state) => (state.getIn(['login', 'id'])));
    console.log(id);
    const data = yield call(get_tasks, id);
    console.log(data);
    yield put({ type: 'STUDENT_TASK_RESULT', payload: data });
  } catch (e) {
    console.log(e);
  }
}

export const watchGetTasks = function* watchGetTasks() {
  yield takeLatest('START_GET_TASKS', getTasks);
}