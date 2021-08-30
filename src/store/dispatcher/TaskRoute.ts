import { ITaskRoute } from '../../models/taskRoute';
import {
  getTaskRouteFailure,
  getTaskRouteStart,
  getTaskRouteSuccess,
  updateTaskRoute,
} from '../actions/TaskRoute';
import store from '../index';

const { dispatch } = store;

export const dispatchGetTaskRouteStart = () => dispatch(getTaskRouteStart());

export const dispatchGetTaskRouteSuccess = (payload: any) =>
  dispatch(getTaskRouteSuccess(payload));

export const dispatchGetTaskRouteFailure = (payload: any) =>
  dispatch(getTaskRouteFailure(payload));

export const dispatchUpdateTaskRoute = (payload: ITaskRoute) =>
  dispatch(updateTaskRoute(payload));
