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

class Class extends Component {

  state = {
    modalClassVisible: false,
    modalTeacherVisible: false,
    modalStudentVisible: false
  }

  setModalClassVisible(modalClassVisible) {
    this.setState({ modalClassVisible });
  }
  setModalTeacherVisible(modalTeacherVisible) {
    this.setState({ modalTeacherVisible });
  }
  setModalStudentVisible(modalStudentVisible) {
    this.setState({ modalStudentVisible });
  }


  changeAddRouter = (router) => {
    browserHistory.push('/admin/' + router)
  }

  render() {
    const { nowClass, classes, nowClassTeacherList, nowClassStudentList } = this.props
    const { onStartAddClass, onStartAddTeacher, onStartAddStudent, onStartGetNowClassInfo, } = this.props
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
                this.setModalClassVisible(true)
              }
            }
          >添加班级</Button>
        </div>
        <div className="class-manage">
          <List
            className="manage-teacher"
            size="small"
            header={<div><b>任课教师</b></div>}
            footer={<Button onClick={() => this.setModalTeacherVisible(true)}>添加教师</Button>}
            bordered
            dataSource={nowClassTeacherList}
            renderItem={item => {
              console.log(item)
              return (<List.Item>{item}<div className="hidden"></div> 
              <Icon type="minus-square" theme="twoTone" 
              style={{cursor:'pointer'}}
              onClick={(e)=>{
                
              }}
              /></List.Item>)
            }}
          />
          <List
            className="manage-student"
            size="small"
            header={<div><b>班级学生</b></div>}
            footer={<Button onClick={() => this.setModalStudentVisible(true)}>添加学生</Button>}
            bordered
            dataSource={nowClassStudentList}
            renderItem={item => (<List.Item>{item}<div className="hidden"></div><Icon type="minus-square" theme="twoTone" /></List.Item>)}
          />
        </div>
        <Modal
          title="添加班级"
          centered
          visible={this.state.modalClassVisible}
          onOk={() => {
            onStartAddClass()
            // refreshClassList()
            this.setModalClassVisible(false)
          }}
          onCancel={() => this.setModalClassVisible(false)}
        >
          <Input
            className="add_class"
            addonBefore="班级名称"
            placeholder="" />

        </Modal>
        <Modal
          title="添加老师"
          centered
          visible={this.state.modalTeacherVisible}
          onOk={() => {
            onStartAddTeacher()
            // refreshClassInfo(nowClass)
            this.setModalTeacherVisible(false)
          }}
          onCancel={() => this.setModalTeacherVisible(false)}
        >
          <Input
            className="add_teacher"
            addonBefore="老师姓名"
            placeholder="" />
        </Modal>
        <Modal
          title="添加学生"
          centered
          visible={this.state.modalStudentVisible}
          onOk={() => {
            onStartAddStudent()
            // refreshClassInfo(nowClass)
            this.setModalStudentVisible(false)
          }}
          onCancel={() => this.setModalStudentVisible(false)}
        >
          <Input
            className="add_student"
            addonBefore="学生姓名"
            placeholder="" />
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
  onStartAddClass: e => {
    var addRole = 'class';
    var addName = $('.add_class').val();
    console.log(addName);
    return dispatch(startAddRole(addRole, addName))
  },
  onStartAddTeacher: e => {
    var addRole = 'teacher';
    var addName = $('.add_teacher').val();
    return dispatch(startAddRole(addRole, addName))
  },
  onStartAddStudent: e => {
    var addRole = 'student';
    var addName = $('.add_student').val();
    return dispatch(startAddRole(addRole, addName))
  },
  onStartGetNowClassInfo: (value) => {
    console.log(`selected ${value}`);
    return dispatch(startGetNowClassInfo(value));
  },
  // refreshClassList: () => {
  //   return dispatch(startGetClassList());
  // },
  // refreshClassInfo:(className)=>{
  //   return dispatch(startGetNowClassInfo(className));
  // }
})

export default connect(mapStateToProps, mapDispatchToProps)(Class);
