import { ICustomer } from './customer';

export interface IBaseRoute {
  id: number;
  name: string;
  customer: ICustomer;
}
