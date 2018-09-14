import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import Login from './components/login/Login.jsx'
import PageAdmin from './components/page_admin/PageAdmin.jsx'

import store from './store/configureStore.js';


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" >
        <IndexRoute component={Login} />
        {/* <Route path="/result" component={ResultPage} /> */}
        <Route path="/admin" component={PageAdmin}></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);