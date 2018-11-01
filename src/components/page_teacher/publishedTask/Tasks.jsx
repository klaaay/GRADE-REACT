import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { Table, Divider, Tag, Icon, Row, Col, Button, Modal, Select, DatePicker, Form, Input, InputNumber } from 'antd';

import $ from 'jquery'

import {
  taskClassesChange,
  taskTimeChange,
  proportionChange,
  groupNumberChange,
  startTaskPublish,
} from '../../../actions/teacher'

import './Task.less'

import {
  startDeleteTask
} from '../../../actions/teacher'

const { RangePicker } = DatePicker;

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

const dateFormat = 'YYYY-MM-DD';

const { Column } = Table;

class Tasks extends Component {

  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

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

    const { publishedTasks } = this.props
    const { onStartDeleteTask } = this.props
    return (
      <div>
        <Row>
          <Col span={4} push={20}>
            <Button
              type="primary"
              icon="snippets"
              onClick={this.showModal}
            >发布作业</Button>
          </Col>
        </Row>
        <Divider />
        <Table
          bordered={true}
          dataSource={publishedTasks}>
          <Column
            title="作业标题"
            dataIndex="title"
            key="title"
          />
          <Column
            title="发布时间"
            dataIndex="publishTime"
            key="publishTime"
          />
          <Column
            title="接受班级"
            dataIndex="classes"
            key="classes"
            render={tags => (
              <span>
                {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
              </span>
            )}
          />
          <Column
            title="未完成人数"
            dataIndex="DontDoneNumber"
            key="DontDoneNumber"
            render={text => (text)}
          />
          <Column
            title="完成人数"
            dataIndex="DoneNumber"
            key="DoneNumber"
            render={text => (text)}
          />
          <Column
            title={<sapn><span>详情</span><Divider type="vertical" /><span>删除</span></sapn>}
            key="action"
            render={(text, record) => (
              <span>
                <Icon
                  type="profile"
                  theme="outlined"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    browserHistory.push({
                      pathname: '/teacher/details',
                      query: {
                        id: record.key
                      }
                    })
                  }}
                />
                <Divider type="vertical" />
                <Icon
                  type="delete"
                  theme="outlined"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    onStartDeleteTask(record.key)
                  }}
                />
              </span>
            )}
          />
        </Table>
        <Modal
          title="布置作业"
          visible={this.state.visible}
          onOk={() => {
            this.handleOk()
            onStartTaskPublish()
            // $('.homework_manage').trigger('click')
          }}
          onCancel={this.handleCancel}
          width={800}
        >
          <Form
            id="publish_task"
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
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <Row>
                <Col span={6}>
                  <span>师评:</span>
                  <InputNumber
                    defaultValue={50}
                    min={0}
                    max={100}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    onChange={onTeacherProportionChange}
                  />
                </Col>
                <Col span={6}>
                  <span>自评:</span>
                  <InputNumber
                    defaultValue={20}
                    min={0}
                    max={100}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    onChange={onSelfProportionChange}
                  />
                </Col>
                <Col span={6}>
                  <span>互评:</span>
                  <InputNumber
                    defaultValue={30}
                    min={0}
                    max={100}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    onChange={onGroupProportionChange}
                  />
                </Col >
                <Col span={6}>
                  <span>小组人数:</span>
                  <InputNumber
                    min={2}
                    max={4}
                    defaultValue={3}
                    onChange={onGroupNumberChange} />
                </Col>
              </Row>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  publishedTasks: state.getIn(['teacher', 'publishedTasks']).toJS(),
  classList: state.getIn(['teacher', 'classList']).toJS()
})

const mapDispatchToProps = (dispatch) => ({
  onStartDeleteTask: (selectId) => {
    return dispatch(startDeleteTask(selectId))
  },
  onTaskClassesChange: (value) => {
    return dispatch(taskClassesChange(value));
  },
  onTaskTimeChange: (dates, dateStrings) => {
    return dispatch(taskTimeChange(dateStrings[0], dateStrings[1]));
  },
  onTeacherProportionChange: (value) => {
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
    return dispatch(startTaskPublish(title, content));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)