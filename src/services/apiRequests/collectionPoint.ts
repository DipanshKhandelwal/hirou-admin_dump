import { COLLECTION_POINT_URL } from '../../constants/urls';
import { hirouAxios } from '../httpInstance';

export async function saveCollectionPoint(data: any): Promise<any> {
  try {
    const url = COLLECTION_POINT_URL;
    const response = await hirouAxios.post(url, data, {
      'Content-Type': 'multipart/form-data',
    });
    return response.data;
  } catch (e) {
    throw Error('Create Collection Point API failed');
  }
}

export async function editCollectionPoint(
  cpId: number,
  data: any
): Promise<any> {
  if (!cpId) throw Error('Please provide collection point id');

  try {
    const url = `${COLLECTION_POINT_URL}${cpId}/`;
    const response = await hirouAxios.put(url, data, {
      'Content-Type': 'multipart/form-data',
    });
    return response.data;
  } catch (e) {
    throw Error('Update Collection Point API failed');
  }
}

export async function deleteCollectionPoint(cpId: number): Promise<any> {
  if (!cpId) throw Error('Please provide collection point id');

  try {
    const url = `${COLLECTION_POINT_URL}${cpId}/`;
    const response = await hirouAxios.delete(url);
    return response.data;
  } catch (e) {
    throw Error('Delete Collection Point API failed');
  }
}
