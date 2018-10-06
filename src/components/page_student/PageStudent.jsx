import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { Layout, Menu, Icon } from 'antd';
import $ from 'jquery'

import {
  startGetTasks,
  startGetAskedTasks
} from '../../actions/student'
import {
  logOut
} from '../../actions/login.js';

const { Header, Sider, Content } = Layout;

class PageStudent extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  changeRouter = (router) => {
    browserHistory.push('/student/' + router)
  }

  componentDidMount = () => {
    $('.homework_student_route').trigger('click');
  }

  render() {
    const { onStartGetTasks, onLogOut, onStartGetAskedTasks } = this.props
    return (
      <Layout style={{ height: '92%' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo">
            <img src="/logo.png" alt="" />
          </div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"
              className="homework_student_route"
              onClick={(e) => {
                onStartGetTasks()
                this.changeRouter('task')
              }}
            >
              <Icon type="user" />
              <span>我的作业</span>
            </Menu.Item>
            <Menu.Item key="2"
              className="homework_groupEval"
              onClick={(e) => {
                onStartGetAskedTasks()
                this.changeRouter('groupEval')
              }}
            >
              <Icon type="video-camera" />
              <span>同学互评</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="hidden"></div>
            <Icon type="logout" theme="outlined"
              style={{ color: '#1890FF' }}
              onClick={(e) => {
                browserHistory.push('/')
                onLogOut()
              }
              } />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 520, height: '100%' }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  onStartGetTasks: (e) => {
    return dispatch(startGetTasks())
  },
  onStartGetAskedTasks: (e) => {
    return dispatch(startGetAskedTasks())
  },
  onLogOut: () => {
    dispatch(logOut());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PageStudent)