import React, { Component } from 'react'

import { Tabs, Table, Input, Button, message, Row, Col, Divider, Icon, Modal, Form } from 'antd';

import axios from 'axios'

const { TextArea } = Input;
const FormItem = Form.Item;

let evalStandTemp = {
}

let initialValues = {

}

const TabPane = Tabs.TabPane;

export default class StandSet extends Component {

  state = {
    evalStand: {},
    evalStandKeys: [],
    moduleNow: '',
    addEvalContent: '',
    addEvalStand: '',
    addValueTotal: 0,
    addModuleName: '',
    addModuleValue: 0,
    visibleAddStandDetail: false,
    visibleAddStandM: false
  }

  showModalStandDetail = () => {
    this.setState({
      visibleAddStandDetail: true,
    });
  }

  handleOkStandDetail = (e) => {
    var newRecord = {};
    if (evalStandTemp[this.state.moduleNow].length) {
      var lastRecord = evalStandTemp[this.state.moduleNow][evalStandTemp[this.state.moduleNow].length - 1];
      newRecord.key = lastRecord.key + 1;
      newRecord.index = lastRecord.index + 1;
    } else {
      newRecord.key = 0;
      newRecord.index = 0;
    }
    newRecord.value = this.state.moduleNow;
    newRecord.eval_content = this.state.addEvalContent;
    newRecord.eval_stand = this.state.addEvalStand;
    newRecord.value_total = parseFloat(this.state.addValueTotal);
    evalStandTemp[this.state.moduleNow].push(newRecord);
    initialValues[this.state.moduleNow].push("0");
    this.setState({
      visibleAddStandDetail: false,
      evalStand: evalStandTemp
    });
  }

  handleCancelStandDetail = (e) => {
    this.setState({
      visibleAddStandDetail: false,
    });
  }

  showModalStandM = () => {
    this.setState({
      visibleAddStandM: true,
    });
  }

  handleOkStandM = (e) => {
    var newkey = this.state.addModuleName + '(单项' + this.state.addModuleValue + '分)';
    var EvalStandKeys = this.state.evalStandKeys;
    EvalStandKeys.push(newkey);
    evalStandTemp[newkey] = [];
    initialValues[newkey] = [];
    if (EvalStandKeys.length === 1) {
      this.setState({
        moduleNow: EvalStandKeys[0]
      })
    }
    this.setState({
      visibleAddStandM: false,
      evalStand: evalStandTemp,
      evalStandKeys: EvalStandKeys
    });
  }

  handleCancelStandM = (e) => {
    this.setState({
      visibleAddStandM: false,
    });
  }

  confirm = () => {
    Modal.confirm({
      title: '删除模块',
      content: '你是否确认删除当前模块?',
      okText: '确认',
      cancelText: '取消',
      onCancel: () => {
      },
      onOk: () => {
        delete evalStandTemp[this.state.moduleNow];
        var leftEvalStandKeys = Object.keys(evalStandTemp).filter(item => (item !== '_id' && item !== '__v'));
        delete initialValues[this.state.moduleNow];
        this.setState({
          evalStandKeys: leftEvalStandKeys,
          evalStand: evalStandTemp,
          moduleNow: leftEvalStandKeys[0]
        }, () => {
        })
      },
    });
  }

  columns = [{
    title: '评价内容',
    dataIndex: 'eval_content',
    key: 'eval_content',
    render: (text, record) => {
      return <Input
        defaultValue={text}
        onChange={(e) => {
          evalStandTemp[record.value][record.index]['eval_content'] = e.target.value;
        }}
      />
    }
  }, {
    title: '评价标准',
    dataIndex: 'eval_stand',
    key: 'eval_stand',
    render: (text, record) => {
      return <TextArea
        style={{ resize: 'none' }}
        defaultValue={text}
        onChange={(e) => {
          evalStandTemp[record.value][record.index]['eval_stand'] = e.target.value;
        }}
      />
    }
  }, {
    title: '分值(总)',
    dataIndex: 'value_total',
    key: 'value_total',
    render: (text, record) => {
      return <Input
        defaultValue={text}
        onChange={(e) => {
          evalStandTemp[record.value][record.index]['value_total'] = parseFloat(e.target.value);
        }}
      />
    }
  }, {
    title: '删除',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => {
      return <Icon type="delete" theme="outlined"
        onClick={() => {
          var delIndex = record.index;
          evalStandTemp[this.state.moduleNow].splice(record.index, 1)
          initialValues[this.state.moduleNow].pop(0);
          for (var i = delIndex; i < evalStandTemp[this.state.moduleNow].length; i++) {
            evalStandTemp[this.state.moduleNow][i].index = evalStandTemp[this.state.moduleNow][i].index - 1;
          }
          this.setState({
            evalStand: evalStandTemp
          })
        }}
      />
    }
  }
  ];

