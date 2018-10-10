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
  PROPORTION_CHANGE: (state, { payload }) => {
    if (payload.role === 'teacher') {
      return state.merge({
        teacherProportion: payload.value
      })
    }
    else if (payload.role === 'self') {
      return state.merge({
        selfProportion: payload.value
      })
    }
    else if (payload.role === 'group') {
      return state.merge({
        groupProportion: payload.value
      })
    }
  },
  GROUP_NUMBER_CHANGE: (state, { payload }) => (
    state.merge({
      groupNumber: payload.value
    })
  ),
  START_TASK_PUBLISH: (state, { payload }) => (
    state.merge({
      title: payload.title,
      content: payload.content
    })
  ),
  PUBLISHED_TASKS_RESULT: (state, { payload }) => (
    state.merge({
      publishedTasks: payload.publishedTasks
    })
  ),
  START_DELETE_TASK: (state, { payload }) => {
    let state1 = state.set('selectId', payload.selectId)
    let state2 = state1.set('publishedTasks', state1.get('publishedTasks').filter(item => (item.get('key') !== payload.selectId)))
    return state2;
  },
}, TeacherPageState)

export default TeacherPageReducer