import { handleActions } from 'redux-actions'
import { StudentPageState } from '../constants/models'

const StudentPageReducer = handleActions({
  STUDENT_TASK_RESULT: (state, { payload }) => (
    state.merge({
      taskList: payload.taskList
    })
  ),
  GROUP_EVALUATE_TASKS: (state, { payload }) => (
    state.merge({
      askedTaskList: payload.askedTaskList
    })
  )
}, StudentPageState)

export default StudentPageReducer