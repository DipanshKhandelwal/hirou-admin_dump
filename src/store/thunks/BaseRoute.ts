import {
  getAllBaseRoute,
  getBaseRoute,
} from '../../services/apiRequests/baseRoute';
import {
  dispatchGetBaseRouteFailure,
  dispatchGetBaseRouteStart,
  dispatchGetBaseRouteSuccess,
  dispatchUpdateBaseRoute,
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

export const handleFetchUpdatedBaseRoute = async (baseRouteId: number) => {
  try {
    const data = await getBaseRoute(baseRouteId);
    dispatchUpdateBaseRoute(data);
  } catch (e) {
    throw e;
  }
};
