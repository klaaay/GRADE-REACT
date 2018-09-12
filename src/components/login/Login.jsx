import React from 'react';

import { Form, Icon, Input, Button } from 'antd';

import './login.less'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

  constructor() {
    super(...arguments)

    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  onUsernameChange = (e) => {
    console.log(e.target.value)
    this.setState({
      username: e.target.value
    })
  }

  onPasswordChange = (e) => {
    console.log(e.target.value)
    this.setState({
      password: e.target.value
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id='login-form'>
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
                  onChange={
                    (e) => {
                      this.onUsernameChange(e);
                    }
                  }
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
                  onChange={
                    (e) => {
                      this.onPasswordChange(e);
                    }
                  }
                />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
          </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(NormalLoginForm);