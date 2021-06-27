import {
  getBaseRouteFailure,
  getBaseRouteStart,
  getBaseRouteSuccess,
} from '../actions/BaseRoute';
import store from '../index';

const { dispatch } = store;

export const dispatchGetBaseRouteStart = () => dispatch(getBaseRouteStart());

export const dispatchGetBaseRouteSuccess = (payload: any) =>
  dispatch(getBaseRouteSuccess(payload));

export const dispatchGetBaseRouteFailure = (payload: any) =>
  dispatch(getBaseRouteFailure(payload));
