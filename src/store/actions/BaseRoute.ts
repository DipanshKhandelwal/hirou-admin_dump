import * as actionTypes from '../actionTypes/BaseRoute';

export const getBaseRouteStart = () => {
  return {
    type: actionTypes.GET_BASE_ROUTE_START,
  };
};

export const getBaseRouteSuccess = (payload: any) => {
  return {
    type: actionTypes.GET_BASE_ROUTE_SUCCESS,
    payload,
  };
};

export const getBaseRouteFailure = (err: any) => {
  return {
    type: actionTypes.GET_BASE_ROUTE_FAILURE,
    payload: err,
  };
};
