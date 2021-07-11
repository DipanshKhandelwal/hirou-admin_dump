import { COLLECTION_POINT_URL } from '../../constants/urls';
import { hirouAxios } from '../httpInstance';

export async function saveCollectionPoint(data: any): Promise<any> {
  try {
    const url = COLLECTION_POINT_URL;
    const response = await hirouAxios.post(url, data);
    return response.data;
  } catch (e) {
    throw Error('Create Collection Point API failed');
  }
}
