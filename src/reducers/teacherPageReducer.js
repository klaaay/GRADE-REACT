import { handleActions } from 'redux-actions'
import { TeacherPageState } from '../constants/models'

const TeacherPageReducer = handleActions({
  SEARCH_CLASS_LIST_RESULT: (state, { payload }) => (
    state.merge({
      classList: payload.classList
    })
  ),
  TASK_CLASSES_CHANGE: (state, { payload }) => (
    state.merge({
      classes: payload.classes
    })
  ),
  TASK_TIME_CHANGE: (state, { payload }) => (
    state.merge({
      publishTime: payload.publishTime,
      endTime: payload.endTime
    })
  ),
  START_TASK_PUBLISH: (state, { payload }) => (
    state.merge({
      title: payload.title,
      content: payload.content
    })
  )
}, TeacherPageState)

export default TeacherPageReducer