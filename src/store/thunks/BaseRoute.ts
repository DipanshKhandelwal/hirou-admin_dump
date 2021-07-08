import { getAllBaseRoute } from '../../services/apiRequests/baseRoute';
import {
  dispatchGetBaseRouteFailure,
  dispatchGetBaseRouteStart,
  dispatchGetBaseRouteSuccess,
} from '../dispatcher/BaseRoute';

export const handleFetchBaseRoute = async () => {
  dispatchGetBaseRouteStart();
  try {
    const data = await getAllBaseRoute();
    dispatchGetBaseRouteSuccess(data);
  } catch (e) {
    dispatchGetBaseRouteFailure(e.message);
  }
};
