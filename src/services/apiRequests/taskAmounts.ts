import { TASK_AMOUNT_URL } from '../../constants/urls';
import { ITaskAmount } from '../../models/taskAmount';
import { hirouAxios } from '../httpInstance';

export async function getTaskAmounts(
  taskRouteId: number
): Promise<ITaskAmount[]> {
  const url = `${TASK_AMOUNT_URL}?task_route=${taskRouteId}`;
  try {
    const response = await hirouAxios.get(url);
    return response.data;
  } catch (e) {
    throw Error('Get Task Amounts API failed');
  }
}
