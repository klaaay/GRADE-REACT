import { combineReducers } from 'redux-immutable';
import login from './loginReducers'
import admin from './adminPageReducer'
import teacher from './teacherPageReducer'


const rootReducer = combineReducers({
  login,
  admin,
  teacher
});

export default rootReducer;