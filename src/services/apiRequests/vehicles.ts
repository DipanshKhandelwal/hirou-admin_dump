import { VEHICLE_URL } from '../../constants/urls';
import { IVehicle } from '../../models/vehicle';
import { hirouAxios } from '../httpInstance';

export async function getVehicles(): Promise<IVehicle[]> {
  try {
    const url = VEHICLE_URL;
    const response = await hirouAxios.get(url);
    return response.data;
  } catch (e) {
    throw Error('Vehicle API failed');
  }
}
