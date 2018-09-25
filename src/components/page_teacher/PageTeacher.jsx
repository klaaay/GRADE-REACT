import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { Layout, Menu, Icon } from 'antd';
import $ from 'jquery'

import { classListSearch } from '../../actions/teacher'
import {
  logOut
} from '../../actions/login.js';

const { Header, Sider, Content } = Layout;

class PageTeacher extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  changeRouter = (router) => {
    browserHistory.push('/teacher/' + router)
  }

  componentDidMount = () => {
    $('.homework_publish').trigger('click');
  }

  render() {
    const { onClassListSearch, onLogOut } = this.props
    return (
      <Layout>
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
              className="homework_publish"
              onClick={(e) => {
                onClassListSearch()
                this.changeRouter('task')
              }}
            >
              <Icon type="user" />
              <span>发布作业</span>
            </Menu.Item>
            <Menu.Item key="2"
              className="homework_manage"
              onClick={(e) => {
              }}
            >
              <Icon type="video-camera" />
              <span>作业管理</span>
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
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 520 }}>
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
  onClassListSearch: (e) => {
    dispatch(classListSearch())
  },
  onLogOut: () => {
    dispatch(logOut());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PageTeacher)