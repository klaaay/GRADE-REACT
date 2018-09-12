import {
  CHAGE_USER_ID,
  REQUEST_API_DATA,
  RECEIVE_API_DATA
} from '../constants/actionTypes';


export const changeUserId = text => ({ type: CHAGE_USER_ID, payload: { userId: text } });

export const requestApiData = () => ({ type: REQUEST_API_DATA });
export const receiveApiData = data => ({ type: RECEIVE_API_DATA, payload: { data: data } });