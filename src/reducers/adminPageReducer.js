import { handleActions } from 'redux-actions'
import { AdminPageState } from '../constants/models'

const AdminPageReducer = handleActions({
  CHANGE_ROUTE: (state) => (
    state.merge({
      status: 'await'
    })
  ),

  TEACHER_LIST_SEARCH: (state) => (state),
  STUDENT_LIST_SEARCH: (state) => (state),
  TEACHER_LIST_SEARCH_RESULT: (state, { payload }) => (
    state.merge({
      teacherList: payload.teacherList
    })
  ),
  STUDENT_LIST_SEARCH_RESULT: (state, { payload }) => (
    state.merge({
      studentList: payload.studentList
    })
  ),

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
      name: payload.name,
      status: 'await',
    })
  ),
  ADD_USER_RESULT: (state, { payload }) => (
    state.merge({
      status: payload.status,
      message: payload.message
    })
  ),

  START_CHANGE_PASSWORD: (state, { payload }) => (
    state.merge({
      oldPass: payload.oldPass,
      newPass: payload.newPass,
      reNewPass: payload.reNewPass
    })
  ),
  CHANGE_PASSWORD_RESULT: (state, { payload }) => (
    state.merge({
      status: payload.status,
      message: payload.message
    })
  ),

  START_ADD_ROLE: (state, { payload }) => (
    state.merge({
      addRole: payload.addRole,
      addName: payload.addName
    })
  ),
  START_GET_NOW_CLASS_INFO: (state, { payload }) => (
    state.merge({
      nowClass: payload.nowClass
    })
  ),
  GET_CLASSES_RESULT:(state,{payload})=>(
    state.merge({
      classes:payload.classes
    })
  ),
  CLASS_INFO_RESULT:(state,{payload})=>(
    state.merge({
      nowClassTeacherList:payload.nowClassTeacherList,
      nowClassStudentList:payload.nowClassStudentList
    })
  )
}, AdminPageState)

export default AdminPageReducer