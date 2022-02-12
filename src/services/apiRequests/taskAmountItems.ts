import { TASK_AMOUNT_ITEM_URL } from '../../constants/urls';
import { hirouAxios } from '../httpInstance';

export async function addTaskAmountItem(data: any): Promise<any> {
  try {
    const url = TASK_AMOUNT_ITEM_URL;
    const response = await hirouAxios.post(url, data, {
      'Content-Type': 'multipart/form-data',
    });
    return response.data;
  } catch (e) {
    throw Error('Create Task Amount Item API failed');
  }
}

export async function editTaskAmountItem(
  amountItemId: number,
  data: any
): Promise<any> {
  if (!amountItemId) throw Error('Please provide amount item id');

  try {
    const url = `${TASK_AMOUNT_ITEM_URL}${amountItemId}/`;
    const response = await hirouAxios.put(url, data, {
      'Content-Type': 'multipart/form-data',
    });
    return response.data;
  } catch (e) {
    throw Error('Update Task Amount Item API failed');
  }
}

export async function deleteTaskAmountItem(amountItemId: number): Promise<any> {
  if (!amountItemId) throw Error('Please provide amount item id');
  try {
    const url = `${TASK_AMOUNT_ITEM_URL}${amountItemId}/`;
    const response = await hirouAxios.delete(url);
    return response.data;
  } catch (e) {
    throw Error('Delete Task Amount Item API failed');
  }
}
