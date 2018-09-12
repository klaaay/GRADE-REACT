import { call, put, takeLatest, select, fork,all } from 'redux-saga/effects'

import { fetchData, myTest } from '../api/githubGet.js'

function* getApiData() {
  try {
    const userName = yield select(state => (state.getIn(['github', 'userId'])));
    const data = yield call(fetchData, userName);
    yield put({
      type: 'GITHUB_GET',
      payload: { data: data }
    })
  } catch (e) {
    console.log(e);
  }
}

function* getMyTest() {
  try {
    const data = yield call(myTest);
    console.log(data);
  } catch (e) {
    console.log(e)
  }
}

function* watchUserIdChange() {
  yield takeLatest('CHAGE_USER_ID', getApiData);
}

function* watchUserIdChange_test() {
  yield takeLatest('CHAGE_USER_ID', getMyTest);
}

export default function* root() {
  yield all([
    fork(watchUserIdChange),
    fork(watchUserIdChange_test)
  ])
}

