import { combineReducers } from 'redux-immutable';
import github from './data/githubReducers';// import routes from './routes';


const rootReducer = combineReducers({
  github
});

export default rootReducer;