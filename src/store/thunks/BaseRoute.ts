import { BASE_ROUTE_URL } from '../../constants/urls';
import { hirouAxios } from '../../services/httpInstance';
import {
  dispatchGetBaseRouteFailure,
  dispatchGetBaseRouteStart,
  dispatchGetBaseRouteSuccess,
} from '../dispatcher/BaseRoute';

export const handleFetchBaseRoute = async () => {
  dispatchGetBaseRouteStart();
  try {
    const response = await hirouAxios.get(BASE_ROUTE_URL);
    const _data = response.data;
    dispatchGetBaseRouteSuccess(_data);
  } catch (e) {
    dispatchGetBaseRouteFailure(e.message);
  }
};
