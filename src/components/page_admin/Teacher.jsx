import React, { Component } from 'react'

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

const data = [];

for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    userName: `Edward King ${i}`,
    password: 32,
    modify: <Icon
      type="edit"
      theme="outlined"
      onClick={(e) => {
        console.log(e.target.parentNode.parentNode.parentNode)
      }}
    />,
    delete: <Icon
      type="delete"
      theme="outlined"
      onClick={(e) => {
        console.log(e.target.parentNode.parentNode.parentNode)
      }}
    />
  });
}

export default class Teacher extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };

  onSelectChange = (selectedRowKeys) => {
    console.log(data[0]);
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(46).keys()], // 0...45
          });
        },
      }, {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection,
    };
    return (
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    );
  }
}
