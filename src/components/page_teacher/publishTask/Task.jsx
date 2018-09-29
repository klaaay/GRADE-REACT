import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Select, DatePicker, Button, Form, Input } from 'antd';
import $ from 'jquery'


import {
  taskClassesChange,
  taskTimeChange,
  startTaskPublish
} from '../../../actions/teacher'


const { RangePicker } = DatePicker;

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

const dateFormat = 'YYYY-MM-DD';


class Task extends Component {
  render() {
    const { classList } = this.props
    const { onTaskClassesChange, onTaskTimeChange, onStartTaskPublish } = this.props
    console.log(classList)
    const children = [];
    for (let i = 0; i < classList.length; i++) {
      children.push(<Option key={classList[i]}>{classList[i]}</Option>);
    }
    return (
      <Form>
        <FormItem
          label="班级选择"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请选择班级"
            defaultValue={[]}
            onChange={onTaskClassesChange}
          >
            {children}
          </Select>
        </FormItem>
        <FormItem
          label="作业时间"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <RangePicker
            style={{width:'100%'}}
            placeholder={['开始时间', '结束时间']}
            format={dateFormat}
            onChange={onTaskTimeChange}
          />
        </FormItem>
        <FormItem
          label="作业标题"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <Input
            className="task_title"
            placeholder="请输入作业标题" />
        </FormItem>
        <FormItem
          label="作业内容"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <TextArea
            className="task_content"
            style={{ resize: "none" }}
            rows={8} />
        </FormItem>
        <FormItem
          wrapperCol={{ span: 8, offset: 8 }}
        >
          <Button
            type="primary"
            block
            onClick={onStartTaskPublish}
          >发布</Button>
        </FormItem>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  classList: state.getIn(['teacher', 'classList']).toJS()
})

const mapDispatchToProps = (dispatch) => ({
  onTaskClassesChange: (value) => {
    console.log(value)
    return dispatch(taskClassesChange(value));
  },
  onTaskTimeChange: (dates, dateStrings) => {
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    return dispatch(taskTimeChange(dateStrings[0], dateStrings[1]));
  },
  onStartTaskPublish: (e) => {
    var title = $('.task_title').val();
    var content = $('.task_content').val();
    console.log(title);
    console.log(content);
    return dispatch(startTaskPublish(title, content));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Task);