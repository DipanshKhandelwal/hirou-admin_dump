import { TASK_AMOUNT_ITEM_URL } from '../../constants/urls';
import { hirouAxios } from '../httpInstance';

export async function addTaskAmountItem(data: any): Promise<any> {
  try {
    const url = TASK_AMOUNT_ITEM_URL;
    const response = await hirouAxios.post(url, data, {
      'Content-Type': `multipart/form-data`,
    });
    return response.data;
  } catch (e) {
    throw Error('Create Task Amount Item API failed');
  }
}
