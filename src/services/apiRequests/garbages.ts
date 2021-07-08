import { GARBAGE_URL } from '../../constants/urls';
import { IGarbage } from '../../models/garbage';
import { hirouAxios } from '../httpInstance';

export async function getGarbages(): Promise<IGarbage[]> {
  try {
    const url = GARBAGE_URL;
    const response = await hirouAxios.get(url);
    return response.data;
  } catch (e) {
    throw Error('Garbage API failed');
  }
}
