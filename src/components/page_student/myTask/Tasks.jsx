import React, { Component } from 'react'
import { connect } from 'react-redux'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import moment from 'moment';
import 'moment/locale/zh-cn';

import Task from './Task.jsx'

import './Tasks.less'

moment.locale('zh-cn');
dayjs.extend(relativeTime)

class Tasks extends Component {
  render() {
    const { taskList } = this.props
    console.log(taskList);
    return (
      <div className="tasks">
        {
          taskList.map((item, index) => (
            <Task
              key={index}
              title={item.title}
              publisher={item.publisher}
              content={item.content}
              publishTime={item.publishTime}
              endTime={item.endTime}
              restTime={dayjs(item.endTime).fromNow()}
              outOfDate={!dayjs(item.endTime).isAfter(dayjs())}
            >
            </Task>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  taskList: state.getIn(['student', 'taskList']).toJS()
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
