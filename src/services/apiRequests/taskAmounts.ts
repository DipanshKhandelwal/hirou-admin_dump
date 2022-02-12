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

export async function addTaskAmount(data: any): Promise<any> {
  try {
    const url = TASK_AMOUNT_URL;
    const response = await hirouAxios.post(url, data, {
      'Content-Type': 'multipart/form-data',
    });
    return response.data;
  } catch (e) {
    throw Error('Create Task Amount API failed');
  }
}

export async function editTaskAmount(
  amountId: number,
  data: any
): Promise<any> {
  if (!amountId) throw Error('Please provide amount id');

  try {
    const url = `${TASK_AMOUNT_URL}${amountId}/`;
    const response = await hirouAxios.put(url, data, {
      'Content-Type': 'multipart/form-data',
    });
    return response.data;
  } catch (e) {
    throw Error('Update Task Amount API failed');
  }
}

export async function deleteTaskAmount(amountId: number): Promise<any> {
  if (!amountId) throw Error('Please provide amount id');
  try {
    const url = `${TASK_AMOUNT_URL}${amountId}/`;
    const response = await hirouAxios.delete(url);
    return response.data;
  } catch (e) {
    throw Error('Delete Task Amount API failed');
  }
}
