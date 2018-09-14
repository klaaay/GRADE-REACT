import React from 'react';
import { connect } from 'react-redux'

import { Form, Icon, Input, Button } from 'antd';

import Alter from './Alter.jsx'

import {
  validateUser,
  changeUserName,
  changePassword
} from '../../actions/login'

import './login.less'

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
    const { getFieldDecorator } = this.props.form;
    const { onUserNameChange, onPasswordChange, onHandleSubmit, status, message, userName, password } = this.props
    return (
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
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                  onChange={onUserNameChange}
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                  onChange={onPasswordChange}
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={onHandleSubmit}
              >
                Log in
          </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

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

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
