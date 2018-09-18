import Immutable from 'immutable'

export const LoginState = Immutable.fromJS({
  userName: '',
  password: '',
  message: '',
  role:'',
  status: 'await'
})

export const AdminPageState = Immutable.fromJS({
  userName:'',
  password:'',
  repass:'',
  role:'',
  message:'',
  status:'await'
})