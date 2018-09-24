import React, { Component } from 'react'
import { connect } from 'react-redux'

import Task from './Task.jsx'

import './Tasks.less'

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
            endTime={item.endTime}>
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
