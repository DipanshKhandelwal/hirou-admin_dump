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

export const handleFetchUpdatedTaskRoute = async (taskRouteId: number) => {
  try {
    const data = await getTaskRoute(taskRouteId);
    dispatchUpdateTaskRoute(data);
  } catch (e) {
    throw e;
  }
};
