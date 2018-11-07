import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'

import { Layout, Menu, Icon, Dropdown, message } from 'antd';
import $ from 'jquery'

import requireAuth from '../requireAuth'

import {
  changeRoute,
  teacherListSearch,
  studentListSearch,
  startGetClassList,
} from '../../actions/admin.js';

import {
  logOut
} from '../../actions/login.js';


const { Header, Sider, Content, Footer } = Layout;

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
    const { onChangeRoute, onTeacherListSearch, onStudentListSearch, onStartGetClassList, onLogOut } = this.props
    return (
      <Layout style={{ height: '100%', overflow: 'hidden' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo">
            <img src="/logo.png" alt="" />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
              <Icon type="smile" />
              <span>学生管理</span>
            </Menu.Item>
            <Menu.Item key="3"
              onClick={(e) => {
                onChangeRoute()
                onStartGetClassList()
                this.changeRouter('class')
              }}
            >
              <Icon type="team" />
              <span>班级管理</span>
            </Menu.Item>
            <Menu.Item key="4"
              onClick={(e) => {
                onChangeRoute()
                this.changeRouter('add')
              }}
            >
              <Icon type="user-add" />
              <span>添加账号</span>
            </Menu.Item>
            <Menu.Item key="5"
              onClick={(e) => {
                this.changeRouter('change')
              }}
            >
              <Icon type="key" />
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
            <div className="hidden"></div>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <a style={{ color: '#1890FF' }}>
                      <Icon type="user" theme="outlined"
                        style={{ color: '#1890FF', marginRight: '8px' }}
                      />个人信息
                    </a>
                  </Menu.Item>
                  <Menu.Item
                    onClick={(e) => {
                      browserHistory.push('/')
                      message.success("登出成功")
                      onLogOut()
                    }}
                  >
                    <a style={{ color: '#1890FF' }}>
                      <Icon type="logout" theme="outlined"
                        style={{ color: '#1890FF', marginRight: '5px' }}
                      />退出登陆
                    </a>
                  </Menu.Item>
                </Menu>
              }
            >
              <a className="ant-dropdown-link" style={{ marginRight: '20px' }}>
                {localStorage.getItem("name")}<Icon type="down" />
              </a>
            </Dropdown>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 520, marginBottom: 0 }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            © 2018 杭州师范大学 版权所有
          </Footer>
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
  },
  onStartGetClassList: e => {
    dispatch(startGetClassList());
  },
  onLogOut: () => {
    dispatch(logOut());
  }
})

export default connect(null, mapDispatchToProps)(requireAuth(PageAdmin))
