import {
  CHANGE_ROUTE,

  START_ADD_USER,
  ROLE_CHANGE,

  START_CHANGE_PASSWORD,
} from '../constants/actionTypes.js'

export const changeRoute = () => ({ type: CHANGE_ROUTE });

export const roleChange = (value) => ({ type: ROLE_CHANGE, payload: { role: value } });
export const startAddUser = (userName, password, repass) => ({
  type: START_ADD_USER,
  payload: {
    userName: userName,
    password: password,
    repass: repass
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