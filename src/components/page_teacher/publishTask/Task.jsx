import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Select, DatePicker, Button, Form, Input, InputNumber } from 'antd';
import $ from 'jquery'


import {
  taskClassesChange,
  taskTimeChange,
  proportionChange,
  groupNumberChange,
  startTaskPublish,
} from '../../../actions/teacher'


const { RangePicker } = DatePicker;

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

const dateFormat = 'YYYY-MM-DD';


class Task extends Component {
  render() {
    const { classList } = this.props
    const {
      onTaskClassesChange,
      onTaskTimeChange,
      onStartTaskPublish,
      onTeacherProportionChange,
      onSelfProportionChange,
      onGroupProportionChange,
      onGroupNumberChange }
      = this.props
    const children = [];
    for (let i = 0; i < classList.length; i++) {
      children.push(<Option key={classList[i]}>{classList[i]}</Option>);
    }
    return (
      <Form
        style={{
          maxHeight: '480px',
          overflow: 'auto'
        }}
      >
        <FormItem
          label="班级选择"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
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
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
        >
          <RangePicker
            style={{ width: '100%' }}
            placeholder={['开始时间', '结束时间']}
            format={dateFormat}
            onChange={onTaskTimeChange}
          />
        </FormItem>
        <FormItem
          label="作业标题"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
        >
          <Input
            className="task_title"
            placeholder="请输入作业标题" />
        </FormItem>
        <FormItem
          label="作业内容"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
        >
          <TextArea
            className="task_content"
            style={{ resize: "none" }}
            rows={8} />
        </FormItem>
        <FormItem
          label="作业评分配比"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
        >
          <Form
            layout="inline"
          >
            <FormItem
              label="师评"
            // style={{ width: '25%', marginRight: '0px' }}
            >
              <InputNumber
                defaultValue={50}
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
                onChange={onTeacherProportionChange}
              />
            </FormItem>
            <FormItem
              label="自评"
            // style={{ width: '25%', marginRight: '0px' }}
            >
              <InputNumber
                defaultValue={20}
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
                onChange={onSelfProportionChange}
              />
            </FormItem>
            <FormItem
              label="互评"
            // style={{ width: '25%', marginRight: '0px' }}
            >
              <InputNumber
                defaultValue={30}
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
                onChange={onGroupProportionChange}
              />
            </FormItem>
            <FormItem
              label="小组人数"
            // style={{ width: '25%', marginRight: '0px' }}
            >
              <InputNumber
                min={2}
                max={4}
                defaultValue={3}
                onChange={onGroupNumberChange} />
            </FormItem>
          </Form>
        </FormItem>
        <FormItem
          wrapperCol={{ span: 16, offset: 5 }}
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
  onTeacherProportionChange: (value) => {
    console.log(value)
    return dispatch(proportionChange('teacher', value))
  },
  onSelfProportionChange: (value) => {
    return dispatch(proportionChange('self', value))
  },
  onGroupProportionChange: (value) => {
    return dispatch(proportionChange('group', value))
  },
  onGroupNumberChange: (value) => {
    return dispatch(groupNumberChange(value));
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