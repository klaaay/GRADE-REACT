import { handleActions } from 'redux-actions'
import { AdminPageState } from '../constants/models'

const AdminPageReducer = handleActions({
  ROLE_CHANGE: (state, { payload }) => (
    state.merge({
      role: payload.role
    })
  ),
  START_ADD_USER: (state, { payload }) => (
    state.merge({
      userName: payload.userName,
      password: payload.password,
      repass: payload.repass,
      status: 'await',
    })
  ),
  ADD_USER_RESULT: (state, { payload }) => (
    state.merge({
      status: payload.status,
      message: payload.message
    })
  )

}, AdminPageState)

export default AdminPageReducer