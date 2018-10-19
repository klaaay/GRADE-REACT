import React, { Component } from 'react'

import { Tabs, Table, Input, Button, message } from 'antd';
import $ from 'jquery'

import axios from 'axios'

import './Evaluate.less'

const TabPane = Tabs.TabPane;

let valuesTemp = {

}

const calTotalValue = (total_init, values) => {
  let keys = Object.keys(values);
  let total = total_init;
  keys.forEach((item, index) => {
    total += values[item].reduce((a, b) => (a + b), 0)
  })
  return total;
}

function fillInitialValue(GradeDetail) {
  for (let i = 0; i < GradeDetail['instructional'].length; i++) {
    if (GradeDetail['instructional'][i]) {
      $($('.eval_detail_box')[i]).val(GradeDetail['instructional'][i])
    }
  }
}

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

function find_if_saved(groupGradeDetail) {
  if (groupGradeDetail) {
    var flag = 0;
    var details = {};
    groupGradeDetail.forEach(item => {
      if (item.userId.toString() === getQueryString('userId').toString()) {
        flag++;
        details = item.details;
      }
    })
    if (flag) {
      return details;
    } else {
      return false;
    }
  } else {
    return false;
  }
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
    return <Input
      className="eval_detail_box"
      placeholder="请打分"
      defaultValue={valuesTemp[record.value][record.key]}
      onChange={(e) => {
        if (e.target.value > record.value_total) {
          message.error('超过总分值,请重新打分')
          e.target.value = ''
        } else {
          valuesTemp[text][record.key] = parseFloat(e.target.value)
        }
      }}
    />
  }
}];

export default class Evaluate extends Component {
  state = {
    data_instructional_design: [],
    data_multimedia: [],
    data_speech: [],
    data_class: [],
    committed: false,
  }

  componentWillMount = () => {
    axios.post('/public/evaluateStandInitial')
      .then(res => {
        console.log(res.data)
        const { evalStand } = res.data;
        valuesTemp = evalStand.initial_values
        this.setState({
          data_instructional_design: evalStand.data_instructional_design,
          data_multimedia: evalStand.data_multimedia,
          data_speech: evalStand.data_speech,
          data_class: evalStand.data_class,
        })
        axios.post('/public/evaluateInitial', {
          id: getQueryString('id'),
          role: getQueryString('role'),
          userId: getQueryString('userId')
        })
          .then(res => {
            let { role } = res.data;
            if (role === 'teacher') {
              let { teacherGradeDetail, teacherGradeDone } = res.data.data;
              this.setState({
                committed: teacherGradeDone
              })
              console.log(teacherGradeDetail)
              if (teacherGradeDetail) {
                valuesTemp = teacherGradeDetail;
                fillInitialValue(teacherGradeDetail);
              }
            }
            else if (role === 'self') {
              let { selfGradeDetail, selfGradeDone } = res.data.data;
              this.setState({
                committed: selfGradeDone
              })
              if (selfGradeDetail) {
                valuesTemp = selfGradeDetail;
                fillInitialValue(selfGradeDetail);
              }
            }
            else if (role === 'group') {
              let { groupGradeDetail } = res.data.data;
              var result = find_if_saved(groupGradeDetail)
              if (result) {
                valuesTemp = result;
                fillInitialValue(result);
              }
            }
          })
      })
  }

  componentDidMount = () => {

  }


