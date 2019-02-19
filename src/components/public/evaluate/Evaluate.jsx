import React, { Component } from "react";
import { browserHistory } from "react-router";

import { Tabs, Table, Input, Button, message, Row, Col, Divider } from "antd";
import $ from "jquery";

import axios from "axios";

import "./Evaluate.less";

const TabPane = Tabs.TabPane;

let valuesTemp = {};

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

export default class Evaluate extends Component {
  state = {
    evalStand: {},
    values: {},
    evalStandKeys: [],
    committed: false,
    defalutM: ""
  };

  calTotalValue = (total_init, values) => {
    let keys = Object.keys(values);
    let total = total_init;
    keys.forEach((item, index) => {
      total += parseFloat(values[item].reduce((a, b) => a + b, 0));
    });
    return total;
  };

  fillInitialValue(GradeDetail) {
    for (let i = 0; i < GradeDetail[this.state.defalutM].length; i++) {
      if (GradeDetail[this.state.defalutM][i]) {
        $($(".eval_detail_box")[i]).val(GradeDetail[this.state.defalutM][i]);
      }
    }
  }

  callback(key) {}

  find_if_saved(groupGradeDetail) {
    if (groupGradeDetail) {
      var flag = 0;
      var details = {};
      groupGradeDetail.forEach(item => {
        if (item.userId.toString() === getQueryString("userId").toString()) {
          flag++;
          details = item.details;
        }
      });
      if (flag) {
        return details;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  columns = [
    {
      title: "评价内容",
      dataIndex: "eval_content",
      key: "eval_content",
      render: text => <a>{text}</a>
    },
    {
      title: "评价标准",
      dataIndex: "eval_stand",
      key: "eval_stand"
    },
    {
      title: "分值(总)",
      dataIndex: "value_total",
      key: "value_total"
    },
    {
      title: "评分",
      key: "value",
      dataIndex: "value",
      render: (text, record) => {
        return (
          <Input
            className="eval_detail_box"
            placeholder="请打分"
            defaultValue={valuesTemp[text][record.index]}
            onChange={e => {
              if (e.target.value > record.value_total) {
                message.error("超过总分值,请重新打分");
                e.target.value = "";
              } else {
                valuesTemp[text][record.index] = parseFloat(e.target.value);
              }
            }}
          />
        );
      }
    }
  ];

  componentWillMount = () => {
    axios
      .post("http://119.23.201.7:5001/public/evaluateStandInitial", {
        publisher: getQueryString("publisher")
      })
      .then(res => {
        const { evalStand, initial_values } = res.data;
        valuesTemp = initial_values;
        this.setState({
          evalStand: evalStand,
          values: valuesTemp,
          evalStandKeys: Object.keys(evalStand).filter(
            item => item !== "_id" && item !== "__v"
          ),
          defalutM: Object.keys(evalStand).filter(
            item => item !== "_id" && item !== "__v"
          )[0]
        });
        axios
          .post("http://119.23.201.7:5001/public/evaluateInitial", {
            id: getQueryString("id"),
            role: getQueryString("role"),
            userId: getQueryString("userId")
          })
          .then(res => {
            let { role } = res.data;
            if (role === "teacher") {
              let { teacherGradeDetail, teacherGradeDone } = res.data.data;
              this.setState({
                committed: teacherGradeDone
              });
              if (teacherGradeDetail) {
                valuesTemp = teacherGradeDetail;
                this.fillInitialValue(teacherGradeDetail);
              }
            } else if (role === "self") {
              let { selfGradeDetail, selfGradeDone } = res.data.data;
              this.setState({
                committed: selfGradeDone
              });
              if (selfGradeDetail) {
                valuesTemp = selfGradeDetail;
                this.setState({
                  values: valuesTemp
                });
                this.fillInitialValue(selfGradeDetail);
              }
            } else if (role === "group") {
              let { groupGradeDetail } = res.data.data;
              var result = this.find_if_saved(groupGradeDetail);
              if (result) {
                valuesTemp = result;
                this.fillInitialValue(result);
              }
            }
          });
      });
  };

  componentDidMount = () => {};

  render() {
    const display = this.state.committed ? "none" : "inline-block";
    return (
      <div className="card-container">
        <Row>
          <Col span={12}>
            <span
              style={{
                marginRight: "20px",
                marginLeft: "10px",
                fontWeight: "bold"
              }}
            >
              当前评价状态:
            </span>
            {this.state.committed ? (
              <Button type="primary">已评价</Button>
            ) : (
              <Button type="danger">未评价</Button>
            )}
          </Col>
          <Col span={5}>
            <Button
              style={{
                width: "80%",
                marginRight: "20px",
                display: display
              }}
              onClick={() => {
                axios
                  .post("http://119.23.201.7:5001/public/evaluateSave", {
                    details: valuesTemp,
                    id: getQueryString("id"),
                    role: getQueryString("role"),
                    userId: getQueryString("userId")
                  })
                  .then(res => {
                    message.success(res.data.message);
                  });
              }}
            >
              保存
            </Button>
          </Col>
          <Col span={5}>
            <Button
              style={{
                width: "80%",
                marginLeft: "20px",
                display: display
              }}
              onClick={e => {
                var score = this.calTotalValue(0, valuesTemp);
                if (getQueryString("role") === "group") {
                  axios
                    .post("http://119.23.201.7:5001/public/evaluate", {
                      score: score,
                      id: getQueryString("id"),
                      role: getQueryString("role"),
                      userId: getQueryString("userId")
                    })
                    .then(res => {
                      this.setState({
                        committed: true
                      });
                      message.success(res.data.message);
                    });
                } else {
                  axios
                    .post("http://119.23.201.7:5001/public/evaluate", {
                      details: valuesTemp,
                      score: score,
                      id: getQueryString("id"),
                      role: getQueryString("role")
                    })
                    .then(res => {
                      this.setState({
                        committed: true
                      });
                      message.success(res.data.message);
                    });
                }
              }}
            >
              评分
            </Button>
          </Col>
          {getQueryString("role") === "teacher" ? (
            <Col span={2}>
              <Button
                type="primary"
                onClick={e => {
                  browserHistory.push({
                    pathname: "/teacher/details",
                    query: {
                      id: getQueryString("taskId")
                    }
                  });
                }}
              >
                返回
              </Button>
            </Col>
          ) : null}
        </Row>
        <Divider />
        <Tabs type="card" onChange={this.callback} className="evaluate_tabs">
          {this.state.evalStandKeys.map((item, index) => {
            return (
              <TabPane tab={item} key={item} id={item}>
                <Table
                  columns={this.columns}
                  dataSource={this.state.evalStand[item]}
                  className="evaluate_table"
                  bordered={true}
                  pagination={false}
                />
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    );
  }
}
