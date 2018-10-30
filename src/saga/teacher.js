import { call, takeLatest, select, put } from 'redux-saga/effects'

import { message } from 'antd';

import {
  search_class_list,
  publish_task,
  get_published_taks,
  delete_published_task
} from '../api/teacher'

function* searchClassList() {
  try {
    // const id = yield select((state) => (state.getIn(['login', 'id'])));
    const id = localStorage.getItem("id");
    console.log(id);
    const data = yield call(search_class_list, id);
    console.log(data);
    if (data) {
      yield put({ type: 'SEARCH_CLASS_LIST_RESULT', payload: data });
    }
  } catch (e) {
    console.log(e)
  }
}

function* publishTask() {
  try {
    // const publisherId = yield select((state) => (state.getIn(['login', 'id'])));
    const publisherId = localStorage.getItem("id");
    const classes = yield select((state) => (state.getIn(['teacher', 'classes'])));
    const title = yield select((state) => (state.getIn(['teacher', 'title'])));
    const content = yield select((state) => (state.getIn(['teacher', 'content'])));
    const publishTime = yield select((state) => (state.getIn(['teacher', 'publishTime'])));
    const endTime = yield select((state) => (state.getIn(['teacher', 'endTime'])));
    const teacherProportion = yield select((state) => (state.getIn(['teacher', 'teacherProportion'])));
    console.log(teacherProportion);
    const selfProportion = yield select((state) => (state.getIn(['teacher', 'selfProportion'])));
    const groupProportion = yield select((state) => (state.getIn(['teacher', 'groupProportion'])));
    const groupNumber = yield select((state) => (state.getIn(['teacher', 'groupNumber'])));
    const data = yield call(publish_task, publisherId, classes, title, content, publishTime, endTime, teacherProportion, selfProportion, groupProportion, groupNumber);
    console.log(data);
    if (data.type) {
      message.success(data.message);
    } else {
      message.warning(data.message);
    }

  } catch (e) {
    console.log(e)
  }
}

function* getPublishedTaks() {
  try {
    // const id = yield select((state) => (state.getIn(['login', 'id'])));
    const id = localStorage.getItem("id");
    // console.log(id);
    const data = yield call(get_published_taks, id);
    console.log(data);
    yield put({ type: 'PUBLISHED_TASKS_RESULT', payload: data });
  } catch (e) {
    console.log(e)
  }
}

function* deletePublishedTask() {
  try {
    const id = yield select((state) => (state.getIn(['teacher', 'selectId'])));
    // console.log(id);
    const data = yield call(delete_published_task, id);
    console.log(data);
    message.success(data.message);
    // yield put({ type: 'START_DELETE_TASK', payload: data });
  } catch (e) {
    console.log(e)
  }
}

export const watchSearchClassList = function* watchSearchClassList() {
  yield takeLatest('CLASS_LIST_SEARCH', searchClassList);
}

export const watchPublishTask = function* watchPublishTask() {
  yield takeLatest('START_TASK_PUBLISH', publishTask);
}

export const watchPublishedTaks = function* watchPublishedTaks() {
  yield takeLatest('START_GET_PUBLISHED_TASKS', getPublishedTaks)
}

export const watchDeleteTask = function* watchDeleteTask() {
  yield takeLatest('START_DELETE_TASK', deletePublishedTask)
}