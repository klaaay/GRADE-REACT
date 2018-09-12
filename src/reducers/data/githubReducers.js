import { handleActions } from 'redux-actions'
import { GithubState } from '../../constants/models'



const githubReducers = handleActions({
  GET_GITHUB_INITIATE: (state) => (
    state.merge({
      status: false
    })
  ),
  GET_GITHUB_SUCCESS: (state, { payload }) => (
    state.merge({
      status: true,
      data: payload.data
    })
  ),
  CHAGE_USER_ID: (state, { payload }) => (
    state.merge({
      userId: payload.userId
    })
  ),
  GITHUB_GET: (state, { payload }) => (
    state.merge({
      status: true,
      data: payload.data
    })
  ),
}, GithubState);

export default githubReducers;