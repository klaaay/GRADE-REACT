import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'

import { Layout, Menu, Icon } from 'antd';
import $ from 'jquery'

import { changeRoute, teacherListSearch, studentListSearch } from '../../actions/admin.js'

import './PageAdmin.less'

const { Header, Sider, Content } = Layout;

class PageAdmin extends Component {
  state = {
    collapsed: false,
    openKeys: ['sub1'],
  };

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  changeRouter = (router) => {
    browserHistory.push('/admin/' + router)
  }

  componentDidMount = () => {
    $('.teacher_route').trigger('click');
  }

  render() {
    const { onChangeRoute, onTeacherListSearch, onStudentListSearch } = this.props
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
              className="teacher_route"
              onClick={(e) => {
                onChangeRoute()
                onTeacherListSearch()
                this.changeRouter('teacher')
              }}
            >
              <Icon type="user" />
              <span>教师管理</span>
            </Menu.Item>
            <Menu.Item key="2"
              onClick={(e) => {
                onChangeRoute()
                onStudentListSearch()
                this.changeRouter('student')
              }}
            >
              <Icon type="video-camera" />
              <span>学生管理</span>
            </Menu.Item>
            <Menu.Item key="3"
              onClick={(e) => {
                onChangeRoute()
                this.changeRouter('add')
              }}
            >
              <Icon type="video-camera" />
              <span>添加账号</span>
            </Menu.Item>
            <Menu.Item key="4"
              onClick={(e) => {
                this.changeRouter('change')
              }}
            >
              <Icon type="video-camera" />
              <span>密码修改</span>
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
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onChangeRoute: (e) => {
    dispatch(changeRoute())
  },
  onTeacherListSearch: (e) => {
    dispatch(teacherListSearch())
  },
  onStudentListSearch: (e) => {
    dispatch(studentListSearch())
  }
})

export default connect(null, mapDispatchToProps)(PageAdmin)
