import { BASE_ROUTE_URL } from '../../constants/urls';
import { hirouAxios } from '../httpInstance';

export async function saveBaseRoute(data: any): Promise<any> {
  try {
    const url = BASE_ROUTE_URL;
    const response = await hirouAxios.post(url, data);
    return response.data;
  } catch (e) {
    throw Error('Create Base Route API failed');
  }
}
