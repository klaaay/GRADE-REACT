import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { Table, Icon } from 'antd';

class Group extends Component {


  render() {
    const { askedTaskList, userId } = this.props
    console.log(askedTaskList)
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => text
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
        console.log(text)
        console.log(record)
        if (record.pptCommitted && record.wordCommitted && record.videoCommitted) {
          return text.length < 2 ? <a
            onClick={(e) => {
              browserHistory.push({
                pathname: '/student/evaluate',
                query: {
                  role: 'group',
                  id: record.key,
                  userId: userId
                }
              })
            }}
          >去评价</a> : <Icon type="check" theme="outlined" style={{ color: '#1890FF' }} />
        } else {
          return <span>去评价</span>
        }
      },
    }];
    return <Table
      columns={columns}
      dataSource={askedTaskList} />;
  }
}

const mapStateToProps = (state) => ({
  askedTaskList: state.getIn(['student', 'askedTaskList']).toJS(),
  userId: state.getIn(['login', 'id'])
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Group)