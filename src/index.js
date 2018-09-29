import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import Login from './components/login/Login.jsx'

import PageAdmin from './components/page_admin/PageAdmin.jsx'
import StudentList from './components/page_admin/studentList/Student.jsx'
import TeacherList from './components/page_admin/teacherList/Teacher.jsx'
import AddUser from './components/page_admin/addUser/Add.jsx'
import ChangePassword from './components/page_admin/changePassword/Change.jsx'
import ClassControl from './components/page_admin/classControl/Class.jsx'

import PageTeacher from './components/page_teacher/PageTeacher.jsx'
import TaskTeacher from './components/page_teacher/publishTask/Task.jsx'
import PublishedTask from './components/page_teacher/publishedTask/Tasks.jsx'
import Details from './components/page_teacher/publishedDetail/Details.jsx'

import PageStudent from './components/page_student/PageStudent.jsx'
import TasksStudent from './components/page_student/myTask/Tasks'


import store from './store/configureStore.js';

import './index.less'

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" >
        <IndexRoute component={Login} />
        <Route path="/admin" component={PageAdmin}>
          <Route path="/admin/student" component={StudentList} />
          <Route path="/admin/teacher" component={TeacherList} />
          <Route path="/admin/add" component={AddUser} />
          <Route path="/admin/change" component={ChangePassword} />
          <Route path="/admin/class" component={ClassControl} >
          </Route>
        </Route>
        <Route path="/teacher" component={PageTeacher}>
          <IndexRoute component={TaskTeacher} />
          <Route path="/teacher/task" component={TaskTeacher} />
          <Route path="/teacher/published" component={PublishedTask} />
          <Route path="/teacher/details" component={Details} />
        </Route>
        <Route path="/student" component={PageStudent}>
          <Route path="/student/task" component={TasksStudent} />

        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);