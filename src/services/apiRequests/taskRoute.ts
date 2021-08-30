import { TASK_ROUTE_URL } from '../../constants/urls';
import { hirouAxios } from '../httpInstance';

export async function getAllTaskRoute(): Promise<any> {
  try {
    const response = await hirouAxios.get(TASK_ROUTE_URL);
    return response.data;
  } catch (e) {
    throw Error('Get all Task Route API failed');
  }
}
