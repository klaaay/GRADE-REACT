import Immutable from 'immutable'

const auth = localStorage.getItem('token')

export const LoginState = Immutable.fromJS({
  userName: '',
  password: '',
  message: '',
  role: '',
  id: '',
  auth: auth,
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
  classes: [],
  nowClass: '',
  nowClassTeacherList: [],
  nowClassStudentList: [],
  addRole: '',
  addName: ''
})

export const TeacherPageState = Immutable.fromJS({
  message: '',
  status: '',
  //task
  classList: [],
  classes: [],
  title: '',
  content: '',
  publishTime: '',
  endTime: '',
  teacherProportion: 50,
  selfProportion: 20,
  groupProportion: 30,
  groupNumber: 3,
  //published
  publishedTasks: [],
  selectId: ''
})

export const StudentPageState = Immutable.fromJS({
  message: '',
  status: '',
  //task
  taskList: [],
  //groupEvaluate
  askedTaskList: [],
  evalRecords: []
})