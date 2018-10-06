import React, { Component } from 'react'

import { Tabs, Table, Input, Button, message } from 'antd';
import $ from 'jquery'

import axios from 'axios'

import {
  data_instructional_design,
  data_multimedia,
  data_speech,
  data_class,
  values,
  calTotalValue
} from './evaluateStand.js'

import './Evaluate.less'

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

const columns = [{
  title: '评价内容',
  dataIndex: 'eval_content',
  key: 'eval_content',
  render: text => <a>{text}</a>,
}, {
  title: '评价标准',
  dataIndex: 'eval_stand',
  key: 'eval_stand',
}, {
  title: '分值(总)',
  dataIndex: 'value_total',
  key: 'value_total',
}, {
  title: '评分',
  key: 'value',
  dataIndex: 'value',
  render: (text, record) => {
    return <Input placeholder="请打分"
      onChange={(e) => {
        console.log(text)
        console.log(record.key)
        if (e.target.value > record.value_total) {
          message.error('超过总分值,请重新打分')
          e.target.value = ''
        } else {
          values[text][record.key] = parseFloat(e.target.value)
          console.log(values)
        }
        console.log(e.target.value)
      }}
    />
  }
}];

export default class Evaluate extends Component {
  state = {
    instructional_design: [],
    multimedia: [],
    speech: [],
    class: []
  }

  render() {

    return (
      <div className="card-container">
        <Tabs type="card" onChange={callback} className="evaluate_tabs">
          <TabPane tab="教学设计(单项25分)" key="1" className="instructional_design" >
            <Table columns={columns} dataSource={data_instructional_design} className="evaluate_table" bordered={true} pagination={false}
              footer={() => <Button
                style={{ width: '100%' }}
                onClick={(e) => {
                  $($('.evaluate_tabs .ant-tabs-tab')[1]).trigger('click')
                }}
              >下一项</Button>}>
            </Table>
          </TabPane>
          <TabPane tab="多媒体课件制作(单项15分)" key="2" className="multimedia">
            <Table columns={columns} dataSource={data_multimedia} className="evaluate_table" bordered={true} pagination={false}
              footer={() => <Button
                style={{ width: '100%' }}
                onClick={(e) => {
                  $($('.evaluate_tabs .ant-tabs-tab')[2]).trigger('click')
                }}
              >下一项</Button>}>
            </Table>
          </TabPane>
          <TabPane tab="即席讲演(单项15分)" key="3" className="speech">
            <Table columns={columns} dataSource={data_speech} className="evaluate_table" bordered={true} pagination={false}
              footer={() => <Button
                style={{ width: '100%' }}
                onClick={(e) => {
                  $($('.evaluate_tabs .ant-tabs-tab')[3]).trigger('click')
                }}
              >下一项</Button>}>
            </Table>
          </TabPane>
          <TabPane tab="模拟上课·板书(单项45分)" key="4" className="class">
            <Table columns={columns} dataSource={data_class} className="evaluate_table" bordered={true} pagination={false}
              footer={() => <Button
                style={{ width: '100%' }}
                onClick={(e) => {
                  var score = calTotalValue(0, values)
                  console.log(score)
                  if (getQueryString('role') === 'group') {
                    axios.post('/public/evaluate', {
                      score: score,
                      id: getQueryString('id'),
                      role: getQueryString('role'),
                      userId: getQueryString('userId')
                    }).then(res => {
                      console.log(res)
                      message.success(res.data.message)
                    })
                  } else {
                    axios.post('/public/evaluate', {
                      score: score,
                      id: getQueryString('id'),
                      role: getQueryString('role')
                    }).then(res => {
                      console.log(res)
                      message.success(res.data.message)
                    })
                  }
                }}
              >评分</Button>}>
            </Table>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
