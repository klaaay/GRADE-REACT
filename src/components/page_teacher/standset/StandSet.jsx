import React, { Component } from 'react'

import { Tabs, Table, Input, Button, message, Row, Col, Divider, Icon, Modal, Form } from 'antd';

import axios from 'axios'

const { TextArea } = Input;
const FormItem = Form.Item;

let evalStandTemp = {}

// let evalStandTempKeys = []

const TabPane = Tabs.TabPane;



export default class StandSet extends Component {

  state = {
    evalStand: {},
    evalStandKeys: [],
    moduleNow: '',
    visibleAddStandDetail: false
  }

  showModalStandDetail = () => {
    this.setState({
      visibleAddStandDetail: true,
    });
  }

  handleOkStandDetail = (e) => {
    this.setState({
      visibleAddStandDetail: false,
    });
  }

  handleCancelStandDetail = (e) => {
    this.setState({
      visibleAddStandDetail: false,
    });
  }

  // find_index = (StandModule, key) => {
  //   var findIndex;
  //   StandModule.forEach((item, index) => {
  //     if (item.key === key) {
  //       findIndex = index;
  //     }
  //   })
  //   return findIndex
  // }

  columns = [{
    title: '评价内容',
    dataIndex: 'eval_content',
    key: 'eval_content',
    render: (text, record) => {
      return <Input
        defaultValue={text}
        onChange={(e) => {
          evalStandTemp[record.title][record.index]['eval_content'] = e.target.value;
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
          evalStandTemp[record.title][record.index]['eval_stand'] = e.target.value;
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
          evalStandTemp[record.title][record.index]['value_total'] = e.target.value;
        }}
      />
    }
  }, {
    title: '删除',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => {
      // console.log(record)
      return <Icon type="delete" theme="outlined"
        onClick={() => {
          var delIndex = record.index;
          console.log(delIndex)
          evalStandTemp[this.state.moduleNow].splice(record.index, 1)
          for (var i = delIndex; i < evalStandTemp[this.state.moduleNow].length; i++) {
            evalStandTemp[this.state.moduleNow][i].index = evalStandTemp[this.state.moduleNow][i].index - 1;
          }
          console.log(evalStandTemp)
          this.setState({
            evalStand: evalStandTemp
          }, () => {
            // evalStandTemp[this.state.moduleNow].map(item => {
            //   item.key = item.key - 1;
            //   return item;
            // })
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
        console.log(res.data)
        const { evalStand } = res.data;
        evalStandTemp = evalStand;
        // evalStandTempKeys = Object.keys(evalStand).filter(item => (item !== '_id' && item !== '__v' && item !== 'initial_values'));
        this.setState({
          evalStand: evalStand,
          evalStandKeys: Object.keys(evalStand).filter(item => (item !== '_id' && item !== '__v' && item !== 'initial_values')),
          moduleNow: Object.keys(evalStand).filter(item => (item !== '_id' && item !== '__v' && item !== 'initial_values'))[0]
        })
      })
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={2}>
          </Col>
          <Col span={6}>
            <Button
              style={{
                width: '80%',
                marginLeft: '20px',
              }}
            >添加评分模块
            </Button>
          </Col>
          <Col span={6}>
            <Button
              style={{
                width: '80%',
                marginLeft: '20px',
              }}

            >添加评分细则
            </Button>
          </Col>
          <Col span={4}>
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
          console.log(key);
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
                      <Button type="danger" style={{ width: '45%', marginRight: '50px' }}>删除模块</Button>
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
              <Input placeholder="评价内容" />
            </FormItem>
            <FormItem
              label="评价标准"
            >
              <TextArea
                rows={4}
                style={{ resize: 'none' }}
              />
            </FormItem>
            <FormItem
              label="分值(总)	"
            >
              <Input placeholder="分值(总)" />
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
