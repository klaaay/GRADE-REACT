import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import Login from './components/login/Login.jsx'

import PageAdmin from './components/page_admin/PageAdmin.jsx'
import StudentList from './components/page_admin/studentList/Student.jsx'
import TeacherList from './components/page_admin/teacherList/Teacher.jsx'
import AddUser from './components/page_admin/addUser/Add.jsx'
import ChangePassword from './components/public/changePassword/Change'
import ClassControl from './components/page_admin/classControl/Class.jsx'

import PageTeacher from './components/page_teacher/PageTeacher.jsx'
import TaskTeacher from './components/page_teacher/publishTask/Task.jsx'
import PublishedTask from './components/page_teacher/publishedTask/Tasks.jsx'
import Details from './components/page_teacher/publishedDetail/Details.jsx'
import TClassControl from './components/page_teacher/classControl/ClassControl'

import PageStudent from './components/page_student/PageStudent.jsx'
import TasksStudent from './components/page_student/myTask/Tasks'
import DoTask from './components/page_student/doTask/DoTask'
import Score from './components/page_student/score/Score'
import GroupEvaluate from './components/page_student/groupEvaluate/Group'

import Evaluate from './components/public/evaluate/Evaluate.jsx'

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
          <Route path="/teacher/evaluate" component={Evaluate} />
          <Route path="/teacher/classControl" component={TClassControl} />
          <Route path="/teacher/change" component={ChangePassword} />
        </Route>
        <Route path="/student" component={PageStudent}>
          <Route path="/student/task" component={TasksStudent} />
          <Route path="/student/do" component={DoTask} />
          <Route path="/student/evaluate" component={Evaluate} />
          <Route path="/student/score" component={Score} />
          <Route path="/student/groupEval" component={GroupEvaluate} />
          <Route path="/student/change" component={ChangePassword} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);