  componentWillMount = () => {
    axios.post('http://localhost:5001/public/evaluateStandInitial', {
      publisher: localStorage.getItem('id')
    })
      .then(res => {
        const { evalStand, initial_values } = res.data;
        evalStandTemp = evalStand;
        initialValues = initial_values;
        this.setState({
          evalStand: evalStand,
          evalStandKeys: Object.keys(evalStand).filter(item => (item !== '_id' && item !== '__v')),
          moduleNow: Object.keys(evalStand).filter(item => (item !== '_id' && item !== '__v'))[0]
        })
      })
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
          </Col>
          <Col span={6}>
            <Button
              style={{
                width: '80%',
                marginLeft: '20px',
              }}
              onClick={this.showModalStandM}
            >添加评分模块
            </Button>
          </Col>
          <Col span={6}>
            <Button
              type="primary"
              style={{
                width: '80%',
                marginLeft: '20px',
              }}
              onClick={() => {
                axios.post('http://localhost:5001/teacher/evalStandModify', {
                  owner: localStorage.getItem('id'),
                  evalStand: evalStandTemp,
                  initial_values: initialValues
                }).then(res => {
                  message.success(res.data.message);
                })
              }}
            >保存修改
            </Button>
          </Col>
        </Row>
        <Divider />
        <Tabs onChange={(key) => {
          this.setState({
            moduleNow: key
          })
        }}>
          {
            this.state.evalStandKeys.map((item, index) => {
              return <TabPane tab={item} key={item} id={item} >
                <Table columns={this.columns} dataSource={this.state.evalStand[item]}
                  className="evaluate_table"
                  bordered={true}
                  pagination={false}
                  footer={() =>
                    <div>
                      <Button
                        type="danger"
                        style={{ width: '45%', marginRight: '50px' }}
                        onClick={this.confirm}
                      >删除模块</Button>
                      <Button
                        type="primary"
                        style={{ width: '45%', marginLeft: '5px' }}
                        onClick={this.showModalStandDetail}
                      >添加条目</Button>
                    </div>}
                >
                </Table>
              </TabPane>
            })
          }
        </Tabs>
        <Modal
          title="添加评分细则"
          visible={this.state.visibleAddStandDetail}
          onOk={this.handleOkStandDetail}
          onCancel={this.handleCancelStandDetail}
        >
          <Form>
            <FormItem
              label="评价内容"
            >
              <Input
                placeholder="评价内容"
                onChange={(e) => {
                  this.setState({
                    addEvalContent: e.target.value
                  })
                }}
              />
            </FormItem>
            <FormItem
              label="评价标准"
            >
              <TextArea
                rows={4}
                style={{ resize: 'none' }}
                onChange={(e) => {
                  this.setState({
                    addEvalStand: e.target.value
                  })
                }}
              />
            </FormItem>
            <FormItem
              label="分值(总)	"
            >
              <Input
                placeholder="分值(总)"
                onChange={(e) => {
                  this.setState({
                    addValueTotal: e.target.value
                  })
                }}
              />
            </FormItem>
          </Form>
        </Modal>
        <Modal
          title="添加评分模块"
          visible={this.state.visibleAddStandM}
          onOk={this.handleOkStandM}
          onCancel={this.handleCancelStandM}
        >
          <Form>
            <FormItem
              label="模块名称"
            >
              <Input
                placeholder="模块名称"
                onChange={(e) => {
                  this.setState({
                    addModuleName: e.target.value
                  })
                }}
              />
            </FormItem>
            <FormItem
              label="模块分值"
            >
              <Input
                placeholder="模块分值"
                onChange={(e) => {
                  this.setState({
                    addModuleValue: e.target.value
                  })
                }}
              />
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
