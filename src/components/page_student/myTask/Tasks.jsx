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
    const { taskList, userId } = this.props
    console.log(taskList);
    return (
      <div className="tasks">
        {
          taskList.map((item, index) => (
            <Task
              key={index}
              userId={userId}
              taskId={item.id._id}
              title={item.id.title}
              publisher={item.id.publisher}
              content={item.id.content}
              publishTime={item.id.publishTime}
              endTime={item.id.endTime}
              restTime={dayjs(item.id.endTime).fromNow()}
              outOfDate={!dayjs(item.id.endTime).isAfter(dayjs())}
              committed={(item.wordCommitted && item.pptCommitted && item.videoCommitted) ? true : false}
            >
            </Task>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  taskList: state.getIn(['student', 'taskList']).toJS(),
  userId: state.getIn(['login', 'id'])
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
