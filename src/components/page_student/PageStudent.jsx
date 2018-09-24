import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { Layout, Menu, Icon } from 'antd';

import { startGetTasks } from '../../actions/student'

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
    browserHistory.push('/student/task')
  }

  render() {
    const { onStartGetTasks } = this.props
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
              className="homework_route"
              onClick={(e) => {
                onStartGetTasks()
                this.changeRouter('task')
              }}
            >
              <Icon type="user" />
              <span>我的作业</span>
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

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  onStartGetTasks: (e) => {
    return dispatch(startGetTasks())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PageStudent)