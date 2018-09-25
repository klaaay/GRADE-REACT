import {
  VALIDATE_USER,
  CHANGE_USER_NAME,
  CHANGE_PASSWORD,
  LOG_OUT
} from '../constants/actionTypes.js'

export const changeUserName = text => ({ type: CHANGE_USER_NAME, payload: { userName: text } });
export const changePassword = text => ({ type: CHANGE_PASSWORD, payload: { password: text } });
export const validateUser = () => ({ type: VALIDATE_USER });
export const logOut = () => ({ type: LOG_OUT });