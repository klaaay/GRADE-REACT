import {
  CLASS_LIST_SEARCH,
  START_TASK_PUBLISH,
  TASK_CLASSES_CHANGE,
  TASK_TIME_CHANGE
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
export const startTaskPublish = (title, content) => ({
  type: START_TASK_PUBLISH,
  payload: {
    title: title,
    content: content
  }
})