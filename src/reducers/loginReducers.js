import { handleActions } from 'redux-actions'
import { LoginState } from '../constants/models'

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
      role: payload.role,
      id: payload.id
    })
  ),
  LOG_OUT: (state) => (
    state.merge({
      userName: '',
      password: '',
      message: '',
      role: '',
      id: '',
      status: 'await'
    })
  )
}, LoginState)

export default loginReducer;