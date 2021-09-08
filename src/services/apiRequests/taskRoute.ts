import { TASK_ROUTE_URL } from '../../constants/urls';
import { hirouAxios } from '../httpInstance';

export async function getAllTaskRoute(params: any): Promise<any> {
  try {
    const response = await hirouAxios.get(TASK_ROUTE_URL, { params });
    return response.data;
  } catch (e) {
    throw Error('Get all Task Route API failed');
  }
}

export async function getTaskRoute(taskRouteId: number): Promise<any> {
  const url = `${TASK_ROUTE_URL}${taskRouteId}/`;
  try {
    const response = await hirouAxios.get(url);
    return response.data;
  } catch (e) {
    throw Error('Get Task Route API failed');
  }
}
