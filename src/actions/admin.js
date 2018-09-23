import {
  CHANGE_ROUTE,

  TEACHER_LIST_SEARCH,
  STUDENT_LIST_SEARCH,

  START_ADD_USER,
  ROLE_CHANGE,

  START_CHANGE_PASSWORD,

  START_ADD_ROLE
} from '../constants/actionTypes.js'

export const changeRoute = () => ({ type: CHANGE_ROUTE });

export const teacherListSearch = () => ({ type: TEACHER_LIST_SEARCH });
export const studentListSearch = () => ({ type: STUDENT_LIST_SEARCH });

export const roleChange = (value) => ({ type: ROLE_CHANGE, payload: { role: value } });
export const startAddUser = (userName, password, repass, name) => ({
  type: START_ADD_USER,
  payload: {
    userName: userName,
    password: password,
    repass: repass,
    name: name
  }
});

export const startChangePassword = (oldPass, newPass, reNewPass) => ({
  type: START_CHANGE_PASSWORD,
  payload: {
    oldPass: oldPass,
    newPass: newPass,
    reNewPass: reNewPass
  }
})


export const startAddRole = (addRole, addName) => ({
  type: START_ADD_ROLE,
  payload: {
    addRole: addRole,
    addName: addName
  }
})