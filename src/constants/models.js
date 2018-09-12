import Immutable from 'immutable'

export const UserState = Immutable.fromJS({
  userName: '',
  password: '',
  message: '',
  status: false
})