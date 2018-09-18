import Immutable from 'immutable'

export const LoginState = Immutable.fromJS({
  userName: '',
  password: '',
  message: '',
  role:'',
  status: 'await'
})

export const AdminPageState = Immutable.fromJS({
  message:'',
  status:'await',
  //add router
  userName:'',
  password:'',
  repass:'',
  role:'',
  //change password router
  oldPass:'',
  newPass:'',
  reNewPass:''
})