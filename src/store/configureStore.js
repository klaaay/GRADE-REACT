import rootSaga from '../saga/index.js'

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import Immutable from 'immutable';

import rootReducer from '../reducers';


const initialState = Immutable.Map();
const sagaMiddleware = createSagaMiddleware();

const storeEnhancers = compose(
  applyMiddleware(sagaMiddleware),
  (window && window.devToolsExtension) ? window.devToolsExtension() : (f) => f
)

export default createStore(
  rootReducer,
  initialState,
  storeEnhancers
)

sagaMiddleware.run(rootSaga);