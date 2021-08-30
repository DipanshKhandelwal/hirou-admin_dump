import { ITaskRoute } from '../../models/taskRoute';
import * as actionTypes from '../actionTypes/TaskRoute';

export const getTaskRouteStart = () => {
  return {
    type: actionTypes.GET_TASK_ROUTE_START,
  };
};

export const getTaskRouteSuccess = (payload: any) => {
  return {
    type: actionTypes.GET_TASK_ROUTE_SUCCESS,
    payload,
  };
};

export const getTaskRouteFailure = (err: any) => {
  return {
    type: actionTypes.GET_TASK_ROUTE_FAILURE,
    payload: err,
  };
};

export const updateTaskRoute = (taskRoute: ITaskRoute) => {
  return {
    type: actionTypes.UPDATE_TASK_ROUTE,
    payload: taskRoute,
  };
};
