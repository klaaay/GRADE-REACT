import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import Login from './components/login/Login.jsx'

import store from './store/configureStore.js';

import 'antd/dist/antd.css';

ReactDOM.render(
  <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Login}>
          <IndexRoute component={Login} />
          {/* <Route path="/result" component={ResultPage} /> */}
        </Route>
      </Router>
  </Provider>,
  document.getElementById('root')
);