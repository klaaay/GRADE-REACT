import React from 'react';
import { connect } from 'react-redux'

import { Form, Icon, Input, Button, Layout } from 'antd';

import Alter from './Alter.jsx'

import {
  validateUser,
  changeUserName,
  changePassword
} from '../../actions/login'

import './login.less'

const { Header, Footer, Content } = Layout;

const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { onUserNameChange, onPasswordChange, onHandleSubmit, status, message, userName, password } = this.props
    return (
        <Layout style={{minHeight:600}}>
          <Header>Header</Header>
          <Content style={{background:'white'}} >
            <div id='login-form'>
              <Alter
                userName={userName}
                password={password}
                status={status}
                message={message}
              />
              <h1>作业评分系统</h1>
              <div className='login-form-inner'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
                        onChange={onUserNameChange}
                      />
                  </FormItem>
                  <FormItem>
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                        onChange={onPasswordChange}
                      />
                  </FormItem>
                  <FormItem>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      onClick={onHandleSubmit}
                    >
                      登 陆
                  </Button>
                  </FormItem>
                </Form>
              </div>
            </div>
          </Content>
          <Footer style={{background:'white'}}>
            <span
            style={{
              position: 'relative',
              left: '42%',
              color:'#ccc'}}
            > © 2018 杭州师范大学 版权所有</span>
        </Footer>
        </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.getIn(['login', 'userName']),
  password: state.getIn(['login', 'password']),
  status: state.getIn(['login', 'status']),
  message: state.getIn(['login', 'message'])
})

const mapDispatchToProps = (dispatch) => ({
  onUserNameChange: event => (
    dispatch(changeUserName(event.target.value))
  ),
  onPasswordChange: event => (
    dispatch(changePassword(event.target.value))
  ),
  onHandleSubmit: event => {
    event.preventDefault()
    return dispatch(validateUser())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
