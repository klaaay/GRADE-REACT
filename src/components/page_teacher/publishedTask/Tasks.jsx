import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { Table, Divider, Tag, Icon } from 'antd';

import {
  startDeleteTask
} from '../../../actions/teacher'

const { Column } = Table;


class Tasks extends Component {
  render() {
    const { publishedTasks } = this.props
    const { onStartDeleteTask } = this.props
    console.log(publishedTasks)
    return (
      <Table dataSource={publishedTasks}>

        <Column
          title="作业标题"
          dataIndex="title"
          key="title"
        />
        <Column
          title="发布时间"
          dataIndex="publishTime"
          key="publishTime"
        />
        <Column
          title="接受班级"
          dataIndex="classes"
          key="classes"
          render={tags => (
            <span>
              {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
            </span>
          )}
        />
        <Column
          title=""
          key="action"
          render={(text, record) => (
            <span>
              <Icon type="profile" theme="outlined"
                onClick={(e) => {
                  console.log(record.key)
                  browserHistory.push({
                    pathname: '/teacher/details',
                    query: {
                      id: record.key
                    }
                  })
                }}
              />
              <Divider type="vertical" />
              <Icon type="delete" theme="outlined"
                onClick={(e) => {
                  onStartDeleteTask(record.key)
                }}
              />
            </span>
          )}
        />
      </Table>
    )
  }
}

const mapStateToProps = (state) => ({
  publishedTasks: state.getIn(['teacher', 'publishedTasks']).toJS()
})

const mapDispatchToProps = (dispatch) => ({
  onStartDeleteTask: (selectId) => {
    console.log(selectId);
    return dispatch(startDeleteTask(selectId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)