import { handleActions } from 'redux-actions'
import { UserState } from '../constants/models'

const loginReducer = handleActions({
  CHANGE_USER_NAME: (state, { payload }) => (
    state.merge({
      userName: payload.userName,
      status: 'await'
    })
  ),
  CHANGE_PASSWORD: (state, { payload }) => (
    state.merge({
      password: payload.password,
      status: 'await'
    })
  ),
  VALIDATE_USER: (state) => (state),
  LOGIN_RESULT: (state, { payload }) => (
    state.merge({
      status: payload.status,
      message: payload.message,
      role: payload.role
    })
  )
}, UserState)

export default loginReducer;