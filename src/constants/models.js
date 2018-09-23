import Immutable from 'immutable'

export const LoginState = Immutable.fromJS({
  userName: '',
  password: '',
  message: '',
  role: '',
  status: 'await'
})

export const AdminPageState = Immutable.fromJS({
  message: '',
  status: 'await',
  //add router
  userName: '',
  password: '',
  repass: '',
  name: '',
  role: '',
  //change password router
  oldPass: '',
  newPass: '',
  reNewPass: '',
  //teacher&student list
  teacherList: [],
  studentList: [],
  //class control
  nowClass: '软工161',
  nowClassTeacherList: [],
  nowClassStudentList: [],
  addRole: '',
  addName: ''
})