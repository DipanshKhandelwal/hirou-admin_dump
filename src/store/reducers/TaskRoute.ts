import { ITaskRoute } from '../../models/taskRoute';
import * as actionTypes from '../actionTypes/TaskRoute';

const initialState = {
  isLoaded: false,
  isError: false,
  errorMessage: '',
  data: [],
};

const updateTaskRoute = (state: any, payload: ITaskRoute) => {
  const oldRoutes = state.data;

  const reqIndex = oldRoutes.findIndex(
    (route: ITaskRoute) => route.id === payload.id
  );

  if (reqIndex !== -1) {
    oldRoutes[reqIndex] = payload;
    return {
      ...state,
      data: oldRoutes,
    };
  }

  return {
    ...state,
    data: [...oldRoutes, payload],
  };
};

const setTaskRoute = (state: any, payload: any) => {
  return {
    ...state,
    isLoaded: true,
    isError: false,
    errorMessage: '',
    data: payload,
  };
};

const setTaskRouteFailure = (state: any, payload: any) => {
  return {
    ...state,
    isLoaded: false,
    isError: true,
    errorMessage: payload,
  };
};

const setTaskRouteStart = (state: any, payload: any) => {
  return {
    ...state,
    isLoaded: false,
    isError: false,
    errorMessage: '',
  };
};

const resetState = () => initialState;

const TaskRouteReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_TASK_ROUTE_SUCCESS:
      return setTaskRoute(state, action.payload);
    case actionTypes.GET_TASK_ROUTE_START:
      return setTaskRouteStart(state, action.payload);
    case actionTypes.GET_TASK_ROUTE_FAILURE:
      return setTaskRouteFailure(state, action.payload);
    case actionTypes.UPDATE_TASK_ROUTE:
      return updateTaskRoute(state, action.payload);
    case actionTypes.RESET_TASK_ROUTE:
      return resetState();
    default:
      return state;
  }
};
export default TaskRouteReducer;