  render() {
    const display = this.state.committed ? 'none' : 'inline-block'
    return (
      <div className="card-container">
        <Tabs type="card" onChange={callback} className="evaluate_tabs">
          <TabPane tab="教学设计(单项25分)" key="instructional" id="instructional" >
            <Table columns={columns} dataSource={this.state.data_instructional_design} className="evaluate_table" bordered={true} pagination={false}
              footer={() =>
                <div>
                  <Button
                    style={{
                      width: '45%',
                      marginRight: '20px',
                      display: display
                    }}
                    onClick={() => {
                      axios.post('/public/evaluateSave', {
                        details: valuesTemp,
                        id: getQueryString('id'),
                        role: getQueryString('role'),
                        userId: getQueryString('userId')
                      })
                        .then(res => {
                          message.success(res.data.message)
                        })
                    }}
                  >保存</Button>
                  <Button
                    style={{
                      width: '45%',
                      marginLeft: '20px'
                    }}
                    onClick={(e) => {
                      $($('.evaluate_tabs .ant-tabs-tab')[1]).trigger('click')
                    }}
                  >下一项</Button>
                </div>
              }>
            </Table>
          </TabPane>
          <TabPane tab="多媒体课件制作(单项15分)" key="multimedia" id="multimedia">
            <Table columns={columns} dataSource={this.state.data_multimedia} className="evaluate_table" bordered={true} pagination={false}
              footer={() =>
                <div>
                  <Button
                    style={{
                      width: '45%',
                      marginRight: '20px',
                      display: display
                    }}
                    onClick={() => {
                      axios.post('/public/evaluateSave', {
                        details: valuesTemp,
                        id: getQueryString('id'),
                        role: getQueryString('role'),
                        userId: getQueryString('userId')
                      })
                        .then(res => {
                          message.success(res.data.message)
                        })
                    }}
                  >保存</Button>
                  <Button
                    style={{
                      width: '45%',
                      marginLeft: '20px'
                    }}
                    onClick={(e) => {
                      $($('.evaluate_tabs .ant-tabs-tab')[2]).trigger('click')
                    }}
                  >下一项</Button>
                </div>
              }>
            </Table>
          </TabPane>
          <TabPane tab="即席讲演(单项15分)" key="speech" id="speech">
            <Table columns={columns} dataSource={this.state.data_speech} className="evaluate_table" bordered={true} pagination={false}
              footer={() =>
                <div>
                  <Button
                    style={{
                      width: '45%',
                      marginRight: '20px',
                      display: display
                    }}
                    onClick={() => {
                      axios.post('/public/evaluateSave', {
                        details: valuesTemp,
                        id: getQueryString('id'),
                        role: getQueryString('role'),
                        userId: getQueryString('userId')
                      })
                        .then(res => {
                          message.success(res.data.message)
                        })
                    }}
                  >保存</Button>
                  <Button
                    style={{
                      width: '45%',
                      marginLeft: '20px'
                    }}
                    onClick={(e) => {
                      $($('.evaluate_tabs .ant-tabs-tab')[3]).trigger('click')
                    }}
                  >下一项</Button>
                </div>
              }>
            </Table>
          </TabPane>
          <TabPane tab="模拟上课·板书(单项45分)" key="class" id="class">
            <Table columns={columns} dataSource={this.state.data_class} className="evaluate_table" bordered={true} pagination={false}
              footer={() =>
                <div>
                  <Button
                    style={{
                      width: '45%',
                      marginRight: '20px',
                      display: display
                    }}
                    onClick={() => {
                      axios.post('/public/evaluateSave', {
                        details: valuesTemp,
                        id: getQueryString('id'),
                        role: getQueryString('role'),
                        userId: getQueryString('userId')
                      })
                        .then(res => {
                          message.success(res.data.message)
                        })
                    }}
                  >保存</Button>
                  <Button
                    style={{
                      width: '45%',
                      marginLeft: '20px',
                      display: display
                    }}
                    onClick={(e) => {
                      var score = calTotalValue(0, valuesTemp)
                      if (getQueryString('role') === 'group') {
                        axios.post('/public/evaluate', {
                          score: score,
                          id: getQueryString('id'),
                          role: getQueryString('role'),
                          userId: getQueryString('userId')
                        }).then(res => {
                          this.setState({
                            committed: true
                          })
                          message.success(res.data.message)
                        })
                      } else {
                        axios.post('/public/evaluate', {
                          details: valuesTemp,
                          score: score,
                          id: getQueryString('id'),
                          role: getQueryString('role')
                        }).then(res => {
                          this.setState({
                            committed: true
                          })
                          message.success(res.data.message);
                        })
                      }
                    }}
                  >评分</Button>
                </div>
              }>
            </Table>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
