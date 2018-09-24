import { combineReducers } from 'redux-immutable';
import login from './loginReducers'
import admin from './adminPageReducer'
import teacher from './teacherPageReducer'
import student from './studentPageReducer'


const rootReducer = combineReducers({
  login,
  admin,
  teacher,
  student
});

export default rootReducer;