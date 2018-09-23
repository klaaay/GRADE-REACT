import { call, takeLatest, select, put } from 'redux-saga/effects'

import { search_class_list, publish_task } from '../api/teacher'

function* searchClassList() {
  try {
    const id = yield select((state) => (state.getIn(['login', 'id'])));
    console.log(id);
    const data = yield call(search_class_list, id);
    console.log(data);
    yield put({ type: 'SEARCH_CLASS_LIST_RESULT', payload: data });
  } catch (e) {
    console.log(e)
  }
}

function* publishTask() {
  try {
    const publisherId = yield select((state) => (state.getIn(['login', 'id'])));
    const classes = yield select((state) => (state.getIn(['teacher', 'classes'])));
    const title = yield select((state) => (state.getIn(['teacher', 'title'])));
    const content = yield select((state) => (state.getIn(['teacher', 'content'])));
    const publishTime = yield select((state) => (state.getIn(['teacher', 'publishTime'])));
    const endTime = yield select((state) => (state.getIn(['teacher', 'endTime'])));
    const data = yield call(publish_task, publisherId, classes, title, content, publishTime, endTime);
    console.log(data);
  } catch (e) {
    console.log(e)
  }
}

export const watchSearchClassList = function* watchSearchClassList() {
  yield takeLatest('CLASS_LIST_SEARCH', searchClassList);
}

export const watchPublishTask = function* watchPublishTask(){
  yield takeLatest('START_TASK_PUBLISH', publishTask);
}