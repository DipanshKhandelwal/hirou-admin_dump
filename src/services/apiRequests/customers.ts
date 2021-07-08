import { CUSTOMER_URL } from '../../constants/urls';
import { ICustomer } from '../../models/customer';
import { hirouAxios } from '../httpInstance';

export async function getCustomers(): Promise<ICustomer[]> {
  try {
    const url = CUSTOMER_URL;
    const response = await hirouAxios.get(url);
    return response.data;
  } catch (e) {
    throw Error('Customer API failed');
  }
}
