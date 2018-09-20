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
import Class from './components/page_admin/Class.jsx'
import ClassAdd from './components/page_admin/ClassAdd.jsx'

import PageTeacher from './components/page_teacher/PageTeacher.jsx'

import PageStudent from './components/page_student/PageStudent.jsx'


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
          <Route path="/admin/class" component={Class} >
            <Route path="/admin/class/:add" component={ClassAdd} />
          </Route>
        </Route>
        <Route path="/teacher" component={PageTeacher}>
        </Route>
        <Route path="/student" component={PageStudent}>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);