import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from 'axios'

import XLSX from 'xlsx'
import { Button, message, Row, Col, Select, Divider, List, Icon } from 'antd';

import './ClassControl.less'

const Option = Select.Option;


class ClassControl extends Component {

  state = {
    selectClass: '',
    classList: []
  }

  classSelector = (value) => {
    this.setState({
      selectClass: value
    }, () => {
      axios.post('http://localhost:5001/teacher/classList', {
        selectClass: value
      })
        .then(res => {
          this.setState({
            classList: res.data.classMates
          })
        })
    })
  }

  file_change = (e) => {
    var selectClass = this.state.selectClass
    var files = e.target.files;

    var fileReader = new FileReader();
    fileReader.onload = function (ev) {
      try {
        var data = ev.target.result,
          workbook = XLSX.read(data, {
            type: 'binary'
          }), // 以二进制流方式读取得到整份excel表格对象
          users = []; // 存储获取到的数据
      } catch (e) {
        message.warning('文件类型不正确');
        return;
      }
      // 表格的表格范围，可用于判断表头是否数量是否正确
      var fromTo = '';
      // 遍历每张表读取
      for (var sheet in workbook.Sheets) {
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          fromTo = workbook.Sheets[sheet]['!ref'];
          users = users.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          // break; // 如果只取第一张表，就取消注释这行
        }
      }
      axios.post('http://localhost:5001/teacher/classControl',
        {
          selectClass: selectClass,
          addUsers: users
        })
        .then(res => {
          if (res.data.type) {
            message.success(res.data.message)
          } else {
            message.warning(res.data.message)
          }
          axios.post('http://localhost:5001/teacher/classList', {
            selectClass: selectClass
          })
            .then(res => {
              this.setState({
                classList: res.data.classMates
              })
            })
        })
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
  };


  render() {
    const { classList } = this.props
    return (
      <div id="ClassControl">
        <Row>
          <Col span={8} push={3}>
            <span>班级选择:</span>
            <Select
              showSearch
              placeholder="请选择班级"
              style={{ width: '80%' }}
              optionFilterProp="children"
              onChange={this.classSelector}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {
                classList.map((item, index) => {
                  return <Option value={item} key={index}>{item}</Option>
                })
              }
            </Select>
          </Col>
          <Col span={8}>
          </Col>
          <Col span={4} >
            <input
              type="file"
              onChange={this.file_change}
              style={{ display: 'none' }}
              ref={file => this.file = file}
            />
            <Button
              icon="file"
              type="primary"
              onClick={() => this.file.click()}
            >导入名单</Button>
          </Col>
          <Col span={4} >
            <Button icon="download"
              type="primary"
            > <a
              style={{ color: 'white' }}
              href="http://localhost:5001/public\excel\test.xlsx">模板下载</a> </Button>
          </Col>
        </Row>
        <Divider />
        {/* <Table columns={columns} dataSource={data} bordered={true} /> */}
        <List
          className="classList"
          size="large"
          header={<div><b>班级名单</b></div>}
          bordered
          dataSource={this.state.classList}
          renderItem={item => {
            return (<List.Item>{item}<div className="hidden"></div>
              <Icon type="minus-square" theme="twoTone"
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                }}
              /></List.Item>)
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  classList: state.getIn(['teacher', 'classList']).toJS()
})

export default connect(mapStateToProps)(ClassControl);
