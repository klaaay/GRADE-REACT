import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { Select, Button, List, Icon, Modal, Input } from 'antd';
import $ from 'jquery'

import {
  startAddRole,
  startGetNowClassInfo
} from '../../../actions/admin.js'


import './Class.less'

const Option = Select.Option;

const ModelInfo = {
  class: {
    title: '添加班级',
    addonBefore: '班级名称'
  },
  teacher: {
    title: '添加老师',
    addonBefore: '老师名称'
  },
  student: {
    title: '添加学生',
    addonBefore: '学生名称'
  }
}

class Class extends Component {

  state = {
    modalVisible: false,
    role: 'class'
  }

  setModalVisible(isVisble) {
    this.setState({
      modalVisible:isVisble
    })
  }

  changeAddRouter = (router) => {
    browserHistory.push('/admin/' + router)
  }

  render() {
    const { nowClass, classes, nowClassTeacherList, nowClassStudentList } = this.props
    const { onStartAddRole, onStartGetNowClassInfo, } = this.props
    return (
      <div id="">
        <div className="class-selection">
          <Select defaultValue={nowClass} style={{ width: 250, marginRight: 10 }}
            onChange={onStartGetNowClassInfo}>
            <Option
              value=""></Option>
            {
              classes.map((item, index) => (
                <Option
                  key={index}
                  value={item}>{item}</Option>
              ))
            }
          </Select>
          <Button
            onClick={
              (e) => {
                this.setState({
                  role: 'class'
                }, () => {
                  $('.add_role').val('')
                  this.setModalVisible(true)
                })
              }
            }
          >添加班级</Button>
        </div>
        <div className="class-manage">
          <List
            className="manage-teacher"
            size="small"
            header={<div><b>任课教师</b></div>}
            footer={<Button onClick={() => {
              this.setState({
                role: 'teacher'
              }, () => {
                $('.add_role').val('')
                this.setModalVisible(true)
              })
            }}>添加教师</Button>}
            bordered
            dataSource={nowClassTeacherList}
            renderItem={item => {
              return (<List.Item>{item}<div className="hidden"></div>
                <Icon type="minus-square" theme="twoTone"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {

                  }}
                /></List.Item>)
            }}
          />
          <List
            className="manage-student"
            size="small"
            header={<div><b>班级学生</b></div>}
            footer={<Button onClick={() => {
              this.setState({
                role: 'student'
              }, () => {
                $('.add_role').val('')
                this.setModalVisible(true)
              })
            }}>添加学生</Button>}
            bordered
            dataSource={nowClassStudentList}
            renderItem={item => (<List.Item>{item}<div className="hidden"></div><Icon type="minus-square" theme="twoTone" /></List.Item>)}
          />
        </div>
        <Modal
          title={ModelInfo[this.state.role].title}
          centered
          visible={this.state.modalVisible}
          onOk={() => {
            if ($('.add_role').val()) {
              onStartAddRole(this.state.role)
            }
            this.setModalVisible(false)
          }}
          onCancel={() => this.setModalVisible(false)}
        >
          <Input
            className="add_role"
            addonBefore={ModelInfo[this.state.role].addonBefore} />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  nowClass: state.getIn(['admin', 'nowClass']),
  classes: state.getIn(['admin', 'classes']),
  nowClassTeacherList: state.getIn(['admin', 'nowClassTeacherList']),
  nowClassStudentList: state.getIn(['admin', 'nowClassStudentList'])
})

const mapDispatchToProps = (dispatch) => ({
  onStartAddRole: (role) => {
    var addName = $('.add_role').val();
    return dispatch(startAddRole(role, addName))
  },
  onStartGetNowClassInfo: (value) => {
    return dispatch(startGetNowClassInfo(value));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Class);
