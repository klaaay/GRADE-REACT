import { handleActions } from 'redux-actions'
import { StudentPageState } from '../constants/models'

const StudentPageReducer = handleActions({
  STUDENT_TASK_RESULT: (state, { payload }) => (
    state.merge({
      taskList: payload.taskList
    })
  )
}, StudentPageState)

export default StudentPageReducer