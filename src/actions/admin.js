import {
  START_ADD_USER,
  ROLE_CHANGE
} from '../constants/actionTypes.js'

export const roleChange = (value) => ({ type: ROLE_CHANGE, payload: { role: value } });
export const startAddUser = (userName, password, repass) => ({ type: START_ADD_USER, payload: { userName: userName, password: password, repass: repass } });