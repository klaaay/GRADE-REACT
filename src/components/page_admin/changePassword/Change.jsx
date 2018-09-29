import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Input, Button } from 'antd';
import $ from 'jquery'

import { startChangePassword } from '../../../actions/admin.js'

// import Alter from '../public/Alter.jsx'

const FormItem = Form.Item;

class Change extends Component {
  render() {
    const { onStartChangePassword } = this.props
    // const { status,message } = this.props
    return (
      <Form>
        <FormItem
          label="原密码"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <Input
            className="change_old_pass"
          />
        </FormItem>
        <FormItem
          label="新密码"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <Input
            className="change_new_pass"
          />
        </FormItem>
        <FormItem
          label="重复密码"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <Input
            className="change_re_new_pass"
          />
        </FormItem>
        <FormItem
          wrapperCol={{ span: 8, offset: 8 }}
        >
          <Button
            type="primary"
            block
            onClick={onStartChangePassword}
          >修改</Button>
        </FormItem>
        {/* <FormItem
          wrapperCol={{ span: 8, offset: 8 }}
        >
          <Alter
            status={status}
            message={message}
          />
        </FormItem> */}
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  status: state.getIn(['admin', 'status']),
  message: state.getIn(['admin', 'message'])
})

const mapDispatchToProps = (dispatch) => ({
  onStartChangePassword: e => {
    var oldPass = $('.change_old_pass').val();
    var newPass = $('.change_new_pass').val();
    var reNewPass = $('.change_re_new_pass').val();
    return dispatch(startChangePassword(oldPass, newPass, reNewPass))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Change);
