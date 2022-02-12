import { IBaseRoute } from '../../models/baseRoute';
import * as actionTypes from '../actionTypes/BaseRoute';

const initialState = {
  isLoaded: false,
  isError: false,
  errorMessage: '',
  data: [],
};

const updateBaseRoute = (state: any, payload: IBaseRoute) => {
  const oldRoutes = state.data;

  const reqIndex = oldRoutes.findIndex(
    (route: IBaseRoute) => route.id === payload.id
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

const setBaseRoute = (state: any, payload: any) => {
  return {
    ...state,
    isLoaded: true,
    isError: false,
    errorMessage: '',
    data: payload,
  };
};

const setBaseRouteFailure = (state: any, payload: any) => {
  return {
    ...state,
    isLoaded: false,
    isError: true,
    errorMessage: payload,
  };
};

const setBaseRouteStart = (state: any, payload: any) => {
  return {
    ...state,
    isLoaded: false,
    isError: false,
    errorMessage: '',
  };
};

const resetState = () => initialState;

const BaseRouteReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_BASE_ROUTE_SUCCESS:
      return setBaseRoute(state, action.payload);
    case actionTypes.GET_BASE_ROUTE_START:
      return setBaseRouteStart(state, action.payload);
    case actionTypes.GET_BASE_ROUTE_FAILURE:
      return setBaseRouteFailure(state, action.payload);
    case actionTypes.UPDATE_BASE_ROUTE:
      return updateBaseRoute(state, action.payload);
    case actionTypes.RESET_BASE_ROUTE:
      return resetState();
    default:
      return state;
  }
};
export default BaseRouteReducer;
