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

export async function editBaseRoute(
  baseRouteId: number,
  data: any
): Promise<any> {
  if (!baseRouteId) throw Error('Please provide base route id');
  try {
    const url = `${BASE_ROUTE_URL}${baseRouteId}/`;
    const response = await hirouAxios.put(url, data);
    return response.data;
  } catch (e) {
    throw Error('Update Base Route API failed');
  }
}

export async function getAllBaseRoute(params?: any): Promise<any> {
  try {
    const response = await hirouAxios.get(BASE_ROUTE_URL, {
      params: { ...params, type: 'list' },
    });
    return response.data;
  } catch (e) {
    throw Error('Get all Base Route API failed');
  }
}

export async function getBaseRoute(baseRouteId: number): Promise<any> {
  const url = `${BASE_ROUTE_URL}${baseRouteId}/`;
  try {
    const response = await hirouAxios.get(url);
    return response.data;
  } catch (e) {
    throw Error('Get Base Route API failed');
  }
}

export async function deleteBaseRoute(baseRouteId: number): Promise<any> {
  try {
    const url = `${BASE_ROUTE_URL}${baseRouteId}/`;
    const response = await hirouAxios.delete(url);
    return response.data;
  } catch (e) {
    throw Error('Delete Base Route API failed');
  }
}
