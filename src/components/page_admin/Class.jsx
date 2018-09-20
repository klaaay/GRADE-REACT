import React, { Component } from 'react'

import { Select, Button, List, Icon } from 'antd';

import './Class.less'

const Option = Select.Option;

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class Class extends Component {
  render() {
    return (
      <div id="">
        <div className="class-selection">
          <Select defaultValue="lucy" style={{ width: 250, marginRight: 10 }} onChange={handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Button>添加班级</Button>
        </div>
        <div className="class-manage">
          <List
            className="manage-teacher"
            size="small"
            header={<div><b>任课教师</b></div>}
            footer={<Button>添加教师</Button>}
            bordered
            dataSource={data}
            renderItem={item => (<List.Item>{item}<div className="hidden"></div> <Icon type="minus-square" theme="twoTone" /></List.Item>)}
          />
          <List
            className="manage-student"
            size="small"
            header={<div><b>班级学生</b></div>}
            footer={<Button>添加学生</Button>}
            bordered
            dataSource={data}
            renderItem={item => (<List.Item>{item}<div className="hidden"></div><Icon type="minus-square" theme="twoTone" /></List.Item>)}
          />
        </div>
        <div className="add">
          add
        </div>
      </div>
    )
  }
}
