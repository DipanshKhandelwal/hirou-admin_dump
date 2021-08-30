import {
  getAllTaskRoute,
  getTaskRoute,
} from '../../services/apiRequests/taskRoute';
import {
  dispatchGetTaskRouteFailure,
  dispatchGetTaskRouteStart,
  dispatchGetTaskRouteSuccess,
  dispatchUpdateTaskRoute,
} from '../dispatcher/TaskRoute';

export const handleFetchTaskRoute = async () => {
  dispatchGetTaskRouteStart();
  try {
    const data = await getAllTaskRoute();
    dispatchGetTaskRouteSuccess(data);
  } catch (e) {
    dispatchGetTaskRouteFailure(e.message);
  }
};
