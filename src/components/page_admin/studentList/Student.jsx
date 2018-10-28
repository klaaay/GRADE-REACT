import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table, Icon } from 'antd';

const columns = [{
  title: '用户名',
  dataIndex: 'userName',
}, {
  title: '密码',
  dataIndex: 'password',
}, {
  title: '修改',
  dataIndex: 'modify',
}, {
  title: '删除',
  dataIndex: 'delete',
}
];

let data = [];

class Student extends Component {
  render() {
    const { studentList } = this.props
    data = [];
    for (let i = 0; i < studentList.toJS().length; i++) {
      data.push({
        key: i,
        userName: studentList.toJS()[i].userName,
        password: studentList.toJS()[i].password,
        modify: <Icon
          type="edit"
          theme="outlined"
          onClick={(e) => {
          }}
        />,
        delete: <Icon
          type="delete"
          theme="outlined"
          onClick={(e) => {
          }}
        />
      });
    }
    return (
      <Table columns={columns} dataSource={data} bordered={true}/>
    );
  }
}

const mapStateToProps = (state) => ({
  studentList: state.getIn(['admin', 'studentList'])
})

export default connect(mapStateToProps)(Student)