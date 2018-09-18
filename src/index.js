import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import Login from './components/login/Login.jsx'
import PageAdmin from './components/page_admin/PageAdmin.jsx'
import Student from './components/page_admin/Student.jsx'
import Teacher from './components/page_admin/Teacher.jsx'
import Add from './components/page_admin/Add.jsx'
import Change from './components/page_admin/Change.jsx'


import store from './store/configureStore.js';

import './index.less'


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" >
        <IndexRoute component={Login} />
        <Route path="/admin" component={PageAdmin}>
          <Route path="/admin/student" component={Student} />
          <Route path="/admin/teacher" component={Teacher} />
          <Route path="/admin/add" component={Add} />
          <Route path="/admin/change" component={Change} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);