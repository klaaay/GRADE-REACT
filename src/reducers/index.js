import { combineReducers } from 'redux-immutable';
import login from './loginReducers'
import admin from './adminPageReducer'


const rootReducer = combineReducers({
  login,
  admin
});

export default rootReducer;