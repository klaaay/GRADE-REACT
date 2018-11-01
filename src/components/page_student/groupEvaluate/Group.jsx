import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { Table, Icon, Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class Group extends Component {

  render() {
    const { askedTaskList, evalRecords } = this.props
    const userId = localStorage.getItem("id");
    const columnsEvalRecords = [
      {
        title: '发布老师',
        dataIndex: 'publisher',
        key: 'publisher',
        render: (text) => text
      },
      {
        title: '作业标题',
        dataIndex: 'title',
        key: 'title',
        render: (text) => text
      },
      {
        title: '被评人',
        dataIndex: 'evaluatorTo',
        key: 'evaluatorTo',
        render: (text) => text
      }, {
        title: '我的评分',
        dataIndex: 'score',
        key: 'score',
        render: (text) => text
      }, {
        title: '评价日期',
        dataIndex: 'time',
        key: 'time',
        render: (text) => text
      }
    ]

    const columnsAskedTaskList = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return text
      }
    }, {
      title: '班级',
      dataIndex: 'class',
      key: 'class',
      render: (text) => text
    }, {
      title: 'Word',
      dataIndex: 'wordCommitted',
      key: 'wordCommitted',
      render: (text, record) => {
        return text ? <a href={'http://localhost:5000/' + record.word}><Icon type="file-word" theme={"twoTone"} /></a> : <Icon type="file-word" theme={"outlined"} />
      },
    },
    {
      title: 'PPT',
      dataIndex: 'pptCommitted',
      key: 'pptCommitted',
      render: (text, record) => {
        return text ? <a href={'http://localhost:5000/' + record.ppt}><Icon type="file-ppt" theme={"twoTone"} /></a> : <Icon type="file-ppt" theme={"outlined"} />
      },
    },
    {
      title: 'Video',
      dataIndex: 'videoCommitted',
      key: 'videoCommitted',
      render: (text, record) => {
        return text ? <a href={'http://localhost:5000/' + record.video}><Icon type="video-camera" theme={"twoTone"} /></a> : <Icon type="video-camera" theme={"outlined"} />
      },
    },
    {
      title: '同学互评',
      dataIndex: 'groupGrade',
      key: 'groupGrade',
      render: (text, record) => {
        if (record.pptCommitted && record.wordCommitted && record.videoCommitted) {
          return <a
            onClick={(e) => {
              browserHistory.push({
                pathname: '/student/evaluate',
                query: {
                  role: 'group',
                  id: record.key,
                  userId: userId,
                  publisher: record.id.publisherId
                }
              })
            }}
          >去评价</a>
        } else {
          return <span>去评价</span>
        }
      },
    }];
    return <Tabs defaultActiveKey="1"
    >
      <TabPane tab="评价通知" key="1">
        {
          askedTaskList.length > 0 ? <Table
            bordered={true}
            columns={columnsAskedTaskList}
            dataSource={askedTaskList} /> : <span>你暂时没有需要评价的同学</span>
        }

      </TabPane>
      <TabPane tab="评价记录" key="2">
        {
          evalRecords.length > 0 ? <Table
            bordered={true}
            columns={columnsEvalRecords}
            dataSource={evalRecords} /> : <span>你暂时没有评价记录</span>
        }
      </TabPane>
    </Tabs>


  }
}

const mapStateToProps = (state) => ({
  askedTaskList: state.getIn(['student', 'askedTaskList']).toJS(),
  evalRecords: state.getIn(['student', 'evalRecords']).toJS(),
  userId: state.getIn(['login', 'id'])
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Group)