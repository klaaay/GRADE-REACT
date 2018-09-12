import { handleActions } from 'redux-actions'
import { UserState } from '../constants/models'

const loginReducer = handleActions({
  VALIDATE_USER: (state) => (state),
  CHANGE_USER_NAME: (state, { payload }) => (
    state.merge({
      userName: payload.userName
    })
  ),
  CHANGE_PASSWORD: (state, { payload }) => (
    state.merge({
      password: payload.password
    })
  )
}, UserState)

export default loginReducer;