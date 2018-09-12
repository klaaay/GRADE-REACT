import React from 'react';
import { connect } from 'react-redux'

import { Form, Icon, Input, Button } from 'antd';

import {
  validateUser,
  changeUserName,
  changePassword
} from '../../actions/login'

import './login.less'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  render() {
    const { onchangeUserName, onPasswordChange, handleSubmit } = this.props
    return (
      <div id='login-form'>
        <h1>作业评分系统</h1>
        <div className='login-form-inner'>
          <Form onSubmit={handleSubmit} className="login-form">
            <FormItem>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
                onChange={onchangeUserName}
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                onChange={onPasswordChange}
              />
            </FormItem>
            <FormItem>
              <Button
                type="primary" htmlType="submit" className="login-form-button">
                Log in
          </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.getIn(['login', 'userName']),
  password: state.getIn(['login', 'password'])
})

const mapDispatchToProps = (dispatch) => ({
  onchangeUserName: event => (
    dispatch(changeUserName(event.target.value))
  ),
  onPasswordChange: event => (
    dispatch(changePassword(event.target.value))
  ),
  handleSubmit: event => {
    event.preventDefault()
    return dispatch(validateUser())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
