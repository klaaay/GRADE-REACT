import {
  CLASS_LIST_SEARCH,
  START_TASK_PUBLISH,
  TASK_CLASSES_CHANGE,
  TASK_TIME_CHANGE,
  START_GET_PUBLISHED_TASKS,
  START_DELETE_TASK,
  PROPORTION_CHANGE,
  GROUP_NUMBER_CHANGE
} from '../constants/actionTypes.js'

export const classListSearch = () => ({ type: CLASS_LIST_SEARCH });
export const taskClassesChange = (classes) => ({
  type: TASK_CLASSES_CHANGE,
  payload: {
    classes: classes
  }
})
export const taskTimeChange = (publishTime, endTime) => ({
  type: TASK_TIME_CHANGE,
  payload: {
    publishTime: publishTime,
    endTime: endTime
  }
})
export const proportionChange = (role, value) => ({
  type: PROPORTION_CHANGE,
  payload: {
    role: role,
    value: value
  }
})
export const groupNumberChange = (value) => ({
  type: GROUP_NUMBER_CHANGE,
  payload: {
    value: value
  }
})
export const startTaskPublish = (title, content) => ({
  type: START_TASK_PUBLISH,
  payload: {
    title: title,
    content: content
  }
})
export const startGetPublishedTaks = () => ({
  type: START_GET_PUBLISHED_TASKS
})
export const startDeleteTask = (selectId) => ({
  type: START_DELETE_TASK,
  payload: {
    selectId: selectId
  }
})