import {
  START_GET_TASKS,
  START_GET_ASKED_TASKS,
  START_GET_EVAL_RECORDS
} from '../constants/actionTypes.js'

export const startGetTasks = () => ({ type: START_GET_TASKS });
export const startGetAskedTasks = () => ({ type: START_GET_ASKED_TASKS });
export const startGetEvalRecords = ()=>({type:START_GET_EVAL_RECORDS});