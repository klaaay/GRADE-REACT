import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import Main from './components/Main/Main.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import ResultPage from './components/ResultPage/ResultPage.jsx';
import store from './store/configureStore.js';

import 'antd/dist/antd.css';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={HomePage} />
          <Route path="/result" component={ResultPage} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);