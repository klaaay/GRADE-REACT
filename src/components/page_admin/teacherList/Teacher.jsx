import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table, Icon } from 'antd';

import './Teacher.less'

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

class Teacher extends Component {
  render() {
    const { teacherList } = this.props
    data = [];
    for (let i = 0; i < teacherList.toJS().length; i++) {
      data.push({
        key: i,
        userName: teacherList.toJS()[i].userName,
        password: teacherList.toJS()[i].password,
        name:teacherList.toJS()[i].name,
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
  teacherList: state.getIn(['admin', 'teacherList'])
})

export default connect(mapStateToProps)(Teacher)
